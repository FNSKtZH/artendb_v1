function erstelleBaum() {
	var baum,
		gruppe, gruppenbezeichung,
		anzahl_objekte,
		baum_erstellt = $.Deferred();
	// alle Bäume ausblenden
	$(".baum").css("display", "none");
	// alle Beschriftungen ausblenden
	$(".treeBeschriftung").css("display", "none");
	// gewollte beschriften und sichtbar schalten
	switch (window.Gruppe) {
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
			anzahl_objekte = data.rows[0].value;
			$("#tree" + window.Gruppe + "Beschriftung").html(anzahl_objekte + " " + gruppenbezeichung);
			// eingeblendet wird die Beschriftung, wenn der Baum fertig ist im callback von function erstelleTree
		}
	});
	$.when(erstelleTree()).then(function() {
		baum_erstellt.resolve();
	});
	return baum_erstellt.promise();
}

function erstelleTree() {
	var level,
		gruppe,
		filter,
		id,
		jstree_erstellt = $.Deferred();
	$("#tree" + window.Gruppe).jstree({
		"json_data": {
			/*
			**habe hier versucht, die Daten anders zu holen, weil die Methode mit ajax
			**eine Weile lang bei der Fauna scheiterte
			**das gab sich aber plötzlich wieder...
			**data: function(node) {
				//var daten_geholt = $.Deferred();
				if (node == -1) {
					$.when(holeDatenFuerTree(holeDatenUrlFuerTreeOberstesLevel()))
						.then(function(data) {
							//daten_geholt.resolve(data);
							return data;
					});
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
					$.when(holeDatenFuerTree(holeDatenUrlFuerTreeUntereLevel(level, filter, gruppe, id)))
						.then(function(data) {
							//daten_geholt.resolve(data);
							return data;
					});
				}
				//daten_geholt.promise();
			}*/
			ajax: {
				type: 'GET',
				url: function(node) {
					if (node == -1) {
						return holeDatenUrlFuerTreeOberstesLevel();
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
						return holeDatenUrlFuerTreeUntereLevel(level, filter, gruppe, id);
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
		var node;
		node = data.rslt.obj;
		jQuery.jstree._reference(node).open_node(node);
		if (node.attr("id")) {
			// verhindern, dass bereits offene Seiten nochmals geöffnet werden
			if (!$("#art").is(':visible') || localStorage.art_id !== node.attr("id")) {
				localStorage.art_id = node.attr("id");
				// Anzeige im Formular initiieren. ID und Datensammlung übergeben
				initiiere_art(node.attr("id"));
			}
		}
	})
	.bind("loaded.jstree", function(event, data) {
		jstree_erstellt.resolve();
		$("#suchen"+window.Gruppe).css("display", "table");
		$("#treeMitteilung").hide();
		$("#tree" + window.Gruppe).css("display", "block");
		$("#tree" + window.Gruppe + "Beschriftung").css("display", "block");
		setzeTreehoehe();
		initiiereSuchfeld();
	})
	.bind("after_open.jstree", function(e, data) {
		setzeTreehoehe();
	})
	.bind("after_close.jstree", function(e, data) {
		setzeTreehoehe();
	});
	return jstree_erstellt.promise();
}

/*
**nicht im Gebrauch
**siehe Bemerkungen, wo es aufgerufen wird
function holeDatenFuerTree(url) {
	var daten_geholt = $.Deferred();
	$.ajax({
		type: "GET",
		url: url,
		success: function(data) {
			return daten_geholt.resolve(data);
			//return data;
		}
	});
	return daten_geholt.promise();
}*/

function holeDatenUrlFuerTreeOberstesLevel() {
	var gruppe;
	// wie sicherstellen, dass nicht dieselben nodes mehrmals angehängt werden?
	switch (window.Gruppe) {
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
	if (window.Gruppe === "Lebensräume") {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_lr/baum_lr?startkey=[1]&endkey=[1,{},{},{},{},{}]&group_level=6";
	} else {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_"+gruppe+"/baum_"+gruppe+"?group_level=1";
	}
	return url;
}

function holeDatenUrlFuerTreeUntereLevel(level, filter, gruppe, id) {
	var startkey,
		id2,
		endkey = [];
	if (filter) {
		// bei lr gibt es keinen filter und das erzeugt einen fehler
		startkey = filter.slice();
		endkey = filter.slice();
	}
	// flag, um mitzuliefern, ob die id angezeigt werden soll
	id2 = false;
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
		//level++;
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + '/artendb/_design/artendb/_list/baum_lr/baum_lr?startkey=['+level+', "'+id+'"]&endkey=['+level+', "'+id+'",{},{},{},{}]&group_level=6';
	} else {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_"+gruppe+"/baum_"+gruppe+"?startkey="+JSON.stringify(startkey)+"&endkey="+JSON.stringify(endkey)+"&group_level="+level;
	}
	if (id2) {
		url = url + "&id=true";
	}
	return url;
}

function initiiereSuchfeld() {
	// zuerst mal die benötigten Daten holen
	$db = $.couch.db("artendb");
	if (window.Gruppe && window.Gruppe === "Lebensräume") {
		if (window.filtere_lr) {
			initiiereSuchfeld_2();
		} else {
			var startkey = encodeURIComponent('["'+window.Gruppe+'"]');
			var endkey = encodeURIComponent('["'+window.Gruppe+'",{},{},{}]');
			var url = 'artendb/filtere_lr?startkey='+startkey+'&endkey=' + endkey;
			$db.view(url, {
				success: function(data) {
					window.filtere_lr = data;
					initiiereSuchfeld_2();
				}
			});
		}
	} else if (window.Gruppe) {
		if (window["filtere_art_" + window.Gruppe.toLowerCase()]) {
			initiiereSuchfeld_2();
		} else {
			$db.view('artendb/filtere_art?startkey=["'+window.Gruppe+'"]&endkey=["'+window.Gruppe+'",{}]', {
				success: function(data) {
					window["filtere_art_" + window.Gruppe.toLowerCase()] = data;
					initiiereSuchfeld_2();
				}
			});
		}
	}
}

function initiiereSuchfeld_2() {
	var suchObjekte;
	if (window.Gruppe && window.Gruppe === "Lebensräume") {
		suchObjekte = window.filtere_lr.rows;
	} else if (window.Gruppe) {
		suchObjekte = window["filtere_art_" + window.Gruppe.toLowerCase()].rows;
	}
	suchObjekte = _.map(suchObjekte, function(objekt) {
		return objekt.value;
	});

	$('#suchfeld' + window.Gruppe).typeahead({
		name: window.Gruppe,
		valueKey: 'Name',
		local: suchObjekte,
		limit: 20
	})
	.on('typeahead:selected', function(e, datum) {
		oeffneBaumZuId(datum.id);
	});
	$("#suchfeld"+window.Gruppe).focus();
}

// baut die Auswahlliste auf, mit der ein Parent ausgewählt werden soll
// bekommt die id des LR, von dem aus ein neuer LR erstellt werden soll
// In der Auswahlliste sollen nur LR aus derselben Taxonomie gewählt werden können
// plus man soll auch einen neue Taxonomie beginnen können
function initiiereLrParentAuswahlliste(taxonomie_name) {
	// lr holen
	$db = $.couch.db("artendb");
	$db.view('artendb/lr?include_docs=true', {
		success: function(lr) {
			var taxonomie_objekte, 
				object,
				neueTaxonomie,
				object_html,
				html;
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
			html = "";
			for (var i=0; i<taxonomie_objekte.length; i++) {
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
}

function oeffneBaumZuId(id) {
	// Hierarchie der id holen
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(objekt) {
			switch (objekt.Gruppe) {
			case "Fauna":
				// von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
				// oberste Ebene aufbauen nicht nötig, die gibt es schon
				$.jstree._reference("#treeFauna").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+"']"), function() {
					$.jstree._reference("#treeFauna").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Ordnung+"']"), function() {
						$.jstree._reference("#treeFauna").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Ordnung+","+objekt.Taxonomie.Daten.Familie+"']"), function() {
							$.jstree._reference("#treeFauna").select_node($("#"+objekt._id), function() {}, false);
						},true);
					},true);
				},true);
				$("#art_anmelden").hide();
				break;
			case "Flora":
				// von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
				// oberste Ebene aufbauen nicht nötig, die gibt es schon
				$.jstree._reference("#treeFlora").open_node($("[filter='"+objekt.Taxonomie.Daten.Familie+"']"), function() {
					$.jstree._reference("#treeFlora").open_node($("[filter='"+objekt.Taxonomie.Daten.Familie+","+objekt.Taxonomie.Daten.Gattung+"']"), function() {
						$.jstree._reference("#treeFlora").select_node($("#"+objekt._id), function() {}, false);
					}, true);
				}, true);
				$("#art_anmelden").hide();
				break;
			case "Moose":
				// von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
				// oberste Ebene aufbauen nicht nötig, die gibt es schon
				$.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+"']"), function() {
					$.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Familie+"']"), function() {
						$.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Familie+","+objekt.Taxonomie.Daten.Gattung+"']"), function() {
							$.jstree._reference("#treeMoose").select_node($("#"+objekt._id), function() {}, false);
						}, true);
					}, true);
				}, true);
				$("#art_anmelden").hide();
				break;
			case "Macromycetes":
				// von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
				// oberste Ebene aufbauen nicht nötig, die gibt es schon
				$.jstree._reference("#treeMacromycetes").open_node($("[filter='"+objekt.Taxonomie.Daten.Gattung+"']"), function() {
					$.jstree._reference("#treeMacromycetes").select_node($("#"+objekt._id), function() {}, false);
				}, true);
				$("#art_anmelden").hide();
				break;
			case "Lebensräume":
				var idArray = [];
				for (i=0; i<objekt.Taxonomie.Daten.Hierarchie.length; i++) {
					idArray.push(objekt.Taxonomie.Daten.Hierarchie[i].GUID);
				}
				oeffneNodeNachIdArray(idArray);
				break;
			}
		}
	});
}

// läuft von oben nach unten durch die Hierarchie der Lebensräume
// ruft sich selber wieder auf, wenn ein tieferer level existiert
// erwartet idArray: einen Array der GUID's aus der Hierarchie des Objekts
function oeffneNodeNachIdArray(idArray) {
	if (idArray.length > 1) {
		$.jstree._reference("#tree" + window.Gruppe).open_node($("#"+idArray[0]), function() {
			idArray.splice(0,1);
			oeffneNodeNachIdArray(idArray);
		},false);
	} else if (idArray.length === 1) {
		$.jstree._reference("#tree" + window.Gruppe).select_node($("#"+idArray[0]),function(){},true);
	}
}

function initiiere_art(id) {
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
			ds, bez,
			a, f, h, i, k, x, q,
			dsNamen = [],
			bezNamen = [];
			// panel beginnen
			htmlArt = '<h4>Taxonomie:</h4>';
			// zuerst alle Datensammlungen auflisten, damit danach sortiert werden kann
			// gleichzeitig die Taxonomie suchen und gleich erstellen lassen
			htmlArt += erstelleHtmlFuerDatensammlung("Taxonomie", art, art.Taxonomie);
			// Datensammlungen muss nicht gepusht werden
			// aber Beziehungssammlungen aufteilen
			if (art.Beziehungssammlungen.length > 0) {
				for (i=0, len=art.Beziehungssammlungen.length; i<len; i++) {
					if (typeof art.Beziehungssammlungen[i].Typ === "undefined") {
						Beziehungssammlungen.push(art.Beziehungssammlungen[i]);
						// bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
						bezNamen.push(art.Beziehungssammlungen[i].Name);
					} else if (art.Beziehungssammlungen[i].Typ === "taxonomisch") {
						taxonomischeBeziehungssammlungen.push(art.Beziehungssammlungen[i]);
						// bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
						bezNamen.push(art.Beziehungssammlungen[i].Name);
					}
				}
			}
			// taxonomische Beziehungen in gewollter Reihenfolge hinzufügen
			if (taxonomischeBeziehungssammlungen.length > 0) {
				// Titel hinzufügen, falls Datensammlungen existieren
				htmlArt += "<h4>Taxonomische Beziehungen:</h4>";
				for (q=0, len=taxonomischeBeziehungssammlungen.length; q<len; q++) {
					// HTML für Datensammlung erstellen lassen und hinzufügen
					htmlArt += erstelleHtmlFuerBeziehung(art, taxonomischeBeziehungssammlungen[q], "");
					if (taxonomischeBeziehungssammlungen[q]["Art der Beziehungen"] && taxonomischeBeziehungssammlungen[q]["Art der Beziehungen"] === "synonym" && taxonomischeBeziehungssammlungen[q].Beziehungen) {
						for (h in taxonomischeBeziehungssammlungen[q].Beziehungen) {
							if (taxonomischeBeziehungssammlungen[q].Beziehungen[h].Beziehungspartner) {
								for (k in taxonomischeBeziehungssammlungen[q].Beziehungen[h].Beziehungspartner) {
									if (taxonomischeBeziehungssammlungen[q].Beziehungen[h].Beziehungspartner[k].GUID) {
										guidsVonSynonymen.push(taxonomischeBeziehungssammlungen[q].Beziehungen[h].Beziehungspartner[k].GUID);
									}
								}
							}
						}
					}
				}
			}
			// Datensammlungen in gewollter Reihenfolge hinzufügen
			if (Datensammlungen.length > 0) {
				// Datensammlungen nach Name sortieren
				/*ausgeschaltet, um Tempo zu gewinnen, Daten sind eh sortiert
				Datensammlungen = sortiereObjektarrayNachName(Datensammlungen);*/
				// Titel hinzufügen
				htmlArt += "<h4>Eigenschaften:</h4>";
				for (x=0, len=Datensammlungen.length; x<len; x++) {
					// HTML für Datensammlung erstellen lassen und hinzufügen
					htmlArt += erstelleHtmlFuerDatensammlung("Datensammlung", art, Datensammlungen[x]);
					// dsNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
					dsNamen.push(Datensammlungen[x].Name);

				}
			}
			// Beziehungen hinzufügen
			if (Beziehungssammlungen.length > 0) {
				// Titel hinzufügen
				htmlArt += "<h4>Beziehungen:</h4>";
				for (q=0; q<Beziehungssammlungen.length; q++) {
					// HTML für Datensammlung erstellen lassen und hinzufügen
					htmlArt += erstelleHtmlFuerBeziehung(art, Beziehungssammlungen[q], "");
				}
			}
			// Beziehungssammlungen von synonymen Arten
			if (guidsVonSynonymen.length > 0) {
				$db = $.couch.db("artendb");
				$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidsVonSynonymen)) + '&include_docs=true', {
					success: function(data) {
						var synonymeArt;
						for (f=0; f<data.rows.length; f++) {
							synonymeArt = data.rows[f].doc;
							if (synonymeArt.Datensammlungen && synonymeArt.Datensammlungen.length > 0) {
								for (a=0, len=synonymeArt.Datensammlungen.length; a<len; a++) {
									//if (synonymeArt.Datensammlungen[a].Name.indexOf(dsNamen) === -1) {
									if (dsNamen.indexOf(synonymeArt.Datensammlungen[a].Name) === -1) {
										// diese Datensammlung wird noch nicht dargestellt
										DatensammlungenVonSynonymen.push(synonymeArt.Datensammlungen[a]);
										// auch in dsNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
										dsNamen.push(synonymeArt.Datensammlungen[a].Name);
										// auch in Datensammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
										Datensammlungen.push(synonymeArt.Datensammlungen[a]);
									}
								}
							}
							if (synonymeArt.Beziehungssammlungen && synonymeArt.Beziehungssammlungen.length > 0) {
								for (a=0, len=synonymeArt.Beziehungssammlungen.length; a<len; a++) {
									if (bezNamen.indexOf(synonymeArt.Beziehungssammlungen[a].Name) === -1 && synonymeArt.Beziehungssammlungen[a]["Art der Beziehungen"] !== "synonym") {
										// diese Datensammlung wird noch nicht dargestellt
										BeziehungssammlungenVonSynonymen.push(synonymeArt.Beziehungssammlungen[a]);
										// auch in bezNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
										bezNamen.push(synonymeArt.Beziehungssammlungen[a].Name);
										// auch in Beziehungssammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
										Beziehungssammlungen.push(synonymeArt.Beziehungssammlungen[a]);
									} else if (synonymeArt.Beziehungssammlungen[a]["Art der Beziehungen"] !== "synonym") {
										// diese Beziehungssammlung wird schon dargestellt. Kann aber sein, dass beim Synonym Beziehungen existieren, welche noch nicht dargestellt werden
										var BsDerSynonymenArt = synonymeArt.Beziehungssammlungen[a];
										for (c=0; c<art.Beziehungssammlungen.length; c++) {
											if (art.Beziehungssammlungen[c].Name === BsDerSynonymenArt.Name) {
												var BsDerOriginalart = art.Beziehungssammlungen[c];
												break;
											}
										}
										if (BsDerSynonymenArt.Beziehungen && BsDerSynonymenArt.Beziehungen.length > 0) {
											for (b=0; b<BsDerSynonymenArt.Beziehungen.length; b++) {
												// durch alle Beziehungen von BsDerSynonymenArt loopen und prüfen, ob sie in den Beziehungen vorkommen
												if (_.contains(BsDerSynonymenArt.Beziehungen, BsDerSynonymenArt.Beziehungen[b])) {
													// diese Beziehung kommt schon vor und wird angezeigt > entfernen, um sie nicht nochmals anzuzeigen
													BsDerSynonymenArt.Beziehungen.splice(b);
												}
												/*if (containsObject(BsDerSynonymenArt.Beziehungen[b], BsDerSynonymenArt.Beziehungen)) {
													// diese Beziehung kommt schon vor und wird angezeigt > entfernen, um sie nicht nochmals anzuzeigen
													BsDerSynonymenArt.Beziehungen.splice(b);
												}*/
											}
										}
										if (BsDerSynonymenArt.Beziehungen.length > 0) {
											// falls noch darzustellende Beziehungen verbleiben, die DS pushen
											BeziehungssammlungenVonSynonymen.push(BsDerSynonymenArt);
										}
									}
								}
							}
						}
						// BS von Synonymen darstellen
						if (DatensammlungenVonSynonymen.length > 0) {
							// DatensammlungenVonSynonymen nach Name sortieren
							DatensammlungenVonSynonymen = sortiereObjektarrayNachName(DatensammlungenVonSynonymen);
							// Titel hinzufügen
							htmlArt += "<h4>Eigenschaften von Synonymen:</h4>";
							for (x=0, len=DatensammlungenVonSynonymen.length; x<len; x++) {
								// HTML für Datensammlung erstellen lassen und hinzufügen
								htmlArt += erstelleHtmlFuerDatensammlung("Datensammlung", art, DatensammlungenVonSynonymen[x]);
							}
						}
						// bez von Synonymen darstellen
						if (BeziehungssammlungenVonSynonymen.length > 0) {
							// BeziehungssammlungenVonSynonymen sortieren
							BeziehungssammlungenVonSynonymen = sortiereObjektarrayNachName(BeziehungssammlungenVonSynonymen);
							// Titel hinzufügen
							htmlArt += "<h4>Beziehungen von Synonymen:</h4>";
							for (x=0, len=BeziehungssammlungenVonSynonymen.length; x<len; x++) {
								// HTML für Beziehung erstellen lassen und hinzufügen. Dritten Parameter mitgeben, damit die DS in der UI nicht gleich heisst
								htmlArt += erstelleHtmlFuerBeziehung(art, BeziehungssammlungenVonSynonymen[x], "2");
							}
						}
						initiiere_art_2(htmlArt, art, Datensammlungen, DatensammlungenVonSynonymen, Beziehungssammlungen, taxonomischeBeziehungssammlungen, BeziehungssammlungenVonSynonymen);
					}
				});
			} else {
				initiiere_art_2(htmlArt, art, Datensammlungen, DatensammlungenVonSynonymen, Beziehungssammlungen, taxonomischeBeziehungssammlungen, BeziehungssammlungenVonSynonymen);
			}
		},
		error: function() {
			//melde("Fehler: Art konnte nicht geöffnet werden");
		}
	});
}

