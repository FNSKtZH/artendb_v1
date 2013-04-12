function erstelleBaum() {
	var baum,
		gruppe, gruppenbezeichung,
		anzahl_objekte,
		baum_erstellt = $.Deferred();
	//alle Bäume ausblenden
	$(".baum").css("display", "none");
	//alle Beschriftungen ausblenden
	$(".treeBeschriftung").css("display", "none");
	//gewollte beschriften und sichtbar schalten
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
		success: function (data) {
			anzahl_objekte = data.rows[0].value;
			$("#tree" + window.Gruppe + "Beschriftung").html(anzahl_objekte + " " + gruppenbezeichung);
			//eingeblendet wird die Beschriftung, wenn der Baum fertig ist im callback von function erstelleTree
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
			"ajax": {
				"type": 'GET',
				"url": function(node) {
					//wie sicherstellen, dass nicht dieselben nodes mehrmals angehängt werden?
					if (node == -1) {
						return holeDatenFuerTreeOberstesLevel();
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
						return holeDatenFuerTreeUntereLevel(level, filter, gruppe, id);
					}
				},
				"success": function(data) {
					return data;
				}
			}
		},
		"ui": {
			"select_limit": 1,	//nur ein Datensatz kann aufs mal gewählt werden
			"selected_parent_open": true,	//wenn Code einen node wählt, werden alle parents geöffnet
			"select_prev_on_delete": true
		},
		"core": {
			"open_parents": true,	//wird ein node programmatisch geöffnet, öffnen sich alle parents
			"strings": {	//Deutsche Übersetzungen
				"loading": "hole Daten..."
			}
		},
		"sort": function (a, b) {
			return this.get_text(a) > this.get_text(b) ? 1 : -1;
		},
		"themes": {
			"icons": false
		},
		"plugins" : ["ui", "themes", "json_data", "sort"]
	})
	.bind("select_node.jstree", function (e, data) {
		var node;
		node = data.rslt.obj;
		jQuery.jstree._reference(node).open_node(node);
		if (node.attr("id")) {
			//verhindern, dass bereits offene Seiten nochmals geöffnet werden
			if (!$("#art").is(':visible') || localStorage.art_id !== node.attr("id")) {
				localStorage.art_id = node.attr("id");
				//Anzeige im Formular initiieren. ID und Datensammlung übergeben
				initiiere_art(node.attr("id"));
			}
		}
	})
	.bind("loaded.jstree", function (event, data) {
		jstree_erstellt.resolve();
		$("#suchen"+window.Gruppe).show();
		$("#suchfeld"+window.Gruppe).focus();
		initiiereSuchfeld();
		$("#tree" + window.Gruppe).css("display", "block");
		$("#tree" + window.Gruppe + "Beschriftung").css("display", "block");
		setzeTreehoehe();
	})
	.bind("after_open.jstree", function (e, data) {
		setzeTreehoehe();
	})
	.bind("after_close.jstree", function (e, data) {
		setzeTreehoehe();
	});
	return jstree_erstellt.promise();
}

function holeDatenFuerTreeOberstesLevel() {
	var gruppe;
	//wie sicherstellen, dass nicht dieselben nodes mehrmals angehängt werden?
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

function holeDatenFuerTreeUntereLevel(level, filter, gruppe, id) {
	var startkey,
		id2,
		endkey = [];
	if (filter) {
		//bei lr gibt es keinen filter und das erzeugt einen fehler
		startkey = filter.slice();
		endkey = filter.slice();
	}
	//flag, um mitzuliefern, ob die id angezeigt werden soll
	id2 = false;
	switch (gruppe) {
	case "fauna":
		if (level > 4) {
			return null;
		}
		for (a=5; a>=level; a--) {
			endkey.push({});
		}
		//im untersten level einen level mehr anzeigen, damit id vorhanden ist
		if (level === 4) {
			//das ist die Art-Ebene
			//hier soll die id angezeigt werden
			//dazu muss der nächste level abgerufen werden
			//damit die list den zu hohen level korrigieren kann, id mitgeben
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
		//im untersten level einen level mehr anzeigen, damit id vorhanden ist
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
		//im untersten level einen level mehr anzeigen, damit id vorhanden ist
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
		//im untersten level einen level mehr anzeigen, damit id vorhanden ist
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
	//zuerst mal die benötigten Daten holen
	$db = $.couch.db("artendb");
	if (window.Gruppe && window.Gruppe === "Lebensräume") {
		if (window.filtere_lr) {
			initiiereSuchfeld_2();
		} else {
			$db.view('artendb/filtere_lr?startkey=["'+window.Gruppe+'"]&endkey=["'+window.Gruppe+'", {}, {}, {}, {}, {}]', {
				success: function (data) {
					window.filtere_lr = data;
					initiiereSuchfeld_2();
				}
			});
		}
	} else if (window.Gruppe) {
		if (window["filtere_art_" + window.Gruppe.toLowerCase()]) {
			initiiereSuchfeld_2();
		} else {
			$db.view('artendb/filtere_art?startkey=["'+window.Gruppe+'"]&endkey=["'+window.Gruppe+'", {}, {}]', {
				success: function (data) {
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
	$('#suchfeld' + window.Gruppe).typeahead({
		items: 20,
		minLength: 1,
		source: function (query, process) {
			window.namen = [];
			window.map = {};
			$.each(suchObjekte, function(i, suchObjekt) {
				window.map[suchObjekt.value.Name] = suchObjekt.value;
				window.namen.push(suchObjekt.value.Name);
			});
			process(window.namen);
		},
		updater: function (item) {
			selectedState = window.map[item].Name;
			oeffneBaumZuId(window.map[item].id);
			return item;
		},
		matcher: function (item) {
			//this.query enthält den im Filterfeld eingegebenen Text
			if (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) != -1) {
				return true;
			}
		},
		sorter: function (items) {
			return items.sort();
		},
		highlighter: function (item) {
			var regex = new RegExp( '(' + this.query + ')', 'gi' );
			return item.replace( regex, "<strong>$1</strong>" );
		}
	});
	//$("#suchfeldLebensräume").on('click', $("#suchfeldLebensräume").typeahead.bind($("#suchfeldLebensräume"), 'lookup'));
}

function initiiereLrParentAuswahlliste() {
	//window.filtere_lr.rows deep kopieren
	var suchObjekte = _.union(window.filtere_lr.rows)
	//zuoberst ermöglichen, eine neue Taxonomie zu erfassen
	var neueTaxonomie = {value:{Name:"das ist eine neue Taxonomie bzw. das oberste Element der Hierarchie",id:""}};
	suchObjekte.unshift(neueTaxonomie);
	window.test = suchObjekte;
	//console.log('suchObjekte = ' + JSON.stringify(suchObjekte));
	$('#lr_parent_wahlen_filtern').typeahead({
		items: 3000,
		minLength: 0,
		source: function (query, process) {
			window.namen = [];
			window.map = {};
			$.each(suchObjekte, function(i, suchObjekt) {
				window.map[suchObjekt.value.Name] = suchObjekt.value;
				window.namen.push(suchObjekt.value.Name);
			});
			process(window.namen);
		},
		updater: function (item) {
			selectedState = window.map[item].Name;
			oeffneBaumZuId(window.map[item].id);
			return item;
		},
		matcher: function (item) {
			//this.query enthält den im Filterfeld eingegebenen Text
			if (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) != -1) {
				return true;
			}
		},
		/*sorter: function (items) {
			return items.sort();
		},*/
		highlighter: function (item) {
			var regex = new RegExp( '(' + this.query + ')', 'gi' );
			return item.replace( regex, "<strong>$1</strong>" );
		}
	});
	//$("#suchfeldLebensräume").on('click', $("#suchfeldLebensräume").typeahead.bind($("#suchfeldLebensräume"), 'lookup'));
}

function oeffneBaumZuId(id) {
	//Hierarchie der id holen
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function (objekt) {
			switch (objekt.Gruppe) {
			case "Fauna":
				//von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
				//oberste Ebene aufbauen nicht nötig, die gibt es schon
				$.jstree._reference("#treeFauna").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+"']"), function() {
					$.jstree._reference("#treeFauna").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Ordnung+"']"), function() {
						$.jstree._reference("#treeFauna").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Ordnung+","+objekt.Taxonomie.Daten.Familie+"']"), function() {
							$.jstree._reference("#treeFauna").select_node($("#"+objekt._id), function() {}, false);
						},true);
					},true);
				},true);
				break;
			case "Flora":
				//von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
				//oberste Ebene aufbauen nicht nötig, die gibt es schon
				$.jstree._reference("#treeFlora").open_node($("[filter='"+objekt.Taxonomie.Daten.Familie+"']"), function() {
					$.jstree._reference("#treeFlora").open_node($("[filter='"+objekt.Taxonomie.Daten.Familie+","+objekt.Taxonomie.Daten.Gattung+"']"), function() {
						$.jstree._reference("#treeFlora").select_node($("#"+objekt._id), function() {}, false);
					}, true);
				}, true);
				break;
			case "Moose":
				//von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
				//oberste Ebene aufbauen nicht nötig, die gibt es schon
				$.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+"']"), function() {
					$.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Familie+"']"), function() {
						$.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Daten.Klasse+","+objekt.Taxonomie.Daten.Familie+","+objekt.Taxonomie.Daten.Gattung+"']"), function() {
							$.jstree._reference("#treeMoose").select_node($("#"+objekt._id), function() {}, false);
						}, true);
					}, true);
				}, true);
				break;
			case "Macromycetes":
				//von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
				//oberste Ebene aufbauen nicht nötig, die gibt es schon
				$.jstree._reference("#treeMacromycetes").open_node($("[filter='"+objekt.Taxonomie.Daten.Gattung+"']"), function() {
					$.jstree._reference("#treeMacromycetes").select_node($("#"+objekt._id), function() {}, false);
				}, true);
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

