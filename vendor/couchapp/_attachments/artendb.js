window.adb = window.adb || {};

window.adb.erstelleBaum = function() {
	var gruppe,
		gruppenbezeichung,
		baum_erstellt = $.Deferred();
	// alle Bäume ausblenden
	$(".baum").css("display", "none");
	// alle Beschriftungen ausblenden
	$(".treeBeschriftung").css("display", "none");
	// gewollte beschriften und sichtbar schalten
	switch (window.adb.Gruppe) {
		case "Fauna":
			gruppe = "fauna";
			gruppenbezeichung = "Tiere";
			break;
		case "Flora":
			gruppe = "flora";
			gruppenbezeichung = "Pflanzen";
			break;
		case "Moose":
			gruppe = "moose";
			gruppenbezeichung = "Moose";
			break;
		case "Macromycetes":
			gruppe = "macromycetes";
			gruppenbezeichung = "Pilze";
			break;
		case "Lebensräume":
			gruppe = "lr";
			gruppenbezeichung = "Lebensräume";
			break;
	}
	$db = $.couch.db("artendb");
	$db.view('artendb/' + gruppe + "_gruppiert", {
		success: function(data) {
			var anzahl_objekte = data.rows[0].value;
			$("#tree" + window.adb.Gruppe + "Beschriftung").html(anzahl_objekte + " " + gruppenbezeichung);
			// eingeblendet wird die Beschriftung, wenn der Baum fertig ist im callback von function erstelleTree
		}
	});
	$.when(window.adb.erstelleTree()).then(function() {
		baum_erstellt.resolve();
	});
	return baum_erstellt.promise();
};

window.adb.erstelleTree = function() {
	var level,
		gruppe,
		filter,
		id,
		jstree_erstellt = $.Deferred();
	$("#tree" + window.adb.Gruppe).jstree({
		"json_data": {
			ajax: {
				type: 'GET',
				url: function(node) {
					if (node == -1) {
						return window.adb.holeDatenUrlFuerTreeOberstesLevel();
					} else {
						level = parseInt(node.attr('level'), 10) + 1;
						gruppe = node.attr('gruppe');
						if (node.attr('filter')) {
							filter = node.attr('filter').split(",");
							id = "";
						} else {
							filter = "";
							id = node.attr('id');
						}
						return window.adb.holeDatenUrlFuerTreeUntereLevel(level, filter, gruppe, id);
					}
				},
				success: function(data) {
					//console.log("erstelleTree meldet: ajax success");
					return data;
				},
				error: function(data) {
					//console.log("erstelleTree meldet: ajax failure");
				}
			}
		},
		"ui": {
			"select_limit": 1,	// nur ein Datensatz kann aufs mal gewählt werden
			"selected_parent_open": true,	// wenn Code einen node wählt, werden alle parents geöffnet
			"select_prev_on_delete": true
		},
		"core": {
			"open_parents": true,	// wird ein node programmatisch geöffnet, öffnen sich alle parents
			"strings": {
				"loading": "hole Daten..."
			}
		},
		"sort": function(a, b) {
			return this.get_text(a) > this.get_text(b) ? 1 : -1;
		},
		"themes": {
			"icons": false
		},
		"plugins" : ["ui", "themes", "json_data", "sort"]
	})
	.bind("select_node.jstree", function(e, data) {
		var node = data.rslt.obj;
		$.jstree._reference(node).open_node(node);
		if (node.attr("id")) {
			// verhindern, dass bereits offene Seiten nochmals geöffnet werden
			if (!$("#art").is(':visible') || localStorage.art_id !== node.attr("id")) {
				localStorage.art_id = node.attr("id");
				// Anzeige im Formular initiieren. ID und Datensammlung übergeben
				window.adb.initiiere_art(node.attr("id"));
			}
		}
	})
	.bind("loaded.jstree", function() {
		jstree_erstellt.resolve();
		$("#suchen"+window.adb.Gruppe).css("display", "table");
		$("#treeMitteilung").hide();
		$("#tree" + window.adb.Gruppe).css("display", "block");
		$("#tree" + window.adb.Gruppe + "Beschriftung").css("display", "block");
		window.adb.setzeTreehoehe();
		window.adb.initiiereSuchfeld();
	})
	.bind("after_open.jstree", function() {
		window.adb.setzeTreehoehe();
	})
	.bind("after_close.jstree", function() {
		window.adb.setzeTreehoehe();
	});
	return jstree_erstellt.promise();
};

window.adb.holeDatenUrlFuerTreeOberstesLevel = function() {
	var gruppe,
        url;
	// wie sicherstellen, dass nicht dieselben nodes mehrmals angehängt werden?
	switch (window.adb.Gruppe) {
		case "Fauna":
			gruppe = "fauna";
			break;
		case "Flora":
			gruppe = "flora";
			break;
		case "Moose":
			gruppe = "moose";
			break;
		case "Macromycetes":
			gruppe = "macromycetes";
			break;
		case "Lebensräume":
			gruppe = "lr";
			break;
	}
	if (window.adb.Gruppe === "Lebensräume") {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_lr/baum_lr?startkey=[1]&endkey=[1,{},{},{},{},{}]&group_level=6";
	} else {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_"+gruppe+"/baum_"+gruppe+"?group_level=1";
	}
	return url;
};

window.adb.holeDatenUrlFuerTreeUntereLevel = function(level, filter, gruppe, id) {
	var startkey,
		// flag, um mitzuliefern, ob die id angezeigt werden soll
		id2 = false,
		endkey = [],
        a,
        url;
	if (filter) {
		// bei lr gibt es keinen filter und das erzeugt einen fehler
		startkey = filter.slice();
		endkey = filter.slice();
	}
	switch (gruppe) {
		case "fauna":
			if (level > 4) {
				return null;
			}
			for (a=5; a>=level; a--) {
				endkey.push({});
			}
			// im untersten level einen level mehr anzeigen, damit id vorhanden ist
			if (level === 4) {
				// das ist die Art-Ebene
				// hier soll die id angezeigt werden
				// dazu muss der nächste level abgerufen werden
				// damit die list den zu hohen level korrigieren kann, id mitgeben
				id2 = true;
				level++;
			}
			break;
		case "flora":
			if (level > 3) {
				return null;
			}
			for (a=4; a>=level; a--) {
				endkey.push({});
			}
			// im untersten level einen level mehr anzeigen, damit id vorhanden ist
			if (level === 3) {
				id2 = true;
				level++;
			}
			break;
		case "moose":
			if (level > 4) {
				return null;
			}
			for (a=5; a>=level; a--) {
				endkey.push({});
			}
			// im untersten level einen level mehr anzeigen, damit id vorhanden ist
			if (level === 4) {
				id2 = true;
				level++;
			}
			break;
		case "macromycetes":
			if (level > 2) {
				return null;
			}
			for (a=3; a>=level; a--) {
				endkey.push({});
			}
			// im untersten level einen level mehr anzeigen, damit id vorhanden ist
			if (level === 2) {
				id2 = true;
				level++;
			}
			break;
	}
	if (gruppe === "lr") {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + '/artendb/_design/artendb/_list/baum_lr/baum_lr?startkey=['+level+', "'+id+'"]&endkey=['+level+', "'+id+'",{},{},{},{}]&group_level=6';
	} else {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_"+gruppe+"/baum_"+gruppe+"?startkey="+JSON.stringify(startkey)+"&endkey="+JSON.stringify(endkey)+"&group_level="+level;
	}
	if (id2) {
		url = url + "&id=true";
	}
	return url;
};

window.adb.initiiereSuchfeld = function() {
	// zuerst mal die benötigten Daten holen
	$db = $.couch.db("artendb");
	if (window.adb.Gruppe && window.adb.Gruppe === "Lebensräume") {
		if (window.adb.filtere_lr) {
			window.adb.initiiereSuchfeld_2();
		} else {
			var startkey = encodeURIComponent('["'+window.adb.Gruppe+'"]'),
				endkey = encodeURIComponent('["'+window.adb.Gruppe+'",{},{},{}]'),
				url = 'artendb/filtere_lr?startkey='+startkey+'&endkey=' + endkey;
			$db.view(url, {
				success: function(data) {
					window.adb.filtere_lr = data;
					window.adb.initiiereSuchfeld_2();
				}
			});
		}
	} else if (window.adb.Gruppe) {
		if (window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()]) {
			window.adb.initiiereSuchfeld_2();
		} else {
			$db.view('artendb/filtere_art?startkey=["'+window.adb.Gruppe+'"]&endkey=["'+window.adb.Gruppe+'",{}]', {
				success: function(data) {
					window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()] = data;
					window.adb.initiiereSuchfeld_2();
				}
			});
		}
	}
};

window.adb.initiiereSuchfeld_2 = function() {
	var suchObjekte;
	if (window.adb.Gruppe && window.adb.Gruppe === "Lebensräume") {
		suchObjekte = window.adb.filtere_lr.rows;
	} else if (window.adb.Gruppe) {
		suchObjekte = window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()].rows;
	}
	suchObjekte = _.map(suchObjekte, function(objekt) {
		return objekt.value;
	});

	$('#suchfeld' + window.adb.Gruppe).typeahead({
		name: window.adb.Gruppe,
		valueKey: 'Name',
		local: suchObjekte,
		limit: 20
	})
	.on('typeahead:selected', function(e, datum) {
		window.adb.öffneBaumZuId(datum.id);
	});
	$("#suchfeld"+window.adb.Gruppe).focus();
};

// baut die Auswahlliste auf, mit der ein Parent ausgewählt werden soll
// bekommt die id des LR, von dem aus ein neuer LR erstellt werden soll
// In der Auswahlliste sollen nur LR aus derselben Taxonomie gewählt werden können
// plus man soll auch einen neue Taxonomie beginnen können
window.adb.initiiereLrParentAuswahlliste = function(taxonomie_name) {
	// lr holen
	$db = $.couch.db("artendb");
	$db.view('artendb/lr?include_docs=true', {
		success: function(lr) {
			var taxonomie_objekte, 
				object,
				neueTaxonomie,
				object_html,
				html = "",
				i;
			// reduzieren auf die LR der Taxonomie
			taxonomie_objekte = _.filter(lr.rows, function(row) {
				return row.doc.Taxonomie.Name === taxonomie_name;
			});
			// einen Array von Objekten schaffen mit id und Name
			taxonomie_objekte = _.map(taxonomie_objekte, function(row) {
				object = {};
				object.id = row.doc._id;
				if (row.doc.Taxonomie.Daten && row.doc.Taxonomie.Daten.Einheit) {
					if (row.doc.Taxonomie.Daten.Label) {
						object.Name = row.doc.Taxonomie.Daten.Label + ": " + row.doc.Taxonomie.Daten.Einheit;
					} else {
						object.Name = row.doc.Taxonomie.Daten.Einheit;
					}
					if (row.doc.Taxonomie.Daten.Hierarchie && row.doc.Taxonomie.Daten.Hierarchie.length === 1) {
						// das ist das oberste Objekt, soll auch zuoberst einsortiert werden
						// oft hat es als einziges keinen label und würde daher zuunterst sortiert!
						object.Sortier = "0";
					} else {
						// mittels Array sortieren
						object.Sortier = object.Name;
					}
				}
				return object;
			});
			// jetzt nach Name sortieren
			taxonomie_objekte = _.sortBy(taxonomie_objekte, function(objekt) {
				return objekt.Sortier;
			});
			neueTaxonomie = {};
			neueTaxonomie.id = 0;
			neueTaxonomie.Name = "Neue Taxonomie beginnen";
			// neueTaxonomie als erstes Objekt in den Array einfügen
			taxonomie_objekte.unshift(neueTaxonomie);

			// jetzt die Optionenliste für $("#lr_parent_waehlen_optionen") aufbauen
			for (i=0; i<taxonomie_objekte.length; i++) {
				object_html = '';
				if (i === 1) {
					object_html += '<p>...oder den hierarchisch übergeordneten Lebensraum wählen:</p>';
				}
				object_html += '<div class="radio"><label>';
				object_html += '<input type="radio" name="parent_optionen" id="';
				object_html += taxonomie_objekte[i].id;
				object_html += '" value="';
				object_html += taxonomie_objekte[i].Name;
				object_html += '">';
				object_html += taxonomie_objekte[i].Name;
				object_html += '</label></div>';
				html += object_html;
			}
			$("#lr_parent_waehlen_optionen").html(html);
			// jetzt das modal aufrufen
			// höhe Anpassen funktioniert leider nicht über css mit calc
			$('#lr_parent_waehlen').modal();
			$('#lr_parent_waehlen_optionen').css('max-height', $(window).height()-100);
		}
	});
};

window.adb.öffneBaumZuId = function(id) {
	// Hierarchie der id holen
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(objekt) {
            var $filter_klasse = $("[filter='"+objekt.Taxonomie.Daten.Klasse+"']"),
                $art_anmelden = $("#art_anmelden");
			switch (objekt.Gruppe) {
				case "Fauna":
					// von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
					// oberste Ebene aufbauen nicht nötig, die gibt es schon
					$.jstree._reference("#treeFauna").open_node($filter_klasse, function() {
						$.jstree._reference("#treeFauna").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Ordnung+"']"), function() {
							$.jstree._reference("#treeFauna").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Ordnung+","+objekt.Taxonomie.Daten.Familie+"']"), function() {
								$.jstree._reference("#treeFauna").select_node($("#"+objekt._id), function() {}, false);
							}, true);
						}, true);
					}, true);
					// Anmeldung verstecken, wenn nicht Lebensräume
					$art_anmelden.hide();
					break;
				case "Flora":
					// von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
					// oberste Ebene aufbauen nicht nötig, die gibt es schon
					$.jstree._reference("#treeFlora").open_node($("[filter='"+objekt.Taxonomie.Daten.Familie+"']"), function() {
						$.jstree._reference("#treeFlora").open_node($("[filter='"+objekt.Taxonomie.Daten.Familie+","+objekt.Taxonomie.Daten.Gattung+"']"), function() {
							$.jstree._reference("#treeFlora").select_node($("#"+objekt._id), function() {}, false);
						}, true);
					}, true);
					// Anmeldung verstecken, wenn nicht Lebensräume
					$art_anmelden.hide();
					break;
				case "Moose":
					// von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
					// oberste Ebene aufbauen nicht nötig, die gibt es schon
					$.jstree._reference("#treeMoose").open_node($filter_klasse, function() {
						$.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Familie+"']"), function() {
							$.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Familie+","+objekt.Taxonomie.Daten.Gattung+"']"), function() {
								$.jstree._reference("#treeMoose").select_node($("#"+objekt._id), function() {}, false);
							}, true);
						}, true);
					}, true);
					// Anmeldung verstecken, wenn nicht Lebensräume
					$art_anmelden.hide();
					break;
				case "Macromycetes":
					// von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
					// oberste Ebene aufbauen nicht nötig, die gibt es schon
					$.jstree._reference("#treeMacromycetes").open_node($("[filter='"+objekt.Taxonomie.Daten.Gattung+"']"), function() {
						$.jstree._reference("#treeMacromycetes").select_node($("#"+objekt._id), function() {}, false);
					}, true);
					// Anmeldung verstecken, wenn nicht Lebensräume
					$art_anmelden.hide();
					break;
				case "Lebensräume":
					var idArray = [];
					for (var i=0; i<objekt.Taxonomie.Daten.Hierarchie.length; i++) {
						idArray.push(objekt.Taxonomie.Daten.Hierarchie[i].GUID);
					}
					window.adb.oeffneNodeNachIdArray(idArray);
					break;
			}
		}
	});
};

// läuft von oben nach unten durch die Hierarchie der Lebensräume
// ruft sich selber wieder auf, wenn ein tieferer level existiert
// erwartet idArray: einen Array der GUID's aus der Hierarchie des Objekts
window.adb.oeffneNodeNachIdArray = function(idArray) {
	if (idArray.length > 1) {
		$.jstree._reference("#tree" + window.adb.Gruppe).open_node($("#"+idArray[0]), function() {
			idArray.splice(0,1);
			window.adb.oeffneNodeNachIdArray(idArray);
		}, false);
	} else if (idArray.length === 1) {
		$.jstree._reference("#tree" + window.adb.Gruppe).select_node($("#"+idArray[0]),function() {}, true);
	}
};

window.adb.initiiere_art = function(id) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(art) {
			var htmlArt,
				Datensammlungen = art.Datensammlungen,
				Beziehungssammlungen = [],
				taxonomischeBeziehungssammlungen = [],
				len,
				guidsVonSynonymen = [],
				DatensammlungenVonSynonymen = [],
				BeziehungssammlungenVonSynonymen = [],
				a, f, h, i, k, x,
				dsNamen = [],
				bezNamen = [];
			// panel beginnen
			htmlArt = '<h4>Taxonomie:</h4>';
			// zuerst alle Datensammlungen auflisten, damit danach sortiert werden kann
			// gleichzeitig die Taxonomie suchen und gleich erstellen lassen
			htmlArt += window.adb.erstelleHtmlFürDatensammlung("Taxonomie", art, art.Taxonomie);
			// Datensammlungen muss nicht gepusht werden
			// aber Beziehungssammlungen aufteilen
			if (art.Beziehungssammlungen.length > 0) {
                _.each(art.Beziehungssammlungen, function(beziehungssammlung) {
                    if (typeof beziehungssammlung.Typ === "undefined") {
                        Beziehungssammlungen.push(beziehungssammlung);
                        // bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
                        bezNamen.push(beziehungssammlung.Name);
                    } else if (beziehungssammlung.Typ === "taxonomisch") {
                        taxonomischeBeziehungssammlungen.push(beziehungssammlung);
                        // bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
                        bezNamen.push(beziehungssammlung.Name);
                    }
                });
			}
			// taxonomische Beziehungen in gewollter Reihenfolge hinzufügen
			if (taxonomischeBeziehungssammlungen.length > 0) {
				// Titel hinzufügen, falls Datensammlungen existieren
				htmlArt += "<h4>Taxonomische Beziehungen:</h4>";
                _.each(taxonomischeBeziehungssammlungen, function(beziehungssammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    htmlArt += window.adb.erstelleHtmlFürBeziehung(art, beziehungssammlung, "");
                    if (beziehungssammlung["Art der Beziehungen"] && beziehungssammlung["Art der Beziehungen"] === "synonym" && beziehungssammlung.Beziehungen) {
                        _.each(beziehungssammlung.Beziehungen, function(beziehung) {
                            if (beziehung.Beziehungspartner) {
                                _.each(beziehung.Beziehungspartner, function(beziehungspartner) {
                                    if (beziehungspartner.GUID) {
                                        guidsVonSynonymen.push(beziehungspartner.GUID);
                                    }
                                });
                            }
                        });
                    }
                });
			}
			// Datensammlungen in gewollter Reihenfolge hinzufügen
			if (Datensammlungen.length > 0) {
				// Datensammlungen nach Name sortieren
				/*ausgeschaltet, um Tempo zu gewinnen, Daten sind eh sortiert
				Datensammlungen = window.adb.sortiereObjektarrayNachName(Datensammlungen);*/
				// Titel hinzufügen
				htmlArt += "<h4>Eigenschaften:</h4>";
                _.each(Datensammlungen, function(datensammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    htmlArt += window.adb.erstelleHtmlFürDatensammlung("Datensammlung", art, datensammlung);
                    // dsNamen auflisten, um später zu vergleichen, ob sie schon dargestellt wird
                    dsNamen.push(datensammlung.Name);
                });
			}
			// Beziehungen hinzufügen
			if (Beziehungssammlungen.length > 0) {
				// Titel hinzufügen
				htmlArt += "<h4>Beziehungen:</h4>";
                _.each(Beziehungssammlungen, function(beziehungssammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    htmlArt += window.adb.erstelleHtmlFürBeziehung(art, beziehungssammlung, "");
                });
			}
			// Beziehungssammlungen von synonymen Arten
			if (guidsVonSynonymen.length > 0) {
				$db = $.couch.db("artendb");
				$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidsVonSynonymen)) + '&include_docs=true', {
					success: function(data) {
						var synonymeArt;
                        _.each(data.rows, function(data_row) {
                            synonymeArt = data_row.doc;
                            if (synonymeArt.Datensammlungen && synonymeArt.Datensammlungen.length > 0) {
                                _.each(synonymeArt.Datensammlungen, function(datensammlungen) {
                                    if (dsNamen.indexOf(datensammlungen.Name) === -1) {
                                        // diese Datensammlung wird noch nicht dargestellt
                                        DatensammlungenVonSynonymen.push(datensammlungen);
                                        // auch in dsNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
                                        dsNamen.push(datensammlungen.Name);
                                        // auch in Datensammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
                                        Datensammlungen.push(datensammlungen);
                                    }
                                });
                            }
                            if (synonymeArt.Beziehungssammlungen && synonymeArt.Beziehungssammlungen.length > 0) {
                                _.each(synonymeArt.Beziehungssammlungen, function(beziehungssammlung) {
                                    if (bezNamen.indexOf(beziehungssammlung.Name) === -1 && beziehungssammlung["Art der Beziehungen"] !== "synonym" && beziehungssammlung.Typ !== "taxonomisch") {
                                        // diese Beziehungssammlung wird noch nicht dargestellt
                                        // und sie ist nicht taxonomisch
                                        BeziehungssammlungenVonSynonymen.push(beziehungssammlung);
                                        // auch in bezNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
                                        bezNamen.push(beziehungssammlung.Name);
                                        // auch in Beziehungssammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
                                        Beziehungssammlungen.push(beziehungssammlung);
                                    } else if (beziehungssammlung["Art der Beziehungen"] !== "synonym" && beziehungssammlung.Typ !== "taxonomisch") {
                                        // diese Beziehungssammlung wird schon dargestellt
                                        // kann aber sein, dass beim Synonym Beziehungen existieren, welche noch nicht dargestellt werden
                                        var BsDerSynonymenArt = beziehungssammlung,
                                            BsDerOriginalart = _.find(art.Beziehungssammlungen, function(beziehungssammlung) {
                                                return beziehungssammlung.Name === BsDerSynonymenArt.Name;
                                            });

                                        if (BsDerSynonymenArt.Beziehungen && BsDerSynonymenArt.Beziehungen.length > 0 && BsDerOriginalart && BsDerOriginalart.Beziehungen && BsDerOriginalart.Beziehungen.length > 0) {
                                            // Beide Arten haben in derselben Beziehungssammlung Beziehungen
                                            // in der Originalart vorhandene Beziehungen aus dem Synonym entfernen
                                            BsDerSynonymenArt.Beziehungen = _.reject(BsDerSynonymenArt.Beziehungen, function(beziehung_des_synonyms) {
                                                // suche in Beziehungen der Originalart eine mit denselben Beziehungspartnern
                                                var beziehung_der_originalart = _.find(BsDerOriginalart.Beziehungen, function(beziehung_origart) {
                                                    //return _.isEqual(beziehung_des_synonyms, beziehung_origart);  Wieso funktioniert das nicht?
                                                    if (beziehung_des_synonyms.Beziehungspartner.length > 0 && beziehung_origart.Beziehungspartner.length > 0) {
                                                        return beziehung_des_synonyms.Beziehungspartner[0].GUID === beziehung_origart.Beziehungspartner[0].GUID;
                                                    } else {
                                                        return false;
                                                    }
                                                });
                                                return !!beziehung_der_originalart;
                                            });
                                        }
                                        if (BsDerSynonymenArt.Beziehungen.length > 0) {
                                            // falls noch darzustellende Beziehungen verbleiben, die DS pushen
                                            BeziehungssammlungenVonSynonymen.push(BsDerSynonymenArt);
                                        }
                                    }
                                });
                            }
                        });
						// BS von Synonymen darstellen
						if (DatensammlungenVonSynonymen.length > 0) {
							// DatensammlungenVonSynonymen nach Name sortieren
							DatensammlungenVonSynonymen = window.adb.sortiereObjektarrayNachName(DatensammlungenVonSynonymen);
							// Titel hinzufügen
							htmlArt += "<h4>Eigenschaften von Synonymen:</h4>";
                            _.each(DatensammlungenVonSynonymen, function(datesammlung) {
                                // HTML für Datensammlung erstellen lassen und hinzufügen
                                htmlArt += window.adb.erstelleHtmlFürDatensammlung("Datensammlung", art, datesammlung);
                            });
						}
						// bez von Synonymen darstellen
						if (BeziehungssammlungenVonSynonymen.length > 0) {
							// BeziehungssammlungenVonSynonymen sortieren
							BeziehungssammlungenVonSynonymen = window.adb.sortiereObjektarrayNachName(BeziehungssammlungenVonSynonymen);
							// Titel hinzufügen
							htmlArt += "<h4>Beziehungen von Synonymen:</h4>";
                            _.each(BeziehungssammlungenVonSynonymen, function(beziehungssammlung) {
                                // HTML für Beziehung erstellen lassen und hinzufügen. Dritten Parameter mitgeben, damit die DS in der UI nicht gleich heisst
                                htmlArt += window.adb.erstelleHtmlFürBeziehung(art, beziehungssammlung, "2");
                            });
						}
						window.adb.initiiere_art_2(htmlArt, art, Datensammlungen, DatensammlungenVonSynonymen, Beziehungssammlungen, taxonomischeBeziehungssammlungen, BeziehungssammlungenVonSynonymen);
					}
				});
			} else {
				window.adb.initiiere_art_2(htmlArt, art, Datensammlungen, DatensammlungenVonSynonymen, Beziehungssammlungen, taxonomischeBeziehungssammlungen, BeziehungssammlungenVonSynonymen);
			}
		},
		error: function() {
			//melde("Fehler: Art konnte nicht geöffnet werden");
		}
	});
};