function initiiere_art_2(htmlArt, art, Datensammlungen, DatensammlungenVonSynonymen, Beziehungssammlungen, taxonomischeBeziehungssammlungen, BeziehungssammlungenVonSynonymen) {
	// panel beenden
	$("#art_inhalt").html(htmlArt);
	// richtiges Formular anzeigen
	zeigeFormular("art");
	// Anmeldung soll nur kurzfristig sichtbar sein, wenn eine Anmeldung erfolgen soll
	$("#art_anmelden").hide();
	// Wenn nur eine Datensammlung (die Taxonomie) existiert, diese öffnen
	if (art.Datensammlungen.length === 0 && art.Beziehungssammlungen.length === 0) {
		$('.panel-body').each(function() {
			if ($(this).attr('id') !== "art_anmelden_collapse") {
				$(this).collapse('show');
			}
		});
	}
	// jetzt die Links im Menu setzen
	// TODO: unklar, wieso dies nochmals nötig ist, da von zeigeFormular schon gemacht
	setzteLinksZuBilderUndWikipedia(art);
	// und die URL anpassen
	history.pushState({id: "id"}, "id", "index.html?id=" + art._id);
}

// erstellt die HTML für eine Beziehung
// benötigt von der art bzw. den lr die entsprechende JSON-Methode art_i und ihren Namen
// altName ist für Beziehungssammlungen von Synonymen: Hier kann dieselbe DS zwei mal vorkommen und sollte nicht gleich heissen, sonst geht nur die erste auf
function erstelleHtmlFuerBeziehung(art, art_i, altName) {
	var html,
		Name,
		art_i_name;
	art_i_name = art_i.Name.replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + altName;
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
	if (art_i["Link"]) {
		html += '. <a href="';
		html += art_i["Link"];
		html += '">';
		html += art_i["Link"];
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
	art_i.Beziehungen = sortiereBeziehungenNachName(art_i.Beziehungen);

	// jetzt für alle Beziehungen die Felder hinzufügen
	for (var i=0; i<art_i.Beziehungen.length; i++) {
		if (art_i.Beziehungen[i].Beziehungspartner && art_i.Beziehungen[i].Beziehungspartner.length > 0) {
			for (var y in art_i.Beziehungen[i].Beziehungspartner) {
				//if (art_i.Beziehungen[i].Beziehungspartner[y].Gruppe === "Lebensräume") {
				if (art_i.Beziehungen[i].Beziehungspartner[y].Taxonomie) {
					Name = art_i.Beziehungen[i].Beziehungspartner[y].Gruppe + ": " + art_i.Beziehungen[i].Beziehungspartner[y].Taxonomie + " > " + art_i.Beziehungen[i].Beziehungspartner[y].Name;
				} else {
					Name = art_i.Beziehungen[i].Beziehungspartner[y].Gruppe + ": " + art_i.Beziehungen[i].Beziehungspartner[y].Name;
				}
				// Partner darstellen
				if (art_i.Beziehungen[i].Beziehungspartner[y].Rolle) {
					// Feld soll mit der Rolle beschriftet werden
					html += generiereHtmlFuerObjektlink(art_i.Beziehungen[i].Beziehungspartner[y].Rolle, Name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + art_i.Beziehungen[i].Beziehungspartner[y].GUID);
				} else {
					html += generiereHtmlFuerObjektlink("Beziehungspartner", Name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + art_i.Beziehungen[i].Beziehungspartner[y].GUID);
				}
			}
		}
		// Die Felder anzeigen
		for (var x in art_i.Beziehungen[i]) {
			if (x !== "Beziehungspartner") {
				html += erstelleHtmlFuerFeld(x, art_i.Beziehungen[i][x], "Beziehungssammlung", art_i.Name.replace(/"/g, "'"));
			}
		}
		// Am Schluss eine Linie, nicht aber bei der letzen Beziehung
		if (i < (art_i.Beziehungen.length-1)) {
			html += "<hr>";
		}
	}
	// body und Accordion-Gruppe abschliessen
	html += '</div></div></div>';
	return html;
}

// erstellt die HTML für eine Datensammlung
// benötigt von der art bzw. den lr die entsprechende JSON-Methode art_i und ihren Namen
function erstelleHtmlFuerDatensammlung(dsTyp, art, art_i) {
	var htmlDatensammlung,
		hierarchie_string,
		array_string,
		art_i_name;
	art_i_name = art_i.Name.replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'');
	// Accordion-Gruppe und -heading anfügen
	htmlDatensammlung = '<div class="panel panel-default"><div class="panel-heading panel-heading-gradient">';
	// bei LR: Symbolleiste einfügen
	if (art.Gruppe === "Lebensräume" && dsTyp === "Taxonomie") {
		htmlDatensammlung += '<div class="btn-toolbar bearb_toolbar" style="display:none;"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default lr_bearb lr_bearb_bearb" data-toggle="tooltip" title="bearbeiten"><i class="glyphicon glyphicon-pencil"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_schuetzen disabled" title="schützen"><i class="glyphicon glyphicon-ban-circle"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_neu disabled" title="neuer Lebensraum"><i class="glyphicon glyphicon-plus"></i></button><button type="button" data-toggle="modal" data-target="#rueckfrage_lr_loeschen" class="btn btn-default lr_bearb lr_bearb_loeschen disabled" title="Lebensraum löschen"><i class="glyphicon glyphicon-trash"></i></button></div></div>';
		//htmlDatensammlung += '<div class="btn-toolbar bearb_toolbar" style="display:none;"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default lr_bearb lr_bearb_bearb" data-toggle="tooltip" title="bearbeiten"><i class="glyphicon glyphicon-pencil"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_schuetzen disabled" title="schützen"><i class="glyphicon glyphicon-ban-circle"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_neu disabled" title="neuer Lebensraum"><i class="glyphicon glyphicon-plus"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_loeschen disabled" title="Lebensraum löschen"><i class="glyphicon glyphicon-trash"></i></button></div></div>';
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
	if (art_i["Link"]) {
		htmlDatensammlung += '. <a href="';
		htmlDatensammlung += art_i["Link"];
		htmlDatensammlung += '">';
		htmlDatensammlung += art_i["Link"];
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
		htmlDatensammlung += erstelleHtmlFuerFeld("GUID", art._id, dsTyp, "Taxonomie");
	}
	for (var y in art_i.Daten) {
		if (y === "GUID") {
			// dieses Feld nicht anzeigen. Es wird _id verwendet
			// dieses Feld wird künftig nicht mehr importiert
		} else if (((y === "Offizielle Art" || y === "Eingeschlossen in" || y === "Synonym von") && art.Gruppe === "Flora") || (y === "Akzeptierte Referenz" && art.Gruppe === "Moose")) {
			// dann den Link aufbauen lassen
			htmlDatensammlung += generiereHtmlFuerLinkZuGleicherGruppe(y, art._id, art_i.Daten[y].Name);
		} else if ((y === "Gültige Namen" || y === "Eingeschlossene Arten" || y === "Synonyme") && art.Gruppe === "Flora") {
			// das ist ein Array von Objekten
			htmlDatensammlung += generiereHtmlFuerLinksZuGleicherGruppe(y, art_i.Daten[y]);
		} else if ((y === "Artname" && art.Gruppe === "Flora") || (y === "Parent" && art.Gruppe === "Lebensräume")) {
			// dieses Feld nicht anzeigen
		} else if (y === "Hierarchie" && art.Gruppe === "Lebensräume" && _.isArray(art_i.Daten[y])) {
			// Namen kommagetrennt anzeigen
			hierarchie_string = erstelleHierarchieFuerFeldAusHierarchieobjekteArray(art_i.Daten[y]);
			htmlDatensammlung += generiereHtmlFuerTextarea(y, hierarchie_string, dsTyp, art_i.Name.replace(/"/g, "'"));
		} else if (_.isArray(art_i.Daten[y])) {
			// dieses Feld enthält einen Array von Werten
			array_string = art_i.Daten[y].toString();
			htmlDatensammlung += generiereHtmlFuerTextarea(y, array_string, dsTyp, art_i.Name.replace(/"/g, "'"));
		} else {
			htmlDatensammlung += erstelleHtmlFuerFeld(y, art_i.Daten[y], dsTyp, art_i.Name.replace(/"/g, "'"));
		}
	}
	// body und Accordion-Gruppe abschliessen
	htmlDatensammlung += '</div></div></div>';
	return htmlDatensammlung;
}

function erstelleHierarchieFuerFeldAusHierarchieobjekteArray(hierarchie_array) {
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
}

// übernimmt Feldname und Feldwert
// generiert daraus und retourniert html für die Darstellung im passenden Feld
function erstelleHtmlFuerFeld(Feldname, Feldwert, dsTyp, dsName) {
	var htmlDatensammlung = "";
	if (typeof Feldwert === "string" && Feldwert.slice(0, 7) === "//") {
		// www-Links als Link darstellen
		htmlDatensammlung += generiereHtmlFuerWwwlink(Feldname, Feldwert, dsTyp, dsName);
	} else if (typeof Feldwert === "string" && Feldwert.length < 45) {
		htmlDatensammlung += generiereHtmlFuerTextinput(Feldname, Feldwert, "text", dsTyp, dsName);
	} else if (typeof Feldwert === "string" && Feldwert.length >= 45) {
		htmlDatensammlung += generiereHtmlFuerTextarea(Feldname, Feldwert, dsTyp);
	} else if (typeof Feldwert === "number") {
		htmlDatensammlung += generiereHtmlFuerTextinput(Feldname, Feldwert, "number", dsTyp, dsName);
	} else if (typeof Feldwert === "boolean") {
		htmlDatensammlung += generiereHtmlFuerBoolean(Feldname, Feldwert, dsTyp, dsName);
	} else {
		htmlDatensammlung += generiereHtmlFuerTextinput(Feldname, Feldwert, "text", dsTyp, dsName);
	}
	return htmlDatensammlung;
}

// managt die Links zu Google Bilder und Wikipedia
// erwartet das Objekt mit der Art
function setzteLinksZuBilderUndWikipedia(art) {
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
}

// generiert den html-Inhalt für einzelne Links in Flora
function generiereHtmlFuerLinkZuGleicherGruppe(FeldName, id, Artname) {
	var HtmlContainer;
	HtmlContainer = '<div class="form-group"><label class="control-label">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><p class="form-control-static controls feldtext"><a href="#" class="LinkZuArtGleicherGruppe" ArtId="';
	HtmlContainer += id;
	HtmlContainer += '">';
	HtmlContainer += Artname;
	HtmlContainer += '</a></p></div>';
	return HtmlContainer;
}

// generiert den html-Inhalt für Serien von Links in Flora
function generiereHtmlFuerLinksZuGleicherGruppe(FeldName, Objektliste) {
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
}

// generiert den html-Inhalt für einzelne Links in Flora
function generiereHtmlFuerWwwlink(FeldName, FeldWert, dsTyp, dsName) {
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
}

// generiert den html-Inhalt für einzelne Links in Flora
function generiereHtmlFuerObjektlink(FeldName, FeldWert, Url) {
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
}

// generiert den html-Inhalt für Textinputs
function generiereHtmlFuerTextinput(FeldName, FeldWert, InputTyp, dsTyp, dsName) {
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
}

// generiert den html-Inhalt für Textarea
function generiereHtmlFuerTextarea(FeldName, FeldWert, dsTyp, dsName) {
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
}

// generiert den html-Inhalt für ja/nein-Felder
function generiereHtmlFuerBoolean(FeldName, FeldWert, dsTyp, dsName) {
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
}

// begrenzt die maximale Höhe des Baums auf die Seitenhöhe, wenn nötig
function setzeTreehoehe() {
	var windowHeight = $(window).height();
	if ($(window).width() > 1000 && !$("body").hasClass("force-mobile")) {
		$(".baum").css("max-height", windowHeight - 161);
	} else {
		// Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
		$(".baum").css("max-height", windowHeight - 252);
	}
}

// setzt die Höhe von textareas so, dass der Text genau rein passt
function FitToContent(id, maxHeight) {
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
}

function öffneMarkiertenNode() {
	var selected_nodes = $("#tree" + window.Gruppe).jstree("get_selected");
	$("#tree" + window.Gruppe).jstree("close_all", -1);
	$("#tree" + window.Gruppe).jstree("deselect_all", -1);
	// wenn eine Art gewählt war, diese wieder wählen
	if (selected_nodes.length === 1) {
		$("#tree" + window.Gruppe).jstree("select_node", selected_nodes);
	}
}

// managed die Sichtbarkeit von Formularen
// wird von allen initiiere_-Funktionen verwendet
// wird ein Formularname übergeben, wird dieses Formular gezeigt
// und alle anderen ausgeblendet
// zusätzlich wird die Höhe von textinput-Feldern an den Textinhalt angepasst
function zeigeFormular(Formularname) {
	var formular_angezeigt = $.Deferred();
	// zuerst alle Formulare ausblenden
	$("#forms").hide();
	$('form').each(function() {
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
			history.pushState({id: "id"}, "id", "index.html");
			// alle Bäume ausblenden, suchfeld, Baumtitel
			$(".suchen").hide();
			$(".baum").css("display", "none");
			$(".treeBeschriftung").css("display", "none");
			// Gruppe Schaltfläche deaktivieren
			$('#Gruppe .active').removeClass('active');
		}
		$('form').each(function() {
			var that = $(this);
			if (that.attr("id") === Formularname) {
				$("#forms").show();
				that.show();
			}
		});
		$(window).scrollTop(0);
		// jetzt die Links im Menu (de)aktivieren
		setzteLinksZuBilderUndWikipedia();
		formular_angezeigt.resolve();
	}
	return formular_angezeigt.promise();
}

// kontrollieren, ob die erforderlichen Felder etwas enthalten
// wenn ja wird true retourniert, sonst false
function validiereSignup(woher) {
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
}

function erstelleKonto(woher) {
	// zuerst den User in cloudant freischeffeln
	var uri = new Uri($(location).attr('href'));
	if (uri.host().indexOf("cloudant__t") >= 0) {
		// wenn mit cloudant verbunden wird, anderst authentifizieren
		$.ajax({
			//type: "POST",
			type: "PUT",
			//url: 'https://barbalex.cloudant.com/artendb/_session',
			url: 'https://barbalex.cloudant.com/artendb/_security',
			//url: 'https://cloudant.com/api/set_permissions',
			data: {
				"cloudant": {"nobody": ["_reader", "_writer"]},
				//"readers": {"names":['"'+$('#Email_'+woher).val()+'"'],"roles":["_reader"]
				//"readers": {"names":[$('#Email_'+woher).val()],"roles":["_reader"]
				"members": {"names": ['"'+$('#Email_'+woher).val()+'"'],"roles":["cats"]},
				username: "barbalex",
				password: "pwd"
				//database: "barbalex/artendb"
			},
			//username: "ndegiverialocieverimpled",
			//password: "JL4Wej8QW5c4REMAyil5C5hK",
			//database: "barbalex/artendb",
			//contentType: "application/json",
			contentType: "application/x-www-form-urlencoded",
			//contentType: "text/plain; charset=UTF-8",
			//contentType: "multipart/form-data",
			success: function() {
				// User in _user eintragen
				$.couch.signup(
					{name: $('#Email_'+woher).val()},
					$('#Passwort_'+woher).val(), 
					{
						success : function() {
							localStorage.Email = $('#Email_'+woher).val();
							if (woher === "art") {
								bearbeiteLrTaxonomie();
							}
							passeUiFuerAngemeldetenUserAn(woher);
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
							$("#"+praefix+woher+"_anmelden_fehler_text").html("Fehler: Das Konto wurde nicht erstellt 2");
							$("#"+praefix+woher+"_anmelden_fehler").alert();
							$("#"+praefix+woher+"_anmelden_fehler").css("display", "block");
						}
				});
			},
			error: function() {
				var praefix = "importieren_";
				if (woher === "art") {
					praefix = "";
				}
				$("#"+praefix+woher+"_anmelden_fehler_text").html("Fehler: Das Konto wurde nicht erstellt");
				$("#"+praefix+woher+"_anmelden_fehler").alert();
				$("#"+praefix+woher+"_anmelden_fehler").css("display", "block");
			}
		});
	} else {
		// User in _user eintragen
		$.couch.signup({
			name: $('#Email_'+woher).val()
		},
		$('#Passwort_'+woher).val(), {
			success : function() {
				localStorage.Email = $('#Email_'+woher).val();
				if (woher === "art") {
					bearbeiteLrTaxonomie();
				}
				passeUiFuerAngemeldetenUserAn(woher);
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
				$("#"+praefix+woher+"_anmelden_fehler").alert();
				$("#"+praefix+woher+"_anmelden_fehler").css("display", "block");
			}
		});
	}
}

function meldeUserAn(woher) {
	var Email, Passwort;
	Email = $('#Email_'+woher).val();
	Passwort = $('#Passwort_'+woher).val();
	if (validiereUserAnmeldung(woher)) {
		$.couch.login({
			name : Email,
			password : Passwort,
			success : function() {
				localStorage.Email = $('#Email_'+woher).val();
				if (woher === "art") {
					bearbeiteLrTaxonomie();
				}
				passeUiFuerAngemeldetenUserAn(woher);
				// Werte aus Feldern entfernen
				$("#Email_"+woher).val("");
				$("#Passwort_"+woher).val("");
				$("#art_anmelden").show();
			},
			error: function() {
				var praefix = "importieren_";
				if (woher === "art") {
					praefix = "";
				}
				// zuerst allfällige bestehende Hinweise ausblenden
				$(".hinweis").css("display", "none");
				$("#"+praefix+woher+"_anmelden_fehler_text").html("Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?");
				$("#"+praefix+woher+"_anmelden_fehler_text").alert();
				$("#"+praefix+woher+"_anmelden_fehler_text").css("display", "block");
			}
		});
	}
}

function meldeUserAb() {
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
	$(".konto_erstellen_btn").show();
	$(".konto_speichern_btn").hide();
	$("#art_anmelden").hide();
	schuetzeLrTaxonomie();
}

function passeUiFuerAngemeldetenUserAn(woher) {
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
}

// prüft, ob der Benutzer angemeldet ist
// ja: retourniert true
// nein: retourniert false und öffnet die Anmeldung
// welche anmeldung hängt ab, woher die Prüfung angefordert wurde
// darum erwartet die Funktion den parameter woher
function pruefeAnmeldung(woher) {
	if (!localStorage.Email) {
		setTimeout(function() {
			zurueckZurAnmeldung(woher);
		}, 600);
		return false;
	}
	return true;
}

function zurueckZurAnmeldung(woher) {
	// Mitteilen, dass Anmeldung nötig ist
	var praefix = "importieren_";
	if (woher === "art") {
		praefix = "";
	}
	$("#"+praefix+woher+"_anmelden_hinweis").alert().css("display", "block");
	$("#"+praefix+woher+"_anmelden_hinweis_text").html("Um Daten zu bearbeiten, müssen Sie angemeldet sein");
	$("#"+praefix+woher+"_anmelden_collapse").collapse('show');
	$(".anmelden_btn").show();
	$(".abmelden_btn").hide();
	$(".konto_erstellen_btn").show();
	$(".konto_speichern_btn").hide();
	$("#Email_"+woher).focus();
}

function validiereUserAnmeldung(woher) {
	var Email, Passwort;
	Email = $('#Email_'+woher).val();
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
}

// wenn BsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist
function handleBsNameChange() {
	var that = this;
	var BsKey = _.find(window.BsKeys, function(key) {
		return key[1] === that.value && key[3] !== localStorage.Email && !key[2];
	});
	if (BsKey) {
		$("#importieren_bs_ds_beschreiben_hinweis2").alert().css("display", "block");
		$("#importieren_bs_ds_beschreiben_hinweis_text2").html('Es existiert schon eine gleich heissende und nicht zusammenfassende Beziehungssammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
		setTimeout(function() {
			$("#importieren_bs_ds_beschreiben_hinweis2").alert().css("display", "none");
		}, 30000);
		$("#BsName").val("");
		$("#BsName").focus();
	} else {
		$("#importieren_bs_ds_beschreiben_hinweis2").alert().css("display", "none");
	}
}

// Wenn DsImportiertVon geändert wird
// kontrollieren, dass es die email der angemeldeten Person ist
function handleDsImportiertVonChange() {
	$("#DsImportiertVon").val(localStorage.Email);
	$("#importieren_ds_ds_beschreiben_hinweis_text2").alert().css("display", "block");
	$("#importieren_ds_ds_beschreiben_hinweis_text2").html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
	setTimeout(function() {
		$("#importieren_ds_ds_beschreiben_hinweis_text2").alert().css("display", "none");
	}, 10000);
}

// Wenn BsImportiertVon geändert wird
// Kontrollieren, dass es die email der angemeldeten Person ist
function handleBsImportiertVonChange() {
	$("#BsImportiertVon").val(localStorage.Email);
	$("#importieren_bs_ds_beschreiben_hinweis2").alert().css("display", "block");
	$("#importieren_bs_ds_beschreiben_hinweis_text2").html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
	setTimeout(function() {
		$("#importieren_bs_ds_beschreiben_hinweis2").alert().css("display", "none");
	}, 10000);
}

// wenn BsZusammenfassend geändert wird
// BsUrsprungsBs_div zeigen oder verstecken
function handleBsZusammenfassendChange() {
	var that = this;
	if ($(this).prop('checked')) {
		$("#BsUrsprungsBs_div").show();
	} else {
		$("#BsUrsprungsBs_div").hide();
	}
}

// wenn DsZusammenfassend geändert wird
// DsUrsprungsDs zeigen oder verstecken
function handleDsZusammenfassendChange() {
	var that = this;
	if ($(this).prop('checked')) {
		$("#DsUrsprungsDs_div").show();
	} else {
		$("#DsUrsprungsDs_div").hide();
	}
}

// Wenn BsWaehlen geändert wird
function handleBsWaehlenChange() {
	var BsName = this.value;
	var waehlbar = $("#"+this.id+" option:selected").attr("waehlbar");
	if (waehlbar === "true") {
		// zuerst alle Felder leeren
		$('#importieren_bs_ds_beschreiben_collapse textarea, #importieren_bs_ds_beschreiben_collapse input').each(function() {
			$(this).val('');
		});
		$("#BsAnzDs").html("");
		$("#BsAnzDs_label").html("");
		if (BsName) {
			for (i in window.bs_von_objekten.rows) {
				if (window.bs_von_objekten.rows[i].key[1] === BsName) {
					$("#BsName").val(BsName);
					for (x in window.bs_von_objekten.rows[i].key[4]) {
						if (x === "Ursprungsdatensammlung") {
							$("#BsUrsprungsBs").val(window.bs_von_objekten.rows[i].key[4][x]);
						} else if (x !== "importiert von") {
							$("#Bs" + x).val(window.bs_von_objekten.rows[i].key[4][x]);
						}
					}
					if (window.bs_von_objekten.rows[i].key[2] === true) {
						$("#BsZusammenfassend").prop('checked', true);
						$("#BsUrsprungsBs_div").show();
					} else {
						// sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere BS gewählt wird
						$("#BsZusammenfassend").prop('checked', false);
						$("#BsUrsprungsBs_div").hide();
					}
					// wenn die ds/bs kein "importiert von" hat ist der Wert null
					// verhindern, dass null angezeigt wird
					if (window.bs_von_objekten.rows[i].key[3]) {
						$("#BsImportiertVon").val(window.bs_von_objekten.rows[i].key[3]);
					} else {
						$("#BsImportiertVon").val("");
					}
					$("#BsAnzDs_label").html("Anzahl Arten/Lebensräume");
					$("#BsAnzDs").html(window.bs_von_objekten.rows[i].value);
					// dafür sorgen, dass textareas genug gross sind
					$('#importieren_bs textarea').each(function() {
						FitToContent(this, document.documentElement.clientHeight);
					});
					$("#BsName").focus();
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
}

// wenn DsFile geändert wird
function handleDsFileChange() {
	event.preventDefault();
	// Check for the various File API support
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported
	} else {
		$("#meldung_individuell_label").html("Importieren nicht möglich");
		$("#meldung_individuell_text").html("Ihr Browser unterstützt diesen Vorgang leider nicht");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		//alert('Ihr Browser unterstützt diesen Vorgang leider nicht');
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
		window.dsDatensätze = $.csv.toObjects(event.target.result);
		erstelleTabelle(window.dsDatensätze, "DsFelder_div", "DsTabelleEigenschaften");
	};
	reader.readAsText(file);
}

// wenn BsFile geändert wird
function handleBsFileChange() {
	event.preventDefault();
	// Check for the various File API support
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported
	} else {
		$("#meldung_individuell_label").html("Importieren nicht möglich");
		$("#meldung_individuell_text").html("Ihr Browser unterstützt diesen Vorgang leider nicht");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		//alert('Ihr Browser unterstützt diesen Vorgang leider nicht');
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
		window.bsDatensätze = $.csv.toObjects(event.target.result);
		erstelleTabelle(window.bsDatensätze, "BsFelder_div", "BsTabelleEigenschaften");
	};
	reader.readAsText(file);
}

// wenn btn_resize geklickt wird
function handleBtnResizeClick() {
	var windowHeight = $(window).height();
	$("body").toggleClass("force-mobile");
	if ($("body").hasClass("force-mobile")) {
		// Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
		$(".baum").css("max-height", windowHeight - 252);
		// button rechts ausrichten
		$("#btn_resize").css("margin-right", "0px");
	} else {
		$(".baum").css("max-height", windowHeight - 161);
		// button an anderen Schaltflächen ausrichten
		$("#btn_resize").css("margin-right", "6px");
	}
}

// wenn menu_btn geklickt wird
// Menu: Links zu Google Bilder und Wikipedia nur aktiv setzen, wenn Art oder Lebensraum angezeigt wird
function handleMenuBtnClick() {
	if (localStorage.art_id) {
		$("#GoogleBilderLink_li").removeClass("disabled");
		$("#WikipediaLink_li").removeClass("disabled");
	} else {
		$("#GoogleBilderLink_li").addClass("disabled");
		$("#WikipediaLink_li").addClass("disabled");
	}
}

// wenn ds_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
function handleDs_ImportierenClick() {
	if(isFileAPIAvailable()) {
		zeigeFormular("importieren_ds");
		// Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
		if (pruefeAnmeldung("ds")) {
			$("#importieren_ds_ds_beschreiben_collapse").collapse('show');
		}
	}
}

// wenn bs_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
function handleBsImportierenClick() {
	if(isFileAPIAvailable()) {
		zeigeFormular("importieren_bs");
		// Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
		if (pruefeAnmeldung("bs")) {
			$("#importieren_bs_ds_beschreiben_collapse").collapse('show');
		}
	}
}

// wenn importieren_ds_ds_beschreiben_collapse geöffnet wird
function handleImportierenDsDsBeschreibenCollapseShown() {
	// mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
	bereiteImportieren_ds_beschreibenVor("ds");
	$("#DsImportiertVon").val(localStorage.Email);
}

// wenn importieren_bs_ds_beschreiben_collapse geöffnet wird
function handleImportierenBsDsBeschreibenCollapseShown() {
	// mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
	bereiteImportieren_bs_beschreibenVor("bs");
	$("#BsImportiertVon").val(localStorage.Email);
}

// wenn importieren_ds_daten_uploaden_collapse geöffnet wird
function handleImportierenDsDatenUploadenCollapseShown() {
	if (!pruefeAnmeldung("ds")) {
		$(this).collapse('hide');
	} else {
		$('#DsFile').fileupload();
	}
}

// wenn importieren_bs_daten_uploaden_collapse geöffnet wird
function handleImportierenBsDatenUpladenCollapseShown() {
	if (!pruefeAnmeldung("bs")) {
		$(this).collapse('hide');
	} else {
		$('#BsFile').fileupload();
	}
}

// wenn importieren_ds_ids_identifizieren_collapse geöffnet wird
function handleImportierenDsIdsIdentifizierenCollapseShown() {
	if (!pruefeAnmeldung("ds")) {
		$(this).collapse('hide');
	}
}

// wenn importieren_bs_ids_identifizieren_collapse geöffnet wird
function handleImportierenBsIdsIdentifizierenCollapseShown() {
	if (!pruefeAnmeldung("bs")) {
		$(this).collapse('hide');
	}
}

// wenn importieren_ds_import_ausfuehren_collapse geöffnet wird
function handleImportierenDsImportAusfuehrenCollapseShown() {
	if (!pruefeAnmeldung("ds")) {
		$(this).collapse('hide');
	}
}

// wenn importieren_bs_import_ausfuehren_collapse geöffnet wird
function handleImportierenBsImportAusfuehrenCollapseShown() {
	if (!pruefeAnmeldung("bs")) {
		$(this).collapse('hide');
	}
}

// wenn DsWaehlen geändert wird
function handleDsWaehlenChange() {
	var DsName = this.value;
	var waehlbar = $("#"+this.id+" option:selected").attr("waehlbar");
	if (waehlbar === "true") {
		// zuerst alle Felder leeren
		$('#importieren_ds_ds_beschreiben_collapse textarea, #importieren_ds_ds_beschreiben_collapse input').each(function() {
			$(this).val('');
		});
		$("#DsAnzDs").html("");
		$("#DsAnzDs_label").html("");
		if (DsName) {
			for (i in window.ds_von_objekten.rows) {
				if (window.ds_von_objekten.rows[i].key[1] === DsName) {
					$("#DsName").val(DsName);
					for (x in window.ds_von_objekten.rows[i].key[4]) {
						if (x === "Ursprungsdatensammlung") {
							$("#DsUrsprungsDs").val(window.ds_von_objekten.rows[i].key[4][x]);
						} else if (x !== "importiert von") {
							$("#Ds" + x).val(window.ds_von_objekten.rows[i].key[4][x]);
						}
					}
					if (window.ds_von_objekten.rows[i].key[2] === true) {
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
					if (window.ds_von_objekten.rows[i].key[3]) {
						$("#DsImportiertVon").val(window.ds_von_objekten.rows[i].key[3]);
					} else {
						$("#DsImportiertVon").val("");
					}
					$("#DsAnzDs_label").html("Anzahl Arten/Lebensräume");
					$("#DsAnzDs").html(window.ds_von_objekten.rows[i].value);
					// dafür sorgen, dass textareas genug gross sind
					$('#importieren_ds textarea').each(function() {
						FitToContent(this, document.documentElement.clientHeight);
					});
					$("#DsName").focus();
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
}

// wenn DsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist
function handleDsNameChange() {
	var that = this;
	var DsKey = _.find(window.DsKeys, function(key) {
		return key[1] === that.value && key[3] !== localStorage.Email && !key[2];
	});
	if (DsKey) {
		$("#importieren_ds_ds_beschreiben_hinweis_text2").alert().css("display", "block");
		$("#importieren_ds_ds_beschreiben_hinweis_text2").html('Es existiert schon eine gleich heissende und nicht zusammenfassende Datensammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
		setTimeout(function() {
			$("#importieren_ds_ds_beschreiben_hinweis_text2").alert().css("display", "none");
		}, 30000);
		$("#DsName").val("");
		$("#DsName").focus();
	} else {
		$("#importieren_ds_ds_beschreiben_hinweis_text2").alert().css("display", "none");
	}
}

// wenn DsLoeschen geklickt wird
function handleDsLoeschenClick() {
	event.preventDefault();
	// Rückmeldung anzeigen
	$("#importieren_ds_ds_beschreiben_hinweis_text").alert().css("display", "block");
	$("#importieren_ds_ds_beschreiben_hinweis_text").html("Bitte warten: Die Datensammlung wird entfernt...");
	$.when(entferneDatensammlungAusAllenObjekten($("#DsName").val())).then(function() {
		// jetzt Ergebnisse anzeigen
		$("#importieren_ds_ds_beschreiben_hinweis_text").alert().css("display", "block");
		$("#importieren_ds_ds_beschreiben_hinweis_text").html("Die Datensammlung wurde erfolgreich entfernt");
	});
}

// wenn BsLoeschen geklickt wird
function handleBsLoeschenClick() {
	event.preventDefault();
	// Rückmeldung anzeigen
	$("#importieren_bs_ds_beschreiben_hinweis").alert().css("display", "block");
	$("#importieren_bs_ds_beschreiben_hinweis_text").html("Bitte warten: Die Beziehungssammlung wird entfernt...");
	$.when(entferneBeziehungssammlungAusAllenObjekten($("#BsName").val())).then(function() {
		// jetzt Ergebnisse anzeigen
		$("#importieren_bs_ds_beschreiben_hinweis").alert().css("display", "block");
		$("#importieren_bs_ds_beschreiben_hinweis_text").html("Die Beziehungssammlung wurde erfolgreich entfernt");
	});
}

// wenn DsImportieren geklickt wird
function handleDsImportierenClick() {
	event.preventDefault();
	$.when(importiereDatensammlung()).then(function() {
		// jetzt Ergebnisse anzeigen
		console.log("Datensammlung importiert");
	});
}

// wenn BsImportieren geklickt wird
function handleBsImportierenClick() {
	event.preventDefault();
	$.when(importiereBeziehungssammlung()).then(function() {
		// jetzt Ergebnisse anzeigen
		console.log("Beziehungssammlung importiert");
	});
}

// wenn DsEntfernen geklickt wird
function handleDsEntfernenClick() {
	event.preventDefault();
	$.when(entferneDatensammlung()).then(function() {
		// jetzt Ergebnisse anzeigen
		console.log("Datensammlung entfernt");
	});
}

// wenn BsEntfernen geklickt wird
function handleBsEntfernenClick() {
	event.preventDefault();
	$.when(entferneBeziehungssammlung()).then(function() {
		// jetzt Ergebnisse anzeigen
		console.log("Beziehungssammlung entfernt");
	});
}

// wenn exportieren geklickt wird
function handleExportierenClick() {
	zeigeFormular("export");
	// Exportieren-Guids schaffen, damit kein altes existiert
	window.exportieren_guids = [];
	delete window.exportieren_objekte;
	delete window.exportieren_objekte_sik;
}

// wenn exportieren_alt geklickt wird
function handleExportierenAltClick() {
	window.open("_list/export_alt_mit_synonymen_direkt/all_docs_mit_synonymen_fuer_alt?include_docs=true");
}

// wenn .feld_waehlen geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung angezeigt wird
// und pro Beziehung eine Zeile ausgegeben wird. 
// Wenn ja: reklamieren und rückgängig machen
function handleFeldWaehlenChange() {
	if ($("#export_bez_in_zeilen").prop('checked')) {
		var bezDsChecked = [];
		var that = this;
		$("#exportieren_felder_waehlen_felderliste .feld_waehlen").each(function() {
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
			exportZuruecksetzen();
		}
	}
}

// wenn .feld_waehlen_alle_von_ds geändert wird
// wenn checked: alle unchecken, sonst alle checken
function handleFeldWaehlenAlleVonDs() {
	var ds = $(this).attr('datensammlung'),
		status = false;
	if ($(this).prop('checked')) {
		status = true;
	}
	$('[datensammlung="'+ds+'"]').each(function() {
		$(this).prop('checked', status);
	});
}

// wenn exportieren_ds_objekte_waehlen_gruppe geändert wird
function handleExportierenDsObjekteWaehlenGruppeChange() {
	erstelleListeFuerFeldwahl();
	// Tabelle ausblenden, falls sie eingeblendet war
	$("#exportieren_exportieren_tabelle").css("display", "none");
}

// wenn export_feld_filtern geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung Filter enthält. Wenn ja: reklamieren und rückgängig machen
function handleExportFeldFilternChange() {
	var bezDsFiltered = [],
		that = this;
	$("#exportieren_objekte_waehlen_ds_collapse .export_feld_filtern").each(function() {
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
		exportZuruecksetzen();
	}
}

// wenn exportieren_exportieren angezeigt wird
// zur Schaltfläche Vorschau scrollen
function handleExportierenExportierenShow() {
	$('html, body').animate({
		scrollTop: $("#exportieren_exportieren_tabelle_aufbauen").offset().top
	}, 2000);
}

// wenn .btn.lr_bearb_bearb geklickt wird
function handleBtnLrBearbBearbKlick() {
	if (!$(this).hasClass('disabled')) {
		bearbeiteLrTaxonomie();
	}
}

// wenn .btn.lr_bearb_schuetzen geklickt wird
function handleBtnLrBearbSchuetzenClick() {
	if (!$(this).hasClass('disabled')) {
		schuetzeLrTaxonomie();
		// Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
		delete window.lr_bearb;
	}
}

// wenn .btn.lr_bearb_neu geklickt wird
function handleBtnLrBearbNeuClick() {
	if (!$(this).hasClass('disabled')) {
		initiiereLrParentAuswahlliste($("#Taxonomie").val());
	}
}

// wenn #lr_parent_waehlen_optionen [name="parent_optionen"] geändert wird
function handleLrParentOptionenChange() {
	// prüfen, ob oberster Node gewählt wurde
	var parent_name = $(this).val(),
		parent_id = this.id,
		parent_row, 
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
	object.Taxonomie.Daten["Beschreibung"] = "";
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
				aktualisiereHierarchieEinesNeuenLr(null, object, true);
			} else {
				$.when(erstelleBaum()).then(function() {
					oeffneBaumZuId(object._id);
					$('#lr_parent_waehlen').modal('hide');
				});
			}
		}
	});
}

// wenn rueckfrage_lr_loeschen_ja geklickt wird
function handleRueckfrageLrLoeschenJaClick() {
	event.preventDefault();
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
			loescheMassenMitObjektArray(doc_array);
			// vorigen node ermitteln
			var voriger_node = $.jstree._reference("#" + id)._get_prev("#" + id);
			// node des gelöschten LR entfernen
			jQuery.jstree._reference("#" + id).delete_node("#" + id);
			// vorigen node öffnen
			if (voriger_node) {
				$.jstree._reference(voriger_node).select_node(voriger_node);
			} else {
				oeffneGruppe("Lebensräume");
			}
		}
	});
}

// Wenn #art .panel-body.Lebensräume.Taxonomie .controls geändert wird
function handleLrTaxonomieControlsChange() {
	speichern($(this).val(), this.id, $(this).attr('dsName'), $(this).attr('dsTyp'));
}

// wenn .panel-body.Lebensräume.Taxonomie geöffnet wird
function handlePanelbodyLrTaxonomieShown() {
	if (window.lr_bearb) {
		bearbeiteLrTaxonomie();
	}
	$(".bearb_toolbar").show();
}

// wenn #exportieren_exportieren_collapse geöffnet wird
function handleExportierenExportierenCollapseShown() {
	// nur ausführen, wenn exportieren_exportieren_collapse offen ist
	// komischerweise wurde dieser Code immer ausgelöst, wenn bei Lebensräumen F5 gedrückt wurde!
	if ($("#exportieren_exportieren_collapse").css("display") === "block") {
		// Tabelle und Herunterladen-Schaltfläche ausblenden
		$("#exportieren_exportieren_tabelle").css("display", "none");
		$(".exportieren_exportieren_exportieren").css("display", "none");
		// filtert und baut danach die Vorschautabelle auf
		filtereFuerExport();
	}
}

// wenn .panel-body.Lebensräume.Taxonomie geschlossen wird
function handlePanelbodyLrTaxonomieHidden() {
	$(".bearb_toolbar").hide();
}

// wenn #exportieren_objekte_Taxonomien_zusammenfassen geklickt wird
function handleExportierenObjekteTaxonomienZusammenfassenClick() {
	// verhindern, dass bootstrap ganz nach oben scrollt
	event.preventDefault();
	var hinweisNeu;
	if ($(this).hasClass("active")) {
		window.fasseTaxonomienZusammen = false;
		$(this).html("Alle Taxonomien zusammenfassen");
		hinweisNeu = "<br>Alle Taxonomien sind zusammengefasst";
	} else {
		window.fasseTaxonomienZusammen = true;
		$(this).html("Taxonomien einzeln behandeln");
		hinweisNeu = "<br>Alle Taxonomien werden einzeln dargestellt";
	}
	// Felder neu aufbauen, aber nur, wenn eine Gruppe gewählt ist
	var gruppeIstGewählt = false;
	$("#exportieren_objekte_waehlen_gruppen_collapse .exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			gruppeIstGewählt = true;
		}
	});
	if (gruppeIstGewählt) {
		erstelleListeFuerFeldwahl();
	}
}

// wenn #exportieren_exportieren_exportieren geklickt wird
function handleExportierenExportierenExportierenClick() {
	// verhindern, dass bootstrap ganz nach oben scrollt
	event.preventDefault();
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
		window.exportstring = erstelleExportString(window.exportieren_objekte);
		var blob = new Blob([window.exportstring], {type: "text/csv;charset=utf-8;"});
		//var blob = new Blob([window.exportstring], {type: "application/octet-stream;charset=utf-8;"});
		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
		//console.log("Blob erstellt, jetzt folgt saveAs");
		saveAs(blob, output + "_export.csv");
	} else {
		$("#meldung_individuell_label").html("Direkt herunterladen nicht möglich");
		$("#meldung_individuell_text").html("Ihr Browser unterstützt diesen Vorgang leider nicht.<br>Sie können die Datei vom Server herunterladen.");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		return;
	}
}

// wenn #exportieren_exportieren_exportieren_direkt geklickt wird
function handleExportierenExportierenExportierenDirektClick() {
	// verhindern, dass bootstrap ganz nach oben scrollt
	event.preventDefault();	
	filtereFuerExport("direkt");
}

// wenn .panel geöffnet wird
// Höhe der textareas an Textgrösse anpassen
function handlePanelShown() {
	$(this).find('textarea').each(function() {
		FitToContent(this.id);
	});
}

// wenn .LinkZuArtGleicherGruppe geklickt wird
function handleLinkZuArtGleicherGruppeClick() {
	event.preventDefault();
	var id = $(this).attr("artid");
	$("#tree" + window.Gruppe).jstree("clear_search");
	$(".suchen").val("");
	$("#tree" + window.Gruppe).jstree("deselect_all");
	$("#tree" + window.Gruppe).jstree("close_all", -1);
	$("#tree" + window.Gruppe).jstree("select_node", "#" + id);
}

// wenn Fenstergrösse verändert wird
function handleResize() {
	setzeTreehoehe();
	// Höhe der Textareas korrigieren
	$('#forms').find('textarea').each(function() {
		FitToContent(this.id);
	});
}

// wenn .anmelden_btn geklickt wird
function handleAnmeldenBtnClick() {
	event.preventDefault();
	// es muss mitgegeben werden, woher die Anmeldung kam, damit die email aus dem richtigen Feld geholt werden kann
	var bs_ds = this.id.substring(this.id.length-2);
	if (bs_ds === "rt") {
		bs_ds = "art";
	}
	meldeUserAn(bs_ds);
}

// wenn .abmelden_btn geklickt wird
function handleAbmeldenBtnClick() {
	event.preventDefault();
	meldeUserAb();
}

// wenn .Email keyup
function handleEmailKeyup() {
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Emailhinweis").css("display", "none");
}

// wenn .Passwort keyup
function handlePasswortKeyup() {
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Passworthinweis").css("display", "none");
}

// wenn .Passwort2 keyup
function handlePasswort2Keyup() {
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Passworthinweis2").css("display", "none");
}

// wenn .konto_erstellen_btn geklickt wird
function handleKontoErstellenBtnClick() {
	event.preventDefault();
	var bs_ds = this.id.substring(this.id.length-2);
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
}

// wenn .konto_speichern_btn geklickt wird
function handleKontoSpeichernBtnClick() {
	event.preventDefault();
	var bs_ds = this.id.substring(this.id.length-2);
	if (bs_ds === "rt") {
		bs_ds = "art";
	}
	if (validiereSignup(bs_ds)) {
		erstelleKonto(bs_ds);
		// Anmeldefenster zurücksetzen
		$(".signup").css("display", "none");
		$(".anmelden_btn").hide();
		$(".abmelden_btn").show();
		$(".konto_erstellen_btn").hide();
		$(".konto_speichern_btn").hide();
	}
}

// übernimmt eine Array mit Objekten
// und den div, in dem die Tabelle eingefügt werden soll
// plus einen div, in dem die Liste der Felder angzeigt wird (falls dieser div mitgeliefert wird)
// baut damit eine Tabelle auf und fügt sie in den übergebenen div ein
function erstelleTabelle(Datensätze, felder_div, tabellen_div) {
	var html = "";
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
	var Feldname = "";
	if (felder_div) {
		if (felder_div === "DsFelder_div") {
			Feldname = "DsFelder";
		} else if (felder_div === "BsFelder_div") {
			Feldname = "BsFelder";
		}
	}
	var html_ds_felder_div = "";
	html_ds_felder_div += '<label class="control-label" for="'+Feldname+'">Feld mit eindeutiger ID<br>in den Importdaten</label>';
	html_ds_felder_div += '<select multiple class="controls form-control input-sm" id="'+Feldname+'" style="height:' + ((Object.keys(Datensätze[0]).length*19)+9)  + 'px">';
	html += "<thead><tr>";
	// durch die Felder zirkeln
	for (var x in Datensätze[0]) {
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
	for (var i = 0; i < 10; i++) {
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
	$("#"+tabellen_div).html(html);
	$("#"+tabellen_div).css("margin-top", "20px");
	// sichtbar stellen
	$("#"+tabellen_div).css("display", "block");
}

// erhält dbs = "Ds" oder "Bs"
function meldeErfolgVonIdIdentifikation(dbs) {
	if ($("#"+dbs+"Felder option:selected").length && $("#"+dbs+"Id option:selected").length) {
		// beide ID's sind gewählt
		window[dbs+"FelderId"] = $("#"+dbs+"Felder option:selected").val();
		window.DsId = $("#"+dbs+"Id option:selected").val();
		window[dbs+"Id"] = $("#"+dbs+"Id option:selected").val();
		var IdsVonDatensätzen = [];
		var MehrfachVorkommendeIds = [];
		var IdsVonNichtImportierbarenDatensätzen = [];
		// das hier wird später noch für den Inmport gebraucht > globale Variable machen
		window.ZuordbareDatensätze = [];
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").alert().css("display", "block");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").html("Bitte warten, die Daten werden analysiert.<br>Das kann eine Weile dauern...");
		// übrige Hinweisfelder ausschalten, falls jemand 2 mal nacheinander klickt
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text").alert().css("display", "none");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text").alert().css("display", "none");

		// Dokumente aus der Gruppe der Datensätze holen
		// durch alle loopen. Dabei einen Array von Objekten bilden mit id und guid
		// kontrollieren, ob eine id mehr als einmal vorkommt
		$db = $.couch.db("artendb");
		if (window.DsId === "guid") {
			$db.view('artendb/all_docs', {
				success: function(data) {
					for (var i in window[dbs.toLowerCase()+"Datensätze"]) {
						// durch die importierten Datensätze loopen
						if (IdsVonDatensätzen.indexOf(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]) === -1) {
							// diese ID wurde noch nicht hinzugefügt > hinzufügen
							IdsVonDatensätzen.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
							// prüfen, ob die ID zugeordnet werden kann
							for (var x = 0; x < data.rows.length; x++) {
								if (data.rows[x].key === window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]) {
									window.ZuordbareDatensätze.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
									break;
								}
								if (x === (data.rows.length-1)) {
									// diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
									IdsVonNichtImportierbarenDatensätzen.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
								}
							}
						} else {
							// diese ID wurden schon hinzugefügt > mehrfach!
							MehrfachVorkommendeIds.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
						}
					}
					meldeErfolgVonIdIdentifikation_02(MehrfachVorkommendeIds, IdsVonDatensätzen, IdsVonNichtImportierbarenDatensätzen, dbs);
				}
			});
		} else {
			$db.view('artendb/gruppe_id_taxonomieid?startkey=["' + window.DsId + '"]&endkey=["' + window.DsId + '",{},{}]', {
				success: function(data) {
					for (var i in window[dbs.toLowerCase()+"Datensätze"]) {
						// durch die importierten Datensätze loopen
						if (IdsVonDatensätzen.indexOf(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]) === -1) {
							// diese ID wurde noch nicht hinzugefügt > hinzufügen
							IdsVonDatensätzen.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
							// prüfen, ob die ID zugeordnet werden kann
							for (var x = 0; x < data.rows.length; x++) {
								// Vorsicht: window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]] kann Zahlen als string zurückgeben, nicht === verwenden
								if (data.rows[x].key[2] == window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]) {
									var Objekt = {};
									Objekt.Id = parseInt(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]], 10);
									Objekt.Guid = data.rows[x].key[1];
									window.ZuordbareDatensätze.push(Objekt);
									break;
								}
								if (x === (data.rows.length-1)) {
									// diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
									IdsVonNichtImportierbarenDatensätzen.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
								}
							}
						} else {
							// diese ID wurden schon hinzugefügt > mehrfach!
							MehrfachVorkommendeIds.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
						}
					}
					meldeErfolgVonIdIdentifikation_02(MehrfachVorkommendeIds, IdsVonDatensätzen, IdsVonNichtImportierbarenDatensätzen, dbs);
				}
			});
		}
	}
}

function meldeErfolgVonIdIdentifikation_02(MehrfachVorkommendeIds, IdsVonDatensätzen, IdsVonNichtImportierbarenDatensätzen, dbs) {
	$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").alert().css("display", "none");
	// rückmelden: Falls mehrfache ID's, nur das rückmelden und abbrechen
	if (MehrfachVorkommendeIds.length && dbs !== "Bs") {
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text").alert().css("display", "block");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text").html("Die folgenden ID's kommen mehrfach vor: " + MehrfachVorkommendeIds + "<br>Bitte entfernen oder korrigieren Sie die entsprechenden Zeilen");
		// übrige Hinweisfelder ausschalten, falls jemand 2 mal nacheinander klickt
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").alert().css("display", "none");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text").alert().css("display", "none");
	} else if (window.ZuordbareDatensätze.length < IdsVonDatensätzen.length) {
		// rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
		// es können nicht alle zugeordnet werden, daher als Hinweis statt als Erfolg
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").alert().css("display", "block");
		if (dbs === "Bs") {
			$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").html("Die Importtabelle enthält " + window[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + IdsVonDatensätzen.length + " Arten:<br>Beziehungen von " + IdsVonDatensätzen.length + " Arten enthalten einen Wert im Feld \"" + window[dbs+"FelderId"] + "\"<br>" + window.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: Beziehungen von " + IdsVonNichtImportierbarenDatensätzen.length + " Arten mit den folgenden Werten im Feld \"" + window[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + IdsVonNichtImportierbarenDatensätzen);
		} else {
			$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").html("Die Importtabelle enthält " + window[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + IdsVonDatensätzen.length + " enthalten einen Wert im Feld \"" + window[dbs+"FelderId"] + "\"<br>" + window.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: " + IdsVonNichtImportierbarenDatensätzen.length + " Datensätze mit den folgenden Werten im Feld \"" + window[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + IdsVonNichtImportierbarenDatensätzen);
		}
		// übrige Hinweisfelder ausschalten, falls jemand 2 mal nacheinander klickt
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text").alert().css("display", "none");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text").alert().css("display", "none");
		$("#"+dbs+"Importieren").css("display", "block");
		$("#"+dbs+"Entfernen").css("display", "block");
	} else {
		// rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text").alert().css("display", "block");
		if (dbs === "Bs") {
			$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text").html("Die Importtabelle enthält " + window[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + IdsVonDatensätzen.length + " Arten:<br>Beziehungen von " + IdsVonDatensätzen.length + " Arten enthalten einen Wert im Feld \"" + window[dbs+"FelderId"] + "\"<br>Beziehungen von " + window.ZuordbareDatensätze.length + " Arten können zugeordnet und importiert werden");
		} else {
			$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text").html("Die Importtabelle enthält " + window[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + IdsVonDatensätzen.length + " enthalten einen Wert im Feld \"" + window[dbs+"FelderId"] + "\"<br>" + window.ZuordbareDatensätze.length + " können zugeordnet und importiert werden");
		}
		// übrige Hinweisfelder ausschalten, falls jemand 2 mal nacheinander klickt
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text").alert().css("display", "none");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").alert().css("display", "none");
		$("#"+dbs+"Importieren").css("display", "block");
		$("#"+dbs+"Entfernen").css("display", "block");
	}
}