//läuft von oben nach unten durch die Hierarchie der Lebensräume
//ruft sich selber wieder auf, wenn ein tieferer level existiert
//erwartet idArray: einen Array der GUID's aus der Hierarchie des Objekts
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
		success: function (art) {
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
			//accordion beginnen
			htmlArt = '<div id="accordion_ds" class="accordion"><h4>Taxonomie:</h4>';
			//zuerst alle Datensammlungen auflisten, damit danach sortiert werden kann
			//gleichzeitig die Taxonomie suchen und gleich erstellen lassen
			htmlArt += erstelleHtmlFuerDatensammlung("Taxonomie", art, art.Taxonomie);
			//Datensammlungen muss nicht gepusht werden
			//aber Beziehungssammlungen aufteilen
			if (art.Beziehungssammlungen.length > 0) {
				for (i=0, len=art.Beziehungssammlungen.length; i<len; i++) {
					if (typeof art.Beziehungssammlungen[i].Typ === "undefined") {
						Beziehungssammlungen.push(art.Beziehungssammlungen[i]);
						//bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
						bezNamen.push(art.Beziehungssammlungen[i].Name);
					} else if (art.Beziehungssammlungen[i].Typ === "taxonomisch") {
						taxonomischeBeziehungssammlungen.push(art.Beziehungssammlungen[i]);
						//bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
						bezNamen.push(art.Beziehungssammlungen[i].Name);
					}
				}
			}
			//taxonomische Beziehungen in gewollter Reihenfolge hinzufügen
			if (taxonomischeBeziehungssammlungen.length > 0) {
				//Titel hinzufügen, falls Datensammlungen existieren
				htmlArt += "<h4>Taxonomische Beziehungen:</h4>";
				for (q=0, len=taxonomischeBeziehungssammlungen.length; q<len; q++) {
					//HTML für Datensammlung erstellen lassen und hinzufügen
					htmlArt += erstelleHtmlFuerBeziehung(art, taxonomischeBeziehungssammlungen[q]);
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
			//Datensammlungen in gewollter Reihenfolge hinzufügen
			if (Datensammlungen.length > 0) {
				//Datensammlungen nach Name sortieren
				/*ausgeschaltet, um Tempo zu gewinnen, Daten sind eh sortiert
				Datensammlungen = sortiereObjektarrayNachName(Datensammlungen);*/
				//Titel hinzufügen
				htmlArt += "<h4>Eigenschaften:</h4>";
				for (x=0, len=Datensammlungen.length; x<len; x++) {
					//HTML für Datensammlung erstellen lassen und hinzufügen
					htmlArt += erstelleHtmlFuerDatensammlung("Datensammlung", art, Datensammlungen[x]);
					//dsNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
					dsNamen.push(Datensammlungen[x].Name);

				}
			}
			//Beziehungen hinzufügen
			if (Beziehungssammlungen.length > 0) {
				//Titel hinzufügen
				htmlArt += "<h4>Beziehungen:</h4>";
				for (q=0; q<Beziehungssammlungen.length; q++) {
					//HTML für Datensammlung erstellen lassen und hinzufügen
					htmlArt += erstelleHtmlFuerBeziehung(art, Beziehungssammlungen[q]);
				}
			}
			//Beziehungssammlungen von synonymen Arten
			if (guidsVonSynonymen.length > 0) {
				$db = $.couch.db("artendb");
				$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidsVonSynonymen)) + '&include_docs=true', {
					success: function (data) {
						var synonymeArt;
						for (f=0; f<data.rows.length; f++) {
							synonymeArt = data.rows[f].doc;
							if (synonymeArt.Datensammlungen && synonymeArt.Datensammlungen.length > 0) {
								for (a=0, len=synonymeArt.Datensammlungen.length; a<len; a++) {
									//if (synonymeArt.Datensammlungen[a].Name.indexOf(dsNamen) === -1) {
									if (dsNamen.indexOf(synonymeArt.Datensammlungen[a].Name) === -1) {
										//diese Datensammlung wird noch nicht dargestellt
										DatensammlungenVonSynonymen.push(synonymeArt.Datensammlungen[a]);
										//auch in dsNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
										dsNamen.push(synonymeArt.Datensammlungen[a].Name);
										//auch in Datensammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
										Datensammlungen.push(synonymeArt.Datensammlungen[a]);
									}
								}
							}
							if (synonymeArt.Beziehungssammlungen && synonymeArt.Beziehungssammlungen.length > 0) {
								for (a=0, len=synonymeArt.Beziehungssammlungen.length; a<len; a++) {
									if (bezNamen.indexOf(synonymeArt.Beziehungssammlungen[a].Name) === -1 && synonymeArt.Beziehungssammlungen[a]["Art der Beziehungen"] !== "synonym") {
										//diese Datensammlung wird noch nicht dargestellt
										BeziehungssammlungenVonSynonymen.push(synonymeArt.Beziehungssammlungen[a]);
										//auch in bezNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
										bezNamen.push(synonymeArt.Beziehungssammlungen[a].Name);
										//auch in Beziehungssammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
										Beziehungssammlungen.push(synonymeArt.Beziehungssammlungen[a]);
									} else if (synonymeArt.Beziehungssammlungen[a]["Art der Beziehungen"] !== "synonym") {
										//diese Beziehungssammlung wird schon dargestellt. Kann aber sein, dass beim Synonym Beziehungen existieren, welche noch nicht dargestellt werden
										var BsDerSynonymenArt = synonymeArt.Beziehungssammlungen[a];
										for (c=0; c<art.Beziehungssammlungen.length; c++) {
											if (art.Beziehungssammlungen[c].Name === BsDerSynonymenArt.Name) {
												var BsDerOriginalart = art.Beziehungssammlungen[c];
												break;
											}
										}
										if (BsDerSynonymenArt.Beziehungen && BsDerSynonymenArt.Beziehungen.length > 0) {
											for (b=0; b<BsDerSynonymenArt.Beziehungen.length; b++) {
												//durch alle Beziehungen von BsDerSynonymenArt loopen und prüfen, ob sie in den Beziehungen vorkommen
												if (_.contains(BsDerSynonymenArt.Beziehungen, BsDerSynonymenArt.Beziehungen[b])) {
													//diese Beziehung kommt schon vor und wird angezeigt > entfernen, um sie nicht nochmals anzuzeigen
													BsDerSynonymenArt.Beziehungen.splice(b);
												}
												/*if (containsObject(BsDerSynonymenArt.Beziehungen[b], BsDerSynonymenArt.Beziehungen)) {
													//diese Beziehung kommt schon vor und wird angezeigt > entfernen, um sie nicht nochmals anzuzeigen
													BsDerSynonymenArt.Beziehungen.splice(b);
												}*/
											}
										}
										if (BsDerSynonymenArt.Beziehungen.length > 0) {
											//falls noch darzustellende Beziehungen verbleiben, die DS pushen
											BeziehungssammlungenVonSynonymen.push(BsDerSynonymenArt);
										}
									}
								}
							}
						}
						//BS von Synonymen darstellen
						if (DatensammlungenVonSynonymen.length > 0) {
							//DatensammlungenVonSynonymen nach Name sortieren
							DatensammlungenVonSynonymen = sortiereObjektarrayNachName(DatensammlungenVonSynonymen);
							//Titel hinzufügen
							htmlArt += "<h4>Eigenschaften von Synonymen:</h4>";
							for (x=0, len=DatensammlungenVonSynonymen.length; x<len; x++) {
								//HTML für Datensammlung erstellen lassen und hinzufügen
								htmlArt += erstelleHtmlFuerDatensammlung("Datensammlung", art, DatensammlungenVonSynonymen[x]);
							}
						}
						//bez von Synonymen darstellen
						if (BeziehungssammlungenVonSynonymen.length > 0) {
							//BeziehungssammlungenVonSynonymen sortieren
							BeziehungssammlungenVonSynonymen = sortiereObjektarrayNachName(BeziehungssammlungenVonSynonymen);
							//Titel hinzufügen
							htmlArt += "<h4>Beziehungen von Synonymen:</h4>";
							for (x=0, len=BeziehungssammlungenVonSynonymen.length; x<len; x++) {
								//HTML für Beziehung erstellen lassen und hinzufügen. Dritten Parameter mitgeben, damit die DS in der UI nicht gleich heisst
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
		error: function () {
			//melde("Fehler: Art konnte nicht geöffnet werden");
		}
	});
}

function initiiere_art_2(htmlArt, art, Datensammlungen, DatensammlungenVonSynonymen, Beziehungssammlungen, taxonomischeBeziehungssammlungen, BeziehungssammlungenVonSynonymen) {
	//accordion beenden
	htmlArt += '</div>';
	$("#art").html(htmlArt);
	setzteHöheTextareas();
	//richtiges Formular anzeigen
	zeigeFormular("art");
	//Bei Lebensräumen die Taxonomie öffnen
	/*if (art.Gruppe === "Lebensräume") {
		$("#collapseTaxonomie").collapse('show');
		//Fokus von der Hierarchie wegnehmen
		$("#Hierarchie").blur();
	//} else if (Datensammlungen.length === 0 && DatensammlungenVonSynonymen.length === 0 && Beziehungssammlungen.length === 0 && taxonomischeBeziehungssammlungen.length === 0 && BeziehungssammlungenVonSynonymen.length === 0) {
	} else */
	if (art.Datensammlungen.length === 0 && art.Beziehungssammlungen.length === 0) {
		//Wenn nur eine Datensammlung (die Taxonomie) existiert, diese öffnen
		$(".accordion-body").collapse('show');
	}
	//jetzt die Links im Menu setzen
	setzteLinksZuBilderUndWikipedia(art);
	//und die URL anpassen
	history.pushState({id: "id"}, "id", "index.html?id=" + art._id);
}

//erstellt die HTML für eine Beziehung
//benötigt von der art bzw. den lr die entsprechende JSON-Methode art_i und ihren Namen
//altName ist für Beziehungssammlungen von Synonymen: Hier kann dieselbe DS zwei mal vorkommen und sollte nicht gleich heissen, sonst geht nur die erste auf
function erstelleHtmlFuerBeziehung(art, art_i, altName) {
	var html,
		Name;
	//Accordion-Gruppe und -heading anfügen
	html = '<div class="accordion-group"><div class="accordion-heading accordion-group_gradient">';
	//die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
	html += '<a class="accordion-toggle Datensammlung" data-toggle="collapse" data-parent="#accordion_ds" href="#collapse' + art_i.Name.replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + altName + '">';
	//Titel für die Datensammlung einfügen
	html += art_i.Name + " (" + art_i.Beziehungen.length + ")";
	//header abschliessen
	html += '</a></div>';
	//body beginnen
	html += '<div id="collapse' + art_i.Name.replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + altName + '" class="accordion-body collapse"><div class="accordion-inner">';
	//Datensammlung beschreiben
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
	//Beschreibung der Datensammlung abschliessen
	html += '</div>';

	//die Beziehungen sortieren
	art_i.Beziehungen = sortiereBeziehungenNachName(art_i.Beziehungen);

	//jetzt für alle Beziehungen die Felder hinzufügen
	for (var i=0; i<art_i.Beziehungen.length; i++) {
		if (art_i.Beziehungen[i].Beziehungspartner && art_i.Beziehungen[i].Beziehungspartner.length > 0) {
			for (var y in art_i.Beziehungen[i].Beziehungspartner) {
				//if (art_i.Beziehungen[i].Beziehungspartner[y].Gruppe === "Lebensräume") {
				if (art_i.Beziehungen[i].Beziehungspartner[y].Taxonomie) {
					Name = art_i.Beziehungen[i].Beziehungspartner[y].Gruppe + ": " + art_i.Beziehungen[i].Beziehungspartner[y].Taxonomie + " > " + art_i.Beziehungen[i].Beziehungspartner[y].Name;
				} else {
					Name = art_i.Beziehungen[i].Beziehungspartner[y].Gruppe + ": " + art_i.Beziehungen[i].Beziehungspartner[y].Name;
				}
				//Partner darstellen
				if (art_i.Beziehungen[i].Beziehungspartner[y].Rolle) {
					//Feld soll mit der Rolle beschriftet werden
					html += generiereHtmlFuerObjektlink(art_i.Beziehungen[i].Beziehungspartner[y].Rolle, Name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + art_i.Beziehungen[i].Beziehungspartner[y].GUID);
				} else {
					html += generiereHtmlFuerObjektlink("Beziehungspartner", Name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + art_i.Beziehungen[i].Beziehungspartner[y].GUID);
				}
			}
		}
		//Die Felder anzeigen
		for (var x in art_i.Beziehungen[i]) {
			if (x !== "Beziehungspartner") {
				html += erstelleHtmlFuerFeld(x, art_i.Beziehungen[i][x], "Beziehungssammlung", art_i.Name.replace(/"/g, "'"));
			}
		}
		//Am Schluss eine Linie, nicht aber bei der letzen Beziehung
		if (i < (art_i.Beziehungen.length-1)) {
			html += "<hr>";
		}
	}
	//body und Accordion-Gruppe abschliessen
	html += '</div></div></div>';
	return html;
}

//erstellt die HTML für eine Datensammlung
//benötigt von der art bzw. den lr die entsprechende JSON-Methode art_i und ihren Namen
function erstelleHtmlFuerDatensammlung(dsTyp, art, art_i) {
	var htmlDatensammlung;
	//Accordion-Gruppe und -heading anfügen
	htmlDatensammlung = '<div class="accordion-group"><div class="accordion-heading accordion-group_gradient">';
	//bei LR: Symbolleiste einfügen
	if (art.Gruppe === "Lebensräume" && dsTyp === "Taxonomie") {
		htmlDatensammlung += '<div class="btn-toolbar bearb_toolbar" style="display:none;"><div class="btn-group"><a class="btn lr_bearb lr_bearb_bearb" href="#" title="bearbeiten"><i class="icon-pencil"></i></a><a class="btn lr_bearb lr_bearb_schuetzen disabled" href="#" title="schützen"><i class="icon-ban-circle"></i></a><a class="btn lr_bearb lr_bearb_neu disabled" href="#" title="neuer Lebensraum"><i class="icon-plus"></i></a><a class="btn lr_bearb lr_bearb_loeschen disabled" href="#" title="Lebensraum löschen"><i class="icon-trash"></i></a></div></div>';
	}
	//die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
	htmlDatensammlung += '<a class="accordion-toggle Datensammlung" data-toggle="collapse" data-parent="#accordion_ds" href="#collapse' + art_i.Name.replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + '">';
	//Titel für die Datensammlung einfügen
	htmlDatensammlung += art_i.Name;
	//header abschliessen
	htmlDatensammlung += '</a></div>';
	//body beginnen
	htmlDatensammlung += '<div id="collapse' + art_i.Name.replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + '" class="accordion-body collapse ' + art.Gruppe + ' ' + dsTyp + '"><div class="accordion-inner">';
	//Datensammlung beschreiben
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
	//Beschreibung der Datensammlung abschliessen
	htmlDatensammlung += '</div>';
	//Felder anzeigen
	//zuerst die GUID, aber nur bei der Taxonomie
	if (dsTyp === "Taxonomie") {
		htmlDatensammlung += erstelleHtmlFuerFeld("GUID", art._id, dsTyp, "Taxonomie");
	}
	for (var y in art_i.Daten) {
		if (y === "GUID") {
			//dieses Feld nicht anzeigen. Es wird _id verwendet
			//dieses Feld wird künftig nicht mehr importiert
		} else if (((y === "Offizielle Art" || y === "Eingeschlossen in" || y === "Synonym von") && art.Gruppe === "Flora") || (y === "Akzeptierte Referenz" && art.Gruppe === "Moose")) {
			//dann den Link aufbauen lassen
			htmlDatensammlung += generiereHtmlFuerLinkZuGleicherGruppe(y, art._id, art_i.Daten[y].Name);
		} else if ((y === "Gültige Namen" || y === "Eingeschlossene Arten" || y === "Synonyme") && art.Gruppe === "Flora") {
			//das ist ein Array von Objekten
			htmlDatensammlung += generiereHtmlFuerLinksZuGleicherGruppe(y, art_i.Daten[y]);
		} else if ((y === "Artname" && art.Gruppe === "Flora") || (y === "Parent" && art.Gruppe === "Lebensräume")) {
			//dieses Feld nicht anzeigen
		} else if (y === "Hierarchie" && art.Gruppe === "Lebensräume") {
			//Namen kommagetrennt anzeigen
			var hierarchie_objekt_array = art_i.Daten[y];
			var hierarchie_string = "";
			for (var g in hierarchie_objekt_array) {
				if (hierarchie_string !== "") {
					hierarchie_string += "\n";
				}
				hierarchie_string += hierarchie_objekt_array[g].Name;
			}
			htmlDatensammlung += generiereHtmlFuerTextarea(y, hierarchie_string, dsTyp, art_i.Name.replace(/"/g, "'"));
		} else {
			htmlDatensammlung += erstelleHtmlFuerFeld(y, art_i.Daten[y], dsTyp, art_i.Name.replace(/"/g, "'"));
		}
	}
	//body und Accordion-Gruppe abschliessen
	htmlDatensammlung += '</div></div></div>';
	return htmlDatensammlung;
}

//übernimmt Feldname und Feldwert
//generiert daraus und retourniert html für die Darstellung im passenden Feld
function erstelleHtmlFuerFeld(Feldname, Feldwert, dsTyp, dsName) {
	var htmlDatensammlung = "";
	if (typeof Feldwert === "string" && Feldwert.slice(0, 7) === "http://") {
		//www-Links als Link darstellen
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

//managt die Links zu Google Bilder und Wikipedia
//erwartet das Objekt mit der Art
function setzteLinksZuBilderUndWikipedia(art) {
	//jetzt die Links im Menu setzen
	if (art) {
		var googleBilderLink = "";
		var wikipediaLink = "";
		switch (art.Gruppe) {
		case "Flora":
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Artname + '"';
			if (art.Taxonomie.Daten['Deutsche Namen']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Deutsche Namen'] + '"';
			}
			if (art.Taxonomie.Daten['Name Französisch']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Französisch'] + '"';
			}
			if (art.Taxonomie.Daten['Name Italienisch']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Italienisch'] + '"';
			}
			if (art.Taxonomie.Daten['Deutsche Namen']) {
				wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Taxonomie.Daten['Deutsche Namen'];
			} else {
				wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Artname;
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
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Gattung + '_' + art.Taxonomie.Daten.Art;
			break;
		case 'Moose':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Gattung + ' ' + art.Taxonomie.Daten.Art + '"';
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Gattung + '_' + art.Taxonomie.Daten.Art;
			break;
		case 'Macromycetes':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Name + '"';
			if (art.Taxonomie.Daten['Name Deutsch']) {
				googleBilderLink += '+OR+"' + art.Taxonomie.Daten['Name Deutsch'] + '"';
			}
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Name;
			break;
		case 'Lebensräume':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Daten.Einheit;
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Taxonomie.Daten.Einheit;
			break;
		}
		//mit replace Hochkommata ' ersetzen, sonst klappt url nicht
		$("#GoogleBilderLink").attr("href", encodeURI(googleBilderLink).replace("&#39;", "%20"));
		$("#GoogleBilderLink_li").removeClass("disabled");
		$("#WikipediaLink").attr("href", wikipediaLink);
		$("#WikipediaLink_li").removeClass("disabled");
	} else {
		$("#WikipediaLink").attr("href", "#");
		$("#GoogleBilderLink").attr("href", "#");
	}
}

//generiert den html-Inhalt für einzelne Links in Flora
function generiereHtmlFuerLinkZuGleicherGruppe(FeldName, id, Artname) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label"';
	//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
	if (FeldName.length > 28) {
		HtmlContainer += ' style="padding-top:0px"';
	}
	HtmlContainer += '>';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><a href="#" class="LinkZuArtGleicherGruppe feldtext controls" ArtId="';
	HtmlContainer += id;
	HtmlContainer += '">';
	HtmlContainer += Artname;
	HtmlContainer += '</a></div>';
	return HtmlContainer;
}

//generiert den html-Inhalt für Serien von Links in Flora
function generiereHtmlFuerLinksZuGleicherGruppe(FeldName, Objektliste) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label"';
	//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
	if (FeldName.length > 28) {
		HtmlContainer += ' style="padding-top:0px"';
	}
	HtmlContainer += '>';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><span class="feldtext controls">';
	for (var a in Objektliste) {
		if (a > 0) {
			HtmlContainer += ', ';
		}
		HtmlContainer += '<a href="#" class="LinkZuArtGleicherGruppe controls" ArtId="';
		HtmlContainer += Objektliste[a].GUID;
		HtmlContainer += '">';
		HtmlContainer += Objektliste[a].Name;
		HtmlContainer += '</a>';
	}
	HtmlContainer += '</span></div>';
	return HtmlContainer;
}

//generiert den html-Inhalt für einzelne Links in Flora
/*function generiereHtmlFuerWwwlink(FeldName, FeldWert) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label"';
	//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
	if (FeldName.length > 28) {
		HtmlContainer += ' style="padding-top:0px"';
	}
	HtmlContainer += '>';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><a href="';
	HtmlContainer += FeldWert;
	HtmlContainer += '" class="feldtext controls ">';
	HtmlContainer += FeldWert;
	HtmlContainer += '</a></div>';
	return HtmlContainer;
}*/

//generiert den html-Inhalt für einzelne Links in Flora
function generiereHtmlFuerWwwlink(FeldName, FeldWert, dsTyp, dsName) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group">\n\t<label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '"';
	//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
	if (FeldName.length > 28) {
		HtmlContainer += ' style="padding-top:0px"';
	}
	HtmlContainer += '>';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label>\n\t';
	//jetzt Link beginnen, damit das Feld klickbar wird
	HtmlContainer += '<a href="';
	HtmlContainer += FeldWert;
	HtmlContainer += '"><input class="controls" dsTyp="'+dsTyp+'" dsName="'+dsName+'" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '" type="text" value="';
	HtmlContainer += FeldWert;
	HtmlContainer += '" readonly="readonly" style="cursor:pointer;">';
	//Link abschliessen
	HtmlContainer += '</a>';
	HtmlContainer += '\n</div>';
	return HtmlContainer;
}

//generiert den html-Inhalt für einzelne Links in Flora
function generiereHtmlFuerObjektlink(FeldName, FeldWert, Url) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label"';
	//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
	if (FeldName.length > 28) {
		HtmlContainer += ' style="padding-top:0px"';
	}
	HtmlContainer += '>';
	HtmlContainer += FeldName;
	HtmlContainer += ':';
	HtmlContainer += '</label>';
	HtmlContainer += '<a href="';
	HtmlContainer += Url;
	HtmlContainer += '" class="feldtext controls" target="_blank">';
	HtmlContainer += FeldWert;
	HtmlContainer += '</a></div>';
	return HtmlContainer;
}

//generiert den html-Inhalt für Textinputs
function generiereHtmlFuerTextinput(FeldName, FeldWert, InputTyp, dsTyp, dsName) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group">\n\t<label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '"';
	//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
	if (FeldName.length > 28) {
		HtmlContainer += ' style="padding-top:0px"';
	}
	HtmlContainer += '>';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label>\n\t<input class="controls" id="';
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

//generiert den html-Inhalt für Textarea
function generiereHtmlFuerTextarea(FeldName, FeldWert, dsTyp, dsName) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '"';
	//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
	if (FeldName.length > 28) {
		HtmlContainer += ' style="padding-top:0px"';
	}
	HtmlContainer += '>';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><textarea class="controls" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '" readonly="readonly" dsTyp="'+dsTyp+'" dsName="'+dsName+'"';
	HtmlContainer += '>';
	HtmlContainer += FeldWert;
	HtmlContainer += '</textarea></div>';
	return HtmlContainer;
}

//generiert den html-Inhalt für ja/nein-Felder
function generiereHtmlFuerBoolean(FeldName, FeldWert, dsTyp, dsName) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '"';
	//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
	if (FeldName.length > 28) {
		HtmlContainer += ' style="padding-top:0px"';
	}
	HtmlContainer += '>';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><input class="controls" type="checkbox" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '"';
	if (FeldWert === true) {
		HtmlContainer += ' checked="true"';
	}
	HtmlContainer += ' readonly="readonly" dsTyp="'+dsTyp+'" dsName="'+dsName+'"></div>';
	return HtmlContainer;
}

//begrenzt die maximale Höhe des Baums auf die Seitenhöhe, wenn nötig
function setzeTreehoehe() {
	var windowHeight = $(window).height();
	if ($(window).width() > 1000) {
		//$("#menu").css("max-height", windowHeight - 33);
		$(".baum").css("max-height", windowHeight - 161);
	} else {
		//Spalten sind untereinander. Baum 41px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
		//$("#menu").css("max-height", windowHeight - 74);
		$(".baum").css("max-height", windowHeight - 202);
	}
}

//setzt die Höhe von textareas so, dass der Text genau rein passt
function FitToContent(id, maxHeight) {
	var text = id && id.style ? id : document.getElementById(id);
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

function setzteHöheTextareas() {
	$('form').each(function() {
		$('textarea').each(function () {
			$(this).trigger('focus');
		});
	});
}

function öffneMarkiertenNode() {
	var selected_nodes = $("#tree" + window.Gruppe).jstree("get_selected");
	$("#tree" + window.Gruppe).jstree("close_all", -1);
	$("#tree" + window.Gruppe).jstree("deselect_all", -1);
	//wenn eine Art gewählt war, diese wieder wählen
	if (selected_nodes.length === 1) {
		$("#tree" + window.Gruppe).jstree("select_node", selected_nodes);
	}
}

//managed die Sichtbarkeit von Formularen
//wird von allen initiiere_-Funktionen verwendet
//wird ein Formularname übergeben, wird dieses Formular gezeigt
//und alle anderen ausgeblendet
//zusätzlich wird die Höhe von textinput-Feldern an den Textinhalt angepasst
function zeigeFormular(Formularname) {
	var formular_angezeigt = $.Deferred();
	//zuerst alle Formulare ausblenden
	$("#forms").hide();
	$('form').each(function() {
		$(this).hide();
	});

	if (Formularname) {
		if (Formularname !== "art") {
			//Spuren des letzten Objekts entfernen
			//delete window.Gruppe;
			delete localStorage.art_id;
			//URL anpassen, damit kein Objekt angezeigt wird
			history.pushState({id: "id"}, "id", "index.html");
			//alle Bäume ausblenden, suchfeld, Baumtitel
			$(".suchen").hide();
			$(".baum").css("display", "none");
			$(".treeBeschriftung").css("display", "none");
			//Gruppe Schaltfläche deaktivieren
			$('#Gruppe .active').removeClass('active');
			//jetzt die Links im Menu deaktivieren
			setzteLinksZuBilderUndWikipedia();
		}
		$('form').each(function() {
			if ($(this).attr("id") === Formularname) {
				$("#forms").show();
				$(this).show();
				$('textarea').each(function () {
					$(this).trigger('focus');
				});
			}
		});
		$(window).scrollTop(0);
		formular_angezeigt.resolve();
	}
	return formular_angezeigt.promise();
}

//kontrollierren, ob die erforderlichen Felder etwas enthalten
//wenn ja wird true retourniert, sonst false
function validiereSignup(woher) {
	var Email, Passwort, Passwort2;
	//zunächst alle Hinweise ausblenden (falls einer von einer früheren Prüfung her noch eingeblendet wäre)
	$(".hinweis").css("display", "none");
	//erfasste Werte holen
	Email = $("#Email"+woher).val();
	Passwort = $("#Passwort"+woher).val();
	Passwort2 = $("#Passwort2"+woher).val();
	//prüfen
	if (!Email) {
		$("#Emailhinweis"+woher).css("display", "block");
		setTimeout(function() {
			$("#Email"+woher).focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (!Passwort) {
		$("#Passworthinweis"+woher).css("display", "block");
		setTimeout(function() {
			$("#Passwort"+woher).focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (!Passwort2) {
		$("#Passwort2hinweis"+woher).css("display", "block");
		setTimeout(function() {
			$("#Passwort2"+woher).focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (Passwort !== Passwort2) {
		$("#Passwort2hinweisFalsch"+woher).css("display", "block");
		setTimeout(function() {
			$("#Passwort2"+woher).focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		return false;
	}
	return true;
}

function erstelleKonto(woher) {
	//User in _user eintragen
	$.couch.signup({
		name: $('#Email'+woher).val()
	},
	$('#Passwort'+woher).val(), {
		success : function() {
			localStorage.Email = $('#Email'+woher).val();
			passeUiFuerAngemeldetenUserAn(woher);
			//Werte aus Feldern entfernen
			$("#Email"+woher).val("");
			$("#Passwort"+woher).val("");
			$("#Passwort2"+woher).val("");
		},
		error : function () {
			$("#importieren"+woher+"_anmelden_fehler_text").html("Fehler: Das Konto wurde nicht erstellt");
			$("#importieren"+woher+"_anmelden_fehler").alert();
			$("#importieren"+woher+"_anmelden_fehler").css("display", "block");
		}
	});
}

function meldeUserAn(woher) {
	var Email, Passwort;
	Email = $('#Email'+woher).val();
	Passwort = $('#Passwort'+woher).val();
	if (validiereUserAnmeldung(woher)) {
		$.couch.login({
			name : Email,
			password : Passwort,
			success : function() {
				localStorage.Email = $('#Email'+woher).val();
				passeUiFuerAngemeldetenUserAn(woher);
				//Werte aus Feldern entfernen
				$("#Email"+woher).val("");
				$("#Passwort"+woher).val("");
			},
			error: function () {
				$("#importieren"+woher+"_anmelden_fehler_text").html("Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?");
				$("#importieren"+woher+"_anmelden_fehler").alert();
				$("#importieren"+woher+"_anmelden_fehler").css("display", "block");
			}
		});
	}
}

function meldeUserAb() {
	delete localStorage.Email;
	$(".importieren_anmelden_titel").text("1. Anmelden");
	$(".alert").css("display", "none");
	$(".hinweis").css("display", "none");
	$(".anmelden_btn").show();
	$(".abmelden_btn").hide();
	$(".konto_erstellen_btn").show();
	$(".konto_speichern_btn").hide();
}

function passeUiFuerAngemeldetenUserAn(woher) {
	$(".importieren_anmelden_titel").text("1. " + localStorage.Email + " ist angemeldet");
	$("#importieren"+woher+"_anmelden_collapse").collapse('hide');
	$("#importieren"+woher+"_ds_beschreiben_collapse").collapse('show');
	$(".alert").css("display", "none");
	$(".hinweis").css("display", "none");
	$(".anmelden_btn").hide();
	$(".abmelden_btn").show();
	$(".konto_erstellen_btn").hide();
	$(".konto_speichern_btn").hide();
}

function zurueckZurAnmeldung(woher) {
	//Mitteilen, dass Anmeldung nötig ist
	$("#importieren"+woher+"_anmelden_hinweis").alert().css("display", "block");
	$("#importieren"+woher+"_anmelden_hinweis_text").html("Um Daten(sammlungen) zu bearbeiten, müssen Sie angemeldet sein");
	$("#importieren"+woher+"_anmelden_collapse").collapse('show');
	$(".anmelden_btn").show();
	$(".abmelden_btn").hide();
	$(".konto_erstellen_btn").show();
	$(".konto_speichern_btn").hide();
	$("#Email"+woher).focus();
}

function validiereUserAnmeldung(woher) {
	var Email, Passwort;
	Email = $('#Email'+woher).val();
	Passwort = $('#Passwort'+woher).val();
	if (!Email) {
		setTimeout(function () {
			$('#Email'+woher).focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		$("#Emailhinweis"+woher).css("display", "block");
		return false;
	} else if (!Passwort) {
		setTimeout(function () {
			$('#Passwort'+woher).focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		$("#Passworthinweis"+woher).css("display", "block");
		return false;
	}
	return true;
}

//übernimmt eine Array mit Objekten
//und den div, in dem die Tabelle eingefügt werden soll
//plus einen div, in dem die Liste der Felder angzeigt wird (falls dieser div mitgeliefert wird)
//baut damit eine Tabelle auf und fügt sie in den übergebenen div ein
function erstelleTabelle(Datensätze, felder_div, tabellen_div) {
	var html = "";
	if (Datensätze.length > 10) {
		html += "Vorschau auf die ersten 10 von " + Datensätze.length + " Datensätzen:";
	} else if (Datensätze.length > 1) {
		html += "Vorschau auf die " + Datensätze.length + " Datensätze:";
	} else {
		html += "Vorschau auf den " + Datensätze.length + " Datensatz:";
	}
	//Tabelle initiieren
	html += '<table class="table table-bordered table-striped table-condensed">';
	//Titelzeile aufbauen
	//Zeile anlegen
	//gleichzeitig Feldliste für Formular anlegen
	var Feldname = "";
	if (felder_div) {
		if (felder_div === "DsFelder_div") {
			Feldname = "DsFelder";
		} else if (felder_div === "BsFelder_div") {
			Feldname = "BsFelder";
		}
	}
	var html_ds_felder_div = "";
	html_ds_felder_div += '<label class="control-label" for="'+Feldname+'">Feld mit ID der Art / des Lebensraums</label>';
	html_ds_felder_div += '<select type="text" class="controls" id="'+Feldname+'" multiple="multiple" style="height:' + ((Object.keys(Datensätze[0]).length*18)+7)  + 'px">';
	html += "<thead><tr>";
	//durch die Felder zirkeln
	for (var x in Datensätze[0]) {
		//Spalte anlegen
		html += "<th>" + x + "</th>";
		//Option für Feldliste anfügen
		html_ds_felder_div += '<option value="' + x + '">' + x + '</option>';
	}
	//Titelzeile abschliessen
	html += "</tr></thead><tbody>";
	//Feldliste abschliessen
	html_ds_felder_div += '</select>';
	if (felder_div) {
		//nur, wenn ein felder_div übergeben wurde
		$("#"+felder_div).html(html_ds_felder_div);
	}

	//durch die Datensätze zirkeln
	//nur die ersten 20 anzeigen
	for (var i = 0; i < 10; i++) {
		//Datenzeilen aufbauen
		//Zeile anlegen
		html += "<tr>";
		//durch die Felder zirkeln
		for (x in Datensätze[i]) {
			//Spalte anlegen
			html += "<td>";
			if (Datensätze[i][x] === null) {
				//Null-Werte als leer anzeigen
				html += "";
			} else if (typeof Datensätze[i][x] === "object") {
				html += JSON.stringify(Datensätze[i][x]);
			} else if (Datensätze[i][x] || Datensätze[i][x] === 0) {
				html += Datensätze[i][x];
			} else {
				//nullwerte als leerwerte (nicht) anzeigen
				html += "";
			}
			//Spalte abschliessen
			html += "</td>";
		}
		//Zeile abschliessen
		html += "</tr>";
	}
	//Tabelle abschliessen
	html += '</tbody></table>';
	//html in div einfügen
	$("#"+tabellen_div).html(html);
	//sichtbar stellen
	$("#"+tabellen_div).css("display", "block");
}

//erhält dbs = "Ds" oder "Bs"
function meldeErfolgVonIdIdentifikation(dbs) {
	if ($("#"+dbs+"Felder option:selected").length && $("#"+dbs+"Id option:selected").length) {
		//beide ID's sind gewählt
		window[dbs+"FelderId"] = $("#"+dbs+"Felder option:selected").val();
		window.DsId = $("#"+dbs+"Id option:selected").val();
		window[dbs+"Id"] = $("#"+dbs+"Id option:selected").val();
		var IdsVonDatensätzen = [];
		var MehrfachVorkommendeIds = [];
		var IdsVonNichtImportierbarenDatensätzen = [];
		//das hier wird später noch für den Inmport gebraucht > globale Variable machen
		window.ZuordbareDatensätze = [];
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis").alert().css("display", "block");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").html("Bitte warten, die Daten werden analysiert...");
		//Dokumente aus der Gruppe der Datensätze holen
		//durch alle loopen. Dabei einen Array von Objekten bilden mit id und guid
		//kontrollieren, ob eine id mehr als einmal vorkommt
		$db = $.couch.db("artendb");
		if (window.DsId === "guid") {
			$db.view('artendb/all_docs', {
				success: function (data) {
					for (var i in window[dbs.toLowerCase()+"Datensätze"]) {
						//durch die importierten Datensätze loopen
						if (IdsVonDatensätzen.indexOf(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]) === -1) {
							//diese ID wurde noch nicht hinzugefügt > hinzufügen
							IdsVonDatensätzen.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
							//prüfen, ob die ID zugeordnet werden kann
							for (var x = 0; x < data.rows.length; x++) {
								if (data.rows[x].key === window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]) {
									window.ZuordbareDatensätze.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
									break;
								}
								if (x === (data.rows.length-1)) {
									//diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
									IdsVonNichtImportierbarenDatensätzen.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
								}
							}
						} else {
							//diese ID wurden schon hinzugefügt > mehrfach!
							MehrfachVorkommendeIds.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
						}
					}
					meldeErfolgVonIdIdentifikation_02(MehrfachVorkommendeIds, IdsVonDatensätzen, IdsVonNichtImportierbarenDatensätzen, dbs);
				}
			});
		} else {
			$db.view('artendb/gruppe_id_taxonomieid?startkey=["' + window.DsId + '"]&endkey=["' + window.DsId + '",{},{}]', {
				success: function (data) {
					for (var i in window[dbs.toLowerCase()+"Datensätze"]) {
						//durch die importierten Datensätze loopen
						if (IdsVonDatensätzen.indexOf(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]) === -1) {
							//diese ID wurde noch nicht hinzugefügt > hinzufügen
							IdsVonDatensätzen.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
							//prüfen, ob die ID zugeordnet werden kann
							for (var x = 0; x < data.rows.length; x++) {
								//Vorsicht: window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]] kann Zahlen als string zurückgeben, nicht === verwenden
								if (data.rows[x].key[2] == window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]) {
									var Objekt = {};
									Objekt.Id = parseInt(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]], 10);
									Objekt.Guid = data.rows[x].key[1];
									window.ZuordbareDatensätze.push(Objekt);
									break;
								}
								if (x === (data.rows.length-1)) {
									//diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
									IdsVonNichtImportierbarenDatensätzen.push(window[dbs.toLowerCase()+"Datensätze"][i][window[dbs+"FelderId"]]);
								}
							}
						} else {
							//diese ID wurden schon hinzugefügt > mehrfach!
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
	$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis").alert().css("display", "none");
	//rückmelden: Falls mehrfache ID's, nur das rückmelden und abbrechen
	if (MehrfachVorkommendeIds.length && dbs !== "Bs") {
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler").alert().css("display", "block");
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_fehler_text").html("Die folgenden ID's kommen mehrfach vor: " + MehrfachVorkommendeIds + "<br>Bitte entfernen oder korrigieren Sie die entsprechenden Zeilen");
	} else if (window.ZuordbareDatensätze.length < IdsVonDatensätzen.length) {
		//rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
		//es können nicht alle zugeordnet werden, daher als Hinweis statt als Erfolg
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis").alert().css("display", "block");
		if (dbs === "Bs") {
			$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").html("Die Importtabelle enthält " + window[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + IdsVonDatensätzen.length + " Arten:<br>Beziehungen von " + IdsVonDatensätzen.length + " Arten enthalten einen Wert im Feld \"" + window[dbs+"FelderId"] + "\"<br>" + window.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: Beziehungen von " + IdsVonNichtImportierbarenDatensätzen.length + " Arten mit den folgenden Werten im Feld \"" + window[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + IdsVonNichtImportierbarenDatensätzen);
		} else {
			$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text").html("Die Importtabelle enthält " + window[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + IdsVonDatensätzen.length + " enthalten einen Wert im Feld \"" + window[dbs+"FelderId"] + "\"<br>" + window.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: " + IdsVonNichtImportierbarenDatensätzen.length + " Datensätze mit den folgenden Werten im Feld \"" + window[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + IdsVonNichtImportierbarenDatensätzen);
		}
		$("#"+dbs+"Importieren").css("display", "block");
		$("#"+dbs+"Entfernen").css("display", "block");
	} else {
		//rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg").alert().css("display", "block");
		if (dbs === "Bs") {
			$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text").html("Die Importtabelle enthält " + window[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + IdsVonDatensätzen.length + " Arten:<br>Beziehungen von " + IdsVonDatensätzen.length + " Arten enthalten einen Wert im Feld \"" + window[dbs+"FelderId"] + "\"<br>Beziehungen von " + window.ZuordbareDatensätze.length + " Arten können zugeordnet und importiert werden");
		} else {
			$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_erfolg_text").html("Die Importtabelle enthält " + window[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + IdsVonDatensätzen.length + " enthalten einen Wert im Feld \"" + window[dbs+"FelderId"] + "\"<br>" + window.ZuordbareDatensätze.length + " können zugeordnet und importiert werden");
		}
		$("#"+dbs+"Importieren").css("display", "block");
		$("#"+dbs+"Entfernen").css("display", "block");
	}
}

//bekommt das Objekt mit den Datensätzen (window.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.ZuordbareDatensätze)
//holt sich selber die in den Feldern erfassten Infos der Datensammlung
function importiereDatensammlung() {
	var Datensammlung, anzFelder, anzDs;
	var DsImportiert = $.Deferred();
	//prüfen, ob ein DsName erfasst wurde. Wenn nicht: melden
	if (!$("#DsName").val()) {
		$("#meldung_individuell_label").html("Namen fehlt");
		$("#meldung_individuell_text").html("Bitte geben Sie der Datensammlung einen Namen");
		$('#meldung_individuell').modal();
		$("#DsName").focus();
		return false;
	}
	//für die ersten 10 Datensätze sollen als Rückmeldung Links erstellt werden, daher braucht es einen zähler
	var Zähler = 0;
	var RückmeldungsLinks = "Der Import wurde ausgeführt.<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können.<br>Vorsicht: Wahrscheinlich dauert der nächste Seitenaufruf sehr lange, da nun ein Index neu aufgebaut werden muss.<br><br>";
	anzDs = 0;
	for (var x in window.dsDatensätze) {
		anzDs += 1;
		//Datensammlung als Objekt gründen
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
		//falls die Datensammlung zusammenfassend ist
		if ($("#DsZusammenfassend").prop('checked')) {
			Datensammlung.zusammenfassend = true;
		}
		if ($("#DsUrsprungsDs").val()) {
			Datensammlung.Ursprungsdatensammlung = $("#DsUrsprungsDs").val();
		}
		Datensammlung["importiert von"] = localStorage.Email;
		//Felder der Datensammlung als Objekt gründen
		Datensammlung.Daten = {};
		//Felder anfügen, wenn sie Werte enthalten
		anzFelder = 0;
		for (var y in window.dsDatensätze[x]) {
			//nicht importiert wird die ID und leere Felder
			if (y !== window.DsFelderId && window.dsDatensätze[x][y] !== "" && window.dsDatensätze[x][y] !== null) {
				if (window.dsDatensätze[x][y] === -1) {
					//Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
					Datensammlung.Daten[y] = true;
				} else if (window.dsDatensätze[x][y] == "true") {
					//true/false nicht als string importieren
					Datensammlung.Daten[y] = true;
				} else if (window.dsDatensätze[x][y] == "false") {
					Datensammlung.Daten[y] = false;
				} else if (window.dsDatensätze[x][y] == parseInt(window.dsDatensätze[x][y], 10)) {
					//Ganzzahlen als Zahlen importieren
					Datensammlung.Daten[y] = parseInt(window.dsDatensätze[x][y], 10);
				} else if (window.dsDatensätze[x][y] == parseFloat(window.dsDatensätze[x][y])) {
					//Bruchzahlen als Zahlen importieren
					Datensammlung.Daten[y] = parseFloat(window.dsDatensätze[x][y]);
				} else {
					//Normalfall
					Datensammlung.Daten[y] = window.dsDatensätze[x][y];
				}
				anzFelder += 1;
			}
		}
		//entsprechenden Index öffnen
		//sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
		if (anzFelder > 0) {
			//Datenbankabfrage ist langsam. Extern aufrufen, 
			//sonst überholt die for-Schlaufe und Datensammlung ist bis zur saveDoc-Ausführung eine andere!
			var guid;
			if (window.DsId === "guid") {
				//die in der Tabelle mitgelieferte id ist die guid
				guid = window.dsDatensätze[x][window.DsFelderId];
			} else {
				for (var q = 0; q < window.ZuordbareDatensätze.length; q++) {
					//in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
					if (window.ZuordbareDatensätze[q].Id == window.dsDatensätze[x][window.DsFelderId]) {
						//und die guid auslesen
						guid = window.ZuordbareDatensätze[q].Guid;
						break;
					}
				}
			}
			//kann sein, dass der guid oben nicht zugeordnet werden konnte. Dann nicht anfügen
			if (guid) {
				fuegeDatensammlungZuObjekt(guid, Datensammlung);
				//Für 10 Kontrollbeispiele die Links aufbauen
				if (Zähler < 10) {
					Zähler += 1;
					//Rückmeldungslink aufbauen. Hat die Form:
					//<a href="url">Link text</a>
					//http://127.0.0.1:5984/artendb/_design/artendb/index.html?id=165507F2-67D6-44E2-A2BA-1A62AB3D1ACE
					RückmeldungsLinks += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + window.dsDatensätze[x][window.DsFelderId] + '"  target="_blank">Beispiel ' + Zähler + '</a><br>';
				}
			}
		}
	}
	//RückmeldungsLinks in Feld anzeigen:
	$("#importieren_ds_import_ausfuehren_hinweis").css('display', 'block');
	$("#importieren_ds_import_ausfuehren_hinweis_text").html(RückmeldungsLinks);
	DsImportiert.resolve();
	return DsImportiert.promise();
}

//bekommt das Objekt mit den Datensätzen (window.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.ZuordbareDatensätze)
//holt sich selber die in den Feldern erfassten Infos der Datensammlung
function importiereBeziehungssammlung() {
	var Beziehungssammlung, anzFelder, anzBs;
	var BsImportiert = $.Deferred();
	//prüfen, ob ein BsName erfasst wurde. Wenn nicht: melden
	if (!$("#BsName").val()) {
		$("#meldung_individuell_label").html("Namen fehlt");
		$("#meldung_individuell_text").html("Bitte geben Sie der Beziehungssammlung einen Namen");
		$('#meldung_individuell').modal();
		$("#BsName").focus();
		return false;
	}
	//zuerst: Veranlassen, dass die Beziehungspartner in window.bsDatensätze in einen Array der richtigen Form umgewandelt werden
	$.when(bereiteBeziehungspartnerFuerImportVor())
		.then(function() {
			setTimeout(function() {
				//für die ersten 10 Datensätze sollen als Rückmeldung Links erstellt werden, daher braucht es einen zähler
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
				//falls die Datensammlung zusammenfassend ist
				if ($("#BsZusammenfassend").prop('checked')) {
					Beziehungssammlung_vorlage.zusammenfassend = true;
				}
				if ($("#BsUrsprungsBs").val()) {
					Beziehungssammlung_vorlage.Ursprungsdatensammlung = $("#BsUrsprungsBs").val();
				}
				Beziehungssammlung_vorlage["importiert von"] = localStorage.Email;
				Beziehungssammlung_vorlage.Beziehungen = [];
				//zunächst den Array von Objekten in ein Objekt mit Eigenschaften = ObjektGuid und darin Array mit allen übrigen Daten verwandeln
				window.bsDatensätze_objekt = _.groupBy(window.bsDatensätze, function(objekt) {
					//id in guid umwandeln
					var guid;
					if (window.BsId === "guid") {
						//die in der Tabelle mitgelieferte id ist die guid
						guid = objekt[window.BsFelderId];
					} else {
						for (var q = 0; q < window.ZuordbareDatensätze.length; q++) {
							//in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
							if (window.ZuordbareDatensätze[q].Id == objekt[window.BsFelderId]) {
								//und die guid auslesen
								guid = window.ZuordbareDatensätze[q].Guid;
								break;
							}
						}
					}
					objekt.GUID = guid;
					return objekt.GUID;
				});
				//jetzt durch die GUID's loopen und die jeweiligen Beziehungen anhängen
				$.each(bsDatensätze_objekt, function(key, value) {
					var Beziehungen = [];
					anzBs += 1;
					//Beziehungssammlung als Objekt gründen, indem die Vorlage kopiert wird
					Beziehungssammlung = jQuery.extend(true, {}, Beziehungssammlung_vorlage);
					//console.log('value = ' + JSON.stringify(value));
					for (var x = 0; x<value.length; x++) {
						//durch die Beziehungen loopen
						anzFelder = 0;
						//Felder der Beziehungssammlung als Objekt gründen
						var Beziehung = {};
						for (var y in value[x]) {
							//durch die Felder der Beziehung loopen
							//nicht importiert wird die GUID und leere Felder
							if (y !== "GUID" && value[x][y] !== "" && value[x][y] !== null) {
								//console.log('y = ' + y);
								if (value[x][y] === -1) {
									//Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
									Beziehung[y] = true;
								} else if (value[x][y] == "true") {
									//true/false nicht als string importieren
									Beziehung[y] = true;
								} else if (value[x][y] == "false") {
									Beziehung[y] = false;
								} else if (value[x][y] == parseInt(value[x][y], 10)) {
									//Ganzzahlen als Zahlen importieren
									Beziehung[y] = parseInt(value[x][y], 10);
								} else if (value[x][y] == parseFloat(value[x][y])) {
									//Bruchzahlen als Zahlen importieren
									Beziehung[y] = parseFloat(value[x][y]);
								} else if (y == "Beziehungspartner") {
									Beziehung[y] = [];
									//durch Beziehungspartner loopen und GUIDS mit Objekten ersetzen
									//console.log('value[x][y].length = ' + value[x][y].length);
									for (var i=0; i<value[x][y].length; i++) {
										Beziehung[y].push(window.bezPartner_objekt[value[x][y][i]]);
										//console.log('window.bezPartner_objekt[value[x][y][i] = ' + JSON.stringify(window.bezPartner_objekt[value[x][y][i]]));
									}
								} else {
									//Normalfall
									Beziehung[y] = value[x][y];
								}
								anzFelder++;
							}
						}
						//console.log('anzFelder = ' + anzFelder);
						if (anzFelder > 0) {
							//console.log('Beziehung = ' + JSON.stringify(Beziehung));
							Beziehungen.push(Beziehung);
							//console.log('Beziehungen = ' + JSON.stringify(Beziehungen));
						}
					}
					//entsprechenden Index öffnen
					//sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
					if (Beziehungen.length > 0) {
						//Datenbankabfrage ist langsam. Extern aufrufen, 
						//sonst überholt die for-Schlaufe und Beziehungssammlung ist bis zur saveDoc-Ausführung eine andere!
						fuegeBeziehungenZuObjekt(key, Beziehungssammlung, Beziehungen);
						//Für 10 Kontrollbeispiele die Links aufbauen
						if (Zähler < 10) {
							Zähler++;
							//Rückmeldungslink aufbauen. Hat die Form:
							//<a href="url">Link text</a>
							//http://127.0.0.1:5984/artendb/_design/artendb/index.html?id=165507F2-67D6-44E2-A2BA-1A62AB3D1ACE
							RückmeldungsLinks += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + key + '"  target="_blank">Beispiel ' + Zähler + '</a><br>';
						}
					}
				});
				//RückmeldungsLinks in Feld anzeigen:
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
			//window.bsDatensätze[x].Beziehungspartner ist eine kommagetrennte Liste von guids
			//diese Liste in Array verwandeln
			bezPartner_array = window.bsDatensätze[x].Beziehungspartner.split(", ");
			//und in window.bsDatensätze nachführen
			window.bsDatensätze[x].Beziehungspartner = bezPartner_array;
			//und vollständige Liste aller Beziehungspartner nachführen
			alleBezPartner_array = _.union(alleBezPartner_array, bezPartner_array);
		}
	}
	//jetzt wollen wir ein Objekt bauen, das für alle Beziehungspartner das auszutauschende Objekt enthält
	//danach für jede guid Gruppe, Taxonomie (bei LR) und Name holen und ein Objekt draus machen
	$db = $.couch.db("artendb");
	$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(alleBezPartner_array)) + '&include_docs=true', {
		success: function (data) {
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

//bekommt das Objekt mit den Datensätzen (window.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.ZuordbareDatensätze)
//holt sich selber den in den Feldern erfassten Namen der Datensammlung
function entferneDatensammlung() {
	var guid_array = [];
	var guidArray = [];
	var guid;
	var DsEntfernt = $.Deferred();
	for (x=0; x<window.dsDatensätze.length; x++) {
		//zuerst die id in guid übersetzen
		if (window.DsId === "guid") {
			//die in der Tabelle mitgelieferte id ist die guid
			guid = window.dsDatensätze[x].GUID;
		} else {
			for (var q = 0; q < window.ZuordbareDatensätze.length; q++) {
				//in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
				if (window.ZuordbareDatensätze[q].Id == window.dsDatensätze[x][window.DsFelderId]) {
					//und die guid auslesen
					guid = window.ZuordbareDatensätze[q].Guid;
					break;
				}
			}
		}
		//Einen Array der id's erstellen
		guid_array.push(guid);
	}
	//globale Variable erstellen. Enthält alle guids. Beim Entfernen wird guid entfernt. Am Ende verbleiben keine oder die nicht entfernten
	window.aktualisierte_objekte = guid_array.slice();
	//alle docs gleichzeitig holen
	//aber batchweise
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
			//RückmeldungsLinks in Feld anzeigen:
			$("#importieren_ds_import_ausfuehren_hinweis").css('display', 'block');
			$("#importieren_ds_import_ausfuehren_hinweis_text").html("Die Datensammlungen wurden entfernt<br>Vorsicht: Wahrscheinlich dauert einer der nächsten Vorgänge sehr lange, da nun eine Index neu aufgebaut werden muss.");
			DsEntfernt.resolve();
			break;
		}
	}
	return DsEntfernt.promise();
}

function entferneDatensammlung_2(DsName, guidArray, a) {
	//alle docs holen
	setTimeout(function() {
		$db = $.couch.db("artendb");
		$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidArray)) + '&include_docs=true', {
			success: function (data) {
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

//bekommt das Objekt mit den Datensätzen (window.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.ZuordbareDatensätze)
//holt sich selber den in den Feldern erfassten Namen der Beziehungssammlung
function entferneBeziehungssammlung() {
	var guid_array = [];
	var guidArray = [];
	var guid;
	var BsName = $("#BsName").val();
	var BsEntfernt = $.Deferred();
	for (x=0; x<window.bsDatensätze.length; x++) {
		//zuerst die id in guid übersetzen
		if (window.BsId === "guid") {
			//die in der Tabelle mitgelieferte id ist die guid
			guid = window.bsDatensätze[x].GUID;
		} else {
			for (var q = 0; q < window.ZuordbareDatensätze.length; q++) {
				//in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
				if (window.ZuordbareDatensätze[q].Id == window.bsDatensätze[x][window.BsFelderId]) {
					//und die guid auslesen
					guid = window.ZuordbareDatensätze[q].Guid;
					break;
				}
			}
		}
		//Einen Array der id's erstellen
		guid_array.push(guid);
	}

	//guid_array auf die eindeutigen guids reduzieren
	guid_array = _.union(guid_array);

	//alle docs gleichzeitig holen
	//aber batchweise
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
			//RückmeldungsLinks in Feld anzeigen:
			$("#importieren_bs_import_ausfuehren_hinweis").css('display', 'block');
			$("#importieren_bs_import_ausfuehren_hinweis_text").html("Die Beziehungssammlungen wurden entfernt<br>Vorsicht: Wahrscheinlich dauert einer der nächsten Vorgänge sehr lange, da nun eine Index neu aufgebaut werden muss.");
			BsEntfernt.resolve();
			break;
		}
	}
	return BsEntfernt.promise();
}

function entferneBeziehungssammlung_2(BsName, guidArray, a) {
	//alle docs holen
	setTimeout(function() {
		$db = $.couch.db("artendb");
		$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidArray)) + '&include_docs=true', {
			success: function (data) {
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

//fügt der Art eine Datensammlung hinzu
//wenn dieselbe schon vorkommt, wird sie überschrieben
function fuegeDatensammlungZuObjekt(GUID, Datensammlung) {
	$db = $.couch.db("artendb");
	$db.openDoc(GUID, {
		success: function (doc) {
			//Datensammlung anfügen
			doc.Datensammlungen.push(Datensammlung);
			//sortieren
			//Datensammlungen nach Name sortieren
			doc.Datensammlungen = sortiereObjektarrayNachName(doc.Datensammlungen);
			//in artendb speichern
			$db.saveDoc(doc);
		}
	});
}

//fügt der Art eine Datensammlung hinzu
//wenn dieselbe schon vorkommt, wird sie überschrieben
function fuegeBeziehungenZuObjekt(GUID, Beziehungssammlung, Beziehungen) {
	$db = $.couch.db("artendb");
	$db.openDoc(GUID, {
		success: function (doc) {
			//prüfen, ob die Beziehung schon existiert
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
						//Beziehungen nach Name sortieren
						doc.Beziehungssammlungen[i].Beziehungen = sortiereBeziehungenNachName(doc.Beziehungssammlungen[i].Beziehungen);
						hinzugefügt = true;
						break;
					}
				}
				if (!hinzugefügt) {
					//die Beziehungssammlung existiert noch nicht
					Beziehungssammlung.Beziehungen = [];
					for (var a=0; a<Beziehungen.length; a++) {
						Beziehungssammlung.Beziehungen.push(Beziehungen[a]);
					}
					//Beziehungen nach Name sortieren
					Beziehungssammlung.Beziehungen = sortiereBeziehungenNachName(Beziehungssammlung.Beziehungen);
					doc.Beziehungssammlungen.push(Beziehungssammlung);
				}
			} else {
				//Beziehungssammlung anfügen
				Beziehungssammlung.Beziehungen = [];
				for (var b=0; b<Beziehungen.length; b++) {
					Beziehungssammlung.Beziehungen.push(Beziehungen[b]);
				}
				//Beziehungen nach Name sortieren
				Beziehungssammlung.Beziehungen = sortiereBeziehungenNachName(Beziehungssammlung.Beziehungen);
				doc.Beziehungssammlungen = [];
				doc.Beziehungssammlungen.push(Beziehungssammlung);
			}
			//Beziehungssammlungen nach Name sortieren
			doc.Beziehungssammlungen = sortiereObjektarrayNachName(doc.Beziehungssammlungen);
			//in artendb speichern
			$db.saveDoc(doc);
		}
	});
}

//übernimmt den Namen einer Datensammlung
//öffnet alle Dokumente, die diese Datensammlung enthalten und löscht die Datensammlung
function entferneDatensammlungAusAllenObjekten(DsName) {
	var DsEntfernt = $.Deferred();
	$db = $.couch.db("artendb");
	$db.view('artendb/ds_guid?startkey=["' + DsName + '"]&endkey=["' + DsName + '",{}]', {
		success: function (data) {
			for (var i in data.rows) {
				//guid und DsName übergeben
				entferneDatensammlungAusDokument(data.rows[i].key[1], DsName);
			}
			DsEntfernt.resolve();
		}
	});
	return DsEntfernt.promise();
}

//übernimmt den Namen einer Beziehungssammlung
//öffnet alle Dokumente, die diese Beziehungssammlung enthalten und löscht die Beziehungssammlung
function entferneBeziehungssammlungAusAllenObjekten(BsName) {
	var BsEntfernt = $.Deferred();
	$db = $.couch.db("artendb");
	$db.view('artendb/bs_guid?startkey=["' + BsName + '"]&endkey=["' + BsName + '",{}]', {
		success: function (data) {
			for (var i in data.rows) {
				//guid und DsName übergeben
				entferneBeziehungssammlungAusDokument(data.rows[i].key[1], BsName);
			}
			BsEntfernt.resolve();
		}
	});
	return BsEntfernt.promise();
}

//übernimmt die id des zu verändernden Dokuments
//und den Namen der Datensammlung, die zu entfernen ist
//entfernt die Datensammlung
function entferneDatensammlungAusDokument(id, DsName) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(doc) {
			//Datensammlung entfernen
			for (var i=0; i<doc.Datensammlungen.length; i++) {
				if (doc.Datensammlungen[i].Name === DsName) {
					doc.Datensammlungen.splice(i,1);
				}
			}
			//in artendb speichern
			$db.saveDoc(doc, {
				success: function() {
				}
			});
		}
	});
}

//übernimmt die id des zu verändernden Dokuments
//und den Namen der Beziehungssammlung, die zu entfernen ist
//entfernt die Beziehungssammlung
function entferneBeziehungssammlungAusDokument(id, BsName) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(doc) {
			//Beziehungssammlung entfernen
			for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
				if (doc.Beziehungssammlungen[i].Name === BsName) {
					doc.Beziehungssammlungen.splice(i,1);
				}
			}
			//in artendb speichern
			$db.saveDoc(doc, {
				success: function() {
				}
			});
		}
	});
}

//prüft die URL. wenn eine id übergeben wurde, wird das entprechende Objekt angezeigt
function oeffneUri() {
	var uri = new Uri($(location).attr('href'));
	var id = uri.getQueryParamValue('id');
	if (id) {
		//Gruppe ermitteln
		$db = $.couch.db("artendb");
		$db.openDoc(id, {
			success: function (objekt) {
				//window.Gruppe setzen. Nötig, um im Menu die richtigen Felder einzublenden
				window.Gruppe = objekt.Gruppe;
				$(".baum.jstree").jstree("deselect_all");
				//den richtigen Button aktivieren
				$("#Gruppe" + objekt.Gruppe).button('toggle');
				//tree aufbauen, danach Datensatz initiieren
				$.when(erstelleBaum()).then(function() {
					oeffneBaumZuId(id);
				});
			}
		});
	}
}
//übernimmt anfangs drei arrays: taxonomien, datensammlungen und beziehungssammlungen
//verarbeitet immer den ersten array und ruft sich mit den übrigen selber wieder auf
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
		//bei "felder wählen" soll man auch wählen können, ob pro Beziehung eine Zeile oder alle Beziehungen in ein Feld geschrieben werden sollen
		//das muss auch erklärt sein
		html_felder_waehlen += '<h3>Beziehungssammlungen</h3><div class="export_zum_titel_gehoerig"><label class="radio inline"><input type="radio" id="export_bez_in_zeilen" checked="checked" name="export_bez_wie">Pro Beziehung eine Zeile</label><label class="radio inline"><input type="radio" id="export_bez_in_feldern" name="export_bez_wie">Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld</label><div class="well well-small" style="margin-top:9px;">Sie können aus zwei Varianten wählen:<ol><li>Pro Beziehung eine Zeile (Standardeinstellung):<ul><li>Für jede Art oder Lebensraum wird pro Beziehung eine neue Zeile erzeugt</li><li>Anschliessende Auswertungen sind so meist einfacher auszuführen</li><li>Dafür können Sie aus maximal einer Beziehungssammlung Felder wählen (aber wie gewohnt mit beliebig vielen Feldern aus Taxonomie(n) und Datensammlungen ergänzen)</li></ul></li><li>Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld:<ul><li>Von allen Beziehungen der Art oder des Lebensraums wird der Inhalt des Feldes kommagetrennt in das Feld der einzigen Zeile geschrieben</li><li>Sie können Felder aus beliebigen Beziehungssammlungen gleichzeitig exportieren</li></ul></li></ol></div></div>';
		html_filtern += '<h3>Beziehungssammlungen</h3>';
	}
	for (i=0; i<taxonomien.length; i++) {
		if (i > 0) {
			html_felder_waehlen += '<hr>';
			html_filtern += '<hr>';
		}
		html_felder_waehlen += '<h5>' + taxonomien[i].Name + '</h5>';
		html_felder_waehlen += '<div class="felderspalte">';
		html_filtern += '<h5>' + taxonomien[i].Name + '</h5>';
		html_filtern += '<div class="felderspalte">';
		for (var x in (taxonomien[i].Daten || taxonomien[i].Beziehungen)) {
			//felder wählen
			html_felder_waehlen += '<label class="checkbox">';
			html_felder_waehlen += '<input class="feld_waehlen" type="checkbox" DsTyp="'+dsTyp+'" Datensammlung="' + taxonomien[i].Name + '" Feld="' + x + '">' + x;
			html_felder_waehlen += '</label>';
			//filtern
			html_filtern += '<div class="control-group">';
			html_filtern += '<label class="control-label" for="exportieren_objekte_waehlen_ds_' + x.replace(/\s+/g, " ").replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + '"';
			//Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
			if (x.length > 28) {
				html_filtern += ' style="padding-top:0px"';
			}
			html_filtern += '>'+ x +'</label>';
			html_filtern += '<div class="controls">';
			html_filtern += '<input class="export_feld_filtern" type="text" id="exportieren_objekte_waehlen_ds_' + x.replace(/\s+/g, " ").replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'') + '" DsTyp="'+dsTyp+'" Eigenschaft="' + taxonomien[i].Name + '" Feld="' + x + '">';
			html_filtern += '</div>';
			html_filtern += '</div>';
		}
		//Spalten abschliessen
		html_felder_waehlen += '</div>';
		html_filtern += '</div>';
	}
	//linie voranstellen
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
	var stringTitelzeile = "";
	var stringZeilen = "";
	//titelzeile erstellen
	//durch Spalten loopen
	for (var a in exportobjekte[1]) {
		if (stringTitelzeile !== "") {
			stringTitelzeile += ',';
		}
		stringTitelzeile += '"' + a + '"';
	}
	//Datenzeilen erstellen
	for (var i in exportobjekte) {
		if (stringZeilen !== "") {
			stringZeilen += '\n';
		}
		var stringZeile = "";
		//durch die Felder loopen
		for (var x in exportobjekte[i]) {
		//for (var x = 0; x < exportobjekte[i].length; x++) {
			if (stringZeile !== "") {
				stringZeile += ',';
			}
			//null-Werte als leere Werte
			if (exportobjekte[i][x] === null) {
				stringZeile += "";
			} else if (typeof exportobjekte[i][x] === "number") {
				//Zahlen ohne Anführungs- und Schlusszeichen exportieren
				stringZeile += exportobjekte[i][x];
			} else if (typeof exportobjekte[i][x] === "object") {
				//Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
				stringZeile += '"' + JSON.stringify(exportobjekte[i][x]).replace(/"/g, "'") + '"';
			} else {
				stringZeile += '"' + exportobjekte[i][x] + '"';
			}
		}
		stringZeilen += stringZeile;
	}
	return stringTitelzeile + "\n" + stringZeilen;
}

//baut im Formular "export" die Liste aller Eigenschaften auf
//window.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
//bekommt den Namen der Gruppe
function erstelleListeFuerFeldwahl() {
	//Beschäftigung melden
	$("#exportieren_objekte_waehlen_gruppen_hinweis").alert().css("display", "block");
	$("#exportieren_objekte_waehlen_gruppen_hinweis_text").html("Eigenschaften werden ermittelt...");
	//gewählte Gruppen ermitteln
	//globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
	var export_gruppen = [];
	var gruppen = [];
	//globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
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
			//Felder abfragen
			if (window[gruppen[i] + '_felder']) {
				window.export_felder_arrays = _.union(window.export_felder_arrays, window[gruppen[i] + '_felder'].rows);
				//die verarbeitete Gruppe aus export_gruppen entfernen
				export_gruppen.splice(export_gruppen.indexOf(gruppen[i],1));
				//export_gruppen = _.without(export_gruppen, gruppen[i]);
				if (export_gruppen.length === 0) {
					//alle Gruppen sind verarbeitet
					erstelleListeFuerFeldwahl_2();
				}
			} else {
				$db.view('artendb/felder?group_level=4&startkey=["'+gruppen[i]+'"]&endkey=["'+gruppen[i]+'",{},{},{}]', {
					success: function (data) {
						window[gruppen[i] + '_felder'] = data;
						window.export_felder_arrays = _.union(window.export_felder_arrays, data.rows);
						//die verarbeitete Gruppe aus export_gruppen entfernen
						export_gruppen.splice(export_gruppen.indexOf(gruppen[i],1));
						//export_gruppen = _.without(export_gruppen, gruppen[i]);
						if (export_gruppen.length === 0) {
							//alle Gruppen sind verarbeitet
							erstelleListeFuerFeldwahl_2();
						}
					}
				});
			}
		}
	} else {
		//letzte Rückmeldung anpassen
		$("#exportieren_objekte_waehlen_gruppen_hinweis_text").html("keine Gruppe gewählt");
		//Felder entfernen
		$("#exportieren_felder_waehlen_felderliste").html("");
		$("#exportieren_objekte_waehlen_ds_felderliste").html("");
	}
}

function erstelleListeFuerFeldwahl_2() {
	//in window.export_felder_arrays ist eine Liste der Felder, die in dieser Gruppe enthalten sind
	//sie kann aber Mehrfacheinträge enthalten, die sich in der Gruppe unterscheiden
	//Muster: Gruppe, Typ der Datensammlung, Name der Datensammlung, Name des Felds
	//Mehrfacheinträge sollen entfernt werden
	//dazu muss zuerst die Gruppe entfernt werden
	for (var i=0; i<window.export_felder_arrays.length; i++) {
		window.export_felder_arrays[i].key.splice(0,1);
	}
	//jetzt nur noch eineindeutige Array-Objekte (=Datensammlungen) belassen
	window.export_felder_arrays = _.union(window.export_felder_arrays);
	//jetzt den Array von Objekten nach key sortieren
	window.export_felder_arrays = _.sortBy(window.export_felder_arrays, function(object) {
		return object.key;
	});

	//Objekt "FelderObjekt" schaffen. Darin werden die Felder aller gewählten Gruppen gesammelt
	var FelderObjekt = {};
	FelderObjekt = ergaenzeFelderObjekt(FelderObjekt, window.export_felder_arrays);

	//bei allfälligen "Taxonomie(n)" Feldnamen sortieren
	if (FelderObjekt["Taxonomie(n)"] && FelderObjekt["Taxonomie(n)"].Daten) {
		FelderObjekt["Taxonomie(n)"].Daten = sortKeysOfObject(FelderObjekt["Taxonomie(n)"].Daten);
	}

	//Taxonomien und Datensammlungen aus dem FelderObjekt extrahieren
	Taxonomien = [];
	Datensammlungen = [];
	Beziehungssammlungen = [];
	for (var x in FelderObjekt) {
		if (typeof FelderObjekt[x] === "object" && FelderObjekt[x].Typ) {
			//das ist Datensammlung oder Taxonomie
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
	//kontrollieren, ob Taxonomien zusammengefasst werden
	if ($("#exportieren_objekte_Taxonomien_zusammenfassen").hasClass("active")) {
		hinweisTaxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien sind zusammengefasst";
	} else {
		hinweisTaxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien werden einzeln dargestellt";
	}
	//Ergebnis rückmelden
	$("#exportieren_objekte_waehlen_gruppen_hinweis").alert().css("display", "block");
	$("#exportieren_objekte_waehlen_gruppen_hinweis_text").html(hinweisTaxonomien);
}

//Nimmt ein FelderObjekt entgegen. Das ist entweder leer (erste Gruppe) oder enthält schon Felder (ab der zweiten Gruppe)
//Nimmt ein Array mit Feldern entgegen
//mit der Struktur: {"key":["Flora","Datensammlung","Blaue Liste (1998)","Anwendungshäufigkeit zur Erhaltung"],"value":null}
//ergänzt das FelderObjekt um diese Felder
//retourniert das ergänzte FelderObjekt
//das FelderObjekt enthält alle gewünschten Felder. Darin sind nullwerte
function ergaenzeFelderObjekt(FelderObjekt, FelderArray) {
	var DsTyp, DsName, FeldName;
	for (var i in FelderArray) {
		//Gruppe wurde entfernt, so sind alle keys um 1 kleiner als ursprünglich
		DsTyp = FelderArray[i].key[0];
		DsName = FelderArray[i].key[1];
		FeldName = FelderArray[i].key[2];
		if (DsTyp === "Objekt") {
			//das ist eine Eigenschaft des Objekts
			//FelderObjekt[FeldName] = null;	//NICHT HINZUFÜGEN, DIESE FELDER SIND SCHON IM FORMULAR FIX DRIN
		} else if (window.fasseTaxonomienZusammen && DsTyp === "Taxonomie") {
			//Datensammlungen werden zusammengefasst. DsTyp muss "Taxonomie(n)" heissen und die Felder aller Taxonomien sammeln
			//Wenn Datensammlung noch nicht existiert, gründen
			if (!FelderObjekt["Taxonomie(n)"]) {
				FelderObjekt["Taxonomie(n)"] = {};
				FelderObjekt["Taxonomie(n)"].Typ = DsTyp;
				FelderObjekt["Taxonomie(n)"].Name = "Taxonomie(n)";
				FelderObjekt["Taxonomie(n)"].Daten = {};
			}
			//Feld ergänzen
			FelderObjekt["Taxonomie(n)"].Daten[FeldName] = null;
		} else if (DsTyp === "Datensammlung" || DsTyp === "Taxonomie") {
			//Wenn Datensammlung oder Taxonomie noch nicht existiert, gründen
			if (!FelderObjekt[DsName]) {
				FelderObjekt[DsName] = {};
				FelderObjekt[DsName].Typ = DsTyp;
				FelderObjekt[DsName].Name = DsName;
				FelderObjekt[DsName].Daten = {};
			}
			//Feld ergänzen
			FelderObjekt[DsName].Daten[FeldName] = null;
		} else if (DsTyp === "Beziehung") {
			//Wenn Beziehungstyp noch nicht existiert, gründen
			if (!FelderObjekt[DsName]) {
				FelderObjekt[DsName] = {};
				FelderObjekt[DsName].Typ = DsTyp;
				FelderObjekt[DsName].Name = DsName;
				FelderObjekt[DsName].Beziehungen = {};
			}
			//Feld ergänzen
			FelderObjekt[DsName].Beziehungen[FeldName] = null;
		}
	}
	return FelderObjekt;
}

function filtereFuerExport() {
	//kontrollieren, ob eine Gruppe gewählt wurde
	if (fuerExportGewaehlteGruppen().length === 0) {
		$('#meldung_keine_gruppen').modal();
		return;
	}
	//Beschäftigung melden
	$("#exportieren_exportieren_hinweis").alert().css("display", "block");
	$("#exportieren_exportieren_hinweis_text").html("Die Daten werden vorbereitet...");
	//Array von Filterobjekten bilden
	var filterkriterien = [];
	//Objekt bilden, in das die Filterkriterien integriert werden, da ein array schlecht über die url geliefert wird
	var filterkriterienObjekt = {};
	var filterObjekt;
	//gewählte Gruppen ermitteln
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
	//durch alle Filterfelder loopen
	//wenn ein Feld einen Wert enthält, danach filtern
	$("#exportieren_objekte_waehlen_ds_collapse .export_feld_filtern").each(function() {
		if (this.value || this.value === 0) {
			//Filterobjekt zurücksetzen
			filterObjekt = {};
			filterObjekt.DsTyp = $(this).attr('dstyp');
			filterObjekt.DsName = $(this).attr('eigenschaft');
			filterObjekt.Feldname = $(this).attr('feld');
			//Filterwert in Kleinschrift verwandeln, damit Gross-/Kleinschrift nicht wesentlich ist (Vergleichswerte werden von filtereFuerExport später auch in Kleinschrift verwandelt)
			filterObjekt.Filterwert = this.value.toLowerCase();
			filterkriterien.push(filterObjekt);
		}
	});
	//den array dem objekt zuweisen
	filterkriterienObjekt.rows = filterkriterien;
	//gewählte Felder ermitteln
	var gewaehlte_felder = [];
	var gewaehlte_felder_objekt = {};
	$(".exportieren_felder_waehlen_objekt_feld.feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			//feldObjekt erstellen
			feldObjekt = {};
			feldObjekt.DsName = "Objekt";
			feldObjekt.Feldname = $(this).attr('feldname');
			if (feldObjekt.Feldname === "GUID") {
				feldObjekt.Feldname = "_id";
			}
			gewaehlte_felder.push(feldObjekt);
		}
	});
	$("#exportieren_felder_waehlen_felderliste .feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			//feldObjekt erstellen
			feldObjekt = {};
			feldObjekt.DsTyp = $(this).attr('dstyp');
			feldObjekt.DsName = $(this).attr('datensammlung');
			feldObjekt.Feldname = $(this).attr('feld');
			gewaehlte_felder.push(feldObjekt);
		}
	});
	//den array dem objekt zuweisen
	gewaehlte_felder_objekt.rows = gewaehlte_felder;
	//jetzt das filterObjekt übergeben
	//Alle Felder abfragen
	$db = $.couch.db("artendb");
	var fTz = "false";
	//window.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
	if (window.fasseTaxonomienZusammen) {
		fTz = "true";
	}
	//globale Variable vorbereiten
	window.exportieren_objekte = [];
	//in anz_gruppen_abgefragt wird gezählt, wieviele Gruppen schon abgefragt wurden
	//jede Abfrage kontrolliert nach Erhalt der Daten, ob schon alle Gruppen abgefragt wurden und macht weiter, wenn ja
	var anz_gruppen_abgefragt = 0;
	for (var i=0; i<gruppen_array.length; i++) {
		var dbParam, queryParam;
		if ($("#exportieren_synonym_infos").prop('checked')) {
			dbParam = "artendb/export_mit_synonymen";
			queryParam = gruppen_array[i] + "_mit_synonymen?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen + "&descending=true";
		} else {
			dbParam = "artendb/export";
			queryParam = gruppen_array[i] + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
		}
		$db.list(dbParam, queryParam, {
			success: function (data) {
				//leere Objekte entfernen
				var exportieren_objekte_temp = _.reject(data, function(object) {
					return _.isEmpty(object);
				});
				//alle Objekte in exportieren_objekte_temp in window.exportieren_objekte anfügen
				window.exportieren_objekte = _.union(window.exportieren_objekte, exportieren_objekte_temp);
				//speichern, dass eine Gruppe abgefragt wurde
				anz_gruppen_abgefragt++;
				if (anz_gruppen_abgefragt === gruppen_array.length) {
					//alle Gruppen wurden abgefragt, jetzt kann es weitergehen
					//Ergebnis rückmelden
					$("#exportieren_exportieren_hinweis").alert().css("display", "block");
					$("#exportieren_exportieren_hinweis_text").html(window.exportieren_objekte.length + " Objekte sind gewählt");
					baueTabelleFuerExportAuf();
				}
			}
		});
	}
}

function baueTabelleFuerExportAuf() {
	//leeren Array für die Objekte gründen
	var exportobjekte = [];
	var len, len2;
	var id_ist_gewaehlt = $("#exportieren_felder_waehlen_objekt_id").prop('checked');
	var gruppe_ist_gewaehlt = $("#exportieren_felder_waehlen_objekt_gruppe").prop('checked');
	//db aufrufen, wird unten in einer Schlaufe benutzt
	$db = $.couch.db("artendb");
	//Zuerst durch alle gewählten Felder gehen und eine Feldliste erstellen
	//später wird jedem Objekt jedes dieser Felder angefügt (mit Wert falls vorhanden)
	var feldliste = [];
	$(".exportieren_felder_waehlen_objekt_feld.feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			feldliste.push($(this).attr('feldname'));
		}
	});
	$("#exportieren_felder_waehlen_felderliste .feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			feldliste.push($(this).attr('datensammlung') + ": " + $(this).attr('Feld'));
			if ($(this).attr('Feld') === "Beziehungspartner") {
				//Mit dem Beziehungspartner soll auch ein Feld mit allen GUIDs mit
				feldliste.push($(this).attr('datensammlung') + ": Beziehungspartner GUID(s)");
			}
		}
	});
	if (feldliste.length === 0) {
		$('#meldung_keine_ds').modal();
		return;
	}
	//Beschäftigung melden
	$("#exportieren_exportieren_hinweis_text").append("<br>Die Vorschau wird erstellt...");
	//durch alle Objekte gehen
	objekte_loop:
	for (var i in window.exportieren_objekte) {
		var Objekt = {},
		a, b;
		//Alle Felder anfügen
		//ist nötig, um eine Tabelle mit allen nötigen Felder zu bauen
		for (var v in feldliste) {
			Objekt[feldliste[v]] = null;
		}
		//id und gruppe
		if (id_ist_gewaehlt) {
			Objekt.GUID = window.exportieren_objekte[i]._id;
		}
		if (gruppe_ist_gewaehlt) {
			Objekt.Gruppe = window.exportieren_objekte[i].Gruppe;
		}
		//Innerhalb der Taxonomie alle gewählten Felder ergänzen - falls ein Feld aus der Taxonomie mitgeliefert wurde
		if (window.exportieren_objekte[i].Taxonomie && window.exportieren_objekte[i].Taxonomie.Daten) {
			for (var q in window.exportieren_objekte[i].Taxonomie.Daten) {
				if ($('[datensammlung="' + window.exportieren_objekte[i].Taxonomie.Name + '"][feld="' + q + '"]').prop('checked')) {
					//Lebensräume werden statt mit der Taxonomie mit "Taxonomie(n)" beschriftet, daher die Bedingung nach dem oder
					Objekt[window.exportieren_objekte[i].Taxonomie.Name + ": " + q] = window.exportieren_objekte[i].Taxonomie.Daten[q];
				}
				if ($('[Datensammlung="Taxonomie(n)"][Feld="' + q + '"]').prop('checked')) {
					//Lebensräume werden statt mit der Taxonomie mit "Taxonomie(n)" beschriftet, daher die Bedingung nach dem oder
					Objekt["Taxonomie(n): " + q] = window.exportieren_objekte[i].Taxonomie.Daten[q];
				}
			}
		}
		//Innerhalb der Datensammlungen alle gewählten Felder ergänzen
		if (window.exportieren_objekte[i].Datensammlungen) {
			for (a=0, len=window.exportieren_objekte[i].Datensammlungen.length; a<len; a++) {
				if (window.exportieren_objekte[i].Datensammlungen[a].Daten) {
					for (var r in window.exportieren_objekte[i].Datensammlungen[a].Daten) {
						if ($('[Datensammlung="' + window.exportieren_objekte[i].Datensammlungen[a].Name + '"][Feld="' + r + '"]').prop('checked')) {
							Objekt[window.exportieren_objekte[i].Datensammlungen[a].Name + ": " + r] = window.exportieren_objekte[i].Datensammlungen[a].Daten[r];
						}
					}
				}
			}
		}
		if ($("#export_bez_in_feldern").prop('checked')) {
			//DAS IST VARIANTE MIT JSON IN EINER ZEILE. FUNKTIONIERT NICHT, WENN MEHR ALS EIN FELD AUS BEZIEHUNGEN GEFILTERT WIRD
			//Innerhalb der Beziehungssammlungen alle gewählten Felder ergänzen
			if (window.exportieren_objekte[i].Beziehungssammlungen) {
				for (var aa=0, len2=window.exportieren_objekte[i].Beziehungssammlungen.length; aa<len2; aa++) {
					//durch Beziehungssammlungen loopen
					for (var qq=0; qq<window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen.length; qq++) {
						//durch Beziehungen loopen
						for (var y in window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq]) {
							//durch die Felder der Beziehung loopen
							if ($('[datensammlung="' + window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + '"][feld="' + y + '"]').prop('checked')) {
								//Variante kommagetrennt
								if (y === "Beziehungspartner") {
									//zuerst die Beziehungspartner in JSON hinzufügen
									if (!Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y]) {
										Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y] = [];
									}
									Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y].push(window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq][y]);
									//Reines GUID-Feld ergänzen
									if (!Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": Beziehungspartner GUID(s)"]) {
										Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": Beziehungspartner GUID(s)"] = window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq][y][0].GUID;
									} else {
										Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": Beziehungspartner GUID(s)"] += ", " + window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq][y][0].GUID;
									}
								//es gibt einen Fehler, wenn replace für einen leeren Wert ausgeführt wird, also kontrollieren
								} else if (typeof window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq][y] === "number") {
									//Vorsicht: in Nummern können keine Kommas ersetzt werden - gäbe einen error
									if (!Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y]) {
										Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y] = window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq][y];
									} else {
										Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y] += ", " + window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq][y];
									}
								} else {
									//Vorsicht: Werte werden kommagetrennt. Also müssen Kommas ersetzt werden
									if (!Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y]) {
										Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y] = window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq][y].replace(/,/g,'\(Komma\)');
									} else {
										Objekt[window.exportieren_objekte[i].Beziehungssammlungen[aa].Name + ": " + y] += ", " + window.exportieren_objekte[i].Beziehungssammlungen[aa].Beziehungen[qq][y].replace(/,/g,'\(Komma\)');
									}
								}
							}
						}
					}
				}
			}
		}
		if ($("#export_bez_in_zeilen").prop('checked')) {
			//Das ist die Variante mit einer Zeile pro Beziehung
			//Innerhalb der Beziehungssammlungen alle gewählten Felder ergänzen
			var schonKopiert = false;
			if (window.exportieren_objekte[i].Beziehungssammlungen) {
				for (b=0, len2=window.exportieren_objekte[i].Beziehungssammlungen.length; b<len2; b++) {
					//durch Beziehungssammlungen loopen
					var zähler = 0;
					for (var s in window.exportieren_objekte[i].Beziehungssammlungen[b].Beziehungen) {
						//durch Beziehungen loopen
						zähler++;
						var objektKopiert = jQuery.extend(true, {}, Objekt);
						for (var y in window.exportieren_objekte[i].Beziehungssammlungen[b].Beziehungen[s]) {
							//durch die Felder der Beziehung loopen
							if ($('[datensammlung="' + window.exportieren_objekte[i].Beziehungssammlungen[b].Name + '"][feld="' + y + '"]').prop('checked')) {
								//Variante kommagetrennt
								if (y === "Beziehungspartner") {
									//zuerst die Beziehungspartner in JSON hinzufügen
									if (!objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": " + y]) {
										objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": " + y] = [];
									}
									objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": " + y].push(window.exportieren_objekte[i].Beziehungssammlungen[b].Beziehungen[s][y]);
									//Reines GUID-Feld ergänzen
									if (!objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": Beziehungspartner GUID(s)"]) {
										objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": Beziehungspartner GUID(s)"] = window.exportieren_objekte[i].Beziehungssammlungen[b].Beziehungen[s][y][0].GUID;
									} else {
										objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": Beziehungspartner GUID(s)"] += ", " + window.exportieren_objekte[i].Beziehungssammlungen[b].Beziehungen[s][y][0].GUID;
									}
								} else {
									//Vorsicht: Werte werden kommagetrennt. Also müssen Kommas ersetzt werden
									if (!objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": " + y]) {
										objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": " + y] = window.exportieren_objekte[i].Beziehungssammlungen[b].Beziehungen[s][y];
									} else {
										objektKopiert[window.exportieren_objekte[i].Beziehungssammlungen[b].Name + ": " + y] += ", " + window.exportieren_objekte[i].Beziehungssammlungen[b].Beziehungen[s][y];
									}
								}
							}
						}
						exportobjekte.push(objektKopiert);
						schonKopiert = true;
					}
				}
			}
		}
		if (!schonKopiert) {
			exportobjekte.push(Objekt);
		}
	}

	if (exportobjekte.length > 0) {
		erstelleTabelle(exportobjekte, "", "exportieren_exportieren_tabelle");
		window.exportstring = erstelleExportString(exportobjekte);
		$("#exportieren_exportieren_exportieren").show();
	} else if (exportobjekte && exportobjekte.length === 0) {
		$('#meldung_keine_exportdaten').modal();
	}
	//Beschäftigungsmeldung verstecken
	$("#exportieren_exportieren_hinweis").alert().css("display", "none");
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