window.adb.initiiere_art_2 = function(htmlArt, art, Datensammlungen, DatensammlungenVonSynonymen, Beziehungssammlungen, taxonomischeBeziehungssammlungen, BeziehungssammlungenVonSynonymen) {
	// panel beenden
	$("#art_inhalt").html(htmlArt);
	// richtiges Formular anzeigen
	window.adb.zeigeFormular("art");
	// Anmeldung soll nur kurzfristig sichtbar sein, wenn eine Anmeldung erfolgen soll
	$("#art_anmelden").hide();
	// Wenn nur eine Datensammlung (die Taxonomie) existiert, diese öffnen
	if (art.Datensammlungen.length === 0 && art.Beziehungssammlungen.length === 0) {
		$('.panel-collapse.Taxonomie').each(function() {
			$(this).collapse('show');
		});
	}
	// jetzt die Links im Menu setzen
	// TODO: unklar, wieso dies nochmals nötig ist, da von zeigeFormular schon gemacht
	window.adb.setzteLinksZuBilderUndWikipedia(art);
	// und die URL anpassen
	history.pushState(null, null, "index.html?id=" + art._id);
};

// erstellt die HTML für eine Beziehung
// benötigt von der art bzw. den lr die entsprechende JSON-Methode art_i und ihren Namen
// altName ist für Beziehungssammlungen von Synonymen: Hier kann dieselbe DS zwei mal vorkommen und sollte nicht gleich heissen, sonst geht nur die erste auf
window.adb.erstelleHtmlFürBeziehung = function(art, art_i, altName) {
	var html,
		Name,
		art_i_name = window.adb.ersetzeUngültigeZeichenInIdNamen(art_i.Name) + altName;

	// Accordion-Gruppe und -heading anfügen
	html = '<div class="panel panel-default"><div class="panel-heading panel-heading-gradient"><h4 class="panel-title">';
	// die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
	html += '<a class="Datensammlung accordion-toggle" data-toggle="collapse" data-parent="#panel_art" href="#collapse' + art_i_name + '">';
	// Titel für die Datensammlung einfügen
	html += art_i.Name + " (" + art_i.Beziehungen.length + ")";
	// header abschliessen
	html += '</a></h4></div>';
	// body beginnen
	html += '<div id="collapse' + art_i_name + '" class="panel-collapse collapse"><div class="panel-body">';

	// Datensammlung beschreiben
	html += '<div class="Datensammlung BeschreibungDatensammlung">';
	if (art_i.Beschreibung) {
		html += art_i.Beschreibung;
	}
	if (art_i.Datenstand) {
		html += '. Stand: ';
		html += art_i.Datenstand;
	}
	if (art_i.Link) {
		html += '. <a href="';
		html += art_i.Link;
		html += '">';
		html += art_i.Link;
		html += '</a>';
	}
	if (art_i.zusammenfassend && art_i.Ursprungsdatensammlung) {
		html += '<br>Diese Beziehungssammlung fasst die Daten mehrerer Ursprungs-Beziehungssammlungen in einer zusammen. Die angezeigten Informationen stammen aus der Ursprungs-Beziehungssammlung "' + art_i.Ursprungsdatensammlung + '".';
	} else if (art_i.zusammenfassend && !art_i.Ursprungsdatensammlung) {
		html += '<br>Diese Beziehungssammlung fasst die Daten mehrerer Ursprungs-Beziehungssammlungen in einer zusammen. Bei den angezeigten Informationen ist die Ursprungs-Beziehungssammlung leider nicht beschrieben.';
	}
	// Beschreibung der Datensammlung abschliessen
	html += '</div>';

	// die Beziehungen sortieren
	art_i.Beziehungen = window.adb.sortiereBeziehungenNachName(art_i.Beziehungen);

	// jetzt für alle Beziehungen die Felder hinzufügen
    _.each(art_i.Beziehungen, function(beziehung, index) {
        if (beziehung.Beziehungspartner && beziehung.Beziehungspartner.length > 0) {
            for (var y in beziehung.Beziehungspartner) {
                //if (beziehung.Beziehungspartner[y].Gruppe === "Lebensräume") {
                if (beziehung.Beziehungspartner[y].Taxonomie) {
                    Name = beziehung.Beziehungspartner[y].Gruppe + ": " + beziehung.Beziehungspartner[y].Taxonomie + " > " + beziehung.Beziehungspartner[y].Name;
                } else {
                    Name = beziehung.Beziehungspartner[y].Gruppe + ": " + beziehung.Beziehungspartner[y].Name;
                }
                // Partner darstellen
                if (beziehung.Beziehungspartner[y].Rolle) {
                    // Feld soll mit der Rolle beschriftet werden
                    html += window.adb.generiereHtmlFuerObjektlink(beziehung.Beziehungspartner[y].Rolle, Name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + beziehung.Beziehungspartner[y].GUID);
                } else {
                    html += window.adb.generiereHtmlFuerObjektlink("Beziehungspartner", Name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + beziehung.Beziehungspartner[y].GUID);
                }
            }
        }
        // Die Felder anzeigen
        _.each(beziehung, function(feldwert, feldname) {
            if (feldname !== "Beziehungspartner") {
                html += window.adb.erstelleHtmlFuerFeld(feldname, feldwert, "Beziehungssammlung", art_i.Name.replace(/"/g, "'"));
            }
        });
        // Am Schluss eine Linie, nicht aber bei der letzten Beziehung
        if (index < (art_i.Beziehungen.length-1)) {
            html += "<hr>";
        }
    });
	// body und Accordion-Gruppe abschliessen
	html += '</div></div></div>';
	return html;
};

// erstellt die HTML für eine Datensammlung
// benötigt von der art bzw. den lr die entsprechende JSON-Methode art_i und ihren Namen
window.adb.erstelleHtmlFürDatensammlung = function(dsTyp, art, art_i) {
	var htmlDatensammlung,
		hierarchie_string,
		array_string,
		art_i_name;
	art_i_name = window.adb.ersetzeUngültigeZeichenInIdNamen(art_i.Name);
	// Accordion-Gruppe und -heading anfügen
	htmlDatensammlung = '<div class="panel panel-default"><div class="panel-heading panel-heading-gradient">';
	// bei LR: Symbolleiste einfügen
	if (art.Gruppe === "Lebensräume" && dsTyp === "Taxonomie") {
		htmlDatensammlung += '<div class="btn-toolbar bearb_toolbar"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default lr_bearb lr_bearb_bearb" data-toggle="tooltip" title="bearbeiten"><i class="glyphicon glyphicon-pencil"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_schuetzen disabled" title="schützen"><i class="glyphicon glyphicon-ban-circle"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_neu disabled" title="neuer Lebensraum"><i class="glyphicon glyphicon-plus"></i></button><button type="button" data-toggle="modal" data-target="#rueckfrage_lr_loeschen" class="btn btn-default lr_bearb lr_bearb_loeschen disabled" title="Lebensraum löschen"><i class="glyphicon glyphicon-trash"></i></button></div></div>';
	}
	// die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
	htmlDatensammlung += '<h4 class="panel-title"><a class="Datensammlung accordion-toggle" data-toggle="collapse" data-parent="#panel_art" href="#collapse' + art_i_name + '">';
	// Titel für die Datensammlung einfügen
	htmlDatensammlung += art_i.Name;
	// header abschliessen
	htmlDatensammlung += '</a></h4></div>';
	// body beginnen
	htmlDatensammlung += '<div id="collapse' + art_i_name + '" class="panel-collapse collapse ' + art.Gruppe + ' ' + dsTyp + '"><div class="panel-body">';
	// Datensammlung beschreiben
	htmlDatensammlung += '<div class="Datensammlung BeschreibungDatensammlung">';
	if (art_i.Beschreibung) {
		htmlDatensammlung += art_i.Beschreibung;
	}
	if (art_i.Datenstand) {
		htmlDatensammlung += '. Stand: ';
		htmlDatensammlung += art_i.Datenstand;
	}
	if (art_i.Link) {
		htmlDatensammlung += '. <a href="';
		htmlDatensammlung += art_i.Link;
		htmlDatensammlung += '">';
		htmlDatensammlung += art_i.Link;
		htmlDatensammlung += '</a>';
	}
	if (art_i.zusammenfassend && art_i.Ursprungsdatensammlung) {
		htmlDatensammlung += '<br>Diese Datensammlung fasst die Daten mehrerer Ursprungs-Datensammlungen in einer zusammen. Die angezeigten Informationen stammen aus der Ursprungs-Datensammlung "' + art_i.Ursprungsdatensammlung + '"';
	} else if (art_i.zusammenfassend && !art_i.Ursprungsdatensammlung) {
		htmlDatensammlung += '<br>Diese Datensammlung fasst die Daten mehrerer Ursprungs-Datensammlungen in einer zusammen. Bei den angezeigten Informationen ist die Ursprungs-Datensammlung leider nicht beschrieben';
	}
	// Beschreibung der Datensammlung abschliessen
	htmlDatensammlung += '</div>';
	// Felder anzeigen
	// zuerst die GUID, aber nur bei der Taxonomie
	if (dsTyp === "Taxonomie") {
		htmlDatensammlung += window.adb.erstelleHtmlFuerFeld("GUID", art._id, dsTyp, "Taxonomie");
	}
	for (var y in art_i.Daten) {
		if (y === "GUID") {
			// dieses Feld nicht anzeigen. Es wird _id verwendet
			// dieses Feld wird künftig nicht mehr importiert
		} else if (((y === "Offizielle Art" || y === "Eingeschlossen in" || y === "Synonym von") && art.Gruppe === "Flora") || (y === "Akzeptierte Referenz" && art.Gruppe === "Moose")) {
			// dann den Link aufbauen lassen
			htmlDatensammlung += window.adb.generiereHtmlFuerLinkZuGleicherGruppe(y, art._id, art_i.Daten[y].Name);
		} else if ((y === "Gültige Namen" || y === "Eingeschlossene Arten" || y === "Synonyme") && art.Gruppe === "Flora") {
			// das ist ein Array von Objekten
			htmlDatensammlung += window.adb.generiereHtmlFuerLinksZuGleicherGruppe(y, art_i.Daten[y]);
		} else if ((y === "Artname" && art.Gruppe === "Flora") || (y === "Parent" && art.Gruppe === "Lebensräume")) {
			// dieses Feld nicht anzeigen
		} else if (y === "Hierarchie" && art.Gruppe === "Lebensräume" && _.isArray(art_i.Daten[y])) {
			// Namen kommagetrennt anzeigen
			hierarchie_string = window.adb.erstelleHierarchieFuerFeldAusHierarchieobjekteArray(art_i.Daten[y]);
			htmlDatensammlung += window.adb.generiereHtmlFuerTextarea(y, hierarchie_string, dsTyp, art_i.Name.replace(/"/g, "'"));
		} else if (_.isArray(art_i.Daten[y])) {
			// dieses Feld enthält einen Array von Werten
			array_string = art_i.Daten[y].toString();
			htmlDatensammlung += window.adb.generiereHtmlFuerTextarea(y, array_string, dsTyp, art_i.Name.replace(/"/g, "'"));
		} else {
			htmlDatensammlung += window.adb.erstelleHtmlFuerFeld(y, art_i.Daten[y], dsTyp, art_i.Name.replace(/"/g, "'"));
		}
	}
	// body und Accordion-Gruppe abschliessen
	htmlDatensammlung += '</div></div></div>';
	return htmlDatensammlung;
};

window.adb.erstelleHierarchieFuerFeldAusHierarchieobjekteArray = function(hierarchie_array) {
	if (!_.isArray(hierarchie_array)) {
		return "";
	}
	// Namen kommagetrennt anzeigen
	var hierarchie_string = "";
	for (var g=0; g<hierarchie_array.length; g++) {
		if (g > 0) {
			hierarchie_string += "\n";
		}
		hierarchie_string += hierarchie_array[g].Name;
	}
	return hierarchie_string;
};

// übernimmt Feldname und Feldwert
// generiert daraus und retourniert html für die Darstellung im passenden Feld
window.adb.erstelleHtmlFuerFeld = function(Feldname, Feldwert, dsTyp, dsName) {
	var htmlDatensammlung = "";
	if (typeof Feldwert === "string" && Feldwert.slice(0, 7) === "//") {
		// www-Links als Link darstellen
		htmlDatensammlung += window.adb.generiereHtmlFuerWwwlink(Feldname, Feldwert, dsTyp, dsName);
	} else if (typeof Feldwert === "string" && Feldwert.length < 45) {
		htmlDatensammlung += window.adb.generiereHtmlFuerTextinput(Feldname, Feldwert, "text", dsTyp, dsName);
	} else if (typeof Feldwert === "string" && Feldwert.length >= 45) {
		htmlDatensammlung += window.adb.generiereHtmlFuerTextarea(Feldname, Feldwert, dsTyp);
	} else if (typeof Feldwert === "number") {
		htmlDatensammlung += window.adb.generiereHtmlFuerTextinput(Feldname, Feldwert, "number", dsTyp, dsName);
	} else if (typeof Feldwert === "boolean") {
		htmlDatensammlung += window.adb.generiereHtmlFuerBoolean(Feldname, Feldwert, dsTyp, dsName);
	} else {
		htmlDatensammlung += window.adb.generiereHtmlFuerTextinput(Feldname, Feldwert, "text", dsTyp, dsName);
	}
	return htmlDatensammlung;
};

// managt die Links zu Google Bilder und Wikipedia
// erwartet das Objekt mit der Art
window.adb.setzteLinksZuBilderUndWikipedia = function(art) {
	// jetzt die Links im Menu setzen
	if (art) {
		var googleBilderLink = "";
		var wikipediaLink = "";
		switch (art.Gruppe) {
		case "Flora":
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Artname + '"';
			if (art.Taxonomie.Daten['Name Deutsch']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Deutsch'] + '"';
			}
			if (art.Taxonomie.Daten['Name Französisch']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Französisch'] + '"';
			}
			if (art.Taxonomie.Daten['Name Italienisch']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Italienisch'] + '"';
			}
			if (art.Taxonomie.Daten['Name Deutsch']) {
				wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Daten['Name Deutsch'];
			} else {
				wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Artname;
			}
			break;
		case "Fauna":
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Artname + '"';
			if (art.Taxonomie.Daten["Name Deutsch"]) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Deutsch'] + '"';
			}
			if (art.Taxonomie.Daten['Name Französisch']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Französisch'] + '"';
			}
			if (art.Taxonomie.Daten['Name Italienisch']) {
				googleBilderLink += '+OR"' + art.Taxonomie.Daten['Name Italienisch'] + '"';
			}
			wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Gattung + '_' + art.Taxonomie.Daten.Art;
			break;
		case 'Moose':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Gattung + ' ' + art.Taxonomie.Daten.Art + '"';
			wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Gattung + '_' + art.Taxonomie.Daten.Art;
			break;
		case 'Macromycetes':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Name + '"';
			if (art.Taxonomie.Daten['Name Deutsch']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Deutsch'] + '"';
			}
			wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Name;
			break;
		case 'Lebensräume':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Einheit;
			wikipediaLink = '//de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Einheit;
			break;
		}
		// mit replace Hochkommata ' ersetzen, sonst klappt url nicht
		$("#GoogleBilderLink").attr("href", encodeURI(googleBilderLink).replace("&#39;", "%20"));
		$("#GoogleBilderLink_li").removeClass("disabled");
		$("#WikipediaLink").attr("href", wikipediaLink);
		$("#WikipediaLink_li").removeClass("disabled");
	} else {
		$("#WikipediaLink").attr("href", "#");
		$("#WikipediaLink_li").addClass("disabled");
		$("#GoogleBilderLink").attr("href", "#");
		$("#GoogleBilderLink_li").addClass("disabled");
	}
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFuerLinkZuGleicherGruppe = function(FeldName, id, Artname) {
	var HtmlContainer;
	HtmlContainer = '<div class="form-group"><label class="control-label">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><p class="form-control-static controls feldtext"><a href="#" class="LinkZuArtGleicherGruppe" ArtId="';
	HtmlContainer += id;
	HtmlContainer += '">';
	HtmlContainer += Artname;
	HtmlContainer += '</a></p></div>';
	return HtmlContainer;
};

// generiert den html-Inhalt für Serien von Links in Flora
window.adb.generiereHtmlFuerLinksZuGleicherGruppe = function(FeldName, Objektliste) {
	var HtmlContainer;
	HtmlContainer = '<div class="form-group"><label class="control-label">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><span class="feldtext controls">';
	for (var a in Objektliste) {
		if (a > 0) {
			HtmlContainer += ', ';
		}
		HtmlContainer += '<p class="form-control-static controls"><a href="#" class="LinkZuArtGleicherGruppe" ArtId="';
		HtmlContainer += Objektliste[a].GUID;
		HtmlContainer += '">';
		HtmlContainer += Objektliste[a].Name;
		HtmlContainer += '</a></p>';
	}
	HtmlContainer += '</span></div>';
	return HtmlContainer;
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFuerWwwlink = function(FeldName, FeldWert, dsTyp, dsName) {
	var HtmlContainer;
	HtmlContainer = '<div class="form-group">\n\t<label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label>\n\t';
	// jetzt Link beginnen, damit das Feld klickbar wird
	HtmlContainer += '<p><a href="';
	HtmlContainer += FeldWert;
	HtmlContainer += '"><input class="controls form-control input-sm" dsTyp="'+dsTyp+'" dsName="'+dsName+'" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '" type="text" value="';
	HtmlContainer += FeldWert;
	HtmlContainer += '" readonly="readonly" style="cursor:pointer;">';
	// Link abschliessen
	HtmlContainer += '</a></p>';
	HtmlContainer += '\n</div>';
	return HtmlContainer;
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFuerObjektlink = function(FeldName, FeldWert, Url) {
	var HtmlContainer;
	HtmlContainer = '<div class="form-group"><label class="control-label">';
	HtmlContainer += FeldName;
	HtmlContainer += ':';
	HtmlContainer += '</label>';
	HtmlContainer += '<p class="form-control-static feldtext controls"><a href="';
	HtmlContainer += Url;
	HtmlContainer += '" target="_blank">';
	HtmlContainer += FeldWert;
	HtmlContainer += '</a></p></div>';
	return HtmlContainer;
};

// generiert den html-Inhalt für Textinputs
window.adb.generiereHtmlFuerTextinput = function(FeldName, FeldWert, InputTyp, dsTyp, dsName) {
	var HtmlContainer;
	HtmlContainer = '<div class="form-group">\n\t<label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label>\n\t<input class="controls form-control input-sm" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '" type="';
	HtmlContainer += InputTyp;
	HtmlContainer += '" value="';
	HtmlContainer += FeldWert;
	HtmlContainer += '" readonly="readonly" dsTyp="'+dsTyp+'" dsName="'+dsName+'">\n</div>';
	return HtmlContainer;
};

// generiert den html-Inhalt für Textarea
window.adb.generiereHtmlFuerTextarea = function(FeldName, FeldWert, dsTyp, dsName) {
	var HtmlContainer;
	HtmlContainer = '<div class="form-group"><label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><textarea class="controls form-control" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '" readonly="readonly" dsTyp="'+dsTyp+'" dsName="'+dsName+'">';
	HtmlContainer += FeldWert;
	HtmlContainer += '</textarea></div>';
	return HtmlContainer;
};

// generiert den html-Inhalt für ja/nein-Felder
window.adb.generiereHtmlFuerBoolean = function(FeldName, FeldWert, dsTyp, dsName) {
	var HtmlContainer;
	HtmlContainer = '<div class="form-group"><label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><input type="checkbox" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '"';
	if (FeldWert === true) {
		HtmlContainer += ' checked="true"';
	}
	HtmlContainer += '" readonly="readonly" disabled="disabled" dsTyp="'+dsTyp+'" dsName="'+dsName+'"></div>';
	return HtmlContainer;
};

// begrenzt die maximale Höhe des Baums auf die Seitenhöhe, wenn nötig
window.adb.setzeTreehoehe = function() {
	var windowHeight = $(window).height();
	if ($(window).width() > 1000 && !$("body").hasClass("force-mobile")) {
		$(".baum").css("max-height", windowHeight - 161);
	} else {
		// Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
		$(".baum").css("max-height", windowHeight - 252);
	}
};

// setzt die Höhe von textareas so, dass der Text genau rein passt
window.adb.FitToContent = function(id, maxHeight) {
	var text = id && id.style ? id : document.getElementById(id);
	maxHeight = maxHeight || document.documentElement.clientHeight;
	if (!text) {
		return;
	}

	/* Accounts for rows being deleted, pixel value may need adjusting */
	if (text.clientHeight == text.scrollHeight) {
		text.style.height = "30px";
	}

	var adjustedHeight = text.clientHeight;
	if (!maxHeight || maxHeight > adjustedHeight) {
		adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
	}
	if (maxHeight) {
		adjustedHeight = Math.min(maxHeight, adjustedHeight);
	}
	if (adjustedHeight > text.clientHeight) {
		text.style.height = adjustedHeight + "px";
	}
};

// managed die Sichtbarkeit von Formularen
// wird von allen initiiere_-Funktionen verwendet
// wird ein Formularname übergeben, wird dieses Formular gezeigt
// und alle anderen ausgeblendet
// zusätzlich wird die Höhe von textinput-Feldern an den Textinhalt angepasst
window.adb.zeigeFormular = function(Formularname) {
	var formular_angezeigt = $.Deferred(),
        $form = $('form');
	// zuerst alle Formulare ausblenden
	$("#forms").hide();
    $form.each(function() {
		$(this).hide();
	});

	if (Formularname) {
		if (Formularname !== "art") {
			// Spuren des letzten Objekts entfernen
			// IE8 kann nicht deleten
			try {
				delete localStorage.art_id;
			}
			catch (e) {
				localStorage.art_id = undefined;
			}
			// URL anpassen, damit kein Objekt angezeigt wird
			// TODO: DIESER BEFEHL LÖST IN IE11 EINFÜGEN VON :/// AUS!!!!
			history.pushState(null, null, "index.html");
			// alle Bäume ausblenden, suchfeld, Baumtitel
			$(".suchen").hide();
			$(".baum").css("display", "none");
			$(".treeBeschriftung").css("display", "none");
			// Gruppe Schaltfläche deaktivieren
			$('#Gruppe').find('.active').removeClass('active');
		}
		$form.each(function() {
			var that = $(this);
			if (that.attr("id") === Formularname) {
				$("#forms").show();
				that.show();
			}
		});
		$(window).scrollTop(0);
		// jetzt die Links im Menu (de)aktivieren
		window.adb.setzteLinksZuBilderUndWikipedia();
		formular_angezeigt.resolve();
	}
	return formular_angezeigt.promise();
};

// kontrollieren, ob die erforderlichen Felder etwas enthalten
// wenn ja wird true retourniert, sonst false
window.adb.validiereSignup = function(woher) {
	var Email, Passwort, Passwort2;
	// zunächst alle Hinweise ausblenden (falls einer von einer früheren Prüfung her noch eingeblendet wäre)
	$(".hinweis").css("display", "none");
	// erfasste Werte holen
	Email = $("#Email_"+woher).val();
	Passwort = $("#Passwort_"+woher).val();
	Passwort2 = $("#Passwort2_"+woher).val();
	// prüfen
	if (!Email) {
		$("#Emailhinweis_"+woher).css("display", "block");
		setTimeout(function() {
			$("#Email_"+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (!Passwort) {
		$("#Passworthinweis_"+woher).css("display", "block");
		setTimeout(function() {
			$("#Passwort_"+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (!Passwort2) {
		$("#Passwort2hinweis_"+woher).css("display", "block");
		setTimeout(function() {
			$("#Passwort2_"+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (Passwort !== Passwort2) {
		$("#Passwort2hinweisFalsch_"+woher).css("display", "block");
		setTimeout(function() {
			$("#Passwort2_"+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		return false;
	}
	return true;
};

window.adb.erstelleKonto = function(woher) {
	// User in _user eintragen
	$.couch.signup({
		name: $('#Email_'+woher).val()
	},
	$('#Passwort_'+woher).val(), {
		success : function() {
			localStorage.Email = $('#Email_'+woher).val();
			if (woher === "art") {
				window.adb.bearbeiteLrTaxonomie();
			}
			window.adb.passeUiFuerAngemeldetenUserAn(woher);
			// Werte aus Feldern entfernen
			$("#Email_"+woher).val("");
			$("#Passwort_"+woher).val("");
			$("#Passwort2_"+woher).val("");
		},
		error : function() {
			var praefix = "importieren_";
			if (woher === "art") {
				praefix = "";
			}
			$("#"+praefix+woher+"_anmelden_fehler_text").html("Fehler: Das Konto wurde nicht erstellt");
			$("#"+praefix+woher+"_anmelden_fehler")
                .alert()
                .css("display", "block");
		}
	});
};

window.adb.meldeUserAn = function(woher) {
	var Email = $('#Email_'+woher).val(),
		Passwort = $('#Passwort_'+woher).val();
	if (window.adb.validiereUserAnmeldung(woher)) {
		$.couch.login({
			name : Email,
			password : Passwort,
			success : function(r) {
				localStorage.Email = $('#Email_'+woher).val();
				if (woher === "art") {
					window.adb.bearbeiteLrTaxonomie();
				}
				window.adb.passeUiFuerAngemeldetenUserAn(woher);
				// Werte aus Feldern entfernen
				$("#Email_"+woher).val("");
				$("#Passwort_"+woher).val("");
				$("#art_anmelden").show();
				// admin-Funktionen
				if (r.roles.indexOf("_admin") !== -1) {
					// das ist ein admin
					console.log("hallo admin");
					localStorage.admin = true;
				} else {
					delete localStorage.admin;
				}
				window.adb.blendeMenus();
			},
			error: function() {
				var praefix = "importieren_";
				if (woher === "art") {
					praefix = "";
				}
				// zuerst allfällige bestehende Hinweise ausblenden
				$(".hinweis").css("display", "none");
				$("#"+praefix+woher+"_anmelden_fehler_text")
                    .html("Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?")
                    .alert()
				    .css("display", "block");
			}
		});
	}
};

window.adb.blendeMenus = function() {
	if (localStorage.admin) {
		$("#menu_btn").find(".admin").show();
	} else {
		$("#menu_btn").find(".admin").hide();
	}
};

window.adb.meldeUserAb = function() {
	// IE8 kann nicht deleten
	try {
		delete localStorage.Email;
	}
	catch (e) {
		localStorage.Email = undefined;
	}
	$(".art_anmelden_titel").text("Anmelden");
	$(".importieren_anmelden_titel").text("1. Anmelden");
	$(".alert").css("display", "none");
	$(".hinweis").css("display", "none");
	$(".well.anmelden").show();
	$(".Email").show();
	$(".Passwort").show();
	$(".anmelden_btn").show();
	$(".abmelden_btn").hide();
	// ausschalten, soll später bei Organisation möglich werden
	// $(".konto_erstellen_btn").show();
	$(".konto_speichern_btn").hide();
	$("#art_anmelden").hide();
	window.adb.schuetzeLrTaxonomie();
};

window.adb.passeUiFuerAngemeldetenUserAn = function(woher) {
	var praefix = "importieren_";
	if (woher === "art") {
		praefix = "";
	}
	$("#art_anmelden_titel").text(localStorage.Email + " ist angemeldet");
	$(".importieren_anmelden_titel").text("1. " + localStorage.Email + " ist angemeldet");
	if (woher !== "art") {
		$("#"+praefix+woher+"_anmelden_collapse").collapse('hide');
		$("#importieren_"+woher+"_ds_beschreiben_collapse").collapse('show');
	}
	$(".alert").css("display", "none");
	$(".hinweis").css("display", "none");
	$(".well.anmelden").hide();
	$(".Email").hide();
	$(".Passwort").hide();
	$(".anmelden_btn").hide();
	$(".abmelden_btn").show();
	$(".konto_erstellen_btn").hide();
	$(".konto_speichern_btn").hide();
	// in LR soll Anmelde-Accordion nicht sichtbar sein
	$("#art_anmelden").hide();
};

// prüft, ob der Benutzer angemeldet ist
// ja: retourniert true
// nein: retourniert false und öffnet die Anmeldung
// welche anmeldung hängt ab, woher die Prüfung angefordert wurde
// darum erwartet die Funktion den parameter woher
window.adb.pruefeAnmeldung = function(woher) {
	if (!localStorage.Email) {
		setTimeout(function() {
			window.adb.zurueckZurAnmeldung(woher);
		}, 600);
		return false;
	}
	return true;
};

window.adb.zurueckZurAnmeldung = function(woher) {
	var praefix = "importieren_";

	// Bei LR muss der Anmeldungsabschnitt eingeblendet werden
	if (woher === "art") {
		praefix = "";
		$("#art_anmelden").show();
	}

	// Mitteilen, dass Anmeldung nötig ist
	$("#"+praefix+woher+"_anmelden_hinweis")
        .alert()
        .css("display", "block");
	$("#"+praefix+woher+"_anmelden_hinweis_text").html("Um Daten zu bearbeiten, müssen Sie angemeldet sein");
	$("#"+praefix+woher+"_anmelden_collapse").collapse('show');
	$(".anmelden_btn").show();
	$(".abmelden_btn").hide();
	// ausschalten, soll später bei Organisationen möglich werden
	//$(".konto_erstellen_btn").show();
	$(".konto_speichern_btn").hide();
	$("#Email_"+woher).focus();
};

window.adb.validiereUserAnmeldung = function(woher) {
	var Email = $('#Email_'+woher).val(),
		Passwort = $('#Passwort_'+woher).val();
	if (!Email) {
		setTimeout(function() {
			$('#Email_'+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		$("#Emailhinweis_"+woher).css("display", "block");
		return false;
	} else if (!Passwort) {
		setTimeout(function() {
			$('#Passwort_'+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		$("#Passworthinweis_"+woher).css("display", "block");
		return false;
	}
	return true;
};

// wenn BsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist
window.adb.handleBsNameChange = function() {
	var that = this,
		BsKey = _.find(window.adb.BsKeys, function(key) {
			return key[1] === that.value && key[3] !== localStorage.Email && !key[2];
		});
	if (BsKey) {
		$("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .css("display", "block");
		$("#importieren_bs_ds_beschreiben_hinweis_text2").html('Es existiert schon eine gleich heissende und nicht zusammenfassende Beziehungssammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
		setTimeout(function() {
			$("#importieren_bs_ds_beschreiben_hinweis2")
                .alert()
                .css("display", "none");
		}, 30000);
		$("#BsName")
            .val("")
		    .focus();
	} else {
		$("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .css("display", "none");
	}
};

// Wenn DsImportiertVon geändert wird
// kontrollieren, dass es die email der angemeldeten Person ist
window.adb.handleDsImportiertVonChange = function() {
	$("#DsImportiertVon").val(localStorage.Email);
	$("#importieren_ds_ds_beschreiben_hinweis_text2")
        .alert()
        .css("display", "block")
	    .html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
	setTimeout(function() {
		$("#importieren_ds_ds_beschreiben_hinweis_text2")
            .alert()
            .css("display", "none");
	}, 10000);
};

// Wenn BsImportiertVon geändert wird
// Kontrollieren, dass es die email der angemeldeten Person ist
window.adb.handleBsImportiertVonChange = function() {
	$("#BsImportiertVon").val(localStorage.Email);
	$("#importieren_bs_ds_beschreiben_hinweis2")
        .alert()
        .css("display", "block");
	$("#importieren_bs_ds_beschreiben_hinweis_text2").html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
	setTimeout(function() {
		$("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .css("display", "none");
	}, 10000);
};

// wenn BsZusammenfassend geändert wird
// BsUrsprungsBs_div zeigen oder verstecken
window.adb.handleBsZusammenfassendChange = function() {
	if ($(this).prop('checked')) {
		$("#BsUrsprungsBs_div").show();
	} else {
		$("#BsUrsprungsBs_div").hide();
	}
};

// wenn DsZusammenfassend geändert wird
// DsUrsprungsDs zeigen oder verstecken
window.adb.handleDsZusammenfassendChange = function() {
	if ($(this).prop('checked')) {
		$("#DsUrsprungsDs_div").show();
	} else {
		$("#DsUrsprungsDs_div").hide();
	}
};

// Wenn BsWaehlen geändert wird
window.adb.handleBsWaehlenChange = function() {
	var BsName = this.value,
		waehlbar = $("#"+this.id+" option:selected").attr("waehlbar"),
		i,
        x,
        $BsAnzDs = $("#BsAnzDs"),
        $BsAnzDs_label = $("#BsAnzDs_label"),
        $BsName = $("#BsName");
	if (waehlbar === "true") {
		// zuerst alle Felder leeren
		$('#importieren_bs_ds_beschreiben_collapse textarea, #importieren_bs_ds_beschreiben_collapse input').each(function() {
			$(this).val('');
		});
		$BsAnzDs.html("");
		$BsAnzDs_label.html("");
		if (BsName) {
			for (i in window.adb.bs_von_objekten.rows) {
				if (window.adb.bs_von_objekten.rows[i].key[1] === BsName) {
					$BsName.val(BsName);
					for (x in window.adb.bs_von_objekten.rows[i].key[4]) {
						if (x === "Ursprungsdatensammlung") {
							$("#BsUrsprungsBs").val(window.adb.bs_von_objekten.rows[i].key[4][x]);
						} else if (x !== "importiert von") {
							$("#Bs" + x).val(window.adb.bs_von_objekten.rows[i].key[4][x]);
						}
					}
					if (window.adb.bs_von_objekten.rows[i].key[2] === true) {
						$("#BsZusammenfassend").prop('checked', true);
						$("#BsUrsprungsBs_div").show();
					} else {
						// sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere BS gewählt wird
						$("#BsZusammenfassend").prop('checked', false);
						$("#BsUrsprungsBs_div").hide();
					}
					// wenn die ds/bs kein "importiert von" hat ist der Wert null
					// verhindern, dass null angezeigt wird
					if (window.adb.bs_von_objekten.rows[i].key[3]) {
						$("#BsImportiertVon").val(window.adb.bs_von_objekten.rows[i].key[3]);
					} else {
						$("#BsImportiertVon").val("");
					}
					$BsAnzDs_label.html("Anzahl Arten/Lebensräume");
					$BsAnzDs.html(window.adb.bs_von_objekten.rows[i].value);
					// dafür sorgen, dass textareas genug gross sind
					$('#importieren_bs').find('textarea').each(function() {
						window.adb.FitToContent(this, document.documentElement.clientHeight);
					});
					$BsName.focus();
				}
				// löschen-Schaltfläche einblenden
				$("#BsLoeschen").css("display", "block");
			}
		} else {
			// löschen-Schaltfläche ausblenden
			$("#BsLoeschen").css("display", "none");
		}
	} else {
		// melden, dass diese BS nicht bearbeitet werden kann
		$('#meldung_bs_nicht_bearbeitbar').modal();
	}
};

// wenn DsFile geändert wird
window.adb.handleDsFileChange = function() {
	// Check for the various File API support
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported
	} else {
		$("#meldung_individuell_label").html("Importieren nicht möglich");
		$("#meldung_individuell_text").html("Ihr Browser unterstützt diesen Vorgang leider nicht");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		//alert('Ihr Browser unterstützt diesen Vorgang leider nicht');
        $('html, body').animate({
            scrollTop: $("#importieren_ds_daten_uploaden_collapse").offset().top
        }, 2000);
		return;
	}
	var file = event.target.files[0],
		reader = new FileReader();
	if (typeof event.target.files[0] === "undefined") {
		// vorhandene Datei wurde entfernt
		$("#DsTabelleEigenschaften").css("display", "none");
		$("#importieren_ds_ids_identifizieren_fehler_text").css("display", "none");
		$("#importieren_ds_ids_identifizieren_erfolg_text").css("display", "none");
		$("#DsImportieren").css("display", "none");
		$("#DsEntfernen").css("display", "none");
	}
	reader.onload = function(event) {
		window.adb.dsDatensätze = $.csv.toObjects(event.target.result);
		window.adb.erstelleTabelle(window.adb.dsDatensätze, "DsFelder_div", "DsTabelleEigenschaften");
	};
	reader.readAsText(file);
};

// wenn BsFile geändert wird
window.adb.handleBsFileChange = function() {
	// Check for the various File API support
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported
	} else {
		$("#meldung_individuell_label").html("Importieren nicht möglich");
		$("#meldung_individuell_text").html("Ihr Browser unterstützt diesen Vorgang leider nicht");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		//alert('Ihr Browser unterstützt diesen Vorgang leider nicht');
        $('html, body').animate({
            scrollTop: $("#importieren_bs_daten_uploaden_collapse").offset().top
        }, 2000);
		return;
	}
	var file = event.target.files[0],
		reader = new FileReader();
	if (typeof event.target.files[0] === "undefined") {
		// vorhandene Datei wurde entfernt
		$("#BsTabelleEigenschaften").css("display", "none");
		$("#importieren_bs_ids_identifizieren_fehler_text").css("display", "none");
		$("#importieren_bs_ids_identifizieren_erfolg_text").css("display", "none");
		$("#BsImportieren").css("display", "none");
		$("#BsEntfernen").css("display", "none");
	}
	reader.onload = function(event) {
		window.adb.bsDatensätze = $.csv.toObjects(event.target.result);
		window.adb.erstelleTabelle(window.adb.bsDatensätze, "BsFelder_div", "BsTabelleEigenschaften");
	};
	reader.readAsText(file);
};

// wenn btn_resize geklickt wird
window.adb.handleBtnResizeClick = function() {
	var windowHeight = $(window).height(),
        $body = $("body");
	$body.toggleClass("force-mobile");
	if ($body.hasClass("force-mobile")) {
		// Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
		$(".baum").css("max-height", windowHeight - 252);
		// button rechts ausrichten
		$("#btn_resize").css("margin-right", "0px");
	} else {
		$(".baum").css("max-height", windowHeight - 161);
		// button an anderen Schaltflächen ausrichten
		$("#btn_resize").css("margin-right", "6px");
	}
};

// wenn menu_btn geklickt wird
// Menu: Links zu Google Bilder und Wikipedia nur aktiv setzen, wenn Art oder Lebensraum angezeigt wird
window.adb.handleMenuBtnClick = function() {
	if (localStorage.art_id) {
		$("#GoogleBilderLink_li").removeClass("disabled");
		$("#WikipediaLink_li").removeClass("disabled");
	} else {
		$("#GoogleBilderLink_li").addClass("disabled");
		$("#WikipediaLink_li").addClass("disabled");
	}
};

// wenn ds_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
window.adb.handleDs_ImportierenClick = function() {
	if(window.adb.isFileAPIAvailable()) {
		window.adb.zeigeFormular("importieren_ds");
		// Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
		if (window.adb.pruefeAnmeldung("ds")) {
			$("#importieren_ds_ds_beschreiben_collapse").collapse('show');
		}
	}
};

// wenn bs_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
window.adb.handleBs_ImportierenClick = function() {
	if(window.adb.isFileAPIAvailable()) {
		window.adb.zeigeFormular("importieren_bs");
		// Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
		if (window.adb.pruefeAnmeldung("bs")) {
			$("#importieren_bs_ds_beschreiben_collapse").collapse('show');
		}
	}
};

window.adb.handleMenuAdminClick = function() {
	window.adb.zeigeFormular("admin");
};

window.adb.ergänzePilzeZhgis = function() {
	$("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Daten werden analysiert...");
	$db = $.couch.db("artendb");
	$db.view('artendb/macromycetes?include_docs=true', {
		success: function(data) {
			var ds_zhgis = {},
				ergänzt = 0,
				fehler = 0,
				zhgis_schon_da = 0;
			ds_zhgis.Name = "ZH GIS";
			ds_zhgis.Beschreibung = "GIS-Layer und Betrachtungsdistanzen für das Artenlistentool, Artengruppen für EvAB, im Kanton Zürich. Eigenschaften aller Arten";
			ds_zhgis.Datenstand = "dauernd nachgeführt";
			ds_zhgis.Link = "http://www.naturschutz.zh.ch";
			ds_zhgis.Daten = {};
			ds_zhgis.Daten["GIS-Layer"] = "Pilze";
			_.each(data.rows, function(row) {
				var pilz = row.doc,
					zhgis_in_ds;
				if (!pilz.Datensammlungen) {
					pilz.Datensammlungen = [];
				}
				zhgis_in_ds = _.find(pilz.Datensammlungen, function(ds) {
					return ds.Name === "ZH GIS";
				});
				// nur ergänzen, wenn ZH GIS noch nicht existiert
				if (!zhgis_in_ds) {
					pilz.Datensammlungen.push(ds_zhgis);
					pilz.Datensammlungen = _.sortBy(pilz.Datensammlungen, function(ds) {
						return ds.Name;
					});
					$db.saveDoc(pilz, {
						success: function() {
							ergänzt ++;
							$("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
						},
						error: function() {
							fehler ++;
							$("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
						}
					});
				} else {
					zhgis_schon_da ++;
					$("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
				}
			});
		}
	});
};

// wenn importieren_ds_ds_beschreiben_collapse geöffnet wird
window.adb.handleImportierenDsDsBeschreibenCollapseShown = function() {
	// mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
	window.adb.bereiteImportieren_ds_beschreibenVor("ds");
	$("#DsImportiertVon").val(localStorage.Email);
};

// wenn importieren_bs_ds_beschreiben_collapse geöffnet wird
window.adb.handleImportierenBsDsBeschreibenCollapseShown = function() {
	// mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
	window.adb.bereiteImportieren_bs_beschreibenVor("bs");
	$("#BsImportiertVon").val(localStorage.Email);
};

// wenn importieren_ds_daten_uploaden_collapse geöffnet wird
window.adb.handleImportierenDsDatenUploadenCollapseShown = function() {
	if (!window.adb.pruefeAnmeldung("ds")) {
		$(this).collapse('hide');
	} else {
		$('#DsFile').fileupload();
	}
    $('html, body').animate({
        scrollTop: $("#importieren_ds_daten_uploaden_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_daten_uploaden_collapse geöffnet wird
window.adb.handleImportierenBsDatenUpladenCollapseShown = function() {
	if (!window.adb.pruefeAnmeldung("bs")) {
		$(this).collapse('hide');
	} else {
		$('#BsFile').fileupload();
	}
    $('html, body').animate({
        scrollTop: $("#importieren_bs_daten_uploaden_collapse").offset().top
    }, 2000);
};

// wenn importieren_ds_ids_identifizieren_collapse geöffnet wird
window.adb.handleImportierenDsIdsIdentifizierenCollapseShown = function() {
	if (!window.adb.pruefeAnmeldung("ds")) {
		$(this).collapse('hide');
	}
    $('html, body').animate({
        scrollTop: $("#importieren_ds_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_ids_identifizieren_collapse geöffnet wird
window.adb.handleImportierenBsIdsIdentifizierenCollapseShown = function() {
	if (!window.adb.pruefeAnmeldung("bs")) {
		$(this).collapse('hide');
	}
    $('html, body').animate({
        scrollTop: $("#importieren_bs_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// wenn importieren_ds_import_ausfuehren_collapse geöffnet wird
window.adb.handleImportierenDsImportAusfuehrenCollapseShown = function() {
	if (!window.adb.pruefeAnmeldung("ds")) {
		$(this).collapse('hide');
	}
    $('html, body').animate({
        scrollTop: $("#importieren_ds_import_ausfuehren_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_import_ausfuehren_collapse geöffnet wird
window.adb.handleImportierenBsImportAusfuehrenCollapseShown = function() {
	if (!window.adb.pruefeAnmeldung("bs")) {
		$(this).collapse('hide');
	}
    $('html, body').animate({
        scrollTop: $("#importieren_bs_import_ausfuehren_collapse").offset().top
    }, 2000);
};

// wenn DsWaehlen geändert wird
window.adb.handleDsWaehlenChange = function() {
	var DsName = this.value,
		waehlbar = $("#"+this.id+" option:selected").attr("waehlbar"),
		i,
        x,
        $DsAnzDs = $("#DsAnzDs"),
        $DsAnzDs_label = $("#DsAnzDs_label"),
        $DsName = $("#DsName");
	if (waehlbar === "true") {
		// zuerst alle Felder leeren
		$('#importieren_ds_ds_beschreiben_collapse textarea, #importieren_ds_ds_beschreiben_collapse input').each(function() {
			$(this).val('');
		});
		$DsAnzDs.html("");
		$DsAnzDs_label.html("");
		if (DsName) {
			for (i in window.adb.ds_von_objekten.rows) {
				if (window.adb.ds_von_objekten.rows[i].key[1] === DsName) {
					$DsName.val(DsName);
					for (x in window.adb.ds_von_objekten.rows[i].key[4]) {
						if (x === "Ursprungsdatensammlung") {
							$("#DsUrsprungsDs").val(window.adb.ds_von_objekten.rows[i].key[4][x]);
						} else if (x !== "importiert von") {
							$("#Ds" + x).val(window.adb.ds_von_objekten.rows[i].key[4][x]);
						}
					}
					if (window.adb.ds_von_objekten.rows[i].key[2] === true) {
						$("#DsZusammenfassend").prop('checked', true);
						// Feld für Ursprungs-DS anzeigen
						$("#DsUrsprungsDs_div").show();
					} else {
						// sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere DS gewählt wird
						$("#DsZusammenfassend").prop('checked', false);
						// und Feld für Ursprungs-DS verstecken
						$("#DsUrsprungsDs_div").hide();
					}
					// wenn die ds/bs kein "importiert von" hat ist der Wert null
					// verhindern, dass null angezeigt wird
					if (window.adb.ds_von_objekten.rows[i].key[3]) {
						$("#DsImportiertVon").val(window.adb.ds_von_objekten.rows[i].key[3]);
					} else {
						$("#DsImportiertVon").val("");
					}
					$DsAnzDs_label.html("Anzahl Arten/Lebensräume");
					$DsAnzDs.html(window.adb.ds_von_objekten.rows[i].value);
					// dafür sorgen, dass textareas genug gross sind
					$('#importieren_ds')
                        .find('textarea')
                        .each(function() {
                            window.adb.FitToContent(this, document.documentElement.clientHeight);
                        });
					$DsName.focus();
				}
				// löschen-Schaltfläche einblenden
				$("#DsLoeschen").css("display", "block");
			}
		} else {
			// löschen-Schaltfläche ausblenden
			$("#DsLoeschen").css("display", "none");
		}
	} else {
		// melden, dass diese DS nicht bearbeitet werden kann
		$('#meldung_ds_nicht_bearbeitbar').modal();
	}
};

// wenn DsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist
window.adb.handleDsNameChange = function() {
	var that = this,
		DsKey = _.find(window.adb.DsKeys, function(key) {
			return key[1] === that.value && key[3] !== localStorage.Email && !key[2];
		}),
        $importieren_ds_ds_beschreiben_hinweis_text2 = $("#importieren_ds_ds_beschreiben_hinweis_text2");
	if (DsKey) {
		$importieren_ds_ds_beschreiben_hinweis_text2
            .alert()
            .css("display", "block")
		    .html('Es existiert schon eine gleich heissende und nicht zusammenfassende Datensammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
		setTimeout(function() {
			$importieren_ds_ds_beschreiben_hinweis_text2
                .alert()
                .css("display", "none");
		}, 30000);
		$("#DsName")
            .val("")
		    .focus();
	} else {
		$importieren_ds_ds_beschreiben_hinweis_text2
            .alert()
            .css("display", "none");
	}
};

// wenn DsLoeschen geklickt wird
window.adb.handleDsLöschenClick = function() {
    var $importieren_ds_ds_beschreiben_hinweis_text = $("#importieren_ds_ds_beschreiben_hinweis_text");
	// Rückmeldung anzeigen
	$importieren_ds_ds_beschreiben_hinweis_text
        .alert()
        .css("display", "block")
	    .html("Bitte warten: Die Datensammlung wird entfernt...");
	$.when(window.adb.entferneDatensammlungAusAllenObjekten($("#DsName").val())).then(function() {
		// jetzt Ergebnisse anzeigen
		$importieren_ds_ds_beschreiben_hinweis_text
            .alert()
            .css("display", "block")
		    .html("Die Datensammlung wurde erfolgreich entfernt");
	});
};

// wenn BsLoeschen geklickt wird
window.adb.handleBsLoeschenClick = function() {
	// Rückmeldung anzeigen
	$("#importieren_bs_ds_beschreiben_hinweis")
        .alert()
        .css("display", "block");
	$("#importieren_bs_ds_beschreiben_hinweis_text").html("Bitte warten: Die Beziehungssammlung wird entfernt...");
	$.when(window.adb.entferneBeziehungssammlungAusAllenObjekten($("#BsName").val())).then(function() {
		// jetzt Ergebnisse anzeigen
		$("#importieren_bs_ds_beschreiben_hinweis")
            .alert()
            .css("display", "block");
		$("#importieren_bs_ds_beschreiben_hinweis_text").html("Die Beziehungssammlung wurde erfolgreich entfernt");
	});
};

// wenn DsImportieren geklickt wird
window.adb.handleDsImportierenClick = function() {
	$.when(window.adb.importiereDatensammlung()).then(function() {
		// jetzt Ergebnisse anzeigen
		console.log("Datensammlung importiert");
	});
};

// wenn BsImportieren geklickt wird
window.adb.handleBsImportierenClick = function() {
	$.when(window.adb.importiereBeziehungssammlung()).then(function() {
		// jetzt Ergebnisse anzeigen
		console.log("Beziehungssammlung importiert");
	});
};

// wenn DsEntfernen geklickt wird
window.adb.handleDsEntfernenClick = function() {
	$.when(window.adb.entferneDatensammlung()).then(function() {
		// jetzt Ergebnisse anzeigen
		console.log("Datensammlung entfernt");
	});
};

// wenn BsEntfernen geklickt wird
window.adb.handleBsEntfernenClick = function() {
	$.when(window.adb.entferneBeziehungssammlung()).then(function() {
		// jetzt Ergebnisse anzeigen
		console.log("Beziehungssammlung entfernt");
	});
};

// wenn exportieren geklickt wird
window.adb.handleExportierenClick = function() {
	window.adb.zeigeFormular("export");
	delete window.adb.exportieren_objekte;
};

// wenn exportieren_alt geklickt wird
window.adb.handleExportierenAltClick = function() {
	window.open("_list/export_alt_mit_synonymen_direkt/all_docs_mit_synonymen_fuer_alt?include_docs=true");
};

// wenn .feld_waehlen geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung angezeigt wird
// und pro Beziehung eine Zeile ausgegeben wird. 
// Wenn ja: reklamieren und rückgängig machen
window.adb.handleFeldWaehlenChange = function() {
	if ($("#export_bez_in_zeilen").prop('checked')) {
		var bezDsChecked = [],
			that = this;
		$("#exportieren_felder_waehlen_felderliste")
            .find(".feld_waehlen")
            .each(function() {
                if ($(this).prop('checked') && $(this).attr('dstyp') === "Beziehung") {
                    bezDsChecked.push($(this).attr('datensammlung'));
                }
            });
		// eindeutige Liste der dsTypen erstellen
		bezDsChecked = _.union(bezDsChecked);
		if (bezDsChecked && bezDsChecked.length > 1) {
			$('#meldung_zuviele_bs').modal();
			$(that).prop('checked', false);
		} else {
			window.adb.exportZuruecksetzen();
		}
	}
};

// wenn .feld_waehlen_alle_von_ds geändert wird
// wenn checked: alle unchecken, sonst alle checken
window.adb.handleFeldWaehlenAlleVonDs = function() {
	var ds = $(this).attr('datensammlung'),
		status = false;
	if ($(this).prop('checked')) {
		status = true;
	}
	$('[datensammlung="'+ds+'"]').each(function() {
		$(this).prop('checked', status);
	});
};

// wenn exportieren_ds_objekte_waehlen_gruppe geändert wird
window.adb.handleExportierenDsObjekteWaehlenGruppeChange = function() {
	window.adb.erstelleListeFürFeldwahl();
	// Tabelle ausblenden, falls sie eingeblendet war
	$("#exportieren_exportieren_tabelle").css("display", "none");
};

// wenn export_feld_filtern geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung Filter enthält. Wenn ja: reklamieren und rückgängig machen
window.adb.handleExportFeldFilternChange = function() {
	var bezDsFiltered = [];
	$("#exportieren_objekte_waehlen_ds_collapse")
        .find(".export_feld_filtern")
        .each(function() {
            if ((this.value || this.value === 0) && $(this).attr('dstyp') === "Beziehung") {
                bezDsFiltered.push($(this).attr('eigenschaft'));
            }
        });
	// eindeutige Liste der dsTypen erstellen
	bezDsFiltered = _.union(bezDsFiltered);
	if (bezDsFiltered && bezDsFiltered.length > 1) {
		$('#meldung_zuviele_bs').modal();
		$(this).val("");
	} else {
		window.adb.exportZuruecksetzen();
	}
};

// wenn exportieren_exportieren angezeigt wird
// zur Schaltfläche Vorschau scrollen
window.adb.handleExportierenExportierenShow = function() {
    // Fehlermeldung verstecken, falls sie noch offen war
    $("#exportieren_exportieren_error_text")
        .alert()
        .css("display", "none");
	$('html, body').animate({
		scrollTop: $("#exportieren_exportieren_tabelle_aufbauen").offset().top
	}, 2000);
};

// wenn .btn.lr_bearb_bearb geklickt wird
window.adb.handleBtnLrBearbBearbKlick = function() {
	if (!$(this).hasClass('disabled')) {
		window.adb.bearbeiteLrTaxonomie();
	}
};

// wenn .btn.lr_bearb_schuetzen geklickt wird
window.adb.handleBtnLrBearbSchuetzenClick = function() {
	if (!$(this).hasClass('disabled')) {
		window.adb.schuetzeLrTaxonomie();
		// Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
		delete localStorage.lr_bearb;
	}
};

// wenn .btn.lr_bearb_neu geklickt wird
window.adb.handleBtnLrBearbNeuClick = function() {
	if (!$(this).hasClass('disabled')) {
		window.adb.initiiereLrParentAuswahlliste($("#Taxonomie").val());
	}
};

// wenn #lr_parent_waehlen_optionen [name="parent_optionen"] geändert wird
window.adb.handleLrParentOptionenChange = function() {
	// prüfen, ob oberster Node gewählt wurde
	var parent_name = $(this).val(),
		parent_id = this.id,
		parent = {},
		object = {};
	// zuerst eine id holen
	object._id = $.couch.newUUID(1);
	object.Gruppe = "Lebensräume";
	object.Typ = "Objekt";
	object.Taxonomie = {};
	object.Taxonomie.Name = "neue Taxonomie";	// wenn nicht Wurzel, setzen. Passiert in aktualisiereHierarchieEinesNeuenLr
	object.Taxonomie.Daten = {};
	object.Taxonomie.Daten.Taxonomie = "neue Taxonomie";	// wenn nicht Wurzel, setzen. Passiert in aktualisiereHierarchieEinesNeuenLr
	// wenn keine Wurzel: Label anzeigen
	if (parent_id !== "0") {
		object.Taxonomie.Daten.Label = "";
	}
	object.Taxonomie.Daten.Einheit = "unbeschriebener Lebensraum";
	if (parent_id === "0") {
		object.Taxonomie.Daten.Einheit = "neue Taxonomie";
	}
	/*Einheit-Nr FNS wird nicht mehr benötigt, bzw. unabhängig führen
	object.Taxonomie.Daten["Einheit-Nr FNS"] = "";
	if (parent_id === "0") {
		object.Taxonomie.Daten["Einheit-Nrn FNS von"] = "";
		object.Taxonomie.Daten["Einheit-Nrn FNS bis"] = "";
	}*/
	object.Taxonomie.Daten.Beschreibung = "";
	object.Datensammlungen = [];
	object.Beziehungssammlungen = [];
	// jetzt den parent erstellen
	// geht nicht vorher, weil die id bekannt sein muss
	if (parent_id === "0") {
		// das ist die Wurzel der Taxonomie
		parent.Name = "neue Taxonomie";
		parent.GUID = object._id;
		// bei der Wurzel ist Hierarchie gleich parent
		object.Taxonomie.Daten.Hierarchie = [];
		object.Taxonomie.Daten.Hierarchie.push(parent);
	} else {
		parent.Name = parent_name;
		parent.GUID = parent_id;
	}
	object.Taxonomie.Daten.Parent = parent;
	$db = $.couch.db("artendb");
	$db.saveDoc(object, {
		success: function(data2) {
			object._rev = data2.rev;
			if (parent_id !== "0") {
				// die Hierarchie aufbauen und setzen
				// bei der Wurzel ist sie schon gesetzt
				window.adb.aktualisiereHierarchieEinesNeuenLr(null, object, true);
			} else {
				$.when(window.adb.erstelleBaum()).then(function() {
					window.adb.öffneBaumZuId(object._id);
					$('#lr_parent_waehlen').modal('hide');
				});
			}
		}
	});
};

// wenn rueckfrage_lr_loeschen_ja geklickt wird
window.adb.handleRueckfrageLrLoeschenJaClick = function() {
	// zuerst die id des Objekts holen
	var uri = new Uri($(location).attr('href')),
		id = uri.getQueryParamValue('id'),
		hash = uri.anchor();
	// wenn browser history nicht unterstützt, erstellt history.js eine hash
	// dann muss die id durch die id in der hash ersetzt werden
	if (hash) {
		var uri2 = new Uri(hash);
		id = uri2.getQueryParamValue('id');
	}
	// Objekt selbst inkl. aller hierarchisch darunter liegende Objekte ermitteln und löschen
	$db = $.couch.db("artendb");
	$db.view('artendb/hierarchie?key="' + id + '"&include_docs=true', {
		success: function(data) {
			// daraus einen Array von docs machen
			var doc_array = _.map(data.rows, function(row) {
				return row.doc;
			});
			// und diese Dokumente nun löschen
			window.adb.loescheMassenMitObjektArray(doc_array);
			// vorigen node ermitteln
			var voriger_node = $.jstree._reference("#" + id)._get_prev("#" + id);
			// node des gelöschten LR entfernen
			jQuery.jstree._reference("#" + id).delete_node("#" + id);
			// vorigen node öffnen
			if (voriger_node) {
				$.jstree._reference(voriger_node).select_node(voriger_node);
			} else {
				window.adb.oeffneGruppe("Lebensräume");
			}
		}
	});
};

// Wenn #art .Lebensräume.Taxonomie .controls geändert wird
window.adb.handleLrTaxonomieControlsChange = function() {
	window.adb.speichern($(this).val(), this.id, $(this).attr('dsName'), $(this).attr('dsTyp'));
};

// wenn .Lebensräume.Taxonomie geöffnet wird
window.adb.handlePanelbodyLrTaxonomieShown = function() {
	if (localStorage.lr_bearb == "true") {
		window.adb.bearbeiteLrTaxonomie();
	}
};

// wenn #exportieren_exportieren_collapse geöffnet wird
window.adb.handleExportierenExportierenCollapseShown = function() {
	// nur ausführen, wenn exportieren_exportieren_collapse offen ist
	// komischerweise wurde dieser Code immer ausgelöst, wenn bei Lebensräumen F5 gedrückt wurde!
	if ($("#exportieren_exportieren_collapse").css("display") === "block") {
		// Tabelle und Herunterladen-Schaltfläche ausblenden
		$("#exportieren_exportieren_tabelle").css("display", "none");
		$(".exportieren_exportieren_exportieren").css("display", "none");
		// filtert und baut danach die Vorschautabelle auf
		window.adb.filtereFürExport();
	}
};

// wenn #exportieren_objekte_Taxonomien_zusammenfassen geklickt wird
window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick = function(that) {
	if ($(that).hasClass("active")) {
		window.adb.fasseTaxonomienZusammen = false;
		$(that).html("Alle Taxonomien zusammenfassen");
	} else {
		window.adb.fasseTaxonomienZusammen = true;
		$(that).html("Taxonomien einzeln behandeln");
	}
	// Felder neu aufbauen, aber nur, wenn eine Gruppe gewählt ist
	var gruppeIstGewählt = false;
	$("#exportieren_objekte_waehlen_gruppen_collapse")
        .find(".exportieren_ds_objekte_waehlen_gruppe")
        .each(function() {
            if ($(that).prop('checked')) {
                gruppeIstGewählt = true;
            }
        });
	if (gruppeIstGewählt) {
		window.adb.erstelleListeFürFeldwahl();
	}
};

// wenn #exportieren_exportieren_exportieren geklickt wird
window.adb.handleExportierenExportierenExportierenClick = function() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported
		// das funktioniert nicht so super:
		// Chrome: super. Aber manchmal Absturz!
		// Firefox: super
		// Safari auf MacOs: Fehlermeldung
		// iOs: perfekt
		// Android Chrome: Download scheint nicht zu Ende zu kommen, Datei unbenannt (wenn sie dann endlich auftaucht)
		// IE9: Windows fragt, ob man das Öffnen einer App gestatten will, dann scheitert es
		// IE10: funktioniert
		// soll besser werden, sobald Standards umgesetzt werden
		var exportstring = window.adb.erstelleExportString(window.adb.exportieren_objekte),
			blob = new Blob([exportstring], {type: "text/csv;charset=utf-8;"}),
			d = new Date(),
			month = d.getMonth()+1,
			day = d.getDate(),
			output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
		saveAs(blob, output + "_export.csv");
	} else {
		$("#meldung_individuell_label").html("Direkt herunterladen nicht möglich");
		$("#meldung_individuell_text").html("Ihr Browser unterstützt diesen Vorgang leider nicht.<br>Sie können die Datei vom Server herunterladen.");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
	}
};

// wenn .panel geöffnet wird
// Höhe der textareas an Textgrösse anpassen
window.adb.handlePanelShown = function() {
	$(this).find('textarea').each(function() {
		window.adb.FitToContent(this.id);
	});
};

// wenn .LinkZuArtGleicherGruppe geklickt wird
window.adb.handleLinkZuArtGleicherGruppeClick = function(id) {
    $(".suchen").val("");
	$("#tree" + window.adb.Gruppe)
        .jstree("clear_search")
	    .jstree("deselect_all")
	    .jstree("close_all", -1)
	    .jstree("select_node", "#" + id);
};

// wenn Fenstergrösse verändert wird
window.adb.handleResize = function() {
	window.adb.setzeTreehoehe();
	// Höhe der Textareas korrigieren
	$('#forms').find('textarea').each(function() {
		window.adb.FitToContent(this.id);
	});
};

// wenn .anmelden_btn geklickt wird
window.adb.handleAnmeldenBtnClick = function(that) {
	// es muss mitgegeben werden, woher die Anmeldung kam, damit die email aus dem richtigen Feld geholt werden kann
	var bs_ds = that.id.substring(that.id.length-2);
	if (bs_ds === "rt") {
		bs_ds = "art";
	}
	window.adb.meldeUserAn(bs_ds);
};

// wenn .Email keyup
window.adb.handleEmailKeyup = function() {
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Emailhinweis").css("display", "none");
};

// wenn .Passwort keyup
window.adb.handlePasswortKeyup = function() {
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Passworthinweis").css("display", "none");
};

// wenn .Passwort2 keyup
window.adb.handlePasswort2Keyup = function() {
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Passworthinweis2").css("display", "none");
};

// wenn .konto_erstellen_btn geklickt wird
window.adb.handleKontoErstellenBtnClick = function(that) {
	var bs_ds = that.id.substring(that.id.length-2);
	if (bs_ds === "rt") {
		bs_ds = "art";
	}
	$(".signup").css("display", "block");
	$(".anmelden_btn").hide();
	$(".abmelden_btn").hide();
	$(".konto_erstellen_btn").hide();
	$(".konto_speichern_btn").show();
	$(".importieren_anmelden_fehler").hide();
	setTimeout(function() {
		$("#Email_" + bs_ds).focus();
	}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
};

// wenn .konto_speichern_btn geklickt wird
window.adb.handleKontoSpeichernBtnClick = function(that) {
	var bs_ds = that.id.substring(that.id.length-2);
	if (bs_ds === "rt") {
		bs_ds = "art";
	}
	if (window.adb.validiereSignup(bs_ds)) {
		window.adb.erstelleKonto(bs_ds);
		// Anmeldefenster zurücksetzen
		$(".signup").css("display", "none");
		$(".anmelden_btn").hide();
		$(".abmelden_btn").show();
		$(".konto_erstellen_btn").hide();
		$(".konto_speichern_btn").hide();
	}
};

// wenn .gruppe geklickt wird
window.adb.handleOeffneGruppeClick = function() {
	window.adb.oeffneGruppe($(this).attr("Gruppe"));
};

// wenn #DsFelder geändert wird
window.adb.handleDsFelderChange = function() {
	window.adb.meldeErfolgVonIdIdentifikation("Ds");
};

// wenn #BsFelder geändert wird
window.adb.handleBsFelderChange = function() {
	window.adb.meldeErfolgVonIdIdentifikation("Bs");
};

// wenn #DsId geändert wird
window.adb.handleDsIdChange = function() {
	window.adb.meldeErfolgVonIdIdentifikation("Ds");
};

// wenn #BsId geändert wird
window.adb.handleBsIdChange = function() {
	window.adb.meldeErfolgVonIdIdentifikation("Bs");
};

// wenn in textarea keyup oder focus
window.adb.handleTextareaKeyupFocus = function() {
	window.adb.FitToContent(this.id);
};

// übernimmt eine Array mit Objekten
// und den div, in dem die Tabelle eingefügt werden soll
// plus einen div, in dem die Liste der Felder angzeigt wird (falls dieser div mitgeliefert wird)
// baut damit eine Tabelle auf und fügt sie in den übergebenen div ein
window.adb.erstelleTabelle = function(Datensätze, felder_div, tabellen_div) {
	var html = "",
		Feldname = "",
		html_ds_felder_div = "",
		x,
        i,
        $tabellen_div = $("#"+tabellen_div);
	if (Datensätze.length > 10) {
		html += "Vorschau der ersten 10 von " + Datensätze.length + " Datensätzen:";
	} else if (Datensätze.length > 1) {
		html += "Vorschau der " + Datensätze.length + " Datensätze:";
	} else {
		html += "Vorschau des einzigen Datensatzes:";
	}
	// Tabelle initiieren
	html += '<div class="table-responsive"><table class="table table-bordered table-striped table-condensed table-hover">';
	// Titelzeile aufbauen
	// Zeile anlegen
	// gleichzeitig Feldliste für Formular anlegen
	if (felder_div) {
		if (felder_div === "DsFelder_div") {
			Feldname = "DsFelder";
		} else if (felder_div === "BsFelder_div") {
			Feldname = "BsFelder";
		}
	}
	html_ds_felder_div += '<label class="control-label" for="'+Feldname+'">Feld mit eindeutiger ID<br>in den Importdaten</label>';
	html_ds_felder_div += '<select multiple class="controls form-control input-sm" id="'+Feldname+'" style="height:' + ((Object.keys(Datensätze[0]).length*19)+9)  + 'px">';
	html += "<thead><tr>";
	// durch die Felder zirkeln
	for (x in Datensätze[0]) {
		// Spalte anlegen
		html += "<th>" + x + "</th>";
		// Option für Feldliste anfügen
		html_ds_felder_div += '<option value="' + x + '">' + x + '</option>';
	}
	// Titelzeile abschliessen
	html += "</tr></thead><tbody>";
	// Feldliste abschliessen
	html_ds_felder_div += '</select>';
	if (felder_div) {
		// nur, wenn ein felder_div übergeben wurde
		$("#"+felder_div).html(html_ds_felder_div);
	}

	// durch die Datensätze zirkeln
	// nur die ersten 20 anzeigen
	for (i = 0; i < 10; i++) {
		// Datenzeilen aufbauen
		// Zeile anlegen
		html += "<tr>";
		// durch die Felder zirkeln
		for (x in Datensätze[i]) {
			// Spalte anlegen
			html += "<td>";
			if (Datensätze[i][x] === null) {
				// Null-Werte als leer anzeigen
				html += "";
			} else if (typeof Datensätze[i][x] === "object") {
				html += JSON.stringify(Datensätze[i][x]);
			} else if (Datensätze[i][x] || Datensätze[i][x] === 0) {
				html += Datensätze[i][x];
			} else if (Datensätze[i][x] === false) {
				// dafür sogen, dass false auch angezeigt wird
				// ohne diese Zeile bleibt das Feld sonst leer
				html += Datensätze[i][x];
			} else {
				// nullwerte als leerwerte (nicht) anzeigen
				html += "";
			}
			// Spalte abschliessen
			html += "</td>";
		}
		// Zeile abschliessen
		html += "</tr>";
	}
	// Tabelle abschliessen
	html += '</tbody></table></div>';
	// html in div einfügen
	$tabellen_div
        .html(html)
	    .css("margin-top", "20px")
        // sichtbar stellen
        .css("display", "block");
    // fenster scrollen
    $('html, body').animate({
        scrollTop: $tabellen_div.offset().top
    }, 2000);
};

// erhält dbs = "Ds" oder "Bs"
window.adb.meldeErfolgVonIdIdentifikation = function(dbs) {
    var $dbsFelderSelected = $("#"+dbs+"Felder option:selected"),
        $dbsIdSelected = $("#"+dbs+"Id option:selected"),
        IdsVonDatensätzen = [],
        MehrfachVorkommendeIds = [],
        IdsVonNichtImportierbarenDatensätzen = [];
	if ($dbsFelderSelected.length && $dbsIdSelected.length) {
		// beide ID's sind gewählt
		window.adb[dbs+"FelderId"] = $dbsFelderSelected.val();
		window.adb.DsId = $dbsIdSelected.val();
		window.adb[dbs+"Id"] = $dbsIdSelected.val();
		// das hier wird später noch für den Inmport gebraucht > globale Variable machen
		window.adb.ZuordbareDatensätze = [];
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text")
            .alert()
            .css("display", "block")
		    .html("Bitte warten, die Daten werden analysiert.<br>Das kann eine Weile dauern...");
		// übrige Hinweisfelder ausschalten, falls jemand 2 mal nacheinander klickt
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text")
            .alert()
            .css("display", "none");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text")
            .alert()
            .css("display", "none");
        $('html, body').animate({
            scrollTop: $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_collapse").offset().top
        }, 2000);

		// Dokumente aus der Gruppe der Datensätze holen
		// durch alle loopen. Dabei einen Array von Objekten bilden mit id und guid
		// kontrollieren, ob eine id mehr als einmal vorkommt
		$db = $.couch.db("artendb");
		if (window.adb.DsId === "guid") {
			$db.view('artendb/all_docs', {
				success: function(data) {
					for (var i in window.adb[dbs.toLowerCase()+"Datensätze"]) {
						// durch die importierten Datensätze loopen
						if (IdsVonDatensätzen.indexOf(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]) === -1) {
							// diese ID wurde noch nicht hinzugefügt > hinzufügen
							IdsVonDatensätzen.push(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]);
							// prüfen, ob die ID zugeordnet werden kann
							for (var x = 0; x < data.rows.length; x++) {
								if (data.rows[x].key === window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]) {
									window.adb.ZuordbareDatensätze.push(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]);
									break;
								}
								if (x === (data.rows.length-1)) {
									// diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
									IdsVonNichtImportierbarenDatensätzen.push(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]);
								}
							}
						} else {
							// diese ID wurden schon hinzugefügt > mehrfach!
							MehrfachVorkommendeIds.push(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]);
						}
					}
					window.adb.meldeErfolgVonIdIdentifikation_02(MehrfachVorkommendeIds, IdsVonDatensätzen, IdsVonNichtImportierbarenDatensätzen, dbs);
				}
			});
		} else {
			$db.view('artendb/gruppe_id_taxonomieid?startkey=["' + window.adb.DsId + '"]&endkey=["' + window.adb.DsId + '",{},{}]', {
				success: function(data) {
					for (var i in window.adb[dbs.toLowerCase()+"Datensätze"]) {
						// durch die importierten Datensätze loopen
						if (IdsVonDatensätzen.indexOf(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]) === -1) {
							// diese ID wurde noch nicht hinzugefügt > hinzufügen
							IdsVonDatensätzen.push(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]);
							// prüfen, ob die ID zugeordnet werden kann
							for (var x = 0; x < data.rows.length; x++) {
								// Vorsicht: window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]] kann Zahlen als string zurückgeben, nicht === verwenden
								if (data.rows[x].key[2] == window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]) {
									var Objekt = {};
									Objekt.Id = parseInt(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]], 10);
									Objekt.Guid = data.rows[x].key[1];
									window.adb.ZuordbareDatensätze.push(Objekt);
									break;
								}
								if (x === (data.rows.length-1)) {
									// diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
									IdsVonNichtImportierbarenDatensätzen.push(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]);
								}
							}
						} else {
							// diese ID wurden schon hinzugefügt > mehrfach!
							MehrfachVorkommendeIds.push(window.adb[dbs.toLowerCase()+"Datensätze"][i][window.adb[dbs+"FelderId"]]);
						}
					}
					window.adb.meldeErfolgVonIdIdentifikation_02(MehrfachVorkommendeIds, IdsVonDatensätzen, IdsVonNichtImportierbarenDatensätzen, dbs);
				}
			});
		}
	}
};

window.adb.meldeErfolgVonIdIdentifikation_02 = function(MehrfachVorkommendeIds, IdsVonDatensätzen, IdsVonNichtImportierbarenDatensätzen, dbs) {
    var $importieren_dbs_ids_identifizieren_hinweis_text = $("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text"),
        $importieren_dbs_ids_identifizieren_erfolg_text = $("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text");
	$importieren_dbs_ids_identifizieren_hinweis_text
        .alert()
        .css("display", "none");
	// rückmelden: Falls mehrfache ID's, nur das rückmelden und abbrechen
	if (MehrfachVorkommendeIds.length && dbs !== "Bs") {
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text")
            .alert()
            .css("display", "block")
		    .html("Die folgenden ID's kommen mehrfach vor: " + MehrfachVorkommendeIds + "<br>Bitte entfernen oder korrigieren Sie die entsprechenden Zeilen");
		// übrige Hinweisfelder ausschalten, falls jemand 2 mal nacheinander klickt
		$importieren_dbs_ids_identifizieren_hinweis_text
            .alert()
            .css("display", "none");
		$importieren_dbs_ids_identifizieren_erfolg_text
            .alert()
            .css("display", "none");
	} else if (window.adb.ZuordbareDatensätze.length < IdsVonDatensätzen.length) {
		// rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
		// es können nicht alle zugeordnet werden, daher als Hinweis statt als Erfolg
		$importieren_dbs_ids_identifizieren_hinweis_text
            .alert()
            .css("display", "block");
		if (dbs === "Bs") {
			$importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + IdsVonDatensätzen.length + " Arten:<br>Beziehungen von " + IdsVonDatensätzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: Beziehungen von " + IdsVonNichtImportierbarenDatensätzen.length + " Arten mit den folgenden Werten im Feld \"" + window.adb[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + IdsVonNichtImportierbarenDatensätzen);
		} else {
			$importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + IdsVonDatensätzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: " + IdsVonNichtImportierbarenDatensätzen.length + " Datensätze mit den folgenden Werten im Feld \"" + window.adb[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + IdsVonNichtImportierbarenDatensätzen);
		}
		// übrige Hinweisfelder ausschalten, falls jemand 2 mal nacheinander klickt
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text")
            .alert()
            .css("display", "none");
		$importieren_dbs_ids_identifizieren_erfolg_text
            .alert()
            .css("display", "none");
		$("#"+dbs+"Importieren").css("display", "block");
		$("#"+dbs+"Entfernen").css("display", "block");
	} else {
		// rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
		$importieren_dbs_ids_identifizieren_erfolg_text
            .alert()
            .css("display", "block");
		if (dbs === "Bs") {
			$importieren_dbs_ids_identifizieren_erfolg_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + IdsVonDatensätzen.length + " Arten:<br>Beziehungen von " + IdsVonDatensätzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>Beziehungen von " + window.adb.ZuordbareDatensätze.length + " Arten können zugeordnet und importiert werden");
		} else {
			$importieren_dbs_ids_identifizieren_erfolg_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + IdsVonDatensätzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden");
		}
		// übrige Hinweisfelder ausschalten, falls jemand 2 mal nacheinander klickt
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text")
            .alert()
            .css("display", "none");
		$importieren_dbs_ids_identifizieren_hinweis_text
            .alert()
            .css("display", "none");
		$("#"+dbs+"Importieren").css("display", "block");
		$("#"+dbs+"Entfernen").css("display", "block");
	}
    $('html, body').animate({
        scrollTop: $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung
window.adb.importiereDatensammlung = function() {
	var Datensammlung,
		anzFelder,
		anzDs = window.adb.dsDatensätze.length,
        // Der Verlauf soll angezeigt werden, daher braucht es einen zähler
        anzDsImportiert = 0,
		DsImportiert = $.Deferred(),
        $DsName = $("#DsName"),
        $DsBeschreibung = $("#DsBeschreibung"),
        nr,
        rückmeldung_intro,
        rückmeldung_links = "",
        $DsDatenstand = $("#DsDatenstand"),
        $DsLink = $("#DsLink"),
        $DsUrsprungsDs = $("#DsUrsprungsDs"),
        $importieren_ds_import_ausfuehren_hinweis = $("#importieren_ds_import_ausfuehren_hinweis");
	// prüfen, ob ein DsName erfasst wurde. Wenn nicht: melden
	if (!$DsName.val()) {
		$("#meldung_individuell_label").html("Namen fehlt");
		$("#meldung_individuell_text").html("Bitte geben Sie der Datensammlung einen Namen");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		$DsName.focus();
		return false;
	}

    // changes feed einrichten
    // versucht, view als Filter zu verwenden, oder besser, den expliziten Filter dsimport mit dsname als Kriterium
    // Ergebnis: bei view kamen alle changes, auch design doc. Bei dsimport kam nichts.
    /*var changes_options = {};
    changes_options.dsname = $DsName.val();
    changes_options.filter = "artendb/dsimport";
    window.adb.queryChangesStartingNow();

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('longpoll-data', function(event, data) {
        console.log("data.results = " + JSON.stringify(data.results));
        anzDsImportiert = anzDsImportiert + data.results.length;
        console.log(anzDsImportiert + " Datensätze importiert");
        var prozent = Math.round(anzDsImportiert/anzDs*100);
        $("#DsImportierenProgressbar").css('width', prozent +'%').attr('aria-valuenow', prozent);
        if (anzDsImportiert >= anzDs-1 && anzDsImportiert <= anzDs) {
            // Rückmeldung in Feld anzeigen:
            $importieren_ds_import_ausfuehren_hinweis.css('display', 'block');
        }
    });*/

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.ds_hinzugefügt', function() {
        anzDsImportiert++;
        var prozent = Math.round(anzDsImportiert/anzDs*100);
        $("#DsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#DsImportierenProgressbarText").html(prozent + "%");
        rückmeldung_intro = "Die Daten wurden importiert.<br>Die Indexe werden neu aufgebaut...";
        $('html, body').animate({
            scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
        }, 2000);
        if (anzDsImportiert === anzDs) {
            // die Indexe
            $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass views aktualisiert wurden
                    rückmeldung_intro = "Die Daten wurden importiert.<br>";
                    rückmeldung_intro += "Die Indexe wurden neu aufgebaut.<br><br>";
                    rückmeldung_intro += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                    $("#importieren_ds_import_ausfuehren_hinweis_text").html(rückmeldung_intro + rückmeldung_links);
                    $('html, body').animate({
                        scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
                    }, 2000);
                }
            });
        }
    });

	for (var x in window.adb.dsDatensätze) {
		// Datensammlung als Objekt gründen
		Datensammlung = {};
		Datensammlung.Name = $DsName.val();
		if ($DsBeschreibung.val()) {
			Datensammlung.Beschreibung = $DsBeschreibung.val();
		}
		if ($DsDatenstand.val()) {
			Datensammlung.Datenstand = $DsDatenstand.val();
		}
		if ($DsLink.val()) {
			Datensammlung.Link = $DsLink.val();
		}
		// falls die Datensammlung zusammenfassend ist
		if ($("#DsZusammenfassend").prop('checked')) {
			Datensammlung.zusammenfassend = true;
		}
		if ($DsUrsprungsDs.val()) {
			Datensammlung.Ursprungsdatensammlung = $DsUrsprungsDs.val();
		}
		Datensammlung["importiert von"] = localStorage.Email;
		// Felder der Datensammlung als Objekt gründen
		Datensammlung.Daten = {};
		// Felder anfügen, wenn sie Werte enthalten
		anzFelder = 0;
		for (var y in window.adb.dsDatensätze[x]) {
			// nicht importiert wird die ID und leere Felder
			if (y !== window.adb.DsFelderId && window.adb.dsDatensätze[x][y] !== "" && window.adb.dsDatensätze[x][y] !== null) {
				if (window.adb.dsDatensätze[x][y] === -1) {
					// Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
					Datensammlung.Daten[y] = true;
				} else if (window.adb.dsDatensätze[x][y] == "true") {
					// true/false nicht als string importieren
					Datensammlung.Daten[y] = true;
				} else if (window.adb.dsDatensätze[x][y] == "false") {
					Datensammlung.Daten[y] = false;
				} else if (window.adb.dsDatensätze[x][y] == parseInt(window.adb.dsDatensätze[x][y], 10)) {
					// Ganzzahlen als Zahlen importieren
					Datensammlung.Daten[y] = parseInt(window.adb.dsDatensätze[x][y], 10);
				} else if (window.adb.dsDatensätze[x][y] == parseFloat(window.adb.dsDatensätze[x][y])) {
					// Bruchzahlen als Zahlen importieren
					Datensammlung.Daten[y] = parseFloat(window.adb.dsDatensätze[x][y]);
				} else {
					// Normalfall
					Datensammlung.Daten[y] = window.adb.dsDatensätze[x][y];
				}
				anzFelder += 1;
			}
		}
		// entsprechenden Index öffnen
		// sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
		if (anzFelder > 0) {
			// Datenbankabfrage ist langsam. Extern aufrufen, 
			// sonst überholt die for-Schlaufe und Datensammlung ist bis zur saveDoc-Ausführung eine andere!
			var guid;
			if (window.adb.DsId === "guid") {
				// die in der Tabelle mitgelieferte id ist die guid
				guid = window.adb.dsDatensätze[x][window.adb.DsFelderId];
			} else {
				for (var q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
					// in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
					if (window.adb.ZuordbareDatensätze[q].Id == window.adb.dsDatensätze[x][window.adb.DsFelderId]) {
						// und die guid auslesen
						guid = window.adb.ZuordbareDatensätze[q].Guid;
						break;
					}
				}
			}
			// kann sein, dass der guid oben nicht zugeordnet werden konnte. Dann nicht anfügen
			if (guid) {
				window.adb.fügeDatensammlungZuObjekt(guid, Datensammlung);
            }
        }
    }
    // Für 10 Kontrollbeispiele die Links aufbauen
    var erste_10_ids = _.pluck(_.first(window.adb.dsDatensätze, 10), window.adb.DsFelderId);
    _.each(erste_10_ids, function(id, index) {
        nr = index + 1;
        rückmeldung_links += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
    });

    // Rückmeldung in Feld anzeigen
    rückmeldung_intro = "Die Daten werden importiert...";
	$("#importieren_ds_import_ausfuehren_hinweis_text").html(rückmeldung_intro);
    $importieren_ds_import_ausfuehren_hinweis.css('display', 'block');
    $('html, body').animate({
        scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
    }, 2000);
	DsImportiert.resolve();
};

window.adb.queryChangesStartingNow = function(options) {
    options = options || {};
    options.since = "now";
    if (options.filter) {
        // der Filter bremst die Abfrage - das ist schlecht, weil dann bereits DS aktualisiert wurden!
        // daher für die Erstabfrage entfernen
        var filter = options.filter;
        var dsname = options.dsname;
        delete options.view;
        delete options.dsname;
    }
    $.ajax({
        type: "get",
        url: "/artendb/_changes",
        dataType: "json",
        data: options
    })
    .done(function(data) {
        $(document).trigger('longpoll-data', data, data.last_seq);
        options.feed = "longpoll";
        options.since = data.last_seq;
        if (filter) {
            options.filter = filter;
            options.dsname = dsname;
        }
        $.ajax({
            type: "get",
            url: "/artendb/_changes",
            dataType: "json",
            data: options
        })
        .done(function(data2) {
            if (data2.results.length > 0 ) {
                $(document).trigger('longpoll-data2', data2);
            }
            options.since = data2.last_seq;
            // dafür sorgen, dass weiter beobachtet wird
            window.adb.queryChanges(options);
        });
    });
};

window.adb.queryChanges = function(options) {
    options = options || {};
    options.since = options.since || "now";
    options.feed = options.feed || "longpoll";
    $.ajax({
        type: "get",
        url: "/artendb/_changes",
        dataType: "json",
        data: options
    })
    .done(function(data) {
        if (data.results.length > 0 ) {
            $(document).trigger('longpoll-data', data);
        }
        options.since = data.last_seq;
        window.adb.queryChanges(options);
    });
};

// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung
window.adb.importiereBeziehungssammlung = function() {
	var Beziehungssammlung,
		anzFelder,
		anzBs = window.adb.bsDatensätze.length,
        anzBsImportiert = 0,
        nr,
        rückmeldung_intro,
        rückmeldung_links = "",
		BsImportiert = $.Deferred(),
        $BsName = $("#BsName"),
        $BsBeschreibung = $("#BsBeschreibung"),
        $BsDatenstand = $("#BsDatenstand"),
        $BsLink = $("#BsLink"),
        $BsUrsprungsBs = $("#BsUrsprungsBs"),
        $importieren_bs_import_ausfuehren_hinweis = $("#importieren_bs_import_ausfuehren_hinweis");
	// prüfen, ob ein BsName erfasst wurde. Wenn nicht: melden
	if (!$BsName.val()) {
		$("#meldung_individuell_label").html("Namen fehlt");
		$("#meldung_individuell_text").html("Bitte geben Sie der Beziehungssammlung einen Namen");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		$BsName.focus();
		return false;
	}

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.bs_hinzugefügt', function() {
        anzBsImportiert++;
        var prozent = Math.round(anzBsImportiert/anzBs*100);
        $("#BsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#BsImportierenProgressbarText").html(prozent + "%");
        rückmeldung_intro = "Die Daten wurden importiert.<br>Die Indexe werden neu aufgebaut...";
        $('html, body').animate({
            scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
        }, 2000);
        if (anzBsImportiert === anzBs) {
            // Indices aktualisieren
            $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass Indexe aktualisiert wurden
                    rückmeldung_intro = "Die Daten wurden importiert.<br>";
                    rückmeldung_intro += "Die Indexe wurden neu aufgebaut.<br><br>";
                    rückmeldung_intro += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                    $("#importieren_bs_import_ausfuehren_hinweis_text").html(rückmeldung_intro + rückmeldung_links);
                    $('html, body').animate({
                        scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
                    }, 2000);
                }
            });
        }
    });

	// zuerst: Veranlassen, dass die Beziehungspartner in window.adb.bsDatensätze in einen Array der richtigen Form umgewandelt werden
	$.when(window.adb.bereiteBeziehungspartnerFürImportVor())
		.then(function() {
			setTimeout(function() {
				anzBs = 0;
				var Beziehungssammlung,
                    Beziehungssammlung_vorlage = {};
				Beziehungssammlung_vorlage.Name = $BsName.val();
				if ($BsBeschreibung.val()) {
					Beziehungssammlung_vorlage.Beschreibung = $BsBeschreibung.val();
				}
				if ($BsDatenstand.val()) {
					Beziehungssammlung_vorlage.Datenstand = $BsDatenstand.val();
				}
				if ($BsLink.val()) {
					Beziehungssammlung_vorlage.Link = $BsLink.val();
				}
				// falls die Datensammlung zusammenfassend ist
				if ($("#BsZusammenfassend").prop('checked')) {
					Beziehungssammlung_vorlage.zusammenfassend = true;
				}
				if ($BsUrsprungsBs.val()) {
					Beziehungssammlung_vorlage.Ursprungsdatensammlung = $BsUrsprungsBs.val();
				}
				Beziehungssammlung_vorlage["importiert von"] = localStorage.Email;
				Beziehungssammlung_vorlage.Beziehungen = [];
				// zunächst den Array von Objekten in ein Objekt mit Eigenschaften = ObjektGuid und darin Array mit allen übrigen Daten verwandeln
				var bsDatensätze_objekt = _.groupBy(window.adb.bsDatensätze, function(objekt) {
					// id in guid umwandeln
					var guid;
					if (window.adb.BsId === "guid") {
						// die in der Tabelle mitgelieferte id ist die guid
						guid = objekt[window.adb.BsFelderId];
					} else {
						for (var q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
							// in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
							if (window.adb.ZuordbareDatensätze[q].Id == objekt[window.adb.BsFelderId]) {
								// und die guid auslesen
								guid = window.adb.ZuordbareDatensätze[q].Guid;
								break;
							}
						}
					}
					objekt.GUID = guid;
					return objekt.GUID;
				});
				// jetzt durch die GUID's loopen und die jeweiligen Beziehungen anhängen
				$.each(bsDatensätze_objekt, function(key, value) {
					var Beziehungen = [];
					anzBs += 1;
					// Beziehungssammlung als Objekt gründen, indem die Vorlage kopiert wird
					Beziehungssammlung = jQuery.extend(true, {}, Beziehungssammlung_vorlage);
					for (var x = 0; x<value.length; x++) {
						// durch die Beziehungen loopen
						anzFelder = 0;
						// Felder der Beziehungssammlung als Objekt gründen
						var Beziehung = {};
						for (var y in value[x]) {
							// durch die Felder der Beziehung loopen
							// nicht importiert wird die GUID und leere Felder
							if (y !== "GUID" && value[x][y] !== "" && value[x][y] !== null) {
								if (value[x][y] === -1) {
									// Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
									Beziehung[y] = true;
								} else if (value[x][y] == "true") {
									// true/false nicht als string importieren
									Beziehung[y] = true;
								} else if (value[x][y] == "false") {
									Beziehung[y] = false;
								} else if (value[x][y] == parseInt(value[x][y], 10)) {
									// Ganzzahlen als Zahlen importieren
									Beziehung[y] = parseInt(value[x][y], 10);
								} else if (value[x][y] == parseFloat(value[x][y])) {
									// Bruchzahlen als Zahlen importieren
									Beziehung[y] = parseFloat(value[x][y]);
								} else if (y == "Beziehungspartner") {
									Beziehung[y] = [];
									// durch Beziehungspartner loopen und GUIDS mit Objekten ersetzen
									for (var i=0; i<value[x][y].length; i++) {
										Beziehung[y].push(window.adb.bezPartner_objekt[value[x][y][i]]);
									}
								} else {
									// Normalfall
									Beziehung[y] = value[x][y];
								}
								anzFelder++;
							}
						}
						if (anzFelder > 0) {
							Beziehungen.push(Beziehung);
						}
					}
					// entsprechenden Index öffnen
					// sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
					if (Beziehungen.length > 0) {
						// Datenbankabfrage ist langsam. Extern aufrufen, 
						// sonst überholt die for-Schlaufe und Beziehungssammlung ist bis zur saveDoc-Ausführung eine andere!
						window.adb.fügeBeziehungenZuObjekt(key, Beziehungssammlung, Beziehungen);
					}
				});

                // Für 10 Kontrollbeispiele die Links aufbauen
                var erste_10_ids = _.pluck(_.first(window.adb.bsDatensätze, 10), window.adb.BsFelderId);
                _.each(erste_10_ids, function(id, index) {
                    nr = index +1;
                    rückmeldung_links += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
                });

				// Rückmeldung in Feld anzeigen:
                rückmeldung_intro = "Die Daten werden importiert...";
				$("#importieren_bs_import_ausfuehren_hinweis_text").html(rückmeldung_intro);
                $importieren_bs_import_ausfuehren_hinweis.css('display', 'block');
                $('html, body').animate({
                    scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
                }, 2000);
				BsImportiert.resolve();
			}, 1000);
		});
	return BsImportiert.promise();
};

window.adb.bereiteBeziehungspartnerFürImportVor = function() {
	var alle_bez_partner_array = [],
		bez_partner_array,
		beziehungspartner_vorbereitet = $.Deferred(),
		x;
	window.adb.bezPartner_objekt = {};

    _.each(window.adb.bsDatensätze, function(bs_datensatz) {
        if (bs_datensatz.Beziehungspartner) {
            // bs_datensatz.Beziehungspartner ist eine kommagetrennte Liste von guids
            // diese Liste in Array verwandeln
            bez_partner_array = bs_datensatz.Beziehungspartner.split(", ");
            // und in window.adb.bsDatensätze nachführen
            bs_datensatz.Beziehungspartner = bez_partner_array;
            // und vollständige Liste aller Beziehungspartner nachführen
            alle_bez_partner_array = _.union(alle_bez_partner_array, bez_partner_array);
        }
    });
	/*for (x in window.adb.bsDatensätze) {
		if (window.adb.bsDatensätze[x].Beziehungspartner) {
			// window.adb.bsDatensätze[x].Beziehungspartner ist eine kommagetrennte Liste von guids
			// diese Liste in Array verwandeln
			bez_partner_array = window.adb.bsDatensätze[x].Beziehungspartner.split(", ");
			// und in window.adb.bsDatensätze nachführen
			window.adb.bsDatensätze[x].Beziehungspartner = bez_partner_array;
			// und vollständige Liste aller Beziehungspartner nachführen
			alle_bez_partner_array = _.union(alle_bez_partner_array, bez_partner_array);
		}
	}*/
	// jetzt wollen wir ein Objekt bauen, das für alle Beziehungspartner das auszutauschende Objekt enthält
	// danach für jede guid Gruppe, Taxonomie (bei LR) und Name holen und ein Objekt draus machen
	$db = $.couch.db("artendb");
	$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(alle_bez_partner_array)) + '&include_docs=true', {
		success: function(data) {
			var objekt;
			var bezPartner;
			for (var f = 0; f<data.rows.length; f++) {
				objekt = data.rows[f].doc;
				bezPartner = {};
				bezPartner.Gruppe = objekt.Gruppe;
				if (objekt.Gruppe === "Lebensräume") {
					bezPartner.Taxonomie = objekt.Taxonomie.Daten.Taxonomie;
					if (objekt.Taxonomie.Daten.Taxonomie.Label) {
						bezPartner.Name = objekt.Taxonomie.Daten.Label + ": " + objekt.Taxonomie.Daten.Taxonomie.Einheit;
					} else {
						bezPartner.Name = objekt.Taxonomie.Daten.Einheit;
					}
				} else {
					bezPartner.Name = objekt.Taxonomie.Daten["Artname vollständig"];
				}
				bezPartner.GUID = objekt._id;
				window.adb.bezPartner_objekt[objekt._id] = bezPartner;
			}
		}
	});
	beziehungspartner_vorbereitet.resolve();
	return beziehungspartner_vorbereitet.promise();
};

// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Datensammlung
window.adb.entferneDatensammlung = function() {
	var guid_array = [],
		guidArray = [],
		guid,
		DsEntfernt = $.Deferred(),
		x,
		q,
		a,
		batch,
		batchGrösse;
    _.each(window.adb.dsDatensätze, function(datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.DsId === "guid") {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = datensatz.GUID;
        } else {
            console.log("getroffen");
            // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
            // und die guid auslesen
            guid = _.find(window.adb.ZuordbareDatensätze, function(datensatz) {
                return datensatz.Id == datensatz[window.adb.DsFelderId];
            }).Guid;
            /* TODO: löschen, wenn obiger Code getestet ist
            for (q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
                // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                if (window.adb.ZuordbareDatensätze[q].Id == datensatz[window.adb.DsFelderId]) {
                    // und die guid auslesen
                    guid = window.adb.ZuordbareDatensätze[q].Guid;
                    break;
                }
            }*/
        }
        // Einen Array der id's erstellen
        guid_array.push(guid);
    });
	// alle docs gleichzeitig holen
	// aber batchweise
	batch = 150;
	batchGrösse = 150;
	for (a=0; a<batch; a++) {
		if (a < guid_array.length) {
			guidArray.push(guid_array[a]);
			if (a === (batch-1)) {
				window.adb.entferneDatensammlung_2($("#DsName").val(), guidArray, (a-batchGrösse));
				guidArray = [];
				batch += batchGrösse;
			}
		} else {
			window.adb.entferneDatensammlung_2($("#DsName").val(), guidArray, (a-batchGrösse));
			// RückmeldungsLinks in Feld anzeigen:
			$("#importieren_ds_import_ausfuehren_hinweis").css('display', 'block');
			$("#importieren_ds_import_ausfuehren_hinweis_text").html("Die Datensammlungen wurden entfernt<br>Vorsicht: Wahrscheinlich dauert einer der nächsten Vorgänge sehr lange, da nun ein Index neu aufgebaut werden muss.");
			DsEntfernt.resolve();
			break;
		}
	}
	return DsEntfernt.promise();
};

window.adb.entferneDatensammlung_2 = function(DsName, guidArray, a) {
	// alle docs holen
	setTimeout(function() {
		$db = $.couch.db("artendb");
		$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidArray)) + '&include_docs=true', {
			success: function(data) {
				var Objekt;
                _.each(data.rows, function(data_row) {
                    Objekt = data_row.doc;
                    window.adb.entferneDatensammlungAusObjekt(DsName, Objekt);
                });
			}
		});
	}, a*40);
};

window.adb.entferneDatensammlungAusObjekt = function(DsName, Objekt) {
    console.log("entferneDatensammlungAusObjekt");
	if (Objekt.Datensammlungen && Objekt.Datensammlungen.length > 0) {
        /* hat nicht funktioniert
        var datensammlung = _.find(Objekt.Datensammlungen, function(datensammlung) {
            return datensammlung.Name === DsName;
        });
        Objekt.Datensammlungen = _.without(Objekt.Datensammlungen, datensammlung);
        $db = $.couch.db("artendb");
        $db.saveDoc(Objekt);*/
		for (var i=0; i<Objekt.Datensammlungen.length; i++) {
			if (Objekt.Datensammlungen[i].Name === DsName) {
				Objekt.Datensammlungen.splice(i,1);
				$db = $.couch.db("artendb");
				$db.saveDoc(Objekt);
				break;
			}
		}
	}
};

// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Beziehungssammlung
window.adb.entferneBeziehungssammlung = function() {
	var guid_array = [],
		guid,
		bs_name = $("#BsName").val(),
		bs_entfernt = $.Deferred(),
		q,
		a,
		batch = 150,
		batch_grösse = 150;
    _.each(window.adb.bsDatensätze, function(bs_datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.BsId === "guid") {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = bs_datensatz.GUID;
        } else {
            for (q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
                // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                if (window.adb.ZuordbareDatensätze[q].Id == bs_datensatz[window.adb.BsFelderId]) {
                    // und die guid auslesen
                    guid = window.adb.ZuordbareDatensätze[q].Guid;
                    break;
                }
            }
        }
        // Einen Array der id's erstellen
        guid_array.push(guid);
    });

	// guid_array auf die eindeutigen guids reduzieren
	guid_array = _.union(guid_array);

	// alle docs gleichzeitig holen
	// aber batchweise
	for (a=0; a<batch; a++) {
		if (a < guid_array.length) {
			guid_array.push(guid_array[a]);
			if (a === (batch-1)) {
				window.adb.entferneBeziehungssammlung_2(bs_name, guid_array, (a-batch_grösse));
				guid_array = [];
				batch += batch_grösse;
			}
		} else {
			window.adb.entferneBeziehungssammlung_2(bs_name, guid_array, (a-batch_grösse));
			// RückmeldungsLinks in Feld anzeigen:
			$("#importieren_bs_import_ausfuehren_hinweis").css('display', 'block');
			$("#importieren_bs_import_ausfuehren_hinweis_text").html("Die Beziehungssammlungen wurden entfernt<br>Vorsicht: Wahrscheinlich dauert einer der nächsten Vorgänge sehr lange, da nun eine Index neu aufgebaut werden muss.");
			bs_entfernt.resolve();
			break;
		}
	}
	return bs_entfernt.promise();
};

window.adb.entferneBeziehungssammlung_2 = function(bs_name, guid_array, verzögerungs_faktor) {
	// alle docs holen
	setTimeout(function() {
		$db = $.couch.db("artendb");
		$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guid_array)) + '&include_docs=true', {
			success: function(data) {
				var objekt,
					f;
                _.each(data.rows, function(data_row) {
                    objekt = data_row.doc;
                    window.adb.entferneBeziehungssammlungAusObjekt(bs_name, objekt);
                });
			}
		});
	}, verzögerungs_faktor*40);
};

window.adb.entferneBeziehungssammlungAusObjekt = function(bs_name, objekt) {
	if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
		for (var i=0; i<objekt.Beziehungssammlungen.length; i++) {
			if (objekt.Beziehungssammlungen[i].Name === bs_name) {
				objekt.Beziehungssammlungen.splice(i,1);
				$db = $.couch.db("artendb");
				$db.saveDoc(objekt);
				break;
			}
		}
	}
};

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
window.adb.fügeDatensammlungZuObjekt = function(guid, datensammlung) {
	$db = $.couch.db("artendb");
	$db.openDoc(guid, {
		success: function(doc) {
			// Datensammlung anfügen
			doc.Datensammlungen.push(datensammlung);
			// sortieren
			// Datensammlungen nach Name sortieren
			doc.Datensammlungen = window.adb.sortiereObjektarrayNachName(doc.Datensammlungen);
			// in artendb speichern
			$db.saveDoc(doc);
            // mitteilen, dass ein ds importiert wurde
            $(document).trigger('adb.ds_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.ds_nicht_hinzugefügt)
		}
	});
};

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
window.adb.fügeBeziehungenZuObjekt = function(guid, beziehungssammlung, beziehungen) {
	$db = $.couch.db("artendb");
	$db.openDoc(guid, {
		success: function(doc) {
			// prüfen, ob die Beziehung schon existiert
			if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
				var hinzugefügt = false,
					i,
					h;
				for (i in doc.Beziehungssammlungen) {
					if (doc.Beziehungssammlungen[i].Name === beziehungssammlung.Name) {
						for (h=0; h<beziehungen.length; h++) {
							if (!_.contains(doc.Beziehungssammlungen[i].Beziehungen, beziehungen[h])) {
								doc.Beziehungssammlungen[i].Beziehungen.push(beziehungen[h]);
							}
						}
						// Beziehungen nach Name sortieren
						doc.Beziehungssammlungen[i].Beziehungen = window.adb.sortiereBeziehungenNachName(doc.Beziehungssammlungen[i].Beziehungen);
						hinzugefügt = true;
						break;
					}
				}
				if (!hinzugefügt) {
					// die Beziehungssammlung existiert noch nicht
					beziehungssammlung.Beziehungen = [];
                    _.each(beziehungen, function(beziehung) {
                        beziehungssammlung.Beziehungen.push(beziehung);
                    });
					// Beziehungen nach Name sortieren
					beziehungssammlung.Beziehungen = window.adb.sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);
					doc.Beziehungssammlungen.push(beziehungssammlung);
				}
			} else {
				// Beziehungssammlung anfügen
				beziehungssammlung.Beziehungen = [];
                _.each(beziehungen, function(beziehung) {
                    beziehungssammlung.Beziehungen.push(beziehung);
                });
				// Beziehungen nach Name sortieren
				beziehungssammlung.Beziehungen = window.adb.sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);
				doc.Beziehungssammlungen = [];
				doc.Beziehungssammlungen.push(beziehungssammlung);
			}
			// Beziehungssammlungen nach Name sortieren
			doc.Beziehungssammlungen = window.adb.sortiereObjektarrayNachName(doc.Beziehungssammlungen);
			// in artendb speichern
			$db.saveDoc(doc);
            // mitteilen, dass eine bs importiert wurde
            $(document).trigger('adb.bs_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.bs_nicht_hinzugefügt)
		}
	});
};

// übernimmt den Namen einer Datensammlung
// öffnet alle Dokumente, die diese Datensammlung enthalten und löscht die Datensammlung
window.adb.entferneDatensammlungAusAllenObjekten = function(ds_name) {
	var ds_entfernt = $.Deferred();
	$db = $.couch.db("artendb");
	$db.view('artendb/ds_guid?startkey=["' + ds_name + '"]&endkey=["' + ds_name + '",{}]', {
		success: function(data) {
            _.each(data.rows, function(data_row) {
                // guid und DsName übergeben
                window.adb.entferneDatensammlungAusDokument(data_row.key[1], ds_name);
            });
			ds_entfernt.resolve();
		}
	});
	return ds_entfernt.promise();
};

// übernimmt den Namen einer Beziehungssammlung
// öffnet alle Dokumente, die diese Beziehungssammlung enthalten und löscht die Beziehungssammlung
window.adb.entferneBeziehungssammlungAusAllenObjekten = function(bs_name) {
	var bs_entfernt = $.Deferred();
	$db = $.couch.db("artendb");
	$db.view('artendb/bs_guid?startkey=["' + bs_name + '"]&endkey=["' + bs_name + '",{}]', {
		success: function(data) {
            _.each(data.rows, function(data_row) {
                // guid und DsName übergeben
                window.adb.entferneBeziehungssammlungAusDokument(data_row.key[1], bs_name);
            });
			bs_entfernt.resolve();
		}
	});
	return bs_entfernt.promise();
};

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Datensammlung, die zu entfernen ist
// entfernt die Datensammlung
window.adb.entferneDatensammlungAusDokument = function(id, ds_name) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(doc) {
			// Datensammlung entfernen
			for (var i=0; i<doc.Datensammlungen.length; i++) {
				if (doc.Datensammlungen[i].Name === ds_name) {
					doc.Datensammlungen.splice(i,1);
				}
			}
			// in artendb speichern
			$db.saveDoc(doc);
		}
	});
};

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Beziehungssammlung, die zu entfernen ist
// entfernt die Beziehungssammlung
window.adb.entferneBeziehungssammlungAusDokument = function(id, bs_name) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(doc) {
			// Beziehungssammlung entfernen
			for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
				if (doc.Beziehungssammlungen[i].Name === bs_name) {
					doc.Beziehungssammlungen.splice(i,1);
				}
			}
			// in artendb speichern
			$db.saveDoc(doc, {
				success: function() {
				}
			});
		}
	});
};

// prüft die URL. wenn eine id übergeben wurde, wird das entprechende Objekt angezeigt
window.adb.öffneUri = function() {
	// parameter der uri holen
	var uri = new Uri($(location).attr('href')),
		id = uri.getQueryParamValue('id'),
		// wenn browser history nicht unterstützt, erstellt history.js eine hash
		// dann muss die id durch die id in der hash ersetzt werden
		hash = uri.anchor(),
		uri2;
	if (hash) {
		uri2 = new Uri(hash);
		id = uri2.getQueryParamValue('id');
	}
	if (id) {
		// Gruppe ermitteln
		$db = $.couch.db("artendb");
		$db.openDoc(id, {
			success: function(objekt) {
				// window.adb.Gruppe setzen. Nötig, um im Menu die richtigen Felder einzublenden
				window.adb.Gruppe = objekt.Gruppe;
				$(".baum.jstree").jstree("deselect_all");
				// den richtigen Button aktivieren
				$('[gruppe="'+objekt.Gruppe+'"]').button('toggle');
				$("#Gruppe_label").html("Gruppe:");
				// tree aufbauen, danach Datensatz initiieren
				$.when(window.adb.erstelleBaum()).then(function() {
					window.adb.öffneBaumZuId(id);
				});
			}
		});
	}
};
// übernimmt anfangs drei arrays: taxonomien, datensammlungen und beziehungssammlungen
// verarbeitet immer den ersten array und ruft sich mit den übrigen selber wieder auf
window.adb.erstelleExportfelder = function(taxonomien, datensammlungen, beziehungssammlungen) {
	var html_felder_wählen = '',
		html_filtern = '',
		ds_typ,
		x;
	if (taxonomien && datensammlungen && beziehungssammlungen) {
		ds_typ = "Taxonomie";
		html_felder_wählen += '<h3>Taxonomie</h3>';
		html_filtern += '<h3>Taxonomie</h3>';
	} else if (taxonomien && datensammlungen) {
		ds_typ = "Datensammlung";
		html_felder_wählen += '<h3>Datensammlungen</h3>';
		html_filtern += '<h3>Datensammlungen</h3>';
	} else {
		ds_typ = "Beziehung";
		// bei "felder wählen" soll man auch wählen können, ob pro Beziehung eine Zeile oder alle Beziehungen in ein Feld geschrieben werden sollen
		// das muss auch erklärt sein
		html_felder_wählen += '<h3>Beziehungssammlungen</h3><div class="export_zum_titel_gehoerig"><div class="radio"><label><input type="radio" id="export_bez_in_zeilen" checked="checked" name="export_bez_wie">Pro Beziehung eine Zeile</label></div><div class="radio"><label><input type="radio" id="export_bez_in_feldern" name="export_bez_wie">Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld</label></div><div class="well well-small" style="margin-top:9px;">Sie können aus zwei Varianten wählen:<ol><li>Pro Beziehung eine Zeile (Standardeinstellung):<ul><li>Für jede Art oder Lebensraum wird pro Beziehung eine neue Zeile erzeugt</li><li>Anschliessende Auswertungen sind so meist einfacher auszuführen</li><li>Dafür können Sie aus maximal einer Beziehungssammlung Felder wählen (aber wie gewohnt mit beliebig vielen Feldern aus Taxonomie(n) und Datensammlungen ergänzen)</li></ul></li><li>Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld:<ul><li>Von allen Beziehungen der Art oder des Lebensraums wird der Inhalt des Feldes kommagetrennt in das Feld der einzigen Zeile geschrieben</li><li>Sie können Felder aus beliebigen Beziehungssammlungen gleichzeitig exportieren</li></ul></li></ol></div></div>';
		html_filtern += '<h3>Beziehungssammlungen</h3>';
	}
    _.each(taxonomien, function(taxonomie, index) {
        if (index > 0) {
            html_felder_wählen += '<hr>';
            html_filtern += '<hr>';
        }
        html_felder_wählen += '<h5>' + taxonomie.Name + '</h5>';
        // jetzt die checkbox um alle auswählen zu können
        // aber nur, wenn mehr als 1 Feld existieren
        if ((taxonomie.Daten && _.size(taxonomie.Daten) > 1) || (taxonomie.Beziehungen && _.size(taxonomie.Beziehungen) > 1)) {
            html_felder_wählen += '<div class="checkbox"><label>';
            html_felder_wählen += '<input class="feld_waehlen_alle_von_ds" type="checkbox" DsTyp="'+ds_typ+'" Datensammlung="' + taxonomie.Name + '"><em>alle</em>';
            html_felder_wählen += '</div></label>';
        }
        html_felder_wählen += '<div class="felderspalte">';
        html_filtern += '<h5>' + taxonomie.Name + '</h5>';
        html_filtern += '<div class="felderspalte">';
        for (x in (taxonomie.Daten || taxonomie.Beziehungen)) {
            // felder wählen
            html_felder_wählen += '<div class="checkbox"><label>';
            html_felder_wählen += '<input class="feld_waehlen" type="checkbox" DsTyp="'+ds_typ+'" Datensammlung="' + taxonomie.Name + '" Feld="' + x + '">' + x;
            html_felder_wählen += '</div></label>';
            // filtern
            html_filtern += '<div class="form-group">';
            html_filtern += '<label class="control-label" for="exportieren_objekte_waehlen_ds_' + window.adb.ersetzeUngültigeZeichenInIdNamen(x) + '"';
            // Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
            if (x.length > 28) {
                html_filtern += ' style="padding-top:0px"';
            }
            html_filtern += '>'+ x +'</label>';
            html_filtern += '<input class="controls form-control export_feld_filtern form-control input-sm" type="text" id="exportieren_objekte_waehlen_ds_' + window.adb.ersetzeUngültigeZeichenInIdNamen(x) + '" DsTyp="'+ds_typ+'" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '">';
            html_filtern += '</div>';
        }
        // Spalten abschliessen
        html_felder_wählen += '</div>';
        html_filtern += '</div>';
    });
	// linie voranstellen
	html_felder_wählen = '<hr>' + html_felder_wählen;
	html_filtern = '<hr>' + html_filtern;
	if (beziehungssammlungen) {
		$("#exportieren_felder_waehlen_felderliste").html(html_felder_wählen);
		$("#exportieren_objekte_waehlen_ds_felderliste").html(html_filtern);
		window.adb.erstelleExportfelder(datensammlungen, beziehungssammlungen);
	} else if (datensammlungen) {
		$("#exportieren_felder_waehlen_felderliste").append(html_felder_wählen);
		$("#exportieren_objekte_waehlen_ds_felderliste").append(html_filtern);
		window.adb.erstelleExportfelder(datensammlungen);
	} else {
		$("#exportieren_felder_waehlen_felderliste").append(html_felder_wählen);
		$("#exportieren_objekte_waehlen_ds_felderliste").append(html_filtern);
	}
};

window.adb.erstelleExportString = function(exportobjekte) {
	var string_titelzeile = "",
		string_zeilen = "",
		string_zeile;
    _.each(exportobjekte, function(exportobjekt) {
        // aus unerklärlichem Grund blieb stringTitelzeile leer, wenn nur ein Datensatz gefiltert wurde
        // daher bei jedem Datensatz prüfen, ob eine Titelzeile erstellt wurde und wenn nötig ergänzen
        if (string_titelzeile === "" || string_titelzeile === ",") {
            string_titelzeile = "";
            // durch Spalten loopen
            _.each(exportobjekt, function(feld, index) {
                if (string_titelzeile !== "") {
                    string_titelzeile += ',';
                }
                string_titelzeile += '"' + index + '"';
            });
        }

        if (string_zeilen !== "") {
            string_zeilen += '\n';
        }
        string_zeile = "";
        // durch die Felder loopen
        _.each(exportobjekt, function(feld) {
            if (string_zeile !== "") {
                string_zeile += ',';
            }
            // null-Werte als leere Werte
            if (feld === null) {
                string_zeile += "";
            } else if (typeof feld === "number") {
                // Zahlen ohne Anführungs- und Schlusszeichen exportieren
                string_zeile += feld;
            } else if (typeof feld === "object") {
                // Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
                string_zeile += '"' + JSON.stringify(feld).replace(/"/g, "'") + '"';
            } else {
                string_zeile += '"' + feld + '"';
            }
        });
        string_zeilen += string_zeile;
    });
	return string_titelzeile + "\n" + string_zeilen;
};

// baut im Formular "export" die Liste aller Eigenschaften auf
// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
// bekommt den Namen der Gruppe
window.adb.erstelleListeFürFeldwahl = function() {
	var export_gruppen = [],
		gruppen = [],
        $exportieren_objekte_waehlen_gruppen_hinweis_text = $("#exportieren_objekte_waehlen_gruppen_hinweis_text");
	// Beschäftigung melden
	$exportieren_objekte_waehlen_gruppen_hinweis_text
        .alert()
        .css("display", "block")
	    .html("Eigenschaften werden ermittelt...");
	// scrollen, damit Hinweis sicher ganz sichtbar ist
	$('html, body').animate({
		scrollTop: $exportieren_objekte_waehlen_gruppen_hinweis_text.offset().top
	}, 2000);
	// gewählte Gruppen ermitteln
	// globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
	// globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
	var export_felder_arrays = [];
	$db = $.couch.db("artendb");
	$(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			export_gruppen.push($(this).val());
		}
	});
	if (export_gruppen.length > 0) {
		gruppen = export_gruppen;
        _.each(gruppen, function(gruppe) {
            // Felder abfragen
            $db.view('artendb/felder?group_level=4&startkey=["'+gruppe+'"]&endkey=["'+gruppe+'",{},{},{},{}]', {
                success: function(data) {
                    export_felder_arrays = _.union(export_felder_arrays, data.rows);
                    // eine Gruppe aus export_gruppen entfernen
                    export_gruppen.splice(0,1);
                    if (export_gruppen.length === 0) {
                        // alle Gruppen sind verarbeitet
                        window.adb.erstelleListeFürFeldwahl_2(export_felder_arrays);
                    }
                }
            });
        });
	} else {
		// letzte Rückmeldung anpassen
		$exportieren_objekte_waehlen_gruppen_hinweis_text.html("keine Gruppe gewählt");
		// Felder entfernen
		$("#exportieren_felder_waehlen_felderliste").html("");
		$("#exportieren_objekte_waehlen_ds_felderliste").html("");
	}
};

window.adb.erstelleListeFürFeldwahl_2 = function(export_felder_arrays) {
	var felder_objekt = {},
		hinweis_taxonomien,
        taxonomien,
        datensammlungen,
        beziehungssammlungen;

	// in export_felder_arrays ist eine Liste der Felder, die in dieser Gruppe enthalten sind
	// sie kann aber Mehrfacheinträge enthalten, die sich in der Gruppe unterscheiden
	// Muster: Gruppe, Typ der Datensammlung, Name der Datensammlung, Name des Felds
	// Mehrfacheinträge sollen entfernt werden

	// dazu muss zuerst die Gruppe entfernt werden
    _.each(export_felder_arrays, function(export_felder) {
        export_felder.key.splice(0,1);
    });

	// jetzt nur noch eineindeutige Array-Objekte (=Datensammlungen) belassen
	export_felder_arrays = _.union(export_felder_arrays);
	// jetzt den Array von Objekten nach key sortieren
	export_felder_arrays = _.sortBy(export_felder_arrays, function(object) {
		return object.key;
	});

	// Im Objekt "FelderObjekt" werden die Felder aller gewählten Gruppen gesammelt
	felder_objekt = window.adb.ergänzeFelderObjekt(felder_objekt, export_felder_arrays);

	// bei allfälligen "Taxonomie(n)" Feldnamen sortieren
	if (felder_objekt["Taxonomie(n)"] && felder_objekt["Taxonomie(n)"].Daten) {
		felder_objekt["Taxonomie(n)"].Daten = window.adb.sortKeysOfObject(felder_objekt["Taxonomie(n)"].Daten);
	}

	// Taxonomien und Datensammlungen aus dem FelderObjekt extrahieren
	taxonomien = [];
	datensammlungen = [];
	beziehungssammlungen = [];

    _.each(felder_objekt, function(ds) {
        if (typeof ds === "object" && ds.Typ) {
            // das ist Datensammlung oder Taxonomie
            if (ds.Typ === "Datensammlung") {
                datensammlungen.push(ds);
            } else if (ds.Typ === "Taxonomie") {
                taxonomien.push(ds);
            } else if (ds.Typ === "Beziehung") {
                beziehungssammlungen.push(ds);
            }
        }
    });

	window.adb.erstelleExportfelder(taxonomien, datensammlungen, beziehungssammlungen);

	// kontrollieren, ob Taxonomien zusammengefasst werden
	if ($("#exportieren_objekte_Taxonomien_zusammenfassen").hasClass("active")) {
		hinweis_taxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien sind zusammengefasst";
	} else {
		hinweis_taxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien werden einzeln dargestellt";
	}
	// Ergebnis rückmelden
	$("#exportieren_objekte_waehlen_gruppen_hinweis_text")
        .alert()
        .css("display", "block")
        .html(hinweis_taxonomien);
};

// Nimmt ein FelderObjekt entgegen. Das ist entweder leer (erste Gruppe) oder enthält schon Felder (ab der zweiten Gruppe)
// Nimmt ein Array mit Feldern entgegen
// mit der Struktur: {"key":["Flora","Datensammlung","Blaue Liste (1998)","Anwendungshäufigkeit zur Erhaltung"],"value":null}
// ergänzt das FelderObjekt um diese Felder
// retourniert das ergänzte FelderObjekt
// das FelderObjekt enthält alle gewünschten Felder. Darin sind nullwerte
window.adb.ergänzeFelderObjekt = function(felder_objekt, felder_array) {
	var ds_typ,
		ds_name,
		feldname;
    _.each(felder_array, function(feld_objekt) {
        if (feld_objekt.key) {
            // Gruppe wurde entfernt, so sind alle keys um 1 kleiner als ursprünglich
            ds_typ = feld_objekt.key[0];
            ds_name = feld_objekt.key[1];
            feldname = feld_objekt.key[2];
            if (ds_typ === "Objekt") {
                // das ist eine Eigenschaft des Objekts
                //FelderObjekt[FeldName] = null;	// NICHT HINZUFÜGEN, DIESE FELDER SIND SCHON IM FORMULAR FIX DRIN
            } else if (window.adb.fasseTaxonomienZusammen && ds_typ === "Taxonomie") {
                // Datensammlungen werden zusammengefasst. DsTyp muss "Taxonomie(n)" heissen und die Felder aller Taxonomien sammeln
                // Wenn Datensammlung noch nicht existiert, gründen
                if (!felder_objekt["Taxonomie(n)"]) {
                    felder_objekt["Taxonomie(n)"] = {};
                    felder_objekt["Taxonomie(n)"].Typ = ds_typ;
                    felder_objekt["Taxonomie(n)"].Name = "Taxonomie(n)";
                    felder_objekt["Taxonomie(n)"].Daten = {};
                }
                // Feld ergänzen
                felder_objekt["Taxonomie(n)"].Daten[feldname] = null;
            } else if (ds_typ === "Datensammlung" || ds_typ === "Taxonomie") {
                // Wenn Datensammlung oder Taxonomie noch nicht existiert, gründen
                if (!felder_objekt[ds_name]) {
                    felder_objekt[ds_name] = {};
                    felder_objekt[ds_name].Typ = ds_typ;
                    felder_objekt[ds_name].Name = ds_name;
                    felder_objekt[ds_name].Daten = {};
                }
                // Feld ergänzen
                felder_objekt[ds_name].Daten[feldname] = null;
            } else if (ds_typ === "Beziehung") {
                // Wenn Beziehungstyp noch nicht existiert, gründen
                if (!felder_objekt[ds_name]) {
                    felder_objekt[ds_name] = {};
                    felder_objekt[ds_name].Typ = ds_typ;
                    felder_objekt[ds_name].Name = ds_name;
                    felder_objekt[ds_name].Beziehungen = {};
                }
                // Feld ergänzen
                felder_objekt[ds_name].Beziehungen[feldname] = null;
            }
        }
    });
	return felder_objekt;
};

// wird aufgerufen durch eine der zwei Schaltflächen: "Vorschau anzeigen", "direkt exportieren"
// direkt: list-funktion aufrufen, welche die Daten direkt herunterlädt
window.adb.filtereFürExport = function(direkt) {
	// Array von Filterobjekten bilden
	var filterkriterien = [],
		// Objekt bilden, in das die Filterkriterien integriert werden, da ein array schlecht über die url geliefert wird
		filterkriterien_objekt = {},
		filter_objekt,
		gruppen_array = [],
		gruppen = "",
		gewählte_felder = [],
		gewählte_felder_objekt = {},
		anz_ds_gewählt = 0,
        $exportieren_exportieren_hinweis_text = $("#exportieren_exportieren_hinweis_text");

	// kontrollieren, ob eine Gruppe gewählt wurde
	if (window.adb.fuerExportGewaehlteGruppen().length === 0) {
		$('#meldung_keine_gruppen').modal();
		return;
	}

	// Beschäftigung melden
	if (!direkt) {
		$exportieren_exportieren_hinweis_text
            .alert()
            .css("display", "block")
            .html("Die Daten werden vorbereitet...");
	}

	// zum Hinweistext scrollen
	$('html, body').animate({
		scrollTop: $exportieren_exportieren_hinweis_text.offset().top
	}, 2000);
	// gewählte Gruppen ermitteln
	$(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			gruppen_array.push($(this).attr('view'));
			if (gruppen) {
				gruppen += ",";
			}
			gruppen += $(this).val();
		}
	});
	// durch alle Filterfelder loopen
	// wenn ein Feld einen Wert enthält, danach filtern
	$("#exportieren_objekte_waehlen_ds_collapse").find(".export_feld_filtern").each(function() {
		if (this.value || this.value === 0) {
			// Filterobjekt zurücksetzen
			filter_objekt = {};
			filter_objekt.DsTyp = $(this).attr('dstyp');
			filter_objekt.DsName = $(this).attr('eigenschaft');
			filter_objekt.Feldname = $(this).attr('feld');
			// Filterwert in Kleinschrift verwandeln, damit Gross-/Kleinschrift nicht wesentlich ist (Vergleichswerte werden von filtereFürExport später auch in Kleinschrift verwandelt)
			filter_objekt.Filterwert = window.adb.ermittleVergleichsoperator(this.value)[1];
			filter_objekt.Vergleichsoperator = window.adb.ermittleVergleichsoperator(this.value)[0];
			filterkriterien.push(filter_objekt);
		}
	});
	// den array dem objekt zuweisen
	filterkriterien_objekt.filterkriterien = filterkriterien;
	// gewählte Felder ermitteln
	$(".exportieren_felder_waehlen_objekt_feld.feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			// feldObjekt erstellen
			var feldObjekt = {};
			feldObjekt.DsName = "Objekt";
			feldObjekt.Feldname = $(this).attr('feldname');
			gewählte_felder.push(feldObjekt);
		}
	});
	$("#exportieren_felder_waehlen_felderliste").find(".feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			// feldObjekt erstellen
			var feldObjekt = {};
			feldObjekt.DsTyp = $(this).attr('dstyp');
			if (feldObjekt.DsTyp !== "Taxonomie") {
				anz_ds_gewählt++;
			}
			feldObjekt.DsName = $(this).attr('datensammlung');
			feldObjekt.Feldname = $(this).attr('feld');
			gewählte_felder.push(feldObjekt);
		}
	});
	// den array dem objekt zuweisen
	gewählte_felder_objekt.felder = gewählte_felder;

	// Wenn keine Felder gewählt sind: Melden und aufhören
	if (gewählte_felder_objekt.felder.length === 0) {
		// Beschäftigungsmeldung verstecken
		$exportieren_exportieren_hinweis_text
            .alert()
            .css("display", "none");
        $("#exportieren_exportieren_error_text_text")
            .html("Keine Eigenschaften gewählt<br>Bitte wählen Sie Eigenschaften, die exportiert werden sollen");
		$("#exportieren_exportieren_error_text")
            .alert()
            .css("display", "block");
		return;
	}

	// jetzt das filterObjekt übergeben
	if (direkt) {
		window.adb.übergebeFilterFürDirektExport(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
	} else {
		window.adb.übergebeFilterFürExportMitVorschau(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
	}
};

window.adb.übergebeFilterFürDirektExport = function(gruppen, gruppen_array, anz_ds_gewaehlt, filterkriterienObjekt, gewaehlte_felder_objekt) {
	// Alle Felder abfragen
	var fTz = "false",
		queryParam;
	// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
	if (window.adb.fasseTaxonomienZusammen) {
		fTz = "true";
	}
	if ($("#exportieren_synonym_infos").prop('checked')) {
		queryParam = "export_mit_synonymen_direkt/all_docs_mit_synonymen?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
	} else {
		queryParam = "export_direkt/all_docs?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
	}
	if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewaehlt > 0) {
		// prüfen, ob mindestens ein Feld aus ds gewählt ist
		// wenn ja: true, sonst false
		queryParam += "&nur_objekte_mit_eigenschaften=true";
	} else {
		queryParam += "&nur_objekte_mit_eigenschaften=false";
	}
	if ($("#export_bez_in_zeilen").prop('checked')) {
		queryParam += "&bez_in_zeilen=true";
	} else {
		queryParam += "&bez_in_zeilen=false";
	}
	window.open('_list/' + queryParam);
};

window.adb.übergebeFilterFürExportMitVorschau = function(gruppen, gruppen_array, anz_ds_gewählt, filterkriterienObjekt, gewählte_felder_objekt) {
	// Alle Felder abfragen
	var fTz = "false",
		anz_gruppen_abgefragt = 0,
		i,
		dbParam,
		queryParam;
	// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
	if (window.adb.fasseTaxonomienZusammen) {
		fTz = "true";
	}
	// globale Variable vorbereiten
	window.adb.exportieren_objekte = [];
	// in anz_gruppen_abgefragt wird gezählt, wieviele Gruppen schon abgefragt wurden
	// jede Abfrage kontrolliert nach Erhalt der Daten, ob schon alle Gruppen abgefragt wurden und macht weiter, wenn ja
    _.each(gruppen_array, function(gruppe) {
        if ($("#exportieren_synonym_infos").prop('checked')) {
            dbParam = "artendb/export_mit_synonymen";
            queryParam = gruppe + "_mit_synonymen?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
        } else {
            dbParam = "artendb/export";
            queryParam = gruppe + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
        }
        if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewählt > 0) {
            // prüfen, ob mindestens ein Feld aus ds gewählt ist
            // wenn ja: true, sonst false
            queryParam += "&nur_objekte_mit_eigenschaften=true";
        } else {
            queryParam += "&nur_objekte_mit_eigenschaften=false";
        }
        if ($("#export_bez_in_zeilen").prop('checked')) {
            queryParam += "&bez_in_zeilen=true";
        } else {
            queryParam += "&bez_in_zeilen=false";
        }
        $db = $.couch.db("artendb");
        $db.list(dbParam, queryParam, {
            success: function(data) {
                // alle Objekte in data in window.adb.exportieren_objekte anfügen
                window.adb.exportieren_objekte = _.union(window.adb.exportieren_objekte, data);
                // speichern, dass eine Gruppe abgefragt wurde
                anz_gruppen_abgefragt++;
                if (anz_gruppen_abgefragt === gruppen_array.length) {
                    // alle Gruppen wurden abgefragt, jetzt kann es weitergehen
                    // Ergebnis rückmelden
                    $("#exportieren_exportieren_hinweis_text")
                        .alert()
                        .css("display", "block")
                        .html(window.adb.exportieren_objekte.length + " Objekte sind gewählt");
                    window.adb.baueTabelleFürExportAuf();
                }
            },
            error: function() {
                console.log('error in $db.list');
            }
        });
    });
};

window.adb.baueTabelleFürExportAuf = function() {
	if (window.adb.exportieren_objekte.length > 0) {
		window.adb.erstelleTabelle(window.adb.exportieren_objekte, "", "exportieren_exportieren_tabelle");
		$(".exportieren_exportieren_exportieren").show();
		// zur Tabelle scrollen
		$('html, body').animate({
			scrollTop: $("#exportieren_exportieren_exportieren").offset().top
		}, 2000);
	} else if (window.adb.exportieren_objekte && window.adb.exportieren_objekte.length === 0) {
        $("#exportieren_exportieren_error_text_text")
            .html("Keine Eigenschaften gewählt<br>Bitte wählen Sie Eigenschaften, die exportiert werden sollen");
        $("#exportieren_exportieren_error_text")
            .alert()
            .css("display", "block");
        $('html, body').animate({
            scrollTop: $("#exportieren_exportieren_exportieren").offset().top
        }, 2000);

	}
	// Beschäftigungsmeldung verstecken
	$("#exportieren_exportieren_hinweis_text")
        .alert()
        .css("display", "none");
};

window.adb.fuerExportGewaehlteGruppen = function() {
	var gruppen = [];
	$(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			gruppen.push($(this).attr('feldname'));
		}
	});
	return gruppen;
};

// woher wird bloss benötigt, wenn angemeldet werden muss
window.adb.bereiteImportieren_ds_beschreibenVor = function(woher) {
	if (!window.adb.pruefeAnmeldung("woher")) {
		$('#importieren_ds_ds_beschreiben_collapse').collapse('hide');
	} else {
		$("#DsName").focus();
		// Daten holen, wenn nötig
		if (window.adb.ds_von_objekten) {
			window.adb.bereiteImportieren_ds_beschreibenVor_02();
		} else {
			$db = $.couch.db("artendb");
			$db.view('artendb/ds_von_objekten?startkey=["Datensammlung"]&endkey=["Datensammlung",{},{},{},{}]&group_level=5', {
				success: function(data) {
					// Daten in Objektvariable speichern > Wenn Ds ausgesählt, Angaben in die Felder kopieren
					window.adb.ds_von_objekten = data;
					window.adb.bereiteImportieren_ds_beschreibenVor_02();
				}
			});
		}
	}
};

// DsNamen in Auswahlliste stellen
// veränderbare sind normal, übrige grau
window.adb.bereiteImportieren_ds_beschreibenVor_02 = function() {
	var i,
		html,
		z;
	// in diesem Array werden alle keys gesammelt
	// diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
	window.adb.DsKeys = [];
	for (i=0; i<window.adb.ds_von_objekten.rows.length; i++) {
		window.adb.DsKeys.push(window.adb.ds_von_objekten.rows[i].key);
	}
	// nach DsNamen sortieren
	window.adb.DsKeys = _.sortBy(window.adb.DsKeys, function(key) {
		return key[1];
	});
	// mit leerer Zeile beginnen
	html = "<option value=''></option>";
	// Namen der Datensammlungen als Optionen anfügen
	for (z in window.adb.DsKeys) {
		// veränderbar sind nur selbst importierte und zusammenfassende
		if (window.adb.DsKeys[z][3] === localStorage.Email || window.adb.DsKeys[z][2]) {
			// veränderbare sind normal = schwarz
			html += "<option value='" + window.adb.DsKeys[z][1] + "' waehlbar=true>" + window.adb.DsKeys[z][1] + "</option>";
		} else {
			// nicht veränderbare sind grau
			html += "<option value='" + window.adb.DsKeys[z][1] + "' style='color:grey;' waehlbar=false>" + window.adb.DsKeys[z][1] + "</option>";
		}
	}
	$("#DsWaehlen").html(html);
	$("#DsUrsprungsDs").html(html);
};

// woher wird bloss benötigt, wenn angemeldet werden muss
window.adb.bereiteImportieren_bs_beschreibenVor = function(woher) {
	if (!window.adb.pruefeAnmeldung("woher")) {
		$('#importieren_bs_ds_beschreiben_collapse').collapse('hide');
	} else {
		$("#BsName").focus();
		// anzeigen, dass Daten geladen werden. Nein: Blitzt bloss kurz auf
		//$("#BsWaehlen").html("<option value='null'>Bitte warte, die Liste wird aufgebaut...</option>");
		// Daten holen, wenn nötig
		if (window.adb.bs_von_objekten) {
			window.adb.bereiteImportieren_bs_beschreibenVor_02();
		} else {
			$db = $.couch.db("artendb");
			$db.view('artendb/ds_von_objekten?startkey=["Beziehungssammlung"]&endkey=["Beziehungssammlung",{},{},{},{}]&group_level=5', {
				success: function(data) {
					// Daten in Objektvariable speichern > Wenn Ds ausgesählt, Angaben in die Felder kopieren
					window.adb.bs_von_objekten = data;
					window.adb.bereiteImportieren_bs_beschreibenVor_02();
				}
			});
		}
	}
};

window.adb.bereiteImportieren_bs_beschreibenVor_02 = function() {
	var i,
		html,
		z;
	// in diesem Array werden alle keys gesammelt
	// diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
	window.adb.BsKeys = [];
	for (i=0; i< window.adb.bs_von_objekten.rows.length; i++) {
		window.adb.BsKeys.push(window.adb.bs_von_objekten.rows[i].key);
	}
	// nach DsNamen sortieren
	window.adb.BsKeys = _.sortBy(window.adb.BsKeys, function(key) {
		return key[1];
	});
	// mit leerer Zeile beginnen
	html = "<option value=''></option>";
	// Namen der Datensammlungen als Optionen anfügen
	for (z in window.adb.BsKeys) {
		// veränderbar sind nur selbst importierte und zusammenfassende
		if (window.adb.BsKeys[z][3] === localStorage.Email || window.adb.BsKeys[z][2]) {
			// veränderbare sind normal = schwarz
			html += "<option value='" + window.adb.BsKeys[z][1] + "' waehlbar=true>" + window.adb.BsKeys[z][1] + "</option>";
		} else {
			// nicht veränderbare sind grau
			html += "<option value='" + window.adb.BsKeys[z][1] + "' style='color:grey;' waehlbar=false>" + window.adb.BsKeys[z][1] + "</option>";
		}
	}
	$("#BsWaehlen").html(html);
	$("#BsUrsprungsBs").html(html);
};

window.adb.isFileAPIAvailable = function() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		return true;
	} else {
		// source: File API availability - //caniuse.com/#feat=fileapi
		// source: <output> availability - //html5doctor.com/the-output-element/
		var html = "Für den Datenimport benötigen Sie mindestens einen der folgenden Browser:<br>";
		html += "(Stand März 2014)<br>";
		html += "- Google Chrome: 13 oder neuer<br>";
		html += "- Chrome auf Android: 33 oder neuer<br>";
		html += "- Mozilla Firefox: 3.6 oder neuer<br>";
		html += "- Firefox auf Android: 26 oder neuer<br>";
		html += "- Safari: 6.0 oder neuer<br>";
		html += "- iOs Safari: 6.0 oder neuer<br>";
		html += "- Opera: 11.1 oder neuer<br>";
		html += "- Internet Explorer: 10 oder neuer<br>";
		html += "- Internet Explorer mobile: bis Version 10 nicht<br>";
		html += "- Android Standardbrowser: Android 4.4 oder neuer<br>";
		$("#fileApiMeldungText").html(html);
		$('#fileApiMeldung').modal();
		return false;
	}
};

window.adb.sortiereObjektarrayNachName = function(objektarray) {
	// Beziehungssammlungen bzw. Datensammlungen nach Name sortieren
	objektarray.sort(function(a, b) {
		var aName = a.Name,
			bName = b.Name;
		if (aName && bName) {
			return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
		} else {
			return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
		}
	});
	return objektarray;
};

// übernimmt einen Array mit den Beziehungen
// gibt diesen sortiert zurück
window.adb.sortiereBeziehungenNachName = function(beziehungen) {
// Beziehungen nach Name sortieren
	beziehungen.sort(function(a, b) {
		var aName,
			bName,
			c,
			d;
		for (c in a.Beziehungspartner) {
			if (a.Beziehungspartner[c].Gruppe === "Lebensräume") {
				// sortiert werden soll bei Lebensräumen zuerst nach Taxonomie, dann nach Name
				aName = a.Beziehungspartner[c].Gruppe + a.Beziehungspartner[c].Taxonomie + a.Beziehungspartner[c].Name;
			} else {
				aName = a.Beziehungspartner[c].Gruppe + a.Beziehungspartner[c].Name;
			}
		}
		for (d in b.Beziehungspartner) {
			if (b.Beziehungspartner[d].Gruppe === "Lebensräume") {
				bName = b.Beziehungspartner[d].Gruppe + b.Beziehungspartner[d].Taxonomie + b.Beziehungspartner[d].Name;
			} else {
				bName = b.Beziehungspartner[d].Gruppe + b.Beziehungspartner[d].Name;
			}
		}
		if (aName && bName) {
			return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
		} else {
			return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
		}
	});
	return beziehungen;
};

// sortiert nach den keys des Objekts
// resultat nicht garantiert!
window.adb.sortKeysOfObject = function(o) {
	var sorted = {},
		key,
		a = [];

	for (key in o) {
		if (o.hasOwnProperty(key)) {
			a.push(key);
		}
	}

	a.sort();

	for (key = 0; key < a.length; key++) {
		sorted[a[key]] = o[a[key]];
	}
	return sorted;
};

window.adb.exportZuruecksetzen = function() {
    var $exportieren_exportieren_collapse = $("#exportieren_exportieren_collapse");
	// Export ausblenden, falls sie eingeblendet war
	if ($exportieren_exportieren_collapse.css("display") !== "none") {
		$exportieren_exportieren_collapse.collapse('hide');
	}
	$("#exportieren_exportieren_tabelle").hide();
	$(".exportieren_exportieren_exportieren").hide();
	$("#exportieren_exportieren_error_text")
        .alert()
        .css("display", "none");
};

window.adb.oeffneGruppe = function(Gruppe) {
	// Gruppe als globale Variable speichern, weil sie an vielen Orten benutzt wird
	window.adb.Gruppe = Gruppe;
	$(".suchfeld").val("");
	$("#Gruppe_label").html("Gruppe:");
	$(".suchen")
        .hide()
        .val("");
	$("#forms").hide();
	var treeMitteilung = "hole Daten...";
	if (window.adb.Gruppe === "Macromycetes") {
		treeMitteilung = "hole Daten (das dauert bei Pilzen länger...)";
	}
	$("#treeMitteilung")
        .html(treeMitteilung)
        .show();
	window.adb.erstelleBaum();
	// keine Art mehr aktiv
	delete localStorage.art_id;
};

// schreibt Änderungen in Feldern in die Datenbank
// wird vorläufig nur für LR Taxonomie verwendet
window.adb.speichern = function(feldWert, feldName, dsName, dsTyp) {
	// zuerst die id des Objekts holen
	var uri = new Uri($(location).attr('href')),
		id = uri.getQueryParamValue('id'),
		// wenn browser history nicht unterstützt, erstellt history.js eine hash
		// dann muss die id durch die id in der hash ersetzt werden
		hash = uri.anchor(),
		uri2;
	if (hash) {
		uri2 = new Uri(hash);
		id = uri2.getQueryParamValue('id');
	}
	// sicherstellen, dass boolean, float und integer nicht in Text verwandelt werden
	feldWert = window.adb.convertToCorrectType(feldWert);
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(object) {
			// prüfen, ob Einheit eines LR verändert wurde. Wenn ja: Name der Taxonomie anpassen
			if (feldName === "Einheit" && object.Taxonomie.Daten.Einheit === object.Taxonomie.Daten.Taxonomie) {
				// das ist die Wurzel der Taxonomie
				// somit ändert auch der Taxonomiename
				// diesen mitgeben
				// Einheit ändert und Taxonomiename muss auch angepasst werden
				object.Taxonomie.Name = feldWert;
				object.Taxonomie.Daten.Taxonomie = feldWert;
				// TODO: prüfen, ob die Änderung zulässig ist (Taxonomiename eindeutig) --- VOR DEM SPEICHERN
				// TODO: allfällige Beziehungen anpassen
			}
			// den übergebenen Wert im übergebenen Feldnamen speichern
			object.Taxonomie.Daten[feldName] = feldWert;
			$db.saveDoc(object, {
				success: function(data) {
					object._rev = data.rev;
					// prüfen, ob Label oder Name eines LR verändert wurde. Wenn ja: Hierarchie aktualisieren
					if (feldName === "Label" || feldName === "Einheit") {
						if (feldName === "Einheit" && object.Taxonomie.Daten.Einheit === object.Taxonomie.Daten.Taxonomie) {
							// das ist die Wurzel der Taxonomie
							// somit ändert auch der Taxonomiename
							// diesen mitgeben
							// Einheit ändert und Taxonomiename muss auch angepasst werden
							window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, feldWert);
							// Feld Taxonomie und Beschriftung des Accordions aktualisiern
							// dazu neu initiieren, weil sonst das Accordion nicht verändert wird
							window.adb.initiiere_art(id);
							// Taxonomie anzeigen
							$('#' + window.adb.ersetzeUngültigeZeichenInIdNamen(feldWert)).collapse('show');
						} else {
							window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, false);
						}
						// node umbenennen
						var neuerNodetext;
						if (feldName === "Label") {
							// object hat noch den alten Wert für Label, neuen verwenden
							neuerNodetext = window.adb.erstelleLrLabelName(feldWert, object.Taxonomie.Daten.Einheit);
						} else {
							// object hat noch den alten Wert für Einheit, neuen verwenden
							neuerNodetext = window.adb.erstelleLrLabelName(object.Taxonomie.Daten.Label, feldWert);
						}
						$("#tree" + window.adb.Gruppe).jstree("rename_node", "#" + object._id, neuerNodetext);
					}
				},
				error: function() {
					$("#meldung_individuell_label").html("Fehler");
					$("#meldung_individuell_text").html("Die letzte Änderung im Feld "+feldName+" wurde nicht gespeichert");
					$("#meldung_individuell_schliessen").html("schliessen");
					$('#meldung_individuell').modal();
				}
			});
		},
		error: function() {
			$("#meldung_individuell_label").html("Fehler");
			$("#meldung_individuell_text").html("Die letzte Änderung im Feld "+feldName+" wurde nicht gespeichert");
			$("#meldung_individuell_schliessen").html("schliessen");
			$('#meldung_individuell').modal();
		}
	});
};