// bekommt das Objekt mit den Datensätzen (window.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung
function importiereDatensammlung() {
	var Datensammlung, anzFelder, anzDs;
	var DsImportiert = $.Deferred();
	// prüfen, ob ein DsName erfasst wurde. Wenn nicht: melden
	if (!$("#DsName").val()) {
		$("#meldung_individuell_label").html("Namen fehlt");
		$("#meldung_individuell_text").html("Bitte geben Sie der Datensammlung einen Namen");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		$("#DsName").focus();
		return false;
	}
	// für die ersten 10 Datensätze sollen als Rückmeldung Links erstellt werden, daher braucht es einen zähler
	var Zähler = 0;
	var RückmeldungsLinks = "Der Import wurde ausgeführt.<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können.<br>Vorsicht: Wahrscheinlich dauert der nächste Seitenaufruf sehr lange, da nun ein Index neu aufgebaut werden muss.<br><br>";
	anzDs = 0;
	for (var x in window.dsDatensätze) {
		anzDs += 1;
		// Datensammlung als Objekt gründen
		Datensammlung = {};
		Datensammlung.Name = $("#DsName").val();
		if ($("#DsBeschreibung").val()) {
			Datensammlung.Beschreibung = $("#DsBeschreibung").val();
		}
		if ($("#DsDatenstand").val()) {
			Datensammlung.Datenstand = $("#DsDatenstand").val();
		}
		if ($("#DsLink").val()) {
			Datensammlung["Link"] = $("#DsLink").val();
		}
		// falls die Datensammlung zusammenfassend ist
		if ($("#DsZusammenfassend").prop('checked')) {
			Datensammlung.zusammenfassend = true;
		}
		if ($("#DsUrsprungsDs").val()) {
			Datensammlung.Ursprungsdatensammlung = $("#DsUrsprungsDs").val();
		}
		Datensammlung["importiert von"] = localStorage.Email;
		// Felder der Datensammlung als Objekt gründen
		Datensammlung.Daten = {};
		// Felder anfügen, wenn sie Werte enthalten
		anzFelder = 0;
		for (var y in window.dsDatensätze[x]) {
			// nicht importiert wird die ID und leere Felder
			if (y !== window.DsFelderId && window.dsDatensätze[x][y] !== "" && window.dsDatensätze[x][y] !== null) {
				if (window.dsDatensätze[x][y] === -1) {
					// Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
					Datensammlung.Daten[y] = true;
				} else if (window.dsDatensätze[x][y] == "true") {
					// true/false nicht als string importieren
					Datensammlung.Daten[y] = true;
				} else if (window.dsDatensätze[x][y] == "false") {
					Datensammlung.Daten[y] = false;
				} else if (window.dsDatensätze[x][y] == parseInt(window.dsDatensätze[x][y], 10)) {
					// Ganzzahlen als Zahlen importieren
					Datensammlung.Daten[y] = parseInt(window.dsDatensätze[x][y], 10);
				} else if (window.dsDatensätze[x][y] == parseFloat(window.dsDatensätze[x][y])) {
					// Bruchzahlen als Zahlen importieren
					Datensammlung.Daten[y] = parseFloat(window.dsDatensätze[x][y]);
				} else {
					// Normalfall
					Datensammlung.Daten[y] = window.dsDatensätze[x][y];
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
			if (window.DsId === "guid") {
				// die in der Tabelle mitgelieferte id ist die guid
				guid = window.dsDatensätze[x][window.DsFelderId];
			} else {
				for (var q = 0; q < window.ZuordbareDatensätze.length; q++) {
					// in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
					if (window.ZuordbareDatensätze[q].Id == window.dsDatensätze[x][window.DsFelderId]) {
						// und die guid auslesen
						guid = window.ZuordbareDatensätze[q].Guid;
						break;
					}
				}
			}
			// kann sein, dass der guid oben nicht zugeordnet werden konnte. Dann nicht anfügen
			if (guid) {
				fuegeDatensammlungZuObjekt(guid, Datensammlung);
				// Für 10 Kontrollbeispiele die Links aufbauen
				if (Zähler < 10) {
					Zähler += 1;
					// Rückmeldungslink aufbauen. Hat die Form:
					//<a href="url">Link text</a>
					////127.0.0.1:5984/artendb/_design/artendb/index.html?id=165507F2-67D6-44E2-A2BA-1A62AB3D1ACE
					RückmeldungsLinks += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + window.dsDatensätze[x][window.DsFelderId] + '"  target="_blank">Beispiel ' + Zähler + '</a><br>';
				}
			}
		}
	}
	// RückmeldungsLinks in Feld anzeigen:
	$("#importieren_ds_import_ausfuehren_hinweis").css('display', 'block');
	$("#importieren_ds_import_ausfuehren_hinweis_text").html(RückmeldungsLinks);
	DsImportiert.resolve();
	return DsImportiert.promise();
}

// bekommt das Objekt mit den Datensätzen (window.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung
function importiereBeziehungssammlung() {
	var Beziehungssammlung, anzFelder, anzBs;
	var BsImportiert = $.Deferred();
	// prüfen, ob ein BsName erfasst wurde. Wenn nicht: melden
	if (!$("#BsName").val()) {
		$("#meldung_individuell_label").html("Namen fehlt");
		$("#meldung_individuell_text").html("Bitte geben Sie der Beziehungssammlung einen Namen");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		$("#BsName").focus();
		return false;
	}
	// zuerst: Veranlassen, dass die Beziehungspartner in window.bsDatensätze in einen Array der richtigen Form umgewandelt werden
	$.when(bereiteBeziehungspartnerFuerImportVor())
		.then(function() {
			setTimeout(function() {
				// für die ersten 10 Datensätze sollen als Rückmeldung Links erstellt werden, daher braucht es einen zähler
				var Zähler = 0;
				var RückmeldungsLinks = "Der Import wurde ausgeführt.<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können.<br>Vorsicht: Wahrscheinlich dauert der nächste Seitenaufruf sehr lange, da nun ein Index neu aufgebaut werden muss.<br><br>";
				anzBs = 0;
				var Beziehungssammlung;
				var Beziehungssammlung_vorlage = {};
				Beziehungssammlung_vorlage.Name = $("#BsName").val();
				if ($("#BsBeschreibung").val()) {
					Beziehungssammlung_vorlage.Beschreibung = $("#BsBeschreibung").val();
				}
				if ($("#BsDatenstand").val()) {
					Beziehungssammlung_vorlage.Datenstand = $("#BsDatenstand").val();
				}
				if ($("#BsLink").val()) {
					Beziehungssammlung_vorlage["Link"] = $("#BsLink").val();
				}
				// falls die Datensammlung zusammenfassend ist
				if ($("#BsZusammenfassend").prop('checked')) {
					Beziehungssammlung_vorlage.zusammenfassend = true;
				}
				if ($("#BsUrsprungsBs").val()) {
					Beziehungssammlung_vorlage.Ursprungsdatensammlung = $("#BsUrsprungsBs").val();
				}
				Beziehungssammlung_vorlage["importiert von"] = localStorage.Email;
				Beziehungssammlung_vorlage.Beziehungen = [];
				// zunächst den Array von Objekten in ein Objekt mit Eigenschaften = ObjektGuid und darin Array mit allen übrigen Daten verwandeln
				window.bsDatensätze_objekt = _.groupBy(window.bsDatensätze, function(objekt) {
					// id in guid umwandeln
					var guid;
					if (window.BsId === "guid") {
						// die in der Tabelle mitgelieferte id ist die guid
						guid = objekt[window.BsFelderId];
					} else {
						for (var q = 0; q < window.ZuordbareDatensätze.length; q++) {
							// in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
							if (window.ZuordbareDatensätze[q].Id == objekt[window.BsFelderId]) {
								// und die guid auslesen
								guid = window.ZuordbareDatensätze[q].Guid;
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
										Beziehung[y].push(window.bezPartner_objekt[value[x][y][i]]);
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
						fuegeBeziehungenZuObjekt(key, Beziehungssammlung, Beziehungen);
						// Für 10 Kontrollbeispiele die Links aufbauen
						if (Zähler < 10) {
							Zähler++;
							// Rückmeldungslink aufbauen. Hat die Form:
							//<a href="url">Link text</a>
							////127.0.0.1:5984/artendb/_design/artendb/index.html?id=165507F2-67D6-44E2-A2BA-1A62AB3D1ACE
							RückmeldungsLinks += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + key + '"  target="_blank">Beispiel ' + Zähler + '</a><br>';
						}
					}
				});
				// RückmeldungsLinks in Feld anzeigen:
				$("#importieren_bs_import_ausfuehren_hinweis").css('display', 'block');
				$("#importieren_bs_import_ausfuehren_hinweis_text").html(RückmeldungsLinks);
				BsImportiert.resolve();
			}, 1000);
		});
	return BsImportiert.promise();
}

function bereiteBeziehungspartnerFuerImportVor() {
	var alleBezPartner_array = [];
	var bezPartner_array;
	window.bezPartner_objekt = {};
	var bpVorbereitet = $.Deferred();

	for (var x in window.bsDatensätze) {
		if (window.bsDatensätze[x].Beziehungspartner) {
			// window.bsDatensätze[x].Beziehungspartner ist eine kommagetrennte Liste von guids
			// diese Liste in Array verwandeln
			bezPartner_array = window.bsDatensätze[x].Beziehungspartner.split(", ");
			// und in window.bsDatensätze nachführen
			window.bsDatensätze[x].Beziehungspartner = bezPartner_array;
			// und vollständige Liste aller Beziehungspartner nachführen
			alleBezPartner_array = _.union(alleBezPartner_array, bezPartner_array);
		}
	}
	// jetzt wollen wir ein Objekt bauen, das für alle Beziehungspartner das auszutauschende Objekt enthält
	// danach für jede guid Gruppe, Taxonomie (bei LR) und Name holen und ein Objekt draus machen
	$db = $.couch.db("artendb");
	$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(alleBezPartner_array)) + '&include_docs=true', {
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
				window.bezPartner_objekt[objekt._id] = bezPartner;
			}
		}
	});
	bpVorbereitet.resolve();
	return bpVorbereitet.promise();
}

