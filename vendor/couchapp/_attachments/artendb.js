function erstelleBaum() {
	var baum;
	//alle Bäume ausblenden
	$(".baum").css("display", "none");
	//alle Beschriftungen ausblenden
	$(".treeBeschriftung").css("display", "none");
	//gewollte sichtbar schalten
	$("#tree" + window.Gruppe).css("display", "block");
	$("#tree" + window.Gruppe + "Beschriftung").css("display", "block");
	//globale Variable, damit beim Suchen je nach Baumlänge sofort oder erst bei Enter gesucht werden kann
	window.baum_laenge = 0;
	baum = [];
	$db = $.couch.db("artendb");
	if (window.Gruppe === "Fauna") {
		//nur aufbauen, wenn noch nicht erfolgt
		if (!window.baum_fauna) {
			$("#tree" + window.Gruppe).html("der Baum wird aufgebaut...");
			$db.view('artendb/baum_fauna_klasse?group=true', {
				success: function (fauna_klasse) {
					$db.view('artendb/baum_fauna_ordnung?group=true', {
						success: function (fauna_ordnung) {
							$db.view('artendb/baum_fauna_familie?group=true', {
								success: function (fauna_familie) {
									$db.view('artendb/baum_fauna_art', {
										success: function (fauna_art) {
											window.baum_laenge = fauna_art.rows.length;
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
											if (!window.baum_fauna) {
												//speichern, damit das nächste mal keine Datenbankabfrage nötig ist
												window.baum_fauna = baum;
											}
										}
									});
								}
							});
						}
					});
				}
			});
		} else {
			//Suchfeld einblenden
			$("#suchen").show();
			$("#suchfeld").focus();
			setzeTreehoehe();
		}
	} else if (window.Gruppe === "Flora") {
		//nur aufbauen, wenn noch nicht erfolgt
		if (!window.baum_flora) {
			$("#tree" + window.Gruppe).html("der Baum wird aufgebaut...");
			$db.view('artendb/baum_flora_familie?group=true', {
				success: function (flora_familie) {
					$db.view('artendb/baum_flora_gattung?group=true', {
						success: function (flora_gattung) {
							$db.view('artendb/baum_flora_art', {
								success: function (flora_art) {
									window.baum_laenge = flora_art.rows.length;
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
									if (!window.baum_flora) {
										//speichern, um wiederholte Abfrage zu vermeiden
										window.baum_flora = baum;
									}
								}
							});
						}
					});
				}
			});
		} else {
			//Suchfeld einblenden
			$("#suchen").show();
			$("#suchfeld").focus();
			setzeTreehoehe();
		}
	} else if (window.Gruppe === "Moose") {
		//nur aufbauen, wenn noch nicht erfolgt
		if (!window.baum_moose) {
			$("#tree" + window.Gruppe).html("der Baum wird aufgebaut...");
			$db.view('artendb/baum_moose_klasse?group=true', {
				success: function (moose_klasse) {
					$db.view('artendb/baum_moose_familie?group=true', {
						success: function (moose_familie) {
							$db.view('artendb/baum_moose_gattung?group=true', {
								success: function (moose_gattung) {
									$db.view('artendb/baum_moose_art', {
										success: function (moose_art) {
											window.baum_laenge = moose_art.rows.length;
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
											if (!window.baum_moose) {
												//speichern, um wiederholten Aufruf zu vermeiden
												window.baum_moose = baum;
											}
										}
									});
								}
							});
						}
					});
				}
			});
		} else {
			//Suchfeld einblenden
			$("#suchen").show();
			$("#suchfeld").focus();
			setzeTreehoehe();
		}
	} else if (window.Gruppe === "Macromycetes") {
		//nur aufbauen, wenn noch nicht erfolgt
		if (!window.baum_macromycetes) {
			$("#tree" + window.Gruppe).html("der Baum wird aufgebaut...");
			$db.view('artendb/baum_macromycetes_gattung?group=true', {
				success: function (macromycetes_gattung) {
					$db.view('artendb/baum_macromycetes_art', {
						success: function (macromycetes_art) {
							window.baum_laenge = macromycetes_art.rows.length;
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
							if (!window.baum_macromycetes) {
								//speichern, um wiederholten Aufruf zu vermeiden
								window.baum_macromycetes = baum;
							}
						}
					});
				}
			});
		} else {
			//Suchfeld einblenden
			$("#suchen").show();
			$("#suchfeld").focus();
			setzeTreehoehe();
		}
	} else if (window.Gruppe === "Lebensräume") {
		//nur aufbauen, wenn noch nicht erfolgt
		if (!window.baum_lr) {
			$("#tree" + window.Gruppe).html("der Baum wird aufgebaut...");
			$db.view('artendb/baum_lr_0', {
				success: function (level0) {
					window.baum_laenge = level0.rows.length;
					$db.view('artendb/baum_lr_1', {
						success: function (level1) {
							window.baum_laenge += level1.rows.length;
							$db.view('artendb/baum_lr_2', {
								success: function (level2) {
									window.baum_laenge += level2.rows.length;
									$db.view('artendb/baum_lr_3', {
										success: function (level3) {
											window.baum_laenge += level3.rows.length;
											$db.view('artendb/baum_lr_4', {
												success: function (level4) {
													window.baum_laenge += level4.rows.length;
													$db.view('artendb/baum_lr_5', {
														success: function (level5) {
															window.baum_laenge += level5.rows.length;
															$db.view('artendb/baum_lr_6', {
																success: function (level6) {
																	window.baum_laenge += level6.rows.length;
																	$db.view('artendb/baum_lr_7', {
																		success: function (level7) {
																			window.baum_laenge += level7.rows.length;
																			var baum, child_level0, level0_lr, child_level1, children_level1, level1_lr, child_level2, children_level2, level2_lr, child_level3, children_level3, level3_lr, child_level4, children_level4, level4_lr, child_level5, children_level5, level5_lr, child_level6, children_level6, level6_lr, child_level7, children_level7, level7_lr;
																			baum = [];
																			for (i in level0.rows) {
																				level0_lr = level0.rows[i].key[0].Name;
																				children_level1 = [];
																				for (k in level1.rows) {
																					if (level1.rows[k].key[1] && level1.rows[k].key[0].Name === level0_lr) {
																						level1_lr = level1.rows[k].key[1].Name;
																						children_level2 = [];
																						for (l in level2.rows) {
																							if (level2.rows[l].key[2] && level2.rows[l].key[0].Name === level0_lr && level2.rows[l].key[1].Name === level1_lr) {
																								level2_lr = level2.rows[l].key[2].Name;
																								children_level3 = [];
																								for (m in level3.rows) {
																									if (level3.rows[m].key[3] && level3.rows[m].key[0].Name === level0_lr && level3.rows[m].key[1].Name === level1_lr && level3.rows[m].key[2].Name === level2_lr) {
																										level3_lr = level3.rows[m].key[3].Name;
																										children_level4 = [];
																										for (n in level4.rows) {
																											if (level4.rows[n].key[4] && level4.rows[n].key[0].Name === level0_lr && level4.rows[n].key[1].Name === level1_lr && level4.rows[n].key[2].Name === level2_lr && level4.rows[n].key[3].Name === level3_lr) {
																												level4_lr = level4.rows[n].key[4].Name;
																												children_level5 = [];
																												for (o in level5.rows) {
																													if (level5.rows[o].key[5] && level5.rows[o].key[0].Name === level0_lr && level5.rows[o].key[1].Name === level1_lr && level5.rows[o].key[2].Name === level2_lr && level5.rows[o].key[3].Name === level3_lr && level5.rows[o].key[4].Name === level4_lr) {
																														level5_lr = level5.rows[o].key[5].Name;
																														children_level6 = [];
																														for (p in level6.rows) {
																															if (level6.rows[p].key[6] && level6.rows[p].key[0].Name === level0_lr && level6.rows[p].key[1].Name === level1_lr && level6.rows[p].key[2].Name === level2_lr && level6.rows[p].key[3].Name === level3_lr && level6.rows[p].key[4].Name === level4_lr && level6.rows[p].key[5].Name === level5_lr) {
																																level6_lr = level6.rows[p].key[6].Name;
																																children_level7 = [];
																																for (q in level7.rows) {
																																	if (level7.rows[q].key[7] && level7.rows[q].key[0].Name === level0_lr && level7.rows[q].key[1].Name === level1_lr && level7.rows[q].key[2].Name === level2_lr && level7.rows[q].key[3].Name === level3_lr && level7.rows[q].key[4].Name === level4_lr && level7.rows[q].key[5].Name === level5_lr && level7.rows[q].key[6].Name === level6_lr) {
																																		level7_lr = level7.rows[q].key[7].Name;
																																		child_level7 = {
																																				"data": level7_lr,
																																				"attr": {"id": level7.rows[q].key[7].GUID},
																																				//"children": children_level8
																																			};
																																		children_level7.push(child_level7);
																																	}		
																																}

																																child_level6 = {
																																		"data": level6_lr,
																																		"attr": {"id": level6.rows[p].key[6].GUID},
																																		"children": children_level7
																																	};
																																children_level6.push(child_level6);
																															}		
																														}
																														child_level5 = {
																																"data": level5_lr,
																																"attr": {"id": level5.rows[o].key[5].GUID},
																																"children": children_level6
																															};
																														children_level5.push(child_level5);
																													}		
																												}
																												child_level4 = {
																														"data": level4_lr,
																														"attr": {"id": level4.rows[n].key[4].GUID},
																														"children": children_level5
																													};
																												children_level4.push(child_level4);
																											}
																										}
																										child_level3 = {
																												"data": level3_lr,
																												"attr": {"id": level3.rows[m].key[3].GUID},
																												"children": children_level4
																											};
																										children_level3.push(child_level3);
																									}
																								}
																								child_level2 = {
																										"data": level2_lr,
																										"attr": {"id": level2.rows[l].key[2].GUID},
																										"children": children_level3
																									};
																								children_level2.push(child_level2);
																							}
																						}
																						child_level1 = {
																								"data": level1_lr,
																								"attr": {"id": level1.rows[k].key[1].GUID},
																								"children": children_level2
																							};
																						children_level1.push(child_level1);
																					}
																				}
																				child_level0 = {
																						"data": level0_lr,
																						"attr": {"id": level0.rows[i].key[0].GUID},
																						"children": children_level1
																					};
																				baum.push(child_level0);
																			}
																			erstelleTree(baum);
																			if (!window.baum_lr) {
																				//speichern, um wiederholten Aufruf zu vermeiden
																				window.baum_lr = baum;
																			}
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		} else {
			//Suchfeld einblenden
			$("#suchen").show();
			$("#suchfeld").focus();
			setzeTreehoehe();
		}
	}
}

function erstelleTree(baum) {
	$("#tree" + window.Gruppe).jstree({
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
			}
		}
	})
	.bind("loaded.jstree", function (event, data) {
		$("#suchen").show();
		$("#suchfeld").focus();
		$("#tree" + window.Gruppe).css("display", "block");
		$("#tree" + window.Gruppe + "Beschriftung").html(window.baum_laenge + " " + $('[name="Gruppe"].active').attr("treeBeschriftung"));
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
			var htmlArt, htmlDatensammlung, Datensammlungen, Taxonomien;
			Datensammlungen = [];
			Taxonomien = [];
			//accordion beginnen
			htmlArt = '<div id="accordion_ds" class="accordion">';
			//zuerst alle Datensammlungen und Taxonomien auflisten, damit danach sortiert werden kann
			for (i in art) {
				if (art[i].Typ === "Taxonomie") {
					Taxonomien.push(i);
				}
				if (art[i].Typ === "Datensammlung" && i !== "Aktuelle Taxonomie") {
					Datensammlungen.push(i);
				}
			}
			//sortieren
			Taxonomien.sort();
			Datensammlungen.sort();
			//in gewollter Reihenfolge hinzufügen
			//HTML für Datensammlung erstellen lassen und hinzufügen
			//zuerst die aktuelle Taxonomie
			//die gibt es bei LR nicht, darum prüfen
			if (art["Aktuelle Taxonomie"]) {
				htmlArt += erstelleHtmlFuerDatensammlung("Aktuelle Taxonomie", art, art["Aktuelle Taxonomie"]);
			}
			//dann alternative Taxonomien, ohne die aktuelle nochmals zu bringen
			for (var z=0; z<Taxonomien.length; z++) {
				if (Taxonomien[z] !== "Aktuelle Taxonomie") {
					htmlArt += erstelleHtmlFuerDatensammlung(Taxonomien[z], art, art[Taxonomien[z]]);
				}
			}
			//dann Datensammlungen
			//Titel hinzufügen, falls Datensammlungen existieren
			if (Datensammlungen.length > 0) {
				htmlArt += "<h4>Eigenschaften:</h4>";
			}
			for (var x=0; x<Datensammlungen.length; x++) {
				htmlArt += erstelleHtmlFuerDatensammlung(Datensammlungen[x], art, art[Datensammlungen[x]]);
			}

			//Beziehungen holen
			$db = $.couch.db("artendb");
			//alle Beziehungen holen, in denen Beziehungen diese Art als Partner vorkommt
			//$db.view('artendb/bez_guid_id?key="' + id + '"&include_docs=true', {
			$db.view('artendb/bez_guid_id?startkey=["' + id + '"]&endkey=["' + id + '",{}]&include_docs=true', {
				success: function (beziehungen_mit_dieser_art) {
					var Beziehung = {};
					var Beziehungen = {};
					//Titel hinzufügen, falls Beziehungen existieren
					if (beziehungen_mit_dieser_art.rows.length > 0) {
						htmlArt += "<h4>Beziehungen:</h4>";
					}
					//jetzt im Objekt Beziehungen für jede Datensammlung eine Eigenschaft erstellen...
					for (i in beziehungen_mit_dieser_art.rows) {
						Beziehung = beziehungen_mit_dieser_art.rows[i].doc;
						if (!Beziehungen.hasOwnProperty(Beziehung.Datensammlung.Name)) {
							//...und diesem Array... 
							Beziehungen[Beziehung.Datensammlung.Name] = [];
						}
						//...alle entsprechenden Beziehungen zuordnen
						Beziehungen[Beziehung.Datensammlung.Name].push(Beziehung);
					}
					//Jetzt durch alle Datensammlungen zirkeln und ihre Beziehungen als html ausgeben
					$.each(Beziehungen, function(key, value) {
						htmlArt += erstelleHtmlFuerBeziehungenMitGleicherDatensammlung(id, value);
					});
					//accordion beenden
					htmlArt += '</div>';
					$("#art").html(htmlArt);
					setzteHöheTextareas();
					//richtiges Formular anzeigen
					zeigeFormular("art");
					//Bei Lebensräumen die Taxonomie öffnen
					if (art.Gruppe === "Lebensräume") {
						$("#collapseTaxonomie").collapse('show');
						//Fokus von der Hierarchie wegnehmen
						$("#Hierarchie").blur();
					} else if (Datensammlungen.length === 0) {
						//Wenn nur eine Datensammlung (die Taxonomie) existiert, diese öffnen
						$(".accordion-body").collapse('show');
					}
					//jetzt die Links im Menu setzen
					setzteLinksZuBilderUndWikipedia(art);
				}
			});
		},
		error: function () {
			//melde("Fehler: Art konnte nicht geöffnet werden");
		}
	});
}

//übernimmt: id der Art, deren Beziehungen erstellt werden sollen
//und den Array mit allen Beziehungen mit dieser Datensammlung
function erstelleHtmlFuerBeziehungenMitGleicherDatensammlung(id, beziehungen_array) {
	//zuerst mal die Beziehungen nach Objektnamen sortieren
	beziehungen_array.sort(function(a, b) {
		var aName, bName;
		for (y in a.Partner) {
			//die eigene Art nicht berücksichtigen
			if (a.Partner[y].GUID !== id) {
				aName = a.Partner[y].Name;
			}
		}
		for (x in b.Partner) {
			//die eigene Art nicht berücksichtigen
			if (b.Partner[x].GUID !== id) {
				bName = b.Partner[x].Name;
			}
		}
		return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
	});
	//Alle übergebenen Beziehungen haben dieselbe Datensammlung
	//die erste Beziehung verwenden, um die Datensmmlung zu beschreiben
	//Accordion-Gruppe und -heading anfügen
	var html = '<div class="accordion-group"><div class="accordion-heading accordion-group_gradient">';
	//die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
	//"Behiehungen" zur id hinzufügen, weil dieselbe Datensammlung bei Objekten und Beziehungen vorkommen kann!
	html += '<a class="accordion-toggle Datensammlung" data-toggle="collapse" data-parent="#accordion_ds" href="#collapseBeziehungen' + beziehungen_array[0].Datensammlung.Name.replace(/ /g,'').replace(/,/g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'') + '">';
	//Titel für die Datensammlung einfügen
	html += beziehungen_array[0].Datensammlung.Name + " (" + beziehungen_array.length + ")";
	//header abschliessen
	html += '</a></div>';
	//body beginnen. Kommas aus Datensammlungsnamen entfernen, die verhindern die Funktion des Accordions
	html += '<div id="collapseBeziehungen' + beziehungen_array[0].Datensammlung.Name.replace(/ /g,'').replace(/,/g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'') + '" class="accordion-body collapse"><div class="accordion-inner">';
	//Datensammlung beschreiben
	html += '<div class="Datensammlung BeschreibungDatensammlung">';
	if (beziehungen_array[0].Datensammlung.Beschreibung) {
		html += beziehungen_array[0].Datensammlung.Beschreibung;
	}
	if (beziehungen_array[0].Datensammlung.Datenstand) {
		html += '. Stand: ';
		html += beziehungen_array[0].Datensammlung.Datenstand;
	}
	if (beziehungen_array[0].Datensammlung["Link"]) {
		html += '. <a href="';
		html += beziehungen_array[0].Datensammlung["Link"];
		html += '">';
		html += beziehungen_array[0].Datensammlung["Link"];
		html += '</a>';
	}
	//Beschreibung der Datensammlung abschliessen
	html += '</div>';
	var BeteiligteGruppen;
	//jetzt für alle Beziehungen die Felder hinzufügen
	for (var i = 0; i < beziehungen_array.length; i++) {
		BeteiligteGruppen = [];
		for (y in beziehungen_array[i].Partner) {
			BeteiligteGruppen.push(beziehungen_array[i].Partner[y].Gruppe);
			//Partner darstellen
			//die eigene Art nicht nochmals darstellen
			if (beziehungen_array[i].Partner[y].GUID !== id) {
				if (BeteiligteGruppen[0] === "Lebensräume" && BeteiligteGruppen[1] === "Lebensräume") {
					//LR-LR-Beziehung. Hier soll auch die Taxonomie angezeigt werden
					html += generiereHtmlFuerTextinput("Partner", beziehungen_array[i].Partner[y].Taxonomie + " > " + beziehungen_array[i].Partner[y].Name, "text");
				} else {
					html += generiereHtmlFuerTextinput("Partner", beziehungen_array[i].Partner[y].Name, "text");
				}
			}
		}
		//Für LR-LR-Beziehungen die Art der Beziehung ausgeben (wird sonst unten blockiert)
		//if (beziehungen_array[i].Felder["übergeordnete Einheit"]) {
		if (BeteiligteGruppen[0] === "Lebensräume" && BeteiligteGruppen[1] === "Lebensräume") {
			html += erstelleHtmlFuerFeld("Art der Beziehung", beziehungen_array[i].Felder["Art der Beziehung"]);
		}
		//Die Felder anzeigen
		for (x in beziehungen_array[i].Felder) {
			if (typeof beziehungen_array[i].Felder[x] === "object") {
				//wird wohl eine LR-LR-Beziehung sein
				if (beziehungen_array[i].Felder[x].Taxonomie && beziehungen_array[i].Felder[x].Name) {
					html += erstelleHtmlFuerFeld(x, beziehungen_array[i].Felder[x].Taxonomie + " > " + beziehungen_array[i].Felder[x].Name);
				}
			} else {
				//Bei Lr-Beziehungen mit Flora, Fauna und Moosen steht die Art der Beziehung schon im Titel
				//und sollte daher besser nicht angezeigt werden
				if (x !== "Art der Beziehung") {
					html += erstelleHtmlFuerFeld(x, beziehungen_array[i].Felder[x]);
				}
			}
		}
		//Am Schluss eine Linie, nicht aber bei der letzen Beziehung
		if (i < (beziehungen_array.length-1)) {
			html += "<hr>";
		}
	}
	//body und Accordion-Gruppe abschliessen
	html += '</div></div></div>';
	return html;
}

//erstellt die HTML für eine Datensammlung
//benötigt von der art bzw. den lr die entsprechende JSON-Methode art_i und ihren Namen
function erstelleHtmlFuerDatensammlung(i, art, art_i) {
	var htmlDatensammlung;
	//Accordion-Gruppe und -heading anfügen
	htmlDatensammlung = '<div class="accordion-group"><div class="accordion-heading accordion-group_gradient">';
	//die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
	htmlDatensammlung += '<a class="accordion-toggle Datensammlung" data-toggle="collapse" data-parent="#accordion_ds" href="#collapse' + i.replace(/ /g,'').replace(/,/g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'') + '">';
	//Titel für die Datensammlung einfügen
	htmlDatensammlung += i;
	//header abschliessen
	htmlDatensammlung += '</a></div>';
	//body beginnen
	htmlDatensammlung += '<div id="collapse' + i.replace(/ /g,'').replace(/,/g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'') + '" class="accordion-body collapse"><div class="accordion-inner">';
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
	//Beschreibung der Datensammlung abschliessen
	htmlDatensammlung += '</div>';
	//Felder anzeigen
	//zuerst die GUID, aber nur bei der aktuellen Taxonomie (bei LR Taxonomie)
	if (i === "Aktuelle Taxonomie" || i === "Taxonomie") {
		htmlDatensammlung += erstelleHtmlFuerFeld("GUID", art._id);
	}
	for (y in art_i.Felder) {
		if (y === "GUID") {
			//dieses Feld nicht anzeigen. Es wird _id verwendet
			//dieses Feld wird künftig nicht mehr importiert
		} else if (((y === "Offizielle Art" || y === "Eingeschlossen in" || y === "Synonym von") && art.Gruppe === "Flora") || (y === "Akzeptierte Referenz" && art.Gruppe === "Moose")) {
			//dann den Link aufbauen lassen
			htmlDatensammlung += generiereHtmlFuerLinkZuGleicherGruppe(y, art._id, art_i.Felder[y].Name);
		} else if ((y === "Gültige Namen" || y === "Eingeschlossene Arten" || y === "Synonyme") && art.Gruppe === "Flora") {
			//das ist ein Array von Objekten
			htmlDatensammlung += generiereHtmlFuerLinksZuGleicherGruppe(y, art_i.Felder[y]);
		} else if ((y === "Artname" && art.Gruppe === "Flora") || (y === "Parent" && art.Gruppe === "Lebensräume")) {
			//dieses Feld nicht anzeigen
		} else if (y === "Hierarchie" && art.Gruppe === "Lebensräume") {
			//Namen kommagetrennt anzeigen
			var hierarchie_objekt_array = art_i.Felder[y];
			var hierarchie_string = "";
			for (g in hierarchie_objekt_array) {
				if (hierarchie_string !== "") {
					hierarchie_string += "\n";
				}
				hierarchie_string += hierarchie_objekt_array[g].Name;
			}
			htmlDatensammlung += generiereHtmlFuerTextarea(y, hierarchie_string, "text");
		} else {
			htmlDatensammlung += erstelleHtmlFuerFeld(y, art_i.Felder[y]);
		}
	}
	//body und Accordion-Gruppe abschliessen
	htmlDatensammlung += '</div></div></div>';
	return htmlDatensammlung;
}

//übernimmt Feldname und Feldwert
//generiert daraus und retourniert html für die Darstellung im passenden Feld
function erstelleHtmlFuerFeld(Feldname, Feldwert) {
	var htmlDatensammlung = "";
	if (typeof Feldwert === "string" && Feldwert.slice(0, 10) === "http://www") {
		//www-Links als Link darstellen
		htmlDatensammlung += generiereHtmlFuerWwwlink(Feldname, Feldwert);
	} else if (typeof Feldwert === "string" && Feldwert.length < 50) {
		htmlDatensammlung += generiereHtmlFuerTextinput(Feldname, Feldwert, "text");
	} else if (typeof Feldwert === "string" && Feldwert.length >= 50) {
		htmlDatensammlung += generiereHtmlFuerTextarea(Feldname, Feldwert);
	} else if (typeof Feldwert === "number") {
		htmlDatensammlung += generiereHtmlFuerTextinput(Feldname, Feldwert, "number");
	} else if (typeof Feldwert === "boolean") {
		htmlDatensammlung += generiereHtmlFuerBoolean(Feldname, Feldwert);
	} else {
		htmlDatensammlung += generiereHtmlFuerTextinput(Feldname, Feldwert, "text");
	}
	return htmlDatensammlung;
}

//managt die Links zu Google Bilder und Wikipedia
//erwartet das Objekt mit der Art
function setzteLinksZuBilderUndWikipedia(art) {
	//jetzt die Links im Menu setzen
	var googleBilderLink = "";
	var wikipediaLink = "";;
	switch (art.Gruppe) {
		case "Flora":
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art["Aktuelle Taxonomie"].Felder.Artname + '"';
			if (art["Aktuelle Taxonomie"].Felder['Deutsche Namen']) {
				googleBilderLink += '+OR+"' + art["Aktuelle Taxonomie"].Felder['Deutsche Namen'] + '"';
			}
			if (art["Aktuelle Taxonomie"].Felder['Name Französisch']) {
				googleBilderLink += '+OR+"' + art["Aktuelle Taxonomie"].Felder['Name Französisch'] + '"';
			}
			if (art["Aktuelle Taxonomie"].Felder['Name Italienisch']) {
				googleBilderLink += '+OR+"' + art["Aktuelle Taxonomie"].Felder['Name Italienisch'] + '"';
			}
			if (art["Aktuelle Taxonomie"].Felder['Deutsche Namen']) {
				wikipediaLink = 'http://de.wikipedia.org/wiki/' + art["Aktuelle Taxonomie"].Felder['Deutsche Namen'];
			} else {
				wikipediaLink = 'http://de.wikipedia.org/wiki/' + art["Aktuelle Taxonomie"].Felder.Artname;
			}
			break;
		case "Fauna":
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art["Aktuelle Taxonomie"].Felder.Artname + '"';
			if (art["Aktuelle Taxonomie"].Felder["Name Deutsch"]) {
				googleBilderLink += '+OR+"' + art["Aktuelle Taxonomie"].Felder['Name Deutsch'] + '"';
			}
			if (art["Aktuelle Taxonomie"].Felder['Name Französisch']) {
				googleBilderLink += '+OR+"' + art["Aktuelle Taxonomie"].Felder['Name Französisch'] + '"';
			}
			if (art["Aktuelle Taxonomie"].Felder['Name Italienisch']) {
				googleBilderLink += '+OR"' + art["Aktuelle Taxonomie"].Felder['Name Italienisch'] + '"';
			}
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art["Aktuelle Taxonomie"].Felder.Gattung + '_' + art["Aktuelle Taxonomie"].Felder.Art;
			break;
		case 'Moose':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art["Aktuelle Taxonomie"].Felder.Gattung + ' ' + art["Aktuelle Taxonomie"].Felder.Art + '"';
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art["Aktuelle Taxonomie"].Felder.Gattung + '_' + art["Aktuelle Taxonomie"].Felder.Art;
			break;
		case 'Macromycetes':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art["Aktuelle Taxonomie"].Felder.Name + '"';
			if (art["Aktuelle Taxonomie"].Felder['Name Deutsch']) {
				googleBilderLink += '+OR+"' + art["Aktuelle Taxonomie"].Felder['Name Deutsch'] + '"';
			}
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art["Aktuelle Taxonomie"].Felder.Name;
			break;
		case 'Lebensräume':
			googleBilderLink = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art["Taxonomie"].Felder.Einheit;
			wikipediaLink = 'http://de.wikipedia.org/wiki/' + art["Taxonomie"].Felder.Einheit;
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
	HtmlContainer += '" readonly="readonly">\n</div>';
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

function schliesseNichtMarkierteNodes() {
	//wenn Suchfeld leer ist, soll der Baum zugeklappt werden
	if (!$("#suchfeld").val()) {
		$("#tree" + window.Gruppe).jstree("clear_search");
		var selected_nodes = $("#tree" + window.Gruppe).jstree("get_selected");
		$("#tree" + window.Gruppe).jstree("close_all", -1);
		$("#tree" + window.Gruppe).jstree("deselect_all", -1);
		//wenn eine Art gewählt war, diese wieder wählen
		if (selected_nodes.length === 1) {
			$("#tree" + window.Gruppe).jstree("select_node", selected_nodes);
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
		$('form').each(function() {
			$(this).hide();
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
	if (validiereUserAnmeldung()) {
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
	$("#importieren_ds_beschreiben_collapse").collapse('show');
	$("#importieren_anmelden_fehler").css("display", "none");
	$(".hinweis").css("display", "none");
}

function validiereUserAnmeldung() {
	var Email, Passwort;
	Email = $('#Email').val();
	Passwort = $('#Passwort').val();
	if (!Email) {
		setTimeout(function () { 
			$('#Email').focus(); 
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		$("#Emailhinweis").css("display", "block");
		return false;
	} else if (!Passwort) {
		setTimeout(function () { 
			$('#Passwort').focus(); 
		}, 50);  //need to use a timer so that .blur() can finish before you do .focus()
		$("#Passworthinweis").css("display", "block");
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