window.adb.convertToCorrectType = function(feldWert) {
	var type = window.adb.myTypeOf(feldWert);
	if (type === "boolean") {
		return Boolean(feldWert);
	} else if (type === "float") {
		return parseFloat(feldWert);
	} else if (type === "integer") {
		return parseInt(feldWert);
	} else {
		return feldWert;
	}
};

// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!
window.adb.myTypeOf = function(Wert) {
	if (typeof Wert === "boolean") {
		return "boolean";
	} else if (parseInt(Wert) && parseFloat(Wert) && parseInt(Wert) != parseFloat(Wert) && parseInt(Wert) == Wert) {
		// es ist eine Float
		return "float";
	// verhindern, dass führende Nullen abgeschnitten werden
	} else if (parseInt(Wert) == Wert && Wert.toString().length === Math.ceil(parseInt(Wert)/10)) {
		// es ist eine Integer
		return "integer";
	} else {
		// als String behandeln
		return "string";
	}
};

window.adb.bearbeiteLrTaxonomie = function() {
	// Benutzer muss anmelden
	if (!window.adb.pruefeAnmeldung("art")) {
		return false;
	}

	// Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
	localStorage.lr_bearb = true;

	// Anmeldung: zeigen, aber geschlossen
	$("#art_anmelden_collapse").collapse('hide');
	$("#art_anmelden").show();

	// alle Felder schreibbar setzen
	//$(".Lebensräume.Taxonomie .controls").each(function() {
	$(".Lebensräume.Taxonomie .controls").each(function() {
		// einige Felder nicht bearbeiten
		if ($(this).attr('id') !== "GUID" && $(this).attr('id') !== "Parent" && $(this).attr('id') !== "Taxonomie" && $(this).attr('id') !== "Hierarchie") {
			$(this).attr('readonly', false);
			if ($(this).parent().attr('href')) {
				$(this).parent().attr('href', '#');
				// Standardverhalten beim Klicken von Links verhindern
				$(this).parent().attr('onclick', 'return false;');
				// Mauspointer nicht mehr als Finger
				this.style.cursor = '';
			}
		}
	});

	// Schreibbarkeit in den Symbolen anzeigen
	$('.lr_bearb').removeClass('disabled');
	$(".lr_bearb_bearb").addClass('disabled');
};

