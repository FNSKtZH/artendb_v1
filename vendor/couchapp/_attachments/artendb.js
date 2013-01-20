function erstelleBaum(Gruppe) {
	var baum;
	baum = [];
	$db = $.couch.db("artendb");
	if (Gruppe === "Fauna") {
		$db.view('artendb/baum_fauna_klasse?group=true', {
			success: function (fauna_klasse) {
				$db.view('artendb/baum_fauna_ordnung?group=true', {
					success: function (fauna_ordnung) {
						$db.view('artendb/baum_fauna_familie?group=true', {
							success: function (fauna_familie) {
								$db.view('artendb/baum_fauna_art', {
									success: function (fauna_art) {
										var baum, child_klasse, klasse, child_ordnung, children_ordnung, ordnung, child_familie, children_familie, familie, child_art, children_art, art;
										baum = [];
										for (i in fauna_klasse.rows) {
											klasse = fauna_klasse.rows[i].key;
											children_ordnung = [];
											for (k in fauna_ordnung.rows) {
												if (fauna_ordnung.rows[k].key[0] === klasse) {
													ordnung = fauna_ordnung.rows[k].key[1];
													children_familie = [];
													for (l in fauna_familie.rows) {
														if (fauna_familie.rows[l].key[0] === klasse && fauna_familie.rows[l].key[1] === ordnung) {
															familie = fauna_familie.rows[l].key[2];
															children_art = [];
															for (n in fauna_art.rows) {
																if (fauna_art.rows[n].key[0] === klasse && fauna_art.rows[n].key[1] === ordnung && fauna_art.rows[n].key[2] === familie) {
																	art = fauna_art.rows[n].key[3];
																	child_art = {
																			"data": art,
																			"attr": {"id": fauna_art.rows[n].value}
																		};
																	children_art.push(child_art);
																}
															}
															child_familie = {
																	"data": familie,
																	"children": children_art
																};
															children_familie.push(child_familie);
														}
													}
													child_ordnung = {
															"data": ordnung,
															"children": children_familie
														};
													children_ordnung.push(child_ordnung);
												}
											}
											child_klasse = {
													"data": klasse,
													"children": children_ordnung
												};
											baum.push(child_klasse);
										}
										erstelleTree(baum);
									}
								});
							}
						});
					}
				});
			}
		});
	} else if (Gruppe === "Flora") {
		$db.view('artendb/baum_flora_familie?group=true', {
			success: function (flora_familie) {
				$db.view('artendb/baum_flora_gattung?group=true', {
					success: function (flora_gattung) {
						$db.view('artendb/baum_flora_art', {
							success: function (flora_art) {
								var baum, child_familie, familie, child_gattung, children_gattung, gattung, child_art, children_art, art;
								baum = [];
								for (i in flora_familie.rows) {
									familie = flora_familie.rows[i].key;
									children_gattung = [];
									for (k in flora_gattung.rows) {
										if (flora_gattung.rows[k].key[0] === familie) {
											gattung = flora_gattung.rows[k].key[1];
											children_art = [];
											for (n in flora_art.rows) {
												if (flora_art.rows[n].key[0] === familie && flora_art.rows[n].key[1] === gattung) {
													art = flora_art.rows[n].key[2];
													child_art = {
															"data": art,
															"attr": {"id": flora_art.rows[n].value}
														};
													children_art.push(child_art);
												}
											}
											child_gattung = {
													"data": gattung,
													"children": children_art
												};
											children_gattung.push(child_gattung);
										}
									}
									child_familie = {
											"data": familie,
											"children": children_gattung
										};
									baum.push(child_familie);
								}
								erstelleTree(baum);
							}
						});
					}
				});
			}
		});
	} else if (Gruppe === "Moose") {
		$db.view('artendb/baum_moose_klasse?group=true', {
			success: function (moose_klasse) {
				$db.view('artendb/baum_moose_familie?group=true', {
					success: function (moose_familie) {
						$db.view('artendb/baum_moose_gattung?group=true', {
							success: function (moose_gattung) {
								$db.view('artendb/baum_moose_art', {
									success: function (moose_art) {
										var baum, child_klasse, klasse, child_familie, children_familie, familie, child_gattung, children_gattung, gattung, child_art, children_art, art;
										baum = [];
										for (i in moose_klasse.rows) {
											klasse = moose_klasse.rows[i].key;
											children_familie = [];
											for (k in moose_familie.rows) {
												if (moose_familie.rows[k].key[0] === klasse) {
													familie = moose_familie.rows[k].key[1];
													children_gattung = [];
													for (l in moose_gattung.rows) {
														if (moose_gattung.rows[l].key[0] === klasse && moose_gattung.rows[l].key[1] === familie) {
															gattung = moose_gattung.rows[l].key[2];
															children_art = [];
															for (n in moose_art.rows) {
																if (moose_art.rows[n].key[0] === klasse && moose_art.rows[n].key[1] === familie && moose_art.rows[n].key[2] === gattung) {
																	art = moose_art.rows[n].key[3];
																	child_art = {
																			"data": art,
																			"attr": {"id": moose_art.rows[n].value}
																		};
																	children_art.push(child_art);
																}
															}
															child_gattung = {
																	"data": gattung,
																	"children": children_art
																};
															children_gattung.push(child_gattung);
														}
													}
													child_familie = {
															"data": familie,
															"children": children_gattung
														};
													children_familie.push(child_familie);
												}
											}
											child_klasse = {
													"data": klasse,
													"children": children_familie
												};
											baum.push(child_klasse);
										}
										erstelleTree(baum);
									}
								});
							}
						});
					}
				});
			}
		});
	} else if (Gruppe === "Macromycetes") {
		$db.view('artendb/baum_macromycetes_gattung?group=true', {
			success: function (macromycetes_gattung) {
				$db.view('artendb/baum_macromycetes_art', {
					success: function (macromycetes_art) {
						var baum, child_gattung, gattung, child_art, children_art, art;
						baum = [];
						for (k in macromycetes_gattung.rows) {
							gattung = macromycetes_gattung.rows[k].key;
							children_art = [];
							for (n in macromycetes_art.rows) {
								if (macromycetes_art.rows[n].key[0] === gattung) {
									art = macromycetes_art.rows[n].key[1];
									child_art = {
											"data": art,
											"attr": {"id": macromycetes_art.rows[n].value}
										};
									children_art.push(child_art);
								}
							}
							child_gattung = {
									"data": gattung,
									"children": children_art
								};
							baum.push(child_gattung);
						}
						erstelleTree(baum);
					}
				});
			}
		});
	} else if (Gruppe === "Lebensräume") {
		$db.view('artendb/baum_lr?group_level=1', {
			success: function (level1) {
				$db.view('artendb/baum_lr?group_level=2', {
					success: function (level2) {
						$db.view('artendb/baum_lr?group_level=3', {
							success: function (level3) {
								$db.view('artendb/baum_lr?group_level=4', {
									success: function (level4) {
										var baum, child_level1, level1_lr, child_level2, children_level2, level2_lr, child_level3, children_level3, level3_lr, child_level4, children_level4, level4_lr;
										baum = [];
										for (i in level1.rows) {
											level1_lr = level1.rows[i].key[0].Name;
											children_level2 = [];
											for (k in level2.rows) {
												if (level2.rows[k].key[1] && level2.rows[k].key[0].Name === level1_lr) {
													level2_lr = level2.rows[k].key[1].Name;
													children_level3 = [];
													for (l in level3.rows) {
														if (level3.rows[l].key[2] && level3.rows[l].key[0].Name === level1_lr && level3.rows[l].key[1].Name === level2_lr) {
															level3_lr = level3.rows[l].key[2].Name;
															children_level4 = [];
															for (n in level4.rows) {
																if (level4.rows[n].key[3] && level4.rows[n].key[0].Name === level1_lr && level4.rows[n].key[1].Name === level2_lr && level4.rows[n].key[2].Name === level3_lr) {
																	level4_lr = level4.rows[n].key[3].Name;
																	child_level4 = {
																			"data": level4_lr,
																			"attr": {"id": level4.rows[n].key[3].GUID}
																		};
																	children_level4.push(child_level4);
																}
															}
															child_level3 = {
																	"data": level3_lr,
																	"attr": {"id": level3.rows[l].key[2].GUID},
																	"children": children_level4
																};
															children_level3.push(child_level3);
														}
													}
													child_level2 = {
															"data": level2_lr,
															"attr": {"id": level2.rows[k].key[1].GUID},
															"children": children_level3
														};
													children_level2.push(child_level2);
												}
											}
											child_level1 = {
													"data": level1_lr,
													"attr": {"id": level1.rows[i].key[0].GUID},
													"children": children_level2
												};
											baum.push(child_level1);
										}
										erstelleTree(baum);
									}
								});
							}
						});
					}
				});
			}
		});
	}
}