// bekommt das Objekt mit den Datensätzen (window.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Datensammlung
function entferneDatensammlung() {
	var guid_array = [];
	var guidArray = [];
	var guid;
	var DsEntfernt = $.Deferred();
	for (x=0; x<window.dsDatensätze.length; x++) {
		// zuerst die id in guid übersetzen
		if (window.DsId === "guid") {
			// die in der Tabelle mitgelieferte id ist die guid
			guid = window.dsDatensätze[x].GUID;
		} else {
			for (var q = 0; q < window.ZuordbareDatensätze.length; q++) {
				// in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
				if (window.ZuordbareDatensätze[q].Id == window.dsDatensätze[x][window.DsFelderId]) {
					// und die guid auslesen
					guid = window.ZuordbareDatensätze[q].Guid;
					break;
				}
			}
		}
		// Einen Array der id's erstellen
		guid_array.push(guid);
	}
	// globale Variable erstellen. Enthält alle guids. Beim Entfernen wird guid entfernt. Am Ende verbleiben keine oder die nicht entfernten
	window.aktualisierte_objekte = guid_array.slice();
	// alle docs gleichzeitig holen
	// aber batchweise
	var a = 0;
	var batch = 150;
	var batchGrösse = 150;
	for (a; a<batch; a++) {
		if (a < guid_array.length) {
			guidArray.push(guid_array[a]);
			if (a === (batch-1)) {
				entferneDatensammlung_2($("#DsName").val(), guidArray, (a-batchGrösse));
				guidArray = [];
				batch += batchGrösse;
			}
		} else {
			entferneDatensammlung_2($("#DsName").val(), guidArray, (a-batchGrösse));
			// RückmeldungsLinks in Feld anzeigen:
			$("#importieren_ds_import_ausfuehren_hinweis").css('display', 'block');
			$("#importieren_ds_import_ausfuehren_hinweis_text").html("Die Datensammlungen wurden entfernt<br>Vorsicht: Wahrscheinlich dauert einer der nächsten Vorgänge sehr lange, da nun eine Index neu aufgebaut werden muss.");
			DsEntfernt.resolve();
			break;
		}
	}
	return DsEntfernt.promise();
}