//woher wird bloss benötigt, wenn angemeldet werden muss
function bereiteImportieren_ds_beschreibenVor(woher) {
	if (!localStorage.Email) {
		$('#importieren_ds_ds_beschreiben_collapse').collapse('hide');
		setTimeout(function() {
			zurueckZurAnmeldung(woher);
		}, 600);
	} else {
		$("#DsName").focus();
		//Daten holen, wenn nötig
		if (window.ds_von_objekten) {
			bereiteImportieren_ds_beschreibenVor_02();
		} else {
			$db = $.couch.db("artendb");
			$db.view('artendb/ds_von_objekten?startkey=["Datensammlung"]&endkey=["Datensammlung",{},{},{},{}]&group_level=5', {
				success: function (data) {
					//Daten in Objektvariable speichern > Wenn Ds ausgesählt, Angaben in die Felder kopieren
					window.ds_von_objekten = data;
					bereiteImportieren_ds_beschreibenVor_02();
				}
			});
		}
	}
}

//DsNamen in Auswahlliste stellen
//veränderbare sind normal, übrige grau
function bereiteImportieren_ds_beschreibenVor_02() {
	//in diesem Array werden alle keys gesammelt
	//diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
	window.DsKeys = [];
	for (var i=0; i< window.ds_von_objekten.rows.length; i++) {
		DsKeys.push(window.ds_von_objekten.rows[i].key);
	}
	//nach DsNamen sortieren
	DsKeys = _.sortBy(DsKeys, function(key) {
		return key[1];
	});
	//mit leerer Zeile beginnen
	var html = "<option value=''></option>";
	//Namen der Datensammlungen als Optionen anfügen
	for (var z in DsKeys) {
		//veränderbar sind nur selbst importierte und zusammenfassende
		if (DsKeys[z][3] === localStorage.Email || DsKeys[z][2]) {
			//veränderbare sind normal = schwarz
			html += "<option value='" + DsKeys[z][1] + "' waehlbar=true>" + DsKeys[z][1] + "</option>";
		} else {
			//nicht veränderbare sind grau
			html += "<option value='" + DsKeys[z][1] + "' style='color:grey;' waehlbar=false>" + DsKeys[z][1] + "</option>";
		}
	}
	$("#DsWaehlen").html(html);
	$("#DsUrsprungsDs").html(html);
}