window.adb.schuetzeLrTaxonomie = function() {
	// alle Felder schreibbar setzen
	$(".Lebensräume.Taxonomie .controls").each(function() {
		$(this).attr('readonly', true);
		if ($(this).parent().attr('href')) {
			var feldWert = $(this).val();
			if (typeof feldWert === "string" && feldWert.slice(0, 7) === "//") {
				$(this).parent().attr('href', feldWert);
				// falls onclick besteht, entfernen
				$(this).parent().removeAttr("onclick");
				// Mauspointer nicht mehr als Finger
				this.style.cursor = 'pointer';
			}
		}
	});
	$('.lr_bearb').addClass('disabled');
	$(".lr_bearb_bearb").removeClass('disabled');
	$("#art_anmelden").hide();
};

// aktualisiert die Hierarchie eines Arrays von Objekten (in dieser Form: Lebensräumen, siehe wie der Name der parent-objekte erstellt wird)
// der Array kann das Resultat einer Abfrage aus der DB sein (object[i] = dara.rows[i].doc)
// oder aus dem Import einer Taxonomie stammen
// diese Funktion wird benötigt, wenn eine neue Taxonomie importiert wird
// Momentan nicht verwendet
window.adb.aktualisiereHierarchieEinerLrTaxonomie = function(objekt_array) {
	var i,
		object,
		hierarchie,
		parent;
	for (i=0; i<objekt_array.length; i++) {
		object = objekt_array[i];
		hierarchie = [];
		parent = object.Taxonomie.Daten.Parent;
		// als Start sich selben zur Hierarchie hinzufügen
		hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(object));
		if (parent) {
			object.Taxonomie.Daten.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(objekt_array, object._id, hierarchie);
			$db.saveDoc(object);
		}
	}
};

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// diese Funktion wird benötigt, wenn ein neuer LR erstellt wird
// LR kann mitgegeben werden, muss aber nicht
// wird mitgegeben, wenn an den betreffenden lr nichts ändert und nicht jedesmal die LR aus der DB neu abgerufen werden sollen
// manchmal ist es aber nötig, die LR neu zu holen, wenn dazwischen an LR geändert wird!
window.adb.aktualisiereHierarchieEinesNeuenLr = function(LR, object, aktualisiereHierarchiefeld) {
	if (LR) {
		window.adb.aktualisiereHierarchieEinesNeuenLr_2(object, aktualisiereHierarchiefeld);
	} else {
		$db = $.couch.db("artendb");
		$db.view('artendb/lr?include_docs=true', {
			success: function(data) {
				window.adb.aktualisiereHierarchieEinesNeuenLr_2(data, object, aktualisiereHierarchiefeld);
			}
		});
	}
};