function entferneDatensammlung_2(DsName, guidArray, a) {
	// alle docs holen
	setTimeout(function() {
		$db = $.couch.db("artendb");
		$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidArray)) + '&include_docs=true', {
			success: function(data) {
				var Objekt;
				for (var f=0; f<data.rows.length; f++) {
					Objekt = data.rows[f].doc;
					entferneDatensammlungAusObjekt(DsName, Objekt);
				}
			}
		});
	}, a*40);
}

function entferneDatensammlungAusObjekt(DsName, Objekt) {
	if (Objekt.Datensammlungen && Objekt.Datensammlungen.length > 0) {
		for (var i=0; i<Objekt.Datensammlungen.length; i++) {
			if (Objekt.Datensammlungen[i].Name === DsName) {
				Objekt.Datensammlungen.splice(i,1);
				$db = $.couch.db("artendb");
				$db.saveDoc(Objekt);
				break;
			}
		}
	}
}

// bekommt das Objekt mit den Datensätzen (window.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Beziehungssammlung
function entferneBeziehungssammlung() {
	var guid_array = [];
	var guidArray = [];
	var guid;
	var BsName = $("#BsName").val();
	var BsEntfernt = $.Deferred();
	for (x=0; x<window.bsDatensätze.length; x++) {
		// zuerst die id in guid übersetzen
		if (window.BsId === "guid") {
			// die in der Tabelle mitgelieferte id ist die guid
			guid = window.bsDatensätze[x].GUID;
		} else {
			for (var q = 0; q < window.ZuordbareDatensätze.length; q++) {
				// in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
				if (window.ZuordbareDatensätze[q].Id == window.bsDatensätze[x][window.BsFelderId]) {
					// und die guid auslesen
					guid = window.ZuordbareDatensätze[q].Guid;
					break;
				}
			}
		}
		// Einen Array der id's erstellen
		guid_array.push(guid);
	}

	// guid_array auf die eindeutigen guids reduzieren
	guid_array = _.union(guid_array);

	// alle docs gleichzeitig holen
	// aber batchweise
	var a = 0;
	var batch = 150;
	var batchGrösse = 150;
	for (a; a<batch; a++) {
		if (a < guid_array.length) {
			guidArray.push(guid_array[a]);
			if (a === (batch-1)) {
				entferneBeziehungssammlung_2(BsName, guidArray, (a-batchGrösse));
				guidArray = [];
				batch += batchGrösse;
			}
		} else {
			entferneBeziehungssammlung_2(BsName, guidArray, (a-batchGrösse));
			// RückmeldungsLinks in Feld anzeigen:
			$("#importieren_bs_import_ausfuehren_hinweis").css('display', 'block');
			$("#importieren_bs_import_ausfuehren_hinweis_text").html("Die Beziehungssammlungen wurden entfernt<br>Vorsicht: Wahrscheinlich dauert einer der nächsten Vorgänge sehr lange, da nun eine Index neu aufgebaut werden muss.");
			BsEntfernt.resolve();
			break;
		}
	}
	return BsEntfernt.promise();
}