//woher wird bloss benötigt, wenn angemeldet werden muss
function bereiteImportieren_bs_beschreibenVor(woher) {
	if (!localStorage.Email) {
		$('#importieren_bs_ds_beschreiben_collapse').collapse('hide');
		setTimeout(function() {
			zurueckZurAnmeldung(woher);
		}, 600);
	} else {
		$("#BsName").focus();
		//anzeigen, dass Daten geladen werden. Nein: Blitzt bloss kurz auf
		//$("#BsWaehlen").html("<option value='null'>Bitte warte, die Liste wird aufgebaut...</option>");
		//Daten holen, wenn nötig
		if (window.bs_von_objekten) {
			bereiteImportieren_bs_beschreibenVor_02();
		} else {
			$db = $.couch.db("artendb");
			$db.view('artendb/ds_von_objekten?startkey=["Beziehungssammlung"]&endkey=["Beziehungssammlung",{},{},{},{}]&group_level=5', {
				success: function (data) {
					//Daten in Objektvariable speichern > Wenn Ds ausgesählt, Angaben in die Felder kopieren
					window.bs_von_objekten = data;
					bereiteImportieren_bs_beschreibenVor_02();
				}
			});
		}
	}
}

function bereiteImportieren_bs_beschreibenVor_02() {
	//in diesem Array werden alle keys gesammelt
	//diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
	window.BsKeys = [];
	for (var i=0; i< window.bs_von_objekten.rows.length; i++) {
		BsKeys.push(window.bs_von_objekten.rows[i].key);
	}
	//nach DsNamen sortieren
	BsKeys = _.sortBy(BsKeys, function(key) {
		return key[1];
	});
	//mit leerer Zeile beginnen
	var html = "<option value=''></option>";
	//Namen der Datensammlungen als Optionen anfügen
	for (var z in BsKeys) {
		//veränderbar sind nur selbst importierte und zusammenfassende
		if (BsKeys[z][3] === localStorage.Email || BsKeys[z][2]) {
			//veränderbare sind normal = schwarz
			html += "<option value='" + BsKeys[z][1] + "' waehlbar=true>" + BsKeys[z][1] + "</option>";
		} else {
			//nicht veränderbare sind grau
			html += "<option value='" + BsKeys[z][1] + "' style='color:grey;' waehlbar=false>" + BsKeys[z][1] + "</option>";
		}
	}
	$("#BsWaehlen").html(html);
	$("#BsUrsprungsDs").html(html);
}