function erstelleTree(baum) {
	$("#tree").jstree({
		"json_data": {
			"data": baum
		},
		"core": {
			"open_parents": true,	//wird ein node programmatisch geöffnet, öffnen sich alle parents
			"strings": {	//Deutsche Übersetzungen
				"loading": "hole Daten..."
			}
		},
		"ui": {
			"select_limit": 1,	//nur ein Datensatz kann aufs mal gewählt werden
			"selected_parent_open": true,	//wenn Code einen node wählt, werden alle parents geöffnet
			"select_prev_on_delete": true
		},
		"search": {
			"case_insensitive": true,
			"show_only_matches": true
		},
		"themes": {
			"icons": false
		},
		"plugins" : ["themes", "json_data", "ui", "search"]
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
				$("#forms").show();
			}
		}
	})
	.bind("loaded.jstree", function (event, data) {
		$("#suchen").show();
		setzeTreehoehe();
	})
	.bind("after_open.jstree", function (e, data) {
		setzeTreehoehe();
	})
	.bind("after_close.jstree", function (e, data) {
		setzeTreehoehe();
	});
}

function initiiere_art(id) {
	$db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function (art) {
			var htmlArt, htmlDatensammlung;
			//accordion beginnen
			htmlArt = '<div id="accordion_ds" class="accordion">';
			for (i in art) {
				//nur Datensammlungen anzeigen
				if (art[i].Typ === "Datensammlung") {
					//Accordion-Gruppe und -heading anfügen
					htmlDatensammlung = '<div class="accordion-group"><div class="accordion-heading accordion-group_gradient">';
					//die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
					htmlDatensammlung += '<a class="accordion-toggle Datensammlung" data-toggle="collapse" data-parent="#accordion_ds" href="#collapse' + i.replace(/ /g,'') + '">';
					//Titel für die Datensammlung einfügen
					htmlDatensammlung += i;
					//header abschliessen
					htmlDatensammlung += '</a></div>';
					//body beginnen
					htmlDatensammlung += '<div id="collapse' + i.replace(/ /g,'') + '" class="accordion-body collapse"><div class="accordion-inner">';
					//Datensammlung beschreiben
					htmlDatensammlung += '<div class="Datensammlung BeschreibungDatensammlung">';
					if (art[i].Beschreibung) {
						htmlDatensammlung += art[i].Beschreibung;
					}
					if (art[i].Datenstand) {
						htmlDatensammlung += '. Stand: ';
						htmlDatensammlung += art[i].Datenstand;
					}
					if (art[i]["Link"]) {
						htmlDatensammlung += '. <a href="';
						htmlDatensammlung += art[i]["Link"];
						htmlDatensammlung += '">';
						htmlDatensammlung += art[i]["Link"];
						htmlDatensammlung += '</a>';
					}
					//Beschreibung der Datensammlung abschliessen
					htmlDatensammlung += '</div>';
					//Felder anzeigen
					for (y in art[i].Felder) {
						if (((y === "Offizielle Art" || y === "Eingeschlossen in" || y === "Synonym von") && art.Gruppe === "Flora") || (y === "Akzeptierte Referenz" && art.Gruppe === "Moose")) {
							//dann den Link aufbauen lassen
							htmlDatensammlung += generiereHtmlFuerLinkZuGleicherGruppe(y, art[i].Felder[y].GUID, art[i].Felder[y].Name);
						} else if ((y === "Gültige Namen" || y === "Eingeschlossene Arten" || y === "Synonyme") && art.Gruppe === "Flora") {
							//das ist ein Array von Objekten
							htmlDatensammlung += generiereHtmlFuerLinksZuGleicherGruppe(y, art[i].Felder[y]);
						} else if ((y === "Artname" && art.Gruppe === "Flora") || ((y === "Parent" || y === "Hierarchie") && art.Gruppe === "Lebensräume")) {
							//dieses Feld nicht anzeigen
						} else if (typeof art[i].Felder[y] === "string" && art[i].Felder[y].slice(0, 10) === "http://www") {
							//www-Links als Link darstellen
							htmlDatensammlung += generiereHtmlFuerWwwlink(y, art[i].Felder[y]);
						} else if (typeof art[i].Felder[y] === "string" && art[i].Felder[y].length < 70) {
							htmlDatensammlung += generiereHtmlFuerTextinput(y, art[i].Felder[y], "text");
						} else if (typeof art[i].Felder[y] === "string" && art[i].Felder[y].length >= 70) {
							htmlDatensammlung += generiereHtmlFuerTextarea(y, art[i].Felder[y]);
						} else if (typeof art[i].Felder[y] === "number") {
							htmlDatensammlung += generiereHtmlFuerTextinput(y, art[i].Felder[y], "number");
						} else if (typeof art[i].Felder[y] === "boolean") {
							htmlDatensammlung += generiereHtmlFuerBoolean(y, art[i].Felder[y]);
						} else {
							htmlDatensammlung += generiereHtmlFuerTextinput(y, art[i].Felder[y], "text");
						}
					}
					//body und Accordion-Gruppe abschliessen
					htmlDatensammlung += '</div></div></div>';
					//Datensammlung (=Accordion-Gruppe) hinzufügen
					htmlArt += htmlDatensammlung;
				}
			}
			//accordion beenden
			htmlArt += '</div>';
			$("#art").html(htmlArt);
			setzteHöheTextareas();
			//richtiges Formular anzeigen
			zeigeFormular("art");
			//jetzt die Links im Menu setzen
			setzteLinksZuBilderUndWikipedia(art);
		},
		error: function () {
			//melde("Fehler: Art konnte nicht geöffnet werden");
		}
	});
}