function entferneBeziehungssammlung_2(BsName, guidArray, a) {
	// alle docs holen
	setTimeout(function() {
		$db = $.couch.db("artendb");
		$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidArray)) + '&include_docs=true', {
			success: function(data) {
				var Objekt;
				for (var f=0; f<data.rows.length; f++) {
					Objekt = data.rows[f].doc;
					entferneBeziehungssammlungAusObjekt(BsName, Objekt);
				}
			}
		});
	}, a*40);
}

function entferneBeziehungssammlungAusObjekt(BsName, Objekt) {
	if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
		for (var i=0; i<Objekt.Beziehungssammlungen.length; i++) {
			if (Objekt.Beziehungssammlungen[i].Name === BsName) {
				Objekt.Beziehungssammlungen.splice(i,1);
				$db = $.couch.db("artendb");
				$db.saveDoc(Objekt);
				break;
			}
		}
	}
}

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
function fuegeDatensammlungZuObjekt(GUID, Datensammlung) {
	$db = $.couch.db("artendb");
	$db.openDoc(GUID, {
		success: function(doc) {
			// Datensammlung anfügen
			doc.Datensammlungen.push(Datensammlung);
			// sortieren
			// Datensammlungen nach Name sortieren
			doc.Datensammlungen = sortiereObjektarrayNachName(doc.Datensammlungen);
			// in artendb speichern
			$db.saveDoc(doc);
		}
	});
}

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
function fuegeBeziehungenZuObjekt(GUID, Beziehungssammlung, Beziehungen) {
	$db = $.couch.db("artendb");
	$db.openDoc(GUID, {
		success: function(doc) {
			// prüfen, ob die Beziehung schon existiert
			if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
				var hinzugefügt = false;
				for (var i in doc.Beziehungssammlungen) {
					if (doc.Beziehungssammlungen[i].Name === Beziehungssammlung.Name) {
						for (var h=0; h<Beziehungen.length; h++) {
							if (!_.contains(doc.Beziehungssammlungen[i].Beziehungen, Beziehungen[h])) {
								doc.Beziehungssammlungen[i].Beziehungen.push(Beziehungen[h]);
							}
							/*if (!containsObject(Beziehungen[h], doc.Beziehungssammlungen[i].Beziehungen)) {
								doc.Beziehungssammlungen[i].Beziehungen.push(Beziehungen[h]);
							}*/
						}
						// Beziehungen nach Name sortieren
						doc.Beziehungssammlungen[i].Beziehungen = sortiereBeziehungenNachName(doc.Beziehungssammlungen[i].Beziehungen);
						hinzugefügt = true;
						break;
					}
				}
				if (!hinzugefügt) {
					// die Beziehungssammlung existiert noch nicht
					Beziehungssammlung.Beziehungen = [];
					for (var a=0; a<Beziehungen.length; a++) {
						Beziehungssammlung.Beziehungen.push(Beziehungen[a]);
					}
					// Beziehungen nach Name sortieren
					Beziehungssammlung.Beziehungen = sortiereBeziehungenNachName(Beziehungssammlung.Beziehungen);
					doc.Beziehungssammlungen.push(Beziehungssammlung);
				}
			} else {
				// Beziehungssammlung anfügen
				Beziehungssammlung.Beziehungen = [];
				for (var b=0; b<Beziehungen.length; b++) {
					Beziehungssammlung.Beziehungen.push(Beziehungen[b]);
				}
				// Beziehungen nach Name sortieren
				Beziehungssammlung.Beziehungen = sortiereBeziehungenNachName(Beziehungssammlung.Beziehungen);
				doc.Beziehungssammlungen = [];
				doc.Beziehungssammlungen.push(Beziehungssammlung);
			}
			// Beziehungssammlungen nach Name sortieren
			doc.Beziehungssammlungen = sortiereObjektarrayNachName(doc.Beziehungssammlungen);
			// in artendb speichern
			$db.saveDoc(doc);
		}
	});
}

// übernimmt den Namen einer Datensammlung
// öffnet alle Dokumente, die diese Datensammlung enthalten und löscht die Datensammlung
function entferneDatensammlungAusAllenObjekten(DsName) {
	var DsEntfernt = $.Deferred();
	$db = $.couch.db("artendb");
	$db.view('artendb/ds_guid?startkey=["' + DsName + '"]&endkey=["' + DsName + '",{}]', {
		success: function(data) {
			for (var i in data.rows) {
				// guid und DsName übergeben
				entferneDatensammlungAusDokument(data.rows[i].key[1], DsName);
			}
			DsEntfernt.resolve();
		}
	});
	return DsEntfernt.promise();
}

// übernimmt den Namen einer Beziehungssammlung
// öffnet alle Dokumente, die diese Beziehungssammlung enthalten und löscht die Beziehungssammlung
function entferneBeziehungssammlungAusAllenObjekten(BsName) {
	var BsEntfernt = $.Deferred();
	$db = $.couch.db("artendb");
	$db.view('artendb/bs_guid?startkey=["' + BsName + '"]&endkey=["' + BsName + '",{}]', {
		success: function(data) {
			for (var i in data.rows) {
				// guid und DsName übergeben
				entferneBeziehungssammlungAusDokument(data.rows[i].key[1], BsName);
			}
			BsEntfernt.resolve();
		}
	});
	return BsEntfernt.promise();
}

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Datensammlung, die zu entfernen ist
// entfernt die Datensammlung
function entferneDatensammlungAusDokument(id, DsName) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(doc) {
			// Datensammlung entfernen
			for (var i=0; i<doc.Datensammlungen.length; i++) {
				if (doc.Datensammlungen[i].Name === DsName) {
					doc.Datensammlungen.splice(i,1);
				}
			}
			// in artendb speichern
			$db.saveDoc(doc, {
				success: function() {
				}
			});
		}
	});
}

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Beziehungssammlung, die zu entfernen ist
// entfernt die Beziehungssammlung
function entferneBeziehungssammlungAusDokument(id, BsName) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(doc) {
			// Beziehungssammlung entfernen
			for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
				if (doc.Beziehungssammlungen[i].Name === BsName) {
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
}

// prüft die URL. wenn eine id übergeben wurde, wird das entprechende Objekt angezeigt
function oeffneUri() {
	// parameter der uri holen
	var uri = new Uri($(location).attr('href'));
	var id = uri.getQueryParamValue('id');
	// wenn browser history nicht unterstützt, erstellt history.js eine hash
	// dann muss die id durch die id in der hash ersetzt werden
	var hash = uri.anchor();
	if (hash) {
		var uri2 = new Uri(hash);
		id = uri2.getQueryParamValue('id');
	}
	if (id) {
		// Gruppe ermitteln
		$db = $.couch.db("artendb");
		$db.openDoc(id, {
			success: function(objekt) {
				// window.Gruppe setzen. Nötig, um im Menu die richtigen Felder einzublenden
				window.Gruppe = objekt.Gruppe;
				$(".baum.jstree").jstree("deselect_all");
				// den richtigen Button aktivieren
				//$("#Gruppe" + objekt.Gruppe).button('toggle');
				$('[gruppe="'+objekt.Gruppe+'"]').button('toggle');
				$("#Gruppe_label").html("Gruppe:");
				// tree aufbauen, danach Datensatz initiieren
				$.when(erstelleBaum()).then(function() {
					oeffneBaumZuId(id);
				});
			}
		});
	}
}
// übernimmt anfangs drei arrays: taxonomien, datensammlungen und beziehungssammlungen
// verarbeitet immer den ersten array und ruft sich mit den übrigen selber wieder auf
function erstelleExportfelder(taxonomien, datensammlungen, beziehungssammlungen) {
	var html_felder_waehlen = '';
	var html_filtern = '';
	var dsTyp;
	if (taxonomien && datensammlungen && beziehungssammlungen) {
		dsTyp = "Taxonomie";
		html_felder_waehlen += '<h3>Taxonomie</h3>';
		html_filtern += '<h3>Taxonomie</h3>';
	} else if (taxonomien && datensammlungen) {
		dsTyp = "Datensammlung";
		html_felder_waehlen += '<h3>Datensammlungen</h3>';
		html_filtern += '<h3>Datensammlungen</h3>';
	} else {
		dsTyp = "Beziehung";
		// bei "felder wählen" soll man auch wählen können, ob pro Beziehung eine Zeile oder alle Beziehungen in ein Feld geschrieben werden sollen
		// das muss auch erklärt sein
		html_felder_waehlen += '<h3>Beziehungssammlungen</h3><div class="export_zum_titel_gehoerig"><div class="radio"><label><input type="radio" id="export_bez_in_zeilen" checked="checked" name="export_bez_wie">Pro Beziehung eine Zeile</label></div><div class="radio"><label><input type="radio" id="export_bez_in_feldern" name="export_bez_wie">Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld</label></div><div class="well well-small" style="margin-top:9px;">Sie können aus zwei Varianten wählen:<ol><li>Pro Beziehung eine Zeile (Standardeinstellung):<ul><li>Für jede Art oder Lebensraum wird pro Beziehung eine neue Zeile erzeugt</li><li>Anschliessende Auswertungen sind so meist einfacher auszuführen</li><li>Dafür können Sie aus maximal einer Beziehungssammlung Felder wählen (aber wie gewohnt mit beliebig vielen Feldern aus Taxonomie(n) und Datensammlungen ergänzen)</li></ul></li><li>Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld:<ul><li>Von allen Beziehungen der Art oder des Lebensraums wird der Inhalt des Feldes kommagetrennt in das Feld der einzigen Zeile geschrieben</li><li>Sie können Felder aus beliebigen Beziehungssammlungen gleichzeitig exportieren</li></ul></li></ol></div></div>';
		html_filtern += '<h3>Beziehungssammlungen</h3>';
	}
	for (i=0; i<taxonomien.length; i++) {
		if (i > 0) {
			html_felder_waehlen += '<hr>';
			html_filtern += '<hr>';
		}
		html_felder_waehlen += '<h5>' + taxonomien[i].Name + '</h5>';
		// jetzt die checkbox um alle auswählen zu können
		// aber nur, wenn mehr als 1 Feld existieren
		if ((taxonomien[i].Daten && _.size(taxonomien[i].Daten) > 1) || (taxonomien[i].Beziehungen && _.size(taxonomien[i].Beziehungen) > 1)) {
			html_felder_waehlen += '<div class="checkbox"><label>';
			html_felder_waehlen += '<input class="feld_waehlen_alle_von_ds" type="checkbox" DsTyp="'+dsTyp+'" Datensammlung="' + taxonomien[i].Name + '"><em>alle</em>';
			html_felder_waehlen += '</div></label>';
		}
		html_felder_waehlen += '<div class="felderspalte">';
		html_filtern += '<h5>' + taxonomien[i].Name + '</h5>';
		html_filtern += '<div class="felderspalte">';
		for (var x in (taxonomien[i].Daten || taxonomien[i].Beziehungen)) {
			// felder wählen
			html_felder_waehlen += '<div class="checkbox"><label>';
			html_felder_waehlen += '<input class="feld_waehlen" type="checkbox" DsTyp="'+dsTyp+'" Datensammlung="' + taxonomien[i].Name + '" Feld="' + x + '">' + x;
			html_felder_waehlen += '</div></label>';
			// filtern
			html_filtern += '<div class="form-group">';
			html_filtern += '<label class="control-label" for="exportieren_objekte_waehlen_ds_' + x.replace(/\s+/g, " ").replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + '"';
			// Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
			if (x.length > 28) {
				html_filtern += ' style="padding-top:0px"';
			}
			html_filtern += '>'+ x +'</label>';
			html_filtern += '<input class="controls form-control export_feld_filtern form-control input-sm" type="text" id="exportieren_objekte_waehlen_ds_' + x.replace(/\s+/g, " ").replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + '" DsTyp="'+dsTyp+'" Eigenschaft="' + taxonomien[i].Name + '" Feld="' + x + '">';
			html_filtern += '</div>';
		}
		// Spalten abschliessen
		html_felder_waehlen += '</div>';
		html_filtern += '</div>';
	}
	// linie voranstellen
	html_felder_waehlen = '<hr>' + html_felder_waehlen;
	html_filtern = '<hr>' + html_filtern;
	if (beziehungssammlungen) {
		$("#exportieren_felder_waehlen_felderliste").html(html_felder_waehlen);
		$("#exportieren_objekte_waehlen_ds_felderliste").html(html_filtern);
		erstelleExportfelder(datensammlungen, beziehungssammlungen);
	} else if (datensammlungen) {
		$("#exportieren_felder_waehlen_felderliste").append(html_felder_waehlen);
		$("#exportieren_objekte_waehlen_ds_felderliste").append(html_filtern);
		erstelleExportfelder(datensammlungen);
	} else {
		$("#exportieren_felder_waehlen_felderliste").append(html_felder_waehlen);
		$("#exportieren_objekte_waehlen_ds_felderliste").append(html_filtern);
	}
}

function erstelleExportString(exportobjekte) {
	var stringTitelzeile = "",
		stringZeilen = "",
		stringZeile;
	for (var i in exportobjekte) {
		// aus unerklärlichem Grund blieb stringTitelzeile leer, wenn nur ein Datensatz gefiltert wurde
		// daher bei jedem Datensatz prüfen, ob eine Titelzeile erstellt wurde und wenn nötig ergänzen
		if (stringTitelzeile === "" || stringTitelzeile === ",") {
			stringTitelzeile = "";
			// durch Spalten loopen
			for (var a in exportobjekte[i]) {
				if (stringTitelzeile !== "") {
					stringTitelzeile += ',';
				}
				stringTitelzeile += '"' + a + '"';
			}
		}

		if (stringZeilen !== "") {
			stringZeilen += '\n';
		}
		stringZeile = "";
		// durch die Felder loopen
		for (var x in exportobjekte[i]) {
		//for (var x = 0; x < exportobjekte[i].length; x++) {
			if (stringZeile !== "") {
				stringZeile += ',';
			}
			// null-Werte als leere Werte
			if (exportobjekte[i][x] === null) {
				stringZeile += "";
			} else if (typeof exportobjekte[i][x] === "number") {
				// Zahlen ohne Anführungs- und Schlusszeichen exportieren
				stringZeile += exportobjekte[i][x];
			} else if (typeof exportobjekte[i][x] === "object") {
				// Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
				stringZeile += '"' + JSON.stringify(exportobjekte[i][x]).replace(/"/g, "'") + '"';
			} else {
				stringZeile += '"' + exportobjekte[i][x] + '"';
			}
		}
		stringZeilen += stringZeile;
	}
	return stringTitelzeile + "\n" + stringZeilen;
}

// baut im Formular "export" die Liste aller Eigenschaften auf
// window.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
// bekommt den Namen der Gruppe
function erstelleListeFuerFeldwahl() {
	// Beschäftigung melden
	$("#exportieren_objekte_waehlen_gruppen_hinweis_text").alert().css("display", "block");
	$("#exportieren_objekte_waehlen_gruppen_hinweis_text").html("Eigenschaften werden ermittelt...");
	// scrollen, damit Hinweis sicher ganz sichtbar ist
	$('html, body').animate({
		scrollTop: $("#exportieren_objekte_waehlen_gruppen_hinweis_text").offset().top
	}, 2000);
	// gewählte Gruppen ermitteln
	// globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
	var export_gruppen = [],
		gruppen = [];
	// globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
	window.export_felder_arrays = [];
	$db = $.couch.db("artendb");
	$(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			export_gruppen.push($(this).val());
		}
	});
	if (export_gruppen.length > 0) {
		gruppen = export_gruppen;
		for (var i=0; i<gruppen.length; i++) {
			// Felder abfragen
			$db.view('artendb/felder?group_level=4&startkey=["'+gruppen[i]+'"]&endkey=["'+gruppen[i]+'",{},{},{},{}]', {
				success: function(data) {
					window.export_felder_arrays = _.union(window.export_felder_arrays, data.rows);
					// eine Gruppe aus export_gruppen entfernen
					export_gruppen.splice(0,1);
					if (export_gruppen.length === 0) {
						// alle Gruppen sind verarbeitet
						erstelleListeFuerFeldwahl_2();
					}
				}
			});
		}
	} else {
		// letzte Rückmeldung anpassen
		$("#exportieren_objekte_waehlen_gruppen_hinweis_text").html("keine Gruppe gewählt");
		// Felder entfernen
		$("#exportieren_felder_waehlen_felderliste").html("");
		$("#exportieren_objekte_waehlen_ds_felderliste").html("");
	}
}