function isFileAPIAvailable() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		return true;
	} else {
		// source: File API availability - http://caniuse.com/#feat=fileapi
		// source: <output> availability - http://html5doctor.com/the-output-element/
		var html = "Für den Datenimport benötigen Sie mindestens einen der folgenden Browser:<br>";
		html += "(Stand Februar 2013)<br>";
		html += "- Google Chrome: 23.0 oder neuer<br>";
		html += "- Mozilla Firefox: 16.0 oder neuer<br>";
		html += "- Safari: 6.0 oder neuer<br>";
		html += "- Opera: 12.1 oder neuer<br>";
		html += "- eventuell mittlerweile weitere";
		$("#fileApiMeldungText").html(html);
		$('#fileApiMeldung').modal();
		return false;
	}
}

//übernimmt ein Objekt und einen Array
//prüft, ob das Objekt im Array enthalten ist
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
	//Beziehungssammlungen bzw. Datensammlungen nach Name sortieren
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

//übernimmt einen Array mit den Beziehungen
//gibt diesen sortiert zurück
function sortiereBeziehungenNachName(beziehungen) {
//Beziehungen nach Name sortieren
	beziehungen.sort(function(a, b) {
		var aName, bName;
		for (var c in a.Beziehungspartner) {
			if (a.Beziehungspartner[c].Gruppe === "Lebensräume") {
				//sortiert werden soll bei Lebensräumen zuerst nach Taxonomie, dann nach Name
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

//sortiert nach den keys des Objekts
//resultat nicht garantiert!
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
	//Tabelle ausblenden, falls sie eingeblendet war
	$("#exportieren_exportieren_tabelle").hide();
	$("#exportieren_exportieren_exportieren").hide();
}

//schreibt Änderungen in Feldern in die Datenbank
//wird vorläufig nur für LR Taxonomie verwendet
function speichern(feldWert, feldName, dsName, dsTyp) {
	//zuerst die id des Objekts holen
	var uri = new Uri($(location).attr('href'));
	var id = uri.getQueryParamValue('id');
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(object) {
			//sicherstellen, dass boolean, float und integer nicht in Text verwandelt werden
			object.Taxonomie.Daten[feldName] = convertToCorrectType(feldWert);
			$db.saveDoc(object, {
				error: function (data) {
					$("#meldung_individuell_label").html("Fehler");
					$("#meldung_individuell_text").html("Die letzte Änderung im Feld "+feldName+" wurde nicht gespeichert");
					$('#meldung_individuell').modal();
				}
			});
		},
		error: function () {
			$("#meldung_individuell_label").html("Fehler");
			$("#meldung_individuell_text").html("Die letzte Änderung im Feld "+feldName+" wurde nicht gespeichert");
			$('#meldung_individuell').modal();
		}
	});
}

function convertToCorrectType(feldWert) {
	if (myTypeOf(feldWert) === "boolean") {
		return Boolean(feldWert);
	} else if (myTypeOf(feldWert) === "float") {
		return parseFloat(feldWert);
	} else if (myTypeOf(feldWert) === "integer") {
		return parseInt(feldWert);
	} else {
		return feldWert;
	}
}

//Hilfsfunktion, die typeof ersetzt und ergänzt
//typeof gibt bei input-Feldern immer String zurück!
function myTypeOf(Wert) {
	if (typeof Wert === "boolean") {
		return "boolean";
	} else if (parseInt(Wert) && parseFloat(Wert) && parseInt(Wert) != parseFloat(Wert)) {
		//es ist eine Float
		return "float";
	} else if (parseInt(Wert)) {
		//es ist eine Integer
		return "integer";
	} else {
		//als String behandeln
		return "string";
	}
}

function bearbeiteLrTaxonomie() {
	//alle Felder schreibbar setzen
	$(".accordion-body.Lebensräume.Taxonomie .controls").each(function() {
		//einige Felder nicht bearbeiten
		if ($(this).attr('id') !== "GUID" && $(this).attr('id') !== "Parent" && $(this).attr('id') !== "Hierarchie") {
			$(this).attr('readonly', false);
			if ($(this).parent().attr('href')) {
				$(this).parent().attr('href', '#');
				//Standardverhalten beim Klicken von Links verhindern
				$(this).parent().attr('onclick', 'return false;');
				//Mauspointer nicht mehr als Finger
				this.style.cursor = '';
			}
		}
	});
	$('.lr_bearb').removeClass('disabled');
	$(".lr_bearb_bearb").addClass('disabled');
}

function loescheLr(id) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function (object) {
			$db.removeDoc(object, {
				success: function () {
					
				},
				error: function () {
					$("#meldung_individuell_label").html("Fehler");
					$("#meldung_individuell_text").html("Der Lebensraum wurde nicht gelöscht");
					$('#meldung_individuell').modal();
				}
			});
		},
		error: function () {
			$("#meldung_individuell_label").html("Fehler");
			$("#meldung_individuell_text").html("Der Lebensraum wurde nicht gelöscht");
			$('#meldung_individuell').modal();
		}
	});
	console.log('id = ' + id);
			
}