window.adb.aktualisiereHierarchieEinesNeuenLr_2 = function(LR, object) {
	var object_array,
		hierarchie = [],
		parent_object;
	object_array = _.map(LR.rows, function(row) {
		return row.doc;
	});
	if (!object.Taxonomie) {
		object.Taxonomie = {};
	}
	if (!object.Taxonomie.Daten) {
		object.Taxonomie.Daten = {};
	}
	parent_object = _.find(object_array, function(obj) {
		return obj._id === object.Taxonomie.Daten.Parent.GUID;
	});
	// object.Name setzen
	object.Taxonomie.Name = parent_object.Taxonomie.Name;
	// object.Taxonomie.Daten.Taxonomie setzen
	object.Taxonomie.Daten.Taxonomie = parent_object.Taxonomie.Daten.Taxonomie;
	// als Start sich selben zur Hierarchie hinzufügen
	hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(object));
	object.Taxonomie.Daten.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(object_array, object.Taxonomie.Daten.Parent.GUID, hierarchie);
	// save ohne open: _rev wurde zuvor übernommen
	$db.saveDoc(object, {
		success: function() {
			$.when(window.adb.erstelleBaum()).then(function() {
				window.adb.öffneBaumZuId(object._id);
				$('#lr_parent_waehlen').modal('hide');
			});
		},
		error: function() {
			$("#meldung_individuell_label").html("Fehler");
			$("#meldung_individuell_text").html("Die Hierarchie des Lebensraums konnte nicht erstellt werden");
			$("#meldung_individuell_schliessen").html("schliessen");
			$('#meldung_individuell').modal();
			window.adb.initiiere_art(object._id);
		}
	});
};

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// und auch den parent
// prüft, ob dieses Objekt children hat
// wenn ja, wird deren Hierarchie auch aktualisiert
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// wird das Ergebnis der DB-Abfrage mitgegeben, wird die Abfrage nicht wiederholt
// diese Funktion wird benötigt, wenn Namen oder Label eines bestehenden LR verändert wird
window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren = function(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
	if (lr) {
		window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
	} else {
		$db = $.couch.db("artendb");
		$db.view('artendb/lr?include_docs=true', {
			success: function(lr) {
				window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
			}
		});
	}
};