function erstelleListeFuerFeldwahl_2() {
	// in window.export_felder_arrays ist eine Liste der Felder, die in dieser Gruppe enthalten sind
	// sie kann aber Mehrfacheinträge enthalten, die sich in der Gruppe unterscheiden
	// Muster: Gruppe, Typ der Datensammlung, Name der Datensammlung, Name des Felds
	// Mehrfacheinträge sollen entfernt werden
	// dazu muss zuerst die Gruppe entfernt werden
	for (var i=0; i<window.export_felder_arrays.length; i++) {
		window.export_felder_arrays[i].key.splice(0,1);
	}
	// jetzt nur noch eineindeutige Array-Objekte (=Datensammlungen) belassen
	window.export_felder_arrays = _.union(window.export_felder_arrays);
	// jetzt den Array von Objekten nach key sortieren
	window.export_felder_arrays = _.sortBy(window.export_felder_arrays, function(object) {
		return object.key;
	});

	// Objekt "FelderObjekt" schaffen. Darin werden die Felder aller gewählten Gruppen gesammelt
	var FelderObjekt = {};
	FelderObjekt = ergaenzeFelderObjekt(FelderObjekt, window.export_felder_arrays);

	// bei allfälligen "Taxonomie(n)" Feldnamen sortieren
	if (FelderObjekt["Taxonomie(n)"] && FelderObjekt["Taxonomie(n)"].Daten) {
		FelderObjekt["Taxonomie(n)"].Daten = sortKeysOfObject(FelderObjekt["Taxonomie(n)"].Daten);
	}

	// Taxonomien und Datensammlungen aus dem FelderObjekt extrahieren
	Taxonomien = [];
	Datensammlungen = [];
	Beziehungssammlungen = [];
	for (var x in FelderObjekt) {
		if (typeof FelderObjekt[x] === "object" && FelderObjekt[x].Typ) {
			// das ist Datensammlung oder Taxonomie
			if (FelderObjekt[x].Typ === "Datensammlung") {
				Datensammlungen.push(FelderObjekt[x]);
			} else if (FelderObjekt[x].Typ === "Taxonomie") {
				Taxonomien.push(FelderObjekt[x]);
			} else if (FelderObjekt[x].Typ === "Beziehung") {
				Beziehungssammlungen.push(FelderObjekt[x]);
			}
		}
	}
	var hinweisTaxonomien;
	erstelleExportfelder(Taxonomien, Datensammlungen, Beziehungssammlungen);
	// kontrollieren, ob Taxonomien zusammengefasst werden
	if ($("#exportieren_objekte_Taxonomien_zusammenfassen").hasClass("active")) {
		hinweisTaxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien sind zusammengefasst";
	} else {
		hinweisTaxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien werden einzeln dargestellt";
	}
	// Ergebnis rückmelden
	$("#exportieren_objekte_waehlen_gruppen_hinweis_text").alert().css("display", "block");
	$("#exportieren_objekte_waehlen_gruppen_hinweis_text").html(hinweisTaxonomien);
}

// Nimmt ein FelderObjekt entgegen. Das ist entweder leer (erste Gruppe) oder enthält schon Felder (ab der zweiten Gruppe)
// Nimmt ein Array mit Feldern entgegen
// mit der Struktur: {"key":["Flora","Datensammlung","Blaue Liste (1998)","Anwendungshäufigkeit zur Erhaltung"],"value":null}
// ergänzt das FelderObjekt um diese Felder
// retourniert das ergänzte FelderObjekt
// das FelderObjekt enthält alle gewünschten Felder. Darin sind nullwerte
function ergaenzeFelderObjekt(FelderObjekt, FelderArray) {
	var DsTyp, DsName, FeldName;
	for (var i in FelderArray) {
		if (FelderArray[i].key) {
			// Gruppe wurde entfernt, so sind alle keys um 1 kleiner als ursprünglich
			DsTyp = FelderArray[i].key[0];
			DsName = FelderArray[i].key[1];
			FeldName = FelderArray[i].key[2];
			if (DsTyp === "Objekt") {
				// das ist eine Eigenschaft des Objekts
				//FelderObjekt[FeldName] = null;	// NICHT HINZUFÜGEN, DIESE FELDER SIND SCHON IM FORMULAR FIX DRIN
			} else if (window.fasseTaxonomienZusammen && DsTyp === "Taxonomie") {
				// Datensammlungen werden zusammengefasst. DsTyp muss "Taxonomie(n)" heissen und die Felder aller Taxonomien sammeln
				// Wenn Datensammlung noch nicht existiert, gründen
				if (!FelderObjekt["Taxonomie(n)"]) {
					FelderObjekt["Taxonomie(n)"] = {};
					FelderObjekt["Taxonomie(n)"].Typ = DsTyp;
					FelderObjekt["Taxonomie(n)"].Name = "Taxonomie(n)";
					FelderObjekt["Taxonomie(n)"].Daten = {};
				}
				// Feld ergänzen
				FelderObjekt["Taxonomie(n)"].Daten[FeldName] = null;
			} else if (DsTyp === "Datensammlung" || DsTyp === "Taxonomie") {
				// Wenn Datensammlung oder Taxonomie noch nicht existiert, gründen
				if (!FelderObjekt[DsName]) {
					FelderObjekt[DsName] = {};
					FelderObjekt[DsName].Typ = DsTyp;
					FelderObjekt[DsName].Name = DsName;
					FelderObjekt[DsName].Daten = {};
				}
				// Feld ergänzen
				FelderObjekt[DsName].Daten[FeldName] = null;
			} else if (DsTyp === "Beziehung") {
				// Wenn Beziehungstyp noch nicht existiert, gründen
				if (!FelderObjekt[DsName]) {
					FelderObjekt[DsName] = {};
					FelderObjekt[DsName].Typ = DsTyp;
					FelderObjekt[DsName].Name = DsName;
					FelderObjekt[DsName].Beziehungen = {};
				}
				// Feld ergänzen
				FelderObjekt[DsName].Beziehungen[FeldName] = null;
			}
		}
	}
	return FelderObjekt;
}

// wird aufgerufen durch eine der zwei Schaltflächen: "Vorschau anzeigen", "direkt exportieren"
// direkt: list-funktion aufrufen, welche die Daten direkt herunterlädt
function filtereFuerExport(direkt) {

	// kontrollieren, ob eine Gruppe gewählt wurde
	if (fuerExportGewaehlteGruppen().length === 0) {
		$('#meldung_keine_gruppen').modal();
		return;
	}

	// Beschäftigung melden
	if (!direkt) {
		$("#exportieren_exportieren_hinweis_text").alert().css("display", "block");
		$("#exportieren_exportieren_hinweis_text").html("Die Daten werden vorbereitet...");
	}

	// zum Hinweistext scrollen
	$('html, body').animate({
		scrollTop: $("#exportieren_exportieren_hinweis_text").offset().top
	}, 2000);
	// Array von Filterobjekten bilden
	var filterkriterien = [];
	// Objekt bilden, in das die Filterkriterien integriert werden, da ein array schlecht über die url geliefert wird
	var filterkriterienObjekt = {};
	var filterObjekt;
	// gewählte Gruppen ermitteln
	var gruppen_array = [];
	var gruppen = "";
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
	$("#exportieren_objekte_waehlen_ds_collapse .export_feld_filtern").each(function() {
		if (this.value || this.value === 0) {
			// Filterobjekt zurücksetzen
			filterObjekt = {};
			filterObjekt.DsTyp = $(this).attr('dstyp');
			filterObjekt.DsName = $(this).attr('eigenschaft');
			filterObjekt.Feldname = $(this).attr('feld');
			// Filterwert in Kleinschrift verwandeln, damit Gross-/Kleinschrift nicht wesentlich ist (Vergleichswerte werden von filtereFuerExport später auch in Kleinschrift verwandelt)
			filterObjekt.Filterwert = ermittleVergleichsoperator(this.value)[1];
			filterObjekt.Vergleichsoperator = ermittleVergleichsoperator(this.value)[0];
			filterkriterien.push(filterObjekt);
		}
	});
	// den array dem objekt zuweisen
	filterkriterienObjekt.filterkriterien = filterkriterien;
	// gewählte Felder ermitteln
	var gewaehlte_felder = [];
	var gewaehlte_felder_objekt = {};
	var anz_ds_gewaehlt = 0;
	$(".exportieren_felder_waehlen_objekt_feld.feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			// feldObjekt erstellen
			feldObjekt = {};
			feldObjekt.DsName = "Objekt";
			feldObjekt.Feldname = $(this).attr('feldname');
			gewaehlte_felder.push(feldObjekt);
		}
	});
	$("#exportieren_felder_waehlen_felderliste .feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			// feldObjekt erstellen
			feldObjekt = {};
			feldObjekt.DsTyp = $(this).attr('dstyp');
			if (feldObjekt.DsTyp !== "Taxonomie") {
				anz_ds_gewaehlt++;
			}
			feldObjekt.DsName = $(this).attr('datensammlung');
			feldObjekt.Feldname = $(this).attr('feld');
			gewaehlte_felder.push(feldObjekt);
		}
	});
	// den array dem objekt zuweisen
	gewaehlte_felder_objekt.felder = gewaehlte_felder;

	// Wenn keine Felder gewählt sind: Melden und aufhören
	if (gewaehlte_felder_objekt.felder.length === 0) {
		// Beschäftigungsmeldung verstecken
		$("#exportieren_exportieren_hinweis_text").alert().css("display", "none");
		$("#exportieren_exportieren_error_text").alert().css("display", "block");
		$("#exportieren_exportieren_error_text").html("Keine Eigenschaften gewählt<br>Bitte wählen Sie Eigenschaften, die exportiert werden sollen");
		return;
	}

	// jetzt das filterObjekt übergeben
	if (direkt) {
		uebergebeFilterFuerDirektExport(gruppen, gruppen_array, anz_ds_gewaehlt, filterkriterienObjekt, gewaehlte_felder_objekt);
	} else {
		uebergebeFilterFuerExportMitVorschau(gruppen, gruppen_array, anz_ds_gewaehlt, filterkriterienObjekt, gewaehlte_felder_objekt);
	}
}

function uebergebeFilterFuerDirektExport(gruppen, gruppen_array, anz_ds_gewaehlt, filterkriterienObjekt, gewaehlte_felder_objekt) {
	// Alle Felder abfragen
	var fTz = "false";

	// window.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
	if (window.fasseTaxonomienZusammen) {
		fTz = "true";
	}
	var queryParam;
	if ($("#exportieren_synonym_infos").prop('checked')) {
		queryParam = "export_mit_synonymen_direkt/all_docs_mit_synonymen?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
	} else {
		queryParam = "export_direkt/all_docs?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
	}
	if ($("#exportieren_nur_ds").prop('checked') && anz_ds_gewaehlt > 0) {
		// prüfen, ob mindestens ein Feld aus ds gewählt ist
		// wenn ja: true, sonst false
		queryParam += "&nur_ds=true";
	} else {
		queryParam += "&nur_ds=false";
	}
	if ($("#export_bez_in_zeilen").prop('checked')) {
		queryParam += "&bez_in_zeilen=true";
	} else {
		queryParam += "&bez_in_zeilen=false";
	}
	window.open('_list/' + queryParam);
}

function uebergebeFilterFuerExportMitVorschau(gruppen, gruppen_array, anz_ds_gewaehlt, filterkriterienObjekt, gewaehlte_felder_objekt) {
	
	// Alle Felder abfragen
	var fTz = "false";
	// window.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
	if (window.fasseTaxonomienZusammen) {
		fTz = "true";
	}
	// globale Variable vorbereiten
	window.exportieren_objekte = [];
	// in anz_gruppen_abgefragt wird gezählt, wieviele Gruppen schon abgefragt wurden
	// jede Abfrage kontrolliert nach Erhalt der Daten, ob schon alle Gruppen abgefragt wurden und macht weiter, wenn ja
	var anz_gruppen_abgefragt = 0;
	for (var i=0; i<gruppen_array.length; i++) {
		var dbParam, queryParam;
		if ($("#exportieren_synonym_infos").prop('checked')) {
			dbParam = "artendb/export_mit_synonymen";
			queryParam = gruppen_array[i] + "_mit_synonymen?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
		} else {
			dbParam = "artendb/export";
			queryParam = gruppen_array[i] + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
		}
		if ($("#exportieren_nur_ds").prop('checked') && anz_ds_gewaehlt > 0) {
			// prüfen, ob mindestens ein Feld aus ds gewählt ist
			// wenn ja: true, sonst false
			queryParam += "&nur_ds=true";
		} else {
			queryParam += "&nur_ds=false";
		}
		if ($("#export_bez_in_zeilen").prop('checked')) {
			queryParam += "&bez_in_zeilen=true";
		} else {
			queryParam += "&bez_in_zeilen=false";
		}
		$db = $.couch.db("artendb");
		$db.list(dbParam, queryParam, {
			success: function(data) {
				// alle Objekte in data in window.exportieren_objekte anfügen
				window.exportieren_objekte = _.union(window.exportieren_objekte, data);
				// speichern, dass eine Gruppe abgefragt wurde
				anz_gruppen_abgefragt++;
				if (anz_gruppen_abgefragt === gruppen_array.length) {
					// alle Gruppen wurden abgefragt, jetzt kann es weitergehen
					// Ergebnis rückmelden
					$("#exportieren_exportieren_hinweis_text").alert().css("display", "block");
					$("#exportieren_exportieren_hinweis_text").html(window.exportieren_objekte.length + " Objekte sind gewählt");
					baueTabelleFuerExportAuf();
				}
			},
			error: function() {
				console.log('error in $db.list');
			}
		});
	}
}

function baueTabelleFuerExportAuf() {
	// Beschäftigung melden
	$("#exportieren_exportieren_hinweis_text").append("<br>Die Vorschau wird erstellt...");

	if (window.exportieren_objekte.length > 0) {
		erstelleTabelle(window.exportieren_objekte, "", "exportieren_exportieren_tabelle");
		$(".exportieren_exportieren_exportieren").show();
		// zur Tabelle scrollen
		$('html, body').animate({
			scrollTop: $("#exportieren_exportieren_exportieren").offset().top
		}, 2000);
	} else if (window.exportieren_objekte && window.exportieren_objekte.length === 0) {
		$('#meldung_keine_exportdaten').modal();
	}
	// Beschäftigungsmeldung verstecken
	$("#exportieren_exportieren_hinweis_text").alert().css("display", "none");
}

function fuerExportGewaehlteGruppen() {
	var gruppen = [];
	$(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			gruppen.push($(this).attr('feldname'));
		}
	});
	return gruppen;
}

// woher wird bloss benötigt, wenn angemeldet werden muss
function bereiteImportieren_ds_beschreibenVor(woher) {
	if (!pruefeAnmeldung("woher")) {
		$('#importieren_ds_ds_beschreiben_collapse').collapse('hide');
	} else {
		$("#DsName").focus();
		// Daten holen, wenn nötig
		if (window.ds_von_objekten) {
			bereiteImportieren_ds_beschreibenVor_02();
		} else {
			$db = $.couch.db("artendb");
			$db.view('artendb/ds_von_objekten?startkey=["Datensammlung"]&endkey=["Datensammlung",{},{},{},{}]&group_level=5', {
				success: function(data) {
					// Daten in Objektvariable speichern > Wenn Ds ausgesählt, Angaben in die Felder kopieren
					window.ds_von_objekten = data;
					bereiteImportieren_ds_beschreibenVor_02();
				}
			});
		}
	}
}

// DsNamen in Auswahlliste stellen
// veränderbare sind normal, übrige grau
function bereiteImportieren_ds_beschreibenVor_02() {
	// in diesem Array werden alle keys gesammelt
	// diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
	window.DsKeys = [];
	for (var i=0; i< window.ds_von_objekten.rows.length; i++) {
		DsKeys.push(window.ds_von_objekten.rows[i].key);
	}
	// nach DsNamen sortieren
	DsKeys = _.sortBy(DsKeys, function(key) {
		return key[1];
	});
	// mit leerer Zeile beginnen
	var html = "<option value=''></option>";
	// Namen der Datensammlungen als Optionen anfügen
	for (var z in DsKeys) {
		// veränderbar sind nur selbst importierte und zusammenfassende
		if (DsKeys[z][3] === localStorage.Email || DsKeys[z][2]) {
			// veränderbare sind normal = schwarz
			html += "<option value='" + DsKeys[z][1] + "' waehlbar=true>" + DsKeys[z][1] + "</option>";
		} else {
			// nicht veränderbare sind grau
			html += "<option value='" + DsKeys[z][1] + "' style='color:grey;' waehlbar=false>" + DsKeys[z][1] + "</option>";
		}
	}
	$("#DsWaehlen").html(html);
	$("#DsUrsprungsDs").html(html);
}

// woher wird bloss benötigt, wenn angemeldet werden muss
function bereiteImportieren_bs_beschreibenVor(woher) {
	if (!pruefeAnmeldung("woher")) {
		$('#importieren_bs_ds_beschreiben_collapse').collapse('hide');
	} else {
		$("#BsName").focus();
		// anzeigen, dass Daten geladen werden. Nein: Blitzt bloss kurz auf
		//$("#BsWaehlen").html("<option value='null'>Bitte warte, die Liste wird aufgebaut...</option>");
		// Daten holen, wenn nötig
		if (window.bs_von_objekten) {
			bereiteImportieren_bs_beschreibenVor_02();
		} else {
			$db = $.couch.db("artendb");
			$db.view('artendb/ds_von_objekten?startkey=["Beziehungssammlung"]&endkey=["Beziehungssammlung",{},{},{},{}]&group_level=5', {
				success: function(data) {
					// Daten in Objektvariable speichern > Wenn Ds ausgesählt, Angaben in die Felder kopieren
					window.bs_von_objekten = data;
					bereiteImportieren_bs_beschreibenVor_02();
				}
			});
		}
	}
}

function bereiteImportieren_bs_beschreibenVor_02() {
	// in diesem Array werden alle keys gesammelt
	// diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
	window.BsKeys = [];
	for (var i=0; i< window.bs_von_objekten.rows.length; i++) {
		BsKeys.push(window.bs_von_objekten.rows[i].key);
	}
	// nach DsNamen sortieren
	BsKeys = _.sortBy(BsKeys, function(key) {
		return key[1];
	});
	// mit leerer Zeile beginnen
	var html = "<option value=''></option>";
	// Namen der Datensammlungen als Optionen anfügen
	for (var z in BsKeys) {
		// veränderbar sind nur selbst importierte und zusammenfassende
		if (BsKeys[z][3] === localStorage.Email || BsKeys[z][2]) {
			// veränderbare sind normal = schwarz
			html += "<option value='" + BsKeys[z][1] + "' waehlbar=true>" + BsKeys[z][1] + "</option>";
		} else {
			// nicht veränderbare sind grau
			html += "<option value='" + BsKeys[z][1] + "' style='color:grey;' waehlbar=false>" + BsKeys[z][1] + "</option>";
		}
	}
	$("#BsWaehlen").html(html);
	$("#BsUrsprungsBs").html(html);
}