//managt die Links zu Google Bilder und Wikipedia
//erwartet das Objekt mit der Art
function setzteLinksZuBilderUndWikipedia(art) {
	//jetzt die Links im Menu setzen
	var googleBilderLink = "";
	var wikipediaLink = "";;
	switch (art.Gruppe) {
		case "Flora":
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Index.Felder.Artname + '"';
			if (art.Index.Felder['Deutsche Namen']) {
				googleBilderLink += '+OR+"' + art.Index.Felder['Deutsche Namen'] + '"';
			}
			if (art.Index.Felder['Name Französisch']) {
				googleBilderLink += '+OR+"' + art.Index.Felder['Name Französisch'] + '"';
			}
			if (art.Index.Felder['Name Italienisch']) {
				googleBilderLink += '+OR+"' + art.Index.Felder['Name Italienisch'] + '"';
			}
			if (art.Index.Felder['Deutsche Namen']) {
				wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Index.Felder['Deutsche Namen'];
			} else {
				wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Index.Felder.Artname;
			}
			break;
		case "Fauna":
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Index.Felder.Artname + '"';
			if (art.Index.Felder["Name Deutsch"]) {
				googleBilderLink += '+OR+"' + art.Index.Felder['Name Deutsch'] + '"';
			}
			if (art.Index.Felder['Name Französisch']) {
				googleBilderLink += '+OR+"' + art.Index.Felder['Name Französisch'] + '"';
			}
			if (art.Index.Felder['Name Italienisch']) {
				googleBilderLink += '+OR"' + art.Index.Felder['Name Italienisch'] + '"';
			}
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Index.Felder.Gattung + '_' + art.Index.Felder.Art;
			break;
		case 'Moose':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Index.Felder.Gattung + ' ' + art.Index.Felder.Art + '"';
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Index.Felder.Gattung + '_' + art.Index.Felder.Art;
			break;
		case 'Macromycetes':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Index.Felder.Name + '"';
			if (art.Index.Felder['Name Deutsch']) {
				googleBilderLink += '+OR+"' + art.Index.Felder['Name Deutsch'] + '"';
			}
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Index.Felder.Name;
			break;
		case 'Lebensräume':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Index.Felder.Einheit;
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art.Index.Felder.Einheit;
			break;
	}
	//mit replace Hochkommata ' ersetzen, sonst klappt url nicht
	$("#GoogleBilderLink").attr("href", encodeURI(googleBilderLink).replace("&#39;", "%20"));
	$("#GoogleBilderLink_li").removeClass("disabled");
	//$("#GoogleBilderLink").attr("href", encodeURI(googleBilderLink.replace(/'/g, " ")));
	$("#WikipediaLink").attr("href", wikipediaLink);
	$("#WikipediaLink_li").removeClass("disabled");
}