function schuetzeLrTaxonomie() {
	//alle Felder schreibbar setzen
	$(".accordion-body.Lebensräume.Taxonomie .controls").each(function() {
		$(this).attr('readonly', true);
		if ($(this).parent().attr('href')) {
			var feldWert = $(this).val();
			if (typeof feldWert === "string" && feldWert.slice(0, 7) === "http://") {
				$(this).parent().attr('href', feldWert);
				//falls onclick besteht, entfernen
				$(this).parent().removeAttr("onclick");
				//Mauspointer nicht mehr als Finger
				this.style.cursor = 'pointer';
			}
		}
	});
	$('.lr_bearb').addClass('disabled');
	$(".lr_bearb_bearb").removeClass('disabled');
}

function maximiereForms() {
	/*
	@media screen and (min-width: 1001px)
	#forms {
		transform: translate(0px,0px);
		-ms-transform: translate(0px,0px);
		-webkit-transform: translate(0px,0px);
		-o-transform: translate(0px,0px);
		-moz-transform: translate(0px,0px);
	}
	#forms {
		width: 100%;
	}
	#menu. #menu_btn {
		display: none;
	}
	*/
}

function normalisiereForms() {
	/*
	@media screen and (min-width: 1001px)
	#forms {
		transform: translate(391px,0px);
		-ms-transform: translate(391px,0px);
		-webkit-transform: translate(391px,0px);
		-o-transform: translate(391px,0px);
		-moz-transform: translate(391px,0px);
	}

	@media screen and (min-width: 1001px)
	#forms {
		width: -webkit-calc(100% - 391px);
		width: -o-calc(100% - 391px);
		width: calc(100% - 391px);
	}

	#menu, #menu_btn {
		display: block;
	}
	*/
}