function isFileAPIAvailable() {
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
}

// übernimmt ein Objekt und einen Array
// prüft, ob das Objekt im Array enthalten ist
function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
}

function sortiereObjektarrayNachName(objektarray) {
	// Beziehungssammlungen bzw. Datensammlungen nach Name sortieren
	objektarray.sort(function(a, b) {
		var aName = a.Name;
		var bName = b.Name;
		if (aName && bName) {
			return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
		} else {
			return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
		}
	});
	return objektarray;
}

// übernimmt einen Array mit den Beziehungen
// gibt diesen sortiert zurück
function sortiereBeziehungenNachName(beziehungen) {
// Beziehungen nach Name sortieren
	beziehungen.sort(function(a, b) {
		var aName, bName;
		for (var c in a.Beziehungspartner) {
			if (a.Beziehungspartner[c].Gruppe === "Lebensräume") {
				// sortiert werden soll bei Lebensräumen zuerst nach Taxonomie, dann nach Name
				aName = a.Beziehungspartner[c].Gruppe + a.Beziehungspartner[c].Taxonomie + a.Beziehungspartner[c].Name;
			} else {
				aName = a.Beziehungspartner[c].Gruppe + a.Beziehungspartner[c].Name;
			}
		}
		for (var d in b.Beziehungspartner) {
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
}

// sortiert nach den keys des Objekts
// resultat nicht garantiert!
function sortKeysOfObject(o) {
	var sorted = {},
	key, a = [];

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
}

function exportZuruecksetzen() {
	// Export ausblenden, falls sie eingeblendet war
	if ($("#exportieren_exportieren_collapse").css("display") !== "none") {
		$("#exportieren_exportieren_collapse").collapse('hide');
	}
	$("#exportieren_exportieren_tabelle").hide();
	$(".exportieren_exportieren_exportieren").hide();
	$("#exportieren_exportieren_error_text").alert().css("display", "none");
}

function oeffneGruppe(Gruppe) {
	// Gruppe als globale Variable speichern, weil sie an vielen Orten benutzt wird
	window.Gruppe = Gruppe;
	$(".suchfeld").val("");
	$("#Gruppe_label").html("Gruppe:");
	$(".suchen").hide();
	$("#forms").hide();
	$(".suchen").val("");
	var treeMitteilung = "hole Daten...";
	if (window.Gruppe === "Macromycetes") {
		treeMitteilung = "hole Daten (das dauert bei Pilzen länger...)";
	}
	$("#treeMitteilung").html(treeMitteilung);
	$("#treeMitteilung").show();
	erstelleBaum();
	// keine Art mehr aktiv
	delete localStorage.art_id;
}

// schreibt Änderungen in Feldern in die Datenbank
// wird vorläufig nur für LR Taxonomie verwendet
function speichern(feldWert, feldName, dsName, dsTyp) {
	// zuerst die id des Objekts holen
	var uri = new Uri($(location).attr('href'));
	var id = uri.getQueryParamValue('id');
	// wenn browser history nicht unterstützt, erstellt history.js eine hash
	// dann muss die id durch die id in der hash ersetzt werden
	var hash = uri.anchor();
	if (hash) {
		var uri2 = new Uri(hash);
		id = uri2.getQueryParamValue('id');
	}
	// sicherstellen, dass boolean, float und integer nicht in Text verwandelt werden
	feldWert = convertToCorrectType(feldWert);
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
							aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, feldWert);
							// Feld Taxonomie und Beschriftung des Accordions aktualisiern
							// dazu neu initiieren, weil sonst das Accordion nicht verändert wird
							initiiere_art(id);
							// Taxonomie anzeigen
							$('#' + feldWert.replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'')).collapse('show');
						} else {
							aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, false);
						}
						// node umbenennen
						var neuerNodetext;
						if (feldName === "Label") {
							// object hat noch den alten Wert für Label, neuen verwenden
							neuerNodetext = erstelleLrLabelName(feldWert, object.Taxonomie.Daten.Einheit);
						} else {
							// object hat noch den alten Wert für Einheit, neuen verwenden
							neuerNodetext = erstelleLrLabelName(object.Taxonomie.Daten.Label, feldWert);
						}
						$("#tree" + window.Gruppe).jstree("rename_node", "#" + object._id, neuerNodetext);
					}
				},
				error: function(data) {
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
}

function convertToCorrectType(feldWert) {
	var type = myTypeOf(feldWert);
	if (type === "boolean") {
		return Boolean(feldWert);
	} else if (type === "float") {
		return parseFloat(feldWert);
	} else if (type === "integer") {
		return parseInt(feldWert);
	} else {
		return feldWert;
	}
}

// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!
function myTypeOf(Wert) {
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
}

function bearbeiteLrTaxonomie() {
	// Benutzer muss anmelden
	// der alte Code wurde verbessert
	// konnte aber noch nicht getestet werden, weil Schaltflächen nicht sichtbar sind
	// daher alte Version noch behalten
	/*if (!localStorage.Email) {
		$("#art_anmelden").show();
		$("#art_anmelden_collapse").collapse('show');
		$("#Email_art").focus();
		return false;
	}*/
	if (!pruefeAnmeldung("art")) {
		return false;
	}
	// Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
	window.lr_bearb = true;
	$("#art_anmelden_collapse").collapse('hide');

	// alle Felder schreibbar setzen
	$(".panel-body.Lebensräume.Taxonomie .controls").each(function() {
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
	$('.lr_bearb').removeClass('disabled');
	$(".lr_bearb_bearb").addClass('disabled');
}

function schuetzeLrTaxonomie() {
	// alle Felder schreibbar setzen
	$(".panel-body.Lebensräume.Taxonomie .controls").each(function() {
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
}

// aktualisiert die Hierarchie eines Arrays von Objekten (in dieser Form: Lebensräumen, siehe wie der Name der parent-objekte erstellt wird)
// der Array kann das Resultat einer Abfrage aus der DB sein (object[i] = dara.rows[i].doc)
// oder aus dem Import einer Taxonomie stammen
// diese Funktion wird benötigt, wenn eine neue Taxonomie importiert wird
function aktualisiereHierarchieEinerLrTaxonomie(objekt_array) {
	for (var i=0; i<objekt_array.length; i++) {
		var object,
			hierarchie = [],
			parent = object.Taxonomie.Daten.Parent;
		// als Start sich selben zur Hierarchie hinzufügen
		hierarchie.push(erstelleHierarchieobjektAusObjekt(objekt_array[i]));
		if (parent) {
			object.Taxonomie.Daten.Hierarchie = ergänzeParentZuLrHierarchie(objekt_array, object._id, hierarchie);
			$db.saveDoc(object);
		}
	}
}

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// diese Funktion wird benötigt, wenn ein neuer LR erstellt wird
// LR kann mitgegeben werden, muss aber nicht
// wird mitgegeben, wenn an den betreffenden lr nichts ändert und nicht jedesmal die LR aus der DB neu abgerufen werden sollen
// manchmal ist es aber nötig, die LR neu zu holen, wenn dazwischen an LR geändert wird!
function aktualisiereHierarchieEinesNeuenLr(LR, object, aktualisiereHierarchiefeld) {
	if (LR) {
		aktualisiereHierarchieEinesNeuenLr_2(object, aktualisiereHierarchiefeld);
	} else {
		$db = $.couch.db("artendb");
		$db.view('artendb/lr?include_docs=true', {
			success: function(data) {
				aktualisiereHierarchieEinesNeuenLr_2(data, object, aktualisiereHierarchiefeld);
			}
		});
	}
}

function aktualisiereHierarchieEinesNeuenLr_2(LR, object, aktualisiereHierarchiefeld) {
	var object_array,
		hierarchie = [];
	object_array = _.map(LR.rows, function(row) {
		return row.doc;
	});
	if (!object.Taxonomie) {
		object.Taxonomie = {};
	}
	if (!object.Taxonomie.Daten) {
		object.Taxonomie.Daten = {};
	}
	var parent_object = _.find(object_array, function(obj) {
		return obj._id === object.Taxonomie.Daten.Parent.GUID;
	});
	// object.Name setzen
	object.Taxonomie.Name = parent_object.Taxonomie.Name;
	// object.Taxonomie.Daten.Taxonomie setzen
	object.Taxonomie.Daten.Taxonomie = parent_object.Taxonomie.Daten.Taxonomie;
	// als Start sich selben zur Hierarchie hinzufügen
	hierarchie.push(erstelleHierarchieobjektAusObjekt(object));
	object.Taxonomie.Daten.Hierarchie = ergänzeParentZuLrHierarchie(object_array, object.Taxonomie.Daten.Parent.GUID, hierarchie);
	// save ohne open: _rev wurde zuvor übernommen
	$db.saveDoc(object, {
		success: function(doc) {
			$.when(erstelleBaum()).then(function() {
				oeffneBaumZuId(object._id);
				$('#lr_parent_waehlen').modal('hide');
			});
		},
		error: function() {
			$("#meldung_individuell_label").html("Fehler");
			$("#meldung_individuell_text").html("Die Hierarchie des Lebensraums konnte nicht erstellt werden");
			$("#meldung_individuell_schliessen").html("schliessen");
			$('#meldung_individuell').modal();
			initiiere_art(object._id);
		}
	});
}

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// und auch den parent
// prüft, ob dieses Objekt children hat
// wenn ja, wird deren Hierarchie auch aktualisiert
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// wird das Ergebnis der DB-Abfrage mitgegeben, wird die Abfrage nicht wiederholt
// diese Funktion wird benötigt, wenn Namen oder Label eines bestehenden LR verändert wird
function aktualisiereHierarchieEinesLrInklusiveSeinerChildren(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
	var hierarchie = [];
	if (lr) {
		aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
	} else {
		$db = $.couch.db("artendb");
		$db.view('artendb/lr?include_docs=true', {
			success: function(lr) {
				aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
			}
		});
	}
}

function aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, objekt, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
	var hierarchie = [],
		parent = objekt.Taxonomie.Daten.Parent;
	var object_array = _.map(lr.rows, function(row) {
		return row.doc;
	});
	if (!objekt.Taxonomie) {
		objekt.Taxonomie = {};
	}
	if (!objekt.Taxonomie.Daten) {
		objekt.Taxonomie.Daten = {};
	}
	// als Start sich selben zur Hierarchie hinzufügen
	hierarchie.push(erstelleHierarchieobjektAusObjekt(objekt));
	if (parent.GUID !== objekt._id) {
		objekt.Taxonomie.Daten.Hierarchie = ergänzeParentZuLrHierarchie(object_array, objekt.Taxonomie.Daten.Parent.GUID, hierarchie);
	} else {
		// aha, das ist die Wurzel des Baums
		objekt.Taxonomie.Daten.Hierarchie = hierarchie;
	}
	if (aktualisiereHierarchiefeld) {
		$("#Hierarchie").val(erstelleHierarchieFuerFeldAusHierarchieobjekteArray(objekt.Taxonomie.Daten.Hierarchie));
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
		success: function(data) {
			var doc;
			// kontrollieren, ob das Objekt children hat. Wenn ja, diese aktualisieren
			for (var i=0; i<lr.rows.length; i++) {
				doc = lr.rows[i].doc;
				if (doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten.Parent && doc.Taxonomie.Daten.Parent.GUID && doc.Taxonomie.Daten.Parent.GUID === objekt._id && doc._id !== objekt._id) {
					// das ist ein child
					// auch aktualisieren
					// lr mitgeben, damit die Abfrage nicht wiederholt werden muss
					aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, doc, false, einheit_ist_taxonomiename);
				}
			}
		}
	});
}

// Baut den Hierarchiepfad für einen Lebensraum auf
// das erste Element - der Lebensraum selbst - wird mit der Variable "Hierarchie" übergeben
// ruft sich selbst rekursiv auf, bis das oberste Hierarchieelement erreicht ist
function ergänzeParentZuLrHierarchie(objekt_array, parentGUID, Hierarchie) {
	for (var i=0; i<objekt_array.length; i++) {
		var parentObjekt, hierarchieErgänzt;
		if (objekt_array[i]._id === parentGUID) {
			parentObjekt = erstelleHierarchieobjektAusObjekt(objekt_array[i]);
			Hierarchie.push(parentObjekt);
			if (objekt_array[i].Taxonomie.Daten.Parent.GUID !== objekt_array[i]._id) {
				// die Hierarchie ist noch nicht zu Ende - weitermachen
				hierarchieErgänzt = ergänzeParentZuLrHierarchie(objekt_array, objekt_array[i].Taxonomie.Daten.Parent.GUID, Hierarchie);
				return Hierarchie;
			} else {
				// jetzt ist die Hierarchie vollständig
				// sie ist aber verkehrt - umkehren
				return Hierarchie.reverse();
			}
		}
	}
}

function erstelleHierarchieobjektAusObjekt(objekt) {
	var hierarchieobjekt = {};
	hierarchieobjekt.Name = erstelleLrLabelNameAusObjekt(objekt);
	hierarchieobjekt.GUID = objekt._id;
	return hierarchieobjekt;
}

function erstelleLrLabelNameAusObjekt(objekt) {
	var Label = objekt.Taxonomie.Daten.Label || "";
	var Einheit = objekt.Taxonomie.Daten.Einheit || "";
	return erstelleLrLabelName(Label, Einheit);
}

function erstelleLrLabelName(Label, Einheit) {
	if (Label && Einheit) {
		return Label + ": " + Einheit;
	} else if (Einheit) {
		return Einheit;
	} else {
		// aha, ein neues Objekt, noch ohne Label und Einheit
		return "unbenannte Einheit";
	}
}

// löscht Datensätze in Massen
// nimmt einen Array von Objekten entgegen
// baut daraus einen neuen array auf, in dem die Objekte nur noch die benötigten Informationen haben
// aktualisiert die Objekte mit einer einzigen Operation
function loescheMassenMitObjektArray(objekt_array) {
	var objekte_mit_objekte, objekte, objekt;
	objekte = [];
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
}

// erhält einen filterwert
// dieser kann zuvorderst einen Vergleichsoperator enthalten oder auch nicht
// retourniert einen Array mit 0 Vergleichsoperator und 1 filterwert
function ermittleVergleichsoperator(filterwert) {
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
}

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
		{ string: navigator.userAgent, subString: "Opera",   identity: "Opera" },
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
!function(e){var t=function(t,n){this.$element=e(t),this.type=this.$element.data("uploadtype")||(this.$element.find(".thumbnail").length>0?"image":"file"),this.$input=this.$element.find(":file");if(this.$input.length===0)return;this.name=this.$input.attr("name")||n.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),this.$hidden.length===0&&(this.$hidden=e('<input type="hidden" />'),this.$element.prepend(this.$hidden)),this.$preview=this.$element.find(".fileupload-preview");var r=this.$preview.css("height");this.$preview.css("display")!="inline"&&r!="0px"&&r!="none"&&this.$preview.css("line-height",r),this.original={exists:this.$element.hasClass("fileupload-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.$remove=this.$element.find('[data-dismiss="fileupload"]'),this.$element.find('[data-trigger="fileupload"]').on("click.fileupload",e.proxy(this.trigger,this)),this.listen()};t.prototype={listen:function(){this.$input.on("change.fileupload",e.proxy(this.change,this)),e(this.$input[0].form).on("reset.fileupload",e.proxy(this.reset,this)),this.$remove&&this.$remove.on("click.fileupload",e.proxy(this.clear,this))},change:function(e,t){if(t==="clear")return;var n=e.target.files!==undefined?e.target.files[0]:e.target.value?{name:e.target.value.replace(/^.+\\/,"")}:null;if(!n){this.clear();return}this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);if(this.type==="image"&&this.$preview.length>0&&(typeof n.type!="undefined"?n.type.match("image.*"):n.name.match(/\.(gif|png|jpe?g)$/i))&&typeof FileReader!="undefined"){var r=new FileReader,i=this.$preview,s=this.$element;r.onload=function(e){i.html('<img src="'+e.target.result+'" '+(i.css("max-height")!="none"?'style="max-height: '+i.css("max-height")+';"':"")+" />"),s.addClass("fileupload-exists").removeClass("fileupload-new")},r.readAsDataURL(n)}else this.$preview.text(n.name),this.$element.addClass("fileupload-exists").removeClass("fileupload-new")},clear:function(e){this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name","");if(navigator.userAgent.match(/msie/i)){var t=this.$input.clone(!0);this.$input.after(t),this.$input.remove(),this.$input=t}else this.$input.val("");this.$preview.html(""),this.$element.addClass("fileupload-new").removeClass("fileupload-exists"),e&&(this.$input.trigger("change",["clear"]),e.preventDefault())},reset:function(e){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.original.exists?this.$element.addClass("fileupload-exists").removeClass("fileupload-new"):this.$element.addClass("fileupload-new").removeClass("fileupload-exists")},trigger:function(e){this.$input.trigger("click"),e.preventDefault()}},e.fn.fileupload=function(n){return this.each(function(){var r=e(this),i=r.data("fileupload");i||r.data("fileupload",i=new t(this,n)),typeof n=="string"&&i[n]()})},e.fn.fileupload.Constructor=t,e(document).on("click.fileupload.data-api",'[data-provides="fileupload"]',function(t){var n=e(this);if(n.data("fileupload"))return;n.fileupload(n.data());var r=e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');r.length>0&&(r.trigger("click.fileupload"),t.preventDefault())})}(window.jQuery)


/**
 * JavaScript format string function
 * 
 */
String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined' ? args[number] : '{' + number + '}';
	});
};

function wirTestenDasTesten(aha) {
	if (aha) {
		return "in";
	} else {
		return "out";
	}
}