window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2 = function(lr, objekt, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
	var hierarchie = [],
		parent = objekt.Taxonomie.Daten.Parent,
		object_array = _.map(lr.rows, function(row) {
			return row.doc;
		});
	if (!objekt.Taxonomie) {
		objekt.Taxonomie = {};
	}
	if (!objekt.Taxonomie.Daten) {
		objekt.Taxonomie.Daten = {};
	}
	// als Start sich selben zur Hierarchie hinzufügen
	hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(objekt));
	if (parent.GUID !== objekt._id) {
		objekt.Taxonomie.Daten.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(object_array, objekt.Taxonomie.Daten.Parent.GUID, hierarchie);
	} else {
		// aha, das ist die Wurzel des Baums
		objekt.Taxonomie.Daten.Hierarchie = hierarchie;
	}
	if (aktualisiereHierarchiefeld) {
		$("#Hierarchie").val(window.adb.erstelleHierarchieFuerFeldAusHierarchieobjekteArray(objekt.Taxonomie.Daten.Hierarchie));
	}
	// jetzt den parent aktualisieren
	if (objekt.Taxonomie.Daten.Hierarchie.length > 1) {
		// es gibt höhere Ebenen
		// das vorletzte Hierarchieobjekt wählen. das ist length -2, weil length bei 1 beginnt, die Objekte aber von 0 an nummeriert werden
		objekt.Taxonomie.Daten.Parent = objekt.Taxonomie.Daten.Hierarchie[objekt.Taxonomie.Daten.Hierarchie.length-2];
	} else if (objekt.Taxonomie.Daten.Hierarchie.length === 1) {
		// das ist die oberste Ebene
		objekt.Taxonomie.Daten.Parent = objekt.Taxonomie.Daten.Hierarchie[0];
	}
	if (einheit_ist_taxonomiename) {
		// Einheit ändert und Taxonomiename muss auch angepasst werden
		objekt.Taxonomie.Name = einheit_ist_taxonomiename;
		objekt.Taxonomie.Daten.Taxonomie = einheit_ist_taxonomiename;
	}
	$db.saveDoc(objekt, {
		success: function() {
			var doc;
			// kontrollieren, ob das Objekt children hat. Wenn ja, diese aktualisieren
            _.each(lr.rows, function(lr_row) {
                doc = lr_row.doc;
                if (doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten.Parent && doc.Taxonomie.Daten.Parent.GUID && doc.Taxonomie.Daten.Parent.GUID === objekt._id && doc._id !== objekt._id) {
                    // das ist ein child
                    // auch aktualisieren
                    // lr mitgeben, damit die Abfrage nicht wiederholt werden muss
                    window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, doc, false, einheit_ist_taxonomiename);
                }
            });
		}
	});
};