/* sha1.js
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;	/* hex output format. 0 - lowercase; 1 - uppercase*/
var b64pad = "=";	/* base-64 pad character. "=" for strict RFC compliance*/
var chrsz = 8;	/* bits per input character. 8 - ASCII; 16 - Unicode*/

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
	return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
	/* append padding */
	x[len >> 5] |= 0x80 << (24 - len % 32);
	x[((len + 64 >> 9) << 4) + 15] = len;

	var w = Array(80);
	var a =	1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d =	271733878;
	var e = -1009589776;

	for(var i = 0; i < x.length; i += 16)
	{
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		var olde = e;

		for(var j = 0; j < 80; j++)
		{
			if(j < 16) w[j] = x[i + j];
			else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
			var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
											safe_add(safe_add(e, w[j]), sha1_kt(j)));
			e = d;
			d = c;
			c = rol(b, 30);
			b = a;
			a = t;
		}

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
		e = safe_add(e, olde);
	}
	return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
	if(t < 20) return (b & c) | ((~b) & d);
	if(t < 40) return b ^ c ^ d;
	if(t < 60) return (b & c) | (b & d) | (c & d);
	return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
	return (t < 20) ?	1518500249 : (t < 40) ?	1859775393 : (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
	var bkey = str2binb(key);
	if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

	var ipad = Array(16), opad = Array(16);
	for(var i = 0; i < 16; i++)
	{
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5C5C5C5C;
	}

	var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
	return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
	return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
	var bin = Array();
	var mask = (1 << chrsz) - 1;
	for(var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
	return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
	var str = "";
	var mask = (1 << chrsz) - 1;
	for(var i = 0; i < bin.length * 32; i += chrsz)
		str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
	return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var str = "";
	for(var i = 0; i < binarray.length * 4; i++)
	{
		str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) + hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8	)) & 0xF);
	}
	return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var str = "";
	for(var i = 0; i < binarray.length * 4; i += 3)
	{
		var triplet = (((binarray[i >> 2] >> 8 * (3 - i %4)) & 0xFF) << 16)
								| (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
								|	((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
		for(var j = 0; j < 4; j++)
		{
			if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
			else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
		}
	}
	return str;
}


/* ===========================================================
 * bootstrap-fileupload.js j2
 * http://jasny.github.com/bootstrap/javascript.html#fileupload
 * ===========================================================
 * Copyright 2012 Jasny BV, Netherlands.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function ($) {

	"use strict";

	/* FILEUPLOAD PUBLIC CLASS DEFINITION
	* ================================= */

	var Fileupload = function (element, options) {
		this.$element = $(element);
		this.type = this.$element.data('uploadtype') || (this.$element.find('.thumbnail').length > 0 ? "image" : "file");

		this.$input = this.$element.find(':file');
		if (this.$input.length === 0) return;

		this.name = this.$input.attr('name') || options.name;

		this.$hidden = this.$element.find('input[type=hidden][name="'+this.name+'"]');
		if (this.$hidden.length === 0) {
			this.$hidden = $('<input type="hidden" />');
			this.$element.prepend(this.$hidden);
		}

		this.$preview = this.$element.find('.fileupload-preview');
		var height = this.$preview.css('height');
		if (this.$preview.css('display') != 'inline' && height != '0px' && height != 'none') this.$preview.css('line-height', height);

		this.original = {
			'exists': this.$element.hasClass('fileupload-exists'),
			'preview': this.$preview.html(),
			'hiddenVal': this.$hidden.val()
		};

		this.$remove = this.$element.find('[data-dismiss="fileupload"]');

		this.$element.find('[data-trigger="fileupload"]').on('click.fileupload', $.proxy(this.trigger, this));

		this.listen();
	};

	Fileupload.prototype = {

		listen: function() {
			this.$input.on('change.fileupload', $.proxy(this.change, this));
			$(this.$input[0].form).on('reset.fileupload', $.proxy(this.reset, this));
			if (this.$remove) this.$remove.on('click.fileupload', $.proxy(this.clear, this));
		},

		change: function(e, invoked) {
			if (invoked === 'clear') return;

			var file = e.target.files !== undefined ? e.target.files[0] : (e.target.value ? { name: e.target.value.replace(/^.+\\/, '') } : null);

			if (!file) {
				this.clear();
				return;
			}

			this.$hidden.val('');
			this.$hidden.attr('name', '');
			this.$input.attr('name', this.name);

			if (this.type === "image" && this.$preview.length > 0 && (typeof file.type !== "undefined" ? file.type.match('image.*') : file.name.match('\\.(gif|png|jpe?g)$')) && typeof FileReader !== "undefined") {
				var reader = new FileReader();
				var preview = this.$preview;
				var element = this.$element;

				reader.onload = function(e) {
					preview.html('<img src="' + e.target.result + '" ' + (preview.css('max-height') != 'none' ? 'style="max-height: ' + preview.css('max-height') + ';"' : '') + ' />');
					element.addClass('fileupload-exists').removeClass('fileupload-new');
				};

				reader.readAsDataURL(file);
			} else {
				this.$preview.text(file.name);
				this.$element.addClass('fileupload-exists').removeClass('fileupload-new');
			}
		},

		clear: function(e) {
			this.$hidden.val('');
			this.$hidden.attr('name', this.name);
			this.$input.attr('name', '');

			//ie8+ doesn't support changing the value of input with type=file so clone instead
			if (navigator.userAgent.match(/msie/i)){
				var inputClone = this.$input.clone(true);
				this.$input.after(inputClone);
				this.$input.remove();
				this.$input = inputClone;
			} else {
				this.$input.val('');
			}

			this.$preview.html('');
			this.$element.addClass('fileupload-new').removeClass('fileupload-exists');

			if (e) {
				this.$input.trigger('change', [ 'clear' ]);
				e.preventDefault();
			}
		},

		reset: function(e) {
			this.clear();

			this.$hidden.val(this.original.hiddenVal);
			this.$preview.html(this.original.preview);

			if (this.original.exists) this.$element.addClass('fileupload-exists').removeClass('fileupload-new');
			else this.$element.addClass('fileupload-new').removeClass('fileupload-exists');
		},

		trigger: function(e) {
			this.$input.trigger('click');
			e.preventDefault();
		}
	};


	/* FILEUPLOAD PLUGIN DEFINITION
	* =========================== */

	$.fn.fileupload = function (options) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('fileupload');
			if (!data) $this.data('fileupload', (data = new Fileupload(this, options)));
			if (typeof options == 'string') data[options]();
		});
	};

	$.fn.fileupload.Constructor = Fileupload;


	/* FILEUPLOAD DATA-API
	* ================== */

	$(document).on('click.fileupload.data-api', '[data-provides="fileupload"]', function (e) {
		var $this = $(this);
		if ($this.data('fileupload')) return;
		$this.fileupload($this.data());

		var $target = $(e.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');
		if ($target.length > 0) {
			$target.trigger('click.fileupload');
			e.preventDefault();
		}
	});

}(window.jQuery);


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