//generiert den html-Inhalt für einzelne Links in Flora
function generiereHtmlFuerLinkZuGleicherGruppe(FeldName, id, Artname) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label">';
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
	HtmlContainer = '<div class="control-group"><label class="control-label">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><span class="feldtext controls">';
	for (a in Objektliste) {
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
function generiereHtmlFuerWwwlink(FeldName, FeldWert) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><a href="';
	HtmlContainer += FeldWert;
	HtmlContainer += '" class="feldtext controls ">';
	HtmlContainer += FeldWert;
	HtmlContainer += '</a></div>';
	return HtmlContainer;
}

//generiert den html-Inhalt für Textinputs
function generiereHtmlFuerTextinput(FeldName, FeldWert, InputTyp) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group">\n\t<label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label>\n\t<input class="controls" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '" type="';
	HtmlContainer += InputTyp;
	HtmlContainer += '" value="';
	HtmlContainer += FeldWert;
	HtmlContainer += '" readonly="readonly"/>\n</div>';
	return HtmlContainer;	
}

//generiert den html-Inhalt für Textarea
function generiereHtmlFuerTextarea(FeldName, FeldWert) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><textarea class="controls" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	HtmlContainer += '" readonly="readonly">';
	HtmlContainer += FeldWert;
	HtmlContainer += '</textarea></div>';
	return HtmlContainer;	
}