// Baut den Hierarchiepfad für einen Lebensraum auf
// das erste Element - der Lebensraum selbst - wird mit der Variable "Hierarchie" übergeben
// ruft sich selbst rekursiv auf, bis das oberste Hierarchieelement erreicht ist
window.adb.ergänzeParentZuLrHierarchie = function(objekt_array, parentGUID, Hierarchie) {
	var i,
		parentObjekt,
		hierarchieErgänzt;
	for (i=0; i<objekt_array.length; i++) {
		if (objekt_array[i]._id === parentGUID) {
			parentObjekt = window.adb.erstelleHierarchieobjektAusObjekt(objekt_array[i]);
			Hierarchie.push(parentObjekt);
			if (objekt_array[i].Taxonomie.Daten.Parent.GUID !== objekt_array[i]._id) {
				// die Hierarchie ist noch nicht zu Ende - weitermachen
				hierarchieErgänzt = window.adb.ergänzeParentZuLrHierarchie(objekt_array, objekt_array[i].Taxonomie.Daten.Parent.GUID, Hierarchie);
				return Hierarchie;
			} else {
				// jetzt ist die Hierarchie vollständig
				// sie ist aber verkehrt - umkehren
				return Hierarchie.reverse();
			}
		}
	}
};

window.adb.erstelleHierarchieobjektAusObjekt = function(objekt) {
	var hierarchieobjekt = {};
	hierarchieobjekt.Name = window.adb.erstelleLrLabelNameAusObjekt(objekt);
	hierarchieobjekt.GUID = objekt._id;
	return hierarchieobjekt;
};