//generiert den html-Inhalt für ja/nein-Felder
function generiereHtmlFuerBoolean(FeldName, FeldWert) {
	var HtmlContainer;
	HtmlContainer = '<div class="control-group"><label class="control-label" for="';
	HtmlContainer += FeldName;
	HtmlContainer += '">';
	HtmlContainer += FeldName;
	HtmlContainer += ':</label><input class="controls" type="checkbox" id="';
	HtmlContainer += FeldName;
	HtmlContainer += '" name="';
	HtmlContainer += FeldName;
	if (FeldWert === true) {
		HtmlContainer += '" checked="true">';
	} else {
		HtmlContainer += '">';
	}
	HtmlContainer += '</div>';
	return HtmlContainer;
}

//begrenzt die maximale Höhe des Baums auf die Seitenhöhe, wenn nötig
function setzeTreehoehe() {
	if ($(window).width() > 1000) {
		$("#tree").css("max-height", $(window).height() - 149);
	} else {
		//Spalten sind untereinander. Baum etwas weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
		$("#tree").css("max-height", $(window).height() - 190);
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

function schliesseNichtMarkierteNodes() {
	//wenn Suchfeld leer ist, soll der Baum zugeklappt werden
	if (!$("#suchfeld").val()) {
		$("#tree").jstree("clear_search");
		var selected_nodes = $("#tree").jstree("get_selected");
		$("#tree").jstree("close_all", -1);
		$("#tree").jstree("deselect_all", -1);
		//wenn eine Art gewählt war, diese wieder wählen
		if (selected_nodes.length === 1) {
			$("#tree").jstree("select_node", selected_nodes);
		}
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
		$("#forms").show();
		$('form').each(function() {
			$(this).hide();
			if ($(this).attr("id") === Formularname) {
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
function validiereSignup() {
	var Email, Passwort, Passwort2;
	//zunächst alle Hinweise ausblenden (falls einer von einer früheren Prüfung her noch eingeblendet wäre)
	$(".hinweis").css("display", "none");
	//erfasste Werte holen
	Email = $("#Email").val();
	Passwort = $("#Passwort").val();
	Passwort2 = $("#Passwort2").val();
	//prüfen
	if (!Email) {
		$("#Emailhinweis").css("display", "block");
		setTimeout(function() {
			$("#Email").focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (!Passwort) {
		$("#Passworthinweis").css("display", "block");
		setTimeout(function() {
			$("#Passwort").focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (!Passwort2) {
		$("#Passwort2hinweis").css("display", "block");
		setTimeout(function() {
			$("#Passwort2").focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (Passwort !== Passwort2) {
		$("#Passwort2hinweisFalsch").css("display", "block");
		setTimeout(function() {
			$("#Passwort2").focus();
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		return false;
	}
	return true;
}

function erstelleKonto() {
	//User in _user eintragen
	$.couch.signup({
			name: $('#Email').val()
		}, $('#Passwort').val(), {
		success : function() {
			localStorage.Email = $('#Email').val();
			passeUiFuerAngemeldetenUserAn();
			//Werte aus Feldern entfernen
			$("#Email").val("");
			$("#Passwort").val("");
			$("#Passwort2").val("");
		},
		error : function () {
			$("#importieren_anmelden_fehler_text").html("Fehler: Das Konto wurde nicht erstellt");
			$("#importieren_anmelden_fehler").alert();
			$("#importieren_anmelden_fehler").css("display", "block");
		}
	});
}

function meldeUserAn() {
	var Email, Passwort;
	Email = $('#Email').val();
	Passwort = $('#Passwort').val();
	if (validiereUserIndex) {
		$.couch.login({
			name : Email,
			password : Passwort,
			success : function() {
				localStorage.Email = $('#Email').val();
				passeUiFuerAngemeldetenUserAn();
				//Werte aus Feldern entfernen
				$("#Email").val("");
				$("#Passwort").val("");
			},
			error: function () {
				$("#importieren_anmelden_fehler_text").html("Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?");
				$("#importieren_anmelden_fehler").alert();
				$("#importieren_anmelden_fehler").css("display", "block");
			}
		});
	}
}

function passeUiFuerAngemeldetenUserAn() {
	$("#importieren_anmelden_titel").text(localStorage.Email + " ist angemeldet");
	$("#importieren_anmelden_collapse").collapse('hide');
	$("#importieren_aktion_waehlen_collapse").collapse('show');
}

function validiereUserIndex() {
	var Email, Passwort;
	Email = $('#Email').val();
	Passwort = $('input[name=Passwort]').val();
	if (!Email) {
		setTimeout(function () { 
			$('#Email').focus(); 
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		melde("Bitte Email eingeben");
		return false;
	} else if (!Passwort) {
		setTimeout(function () { 
			$('#Passwort').focus(); 
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		melde("Bitte Passwort eingeben");
		return false;
	}
	return true;
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
var hexcase = 0;	/* hex output format. 0 - lowercase; 1 - uppercase				*/
var b64pad	= "="; /* base-64 pad character. "=" for strict RFC compliance	 */
var chrsz	 = 8;	/* bits per input character. 8 - ASCII; 16 - Unicode			*/

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
	return (t < 20) ?	1518500249 : (t < 40) ?	1859775393 :
				 (t < 60) ? -1894007588 : -899497514;
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
		str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
					 hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8	)) & 0xF);
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
		var triplet = (((binarray[i	 >> 2] >> 8 * (3 -	i	 %4)) & 0xFF) << 16)
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