window.adb.erstelleLrLabelNameAusObjekt = function(objekt) {
	var Label = objekt.Taxonomie.Daten.Label || "",
		Einheit = objekt.Taxonomie.Daten.Einheit || "";
	return window.adb.erstelleLrLabelName(Label, Einheit);
};

window.adb.erstelleLrLabelName = function(Label, Einheit) {
	if (Label && Einheit) {
		return Label + ": " + Einheit;
	} else if (Einheit) {
		return Einheit;
	} else {
		// aha, ein neues Objekt, noch ohne Label und Einheit
		return "unbenannte Einheit";
	}
};

// löscht Datensätze in Massen
// nimmt einen Array von Objekten entgegen
// baut daraus einen neuen array auf, in dem die Objekte nur noch die benötigten Informationen haben
// aktualisiert die Objekte mit einer einzigen Operation
window.adb.loescheMassenMitObjektArray = function(objekt_array) {
	var i,
		objekte_mit_objekte,
		objekte = [],
		objekt;
	for (i=0; i<objekt_array.length; i++) {
		objekt = {};
		objekt._id = objekt_array[i]._id;
		objekt._rev = objekt_array[i]._rev;
		objekt._deleted = true;
		objekte.push(objekt);
	}
	objekte_mit_objekte = {};
	objekte_mit_objekte.docs = objekte;
	$.ajax({
		type: "POST",
		url: "../../_bulk_docs",
		contentType: "application/json", 
		data: JSON.stringify(objekte_mit_objekte)
	});
};

// erhält einen filterwert
// dieser kann zuvorderst einen Vergleichsoperator enthalten oder auch nicht
// retourniert einen Array mit 0 Vergleichsoperator und 1 filterwert
window.adb.ermittleVergleichsoperator = function(filterwert) {
	var vergleichsoperator;
	if (filterwert.indexOf(">=") === 0) {
		vergleichsoperator = ">=";
		if (filterwert.indexOf(" ") === 2) {
			filterwert = filterwert.slice(3);
		} else {
			filterwert = filterwert.slice(2);
		}
	} else if (filterwert.indexOf("<=") === 0) {
		vergleichsoperator = "<=";
		if (filterwert.indexOf(" ") === 2) {
			filterwert = filterwert.slice(3);
		} else {
			filterwert = filterwert.slice(2);
		}
	} else if (filterwert.indexOf(">") === 0) {
		vergleichsoperator = ">";
		if (filterwert.indexOf(" ") === 1) {
			filterwert = filterwert.slice(2);
		} else {
			filterwert = filterwert.slice(1);
		}
	} else if (filterwert.indexOf("<") === 0) {
		vergleichsoperator = "<";
		if (filterwert.indexOf(" ") === 1) {
			filterwert = filterwert.slice(2);
		} else {
			filterwert = filterwert.slice(1);
		}
	} else if (filterwert.indexOf("=") === 0) {
		// abfangen, falls jemand "=" eingibt
		vergleichsoperator = "=";
		if (filterwert.indexOf(" ") === 1) {
			filterwert = filterwert.slice(2);
		} else {
			filterwert = filterwert.slice(1);
		}
	} else {
		vergleichsoperator = "kein";
	}
	return [vergleichsoperator, filterwert];
};

window.adb.ersetzeUngültigeZeichenInIdNamen = function(idname) {
	return idname.replace(/\s+/g, " ").replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'');
};

// kontrolliert den verwendeten Browser
// Quelle: //stackoverflow.com/questions/13478303/correct-way-to-use-modernizr-to-detect-ie
var BrowserDetect = 
{
	init: function() 
	{
		this.browser = this.searchString(this.dataBrowser) || "Other";
		this.version = this.searchVersion(navigator.userAgent) ||	   this.searchVersion(navigator.appVersion) || "Unknown";
	},

	searchString: function(data) 
	{
		for (var i=0 ; i < data.length ; i++)   
		{
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;

			if (dataString.indexOf(data[i].subString) != -1)
			{
				return data[i].identity;
			}
		}
	},

	searchVersion: function(dataString) 
	{
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},

	dataBrowser: 
	[
		{ string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
		{ string: navigator.userAgent, subString: "MSIE",	identity: "Explorer" },
		{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
		{ string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
		{ string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

/*
* Bootstrap file uploader
* Quelle: //jasny.github.io/bootstrap/javascript.html#fileupload
*/
/**
* Bootstrap.js by @mdo and @fat, extended by @ArnoldDaniels.
* plugins: bootstrap-fileupload.js
* Copyright 2012 Twitter, Inc.
* //apache.org/licenses/LICENSE-2.0.txt
*/
!function(e){var t=function(t,n){this.$element=e(t),this.type=this.$element.data("uploadtype")||(this.$element.find(".thumbnail").length>0?"image":"file"),this.$input=this.$element.find(":file");if(this.$input.length===0)return;this.name=this.$input.attr("name")||n.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),this.$hidden.length===0&&(this.$hidden=e('<input type="hidden" />'),this.$element.prepend(this.$hidden)),this.$preview=this.$element.find(".fileupload-preview");var r=this.$preview.css("height");this.$preview.css("display")!="inline"&&r!="0px"&&r!="none"&&this.$preview.css("line-height",r),this.original={exists:this.$element.hasClass("fileupload-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.$remove=this.$element.find('[data-dismiss="fileupload"]'),this.$element.find('[data-trigger="fileupload"]').on("click.fileupload",e.proxy(this.trigger,this)),this.listen()};t.prototype={listen:function(){this.$input.on("change.fileupload",e.proxy(this.change,this)),e(this.$input[0].form).on("reset.fileupload",e.proxy(this.reset,this)),this.$remove&&this.$remove.on("click.fileupload",e.proxy(this.clear,this))},change:function(e,t){if(t==="clear")return;var n=e.target.files!==undefined?e.target.files[0]:e.target.value?{name:e.target.value.replace(/^.+\\/,"")}:null;if(!n){this.clear();return}this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);if(this.type==="image"&&this.$preview.length>0&&(typeof n.type!="undefined"?n.type.match("image.*"):n.name.match(/\.(gif|png|jpe?g)$/i))&&typeof FileReader!="undefined"){var r=new FileReader,i=this.$preview,s=this.$element;r.onload=function(e){i.html('<img src="'+e.target.result+'" '+(i.css("max-height")!="none"?'style="max-height: '+i.css("max-height")+';"':"")+" />"),s.addClass("fileupload-exists").removeClass("fileupload-new")},r.readAsDataURL(n)}else this.$preview.text(n.name),this.$element.addClass("fileupload-exists").removeClass("fileupload-new")},clear:function(e){this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name","");if(navigator.userAgent.match(/msie/i)){var t=this.$input.clone(!0);this.$input.after(t),this.$input.remove(),this.$input=t}else this.$input.val("");this.$preview.html(""),this.$element.addClass("fileupload-new").removeClass("fileupload-exists"),e&&(this.$input.trigger("change",["clear"]),e.preventDefault ? e.preventDefault() : e.returnValue = false)},reset:function(e){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.original.exists?this.$element.addClass("fileupload-exists").removeClass("fileupload-new"):this.$element.addClass("fileupload-new").removeClass("fileupload-exists")},trigger:function(e){this.$input.trigger("click"),e.preventDefault ? e.preventDefault() : e.returnValue = false}},e.fn.fileupload=function(n){return this.each(function(){var r=e(this),i=r.data("fileupload");i||r.data("fileupload",i=new t(this,n)),typeof n=="string"&&i[n]()})},e.fn.fileupload.Constructor=t,e(document).on("click.fileupload.data-api",'[data-provides="fileupload"]',function(t){var n=e(this);if(n.data("fileupload"))return;n.fileupload(n.data());var r=e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');r.length>0&&(r.trigger("click.fileupload"),t.preventDefault())})}(window.jQuery);