function(head, req) {
	var row, Objekt,
		rückgabeObjekt = {},
		exportObjekte = [],
		exportObjekt,
		filterkriterien = [],
		filterkriterienObjekt,
		felder = [],
		felderObjekt,
		objektHinzufügen,
		DsName_z,
		Feldname_z,
		Filterwert_z,
		DsName_q,
		Feldname_q,
		Filterwert_q,
		Datensammlung,
		Beziehungssammlungen,
		Beziehungssammlung,
		Beziehung,
		dsExistiertSchon,
		dsExistiert;
	// specify that we're providing a JSON response
	provides('json', function() {
		//übergebene Variabeln extrahieren
		for (var i in req.query) {
			if (i === "fasseTaxonomienZusammen") {
				//true oder false wird als String übergeben > umwandeln
				fasseTaxonomienZusammen = (req.query[i] === 'true');
			}
			if (i === "filter") {
				//true oder false wird als String übergeben > umwandeln
				filterkriterienObjekt = JSON.parse(req.query[i]);
				filterkriterien = filterkriterienObjekt.rows;
			}
			if (i === "felder") {
				//true oder false wird als String übergeben > umwandeln
				felderObjekt = JSON.parse(req.query[i]);
				felder = felderObjekt.rows;
			}
			if (i === "gruppen") {
				gruppen = req.query[i].split(",");
			}
		}

		while (row = getRow()) {
			Objekt = row.doc;
			objektHinzufügen = false;
			objektNichtHinzufügen = false;
			//exportobjekt zurücksetzen
			exportObjekt = {};

			//Filter nach Gruppen
			if (gruppen && gruppen.indexOf(Objekt.Gruppe) >= 0) {
				//Kriterium ist erfüllt
				objektHinzufügen = true;
			} else {
				//Kriterium ist nicht erfüllt > zum nächsten Objekt
				continue;
			}

			loop_filterkriterien:
			for (var z=0; z<filterkriterien.length; z++) {
				DsTyp_z = filterkriterien[z].DsTyp;
				DsName_z = filterkriterien[z].DsName;
				Feldname_z = filterkriterien[z].Feldname;
				Filterwert_z = filterkriterien[z].Filterwert;
				if (DsName_z === "Objekt") {
					//Das ist eine simple Eigenschaft des Objekts - der view liefert hier als DsName Objekt
					if ((typeof Objekt[Feldname_z] === "number" && Objekt[Feldname_z] === parseInt(Filterwert_z, 10)) || (Objekt[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
						objektHinzufügen = true;
					} else {
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				} else if (DsTyp_z === "Taxonomie" && fasseTaxonomienZusammen) {
					//das Feld ist aus Taxonomie und die werden zusammengefasst
					//daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
					if (Objekt.Taxonomie.Daten[Feldname_z]) {
						if ((typeof Objekt.Taxonomie.Daten[Feldname_z] === "number" && Objekt.Taxonomie.Daten[Feldname_z] === parseInt(Filterwert_z, 10)) || (Objekt.Taxonomie.Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
							objektHinzufügen = true;
						} else {
							objektNichtHinzufügen = true;
							break loop_filterkriterien;
						}
					} else {
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				} else if (DsTyp_z === "Taxonomie") {
					//das Feld ist aus Taxonomie und die werden nicht zusammengefasst
					if (Objekt.Taxonomie.Name === DsName_z && Objekt.Taxonomie.Daten[Feldname_z]) {
						if ((typeof Objekt.Taxonomie.Daten[Feldname_z] === "number" && Objekt.Taxonomie.Daten[Feldname_z] === parseInt(Filterwert_z, 10)) || (Objekt.Taxonomie.Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
							objektHinzufügen = true;
						} else {
							objektNichtHinzufügen = true;
							break loop_filterkriterien;
						}
					} else {
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				} else if (DsTyp_z === "Beziehung") {
					//durch alle Beziehungssammlungen loopen und suchen, ob Filter trifft
					dsExistiert = false;
					for (var g=0; g<Objekt.Beziehungssammlungen.length; g++) {
						if (Objekt.Beziehungssammlungen[g].Name === DsName_z) {
							dsExistiert = true;
							//durch Beziehungssammlungen der Beziehung loopen
							if (Objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
								var feldExistiert = false;
								var feldHinzugefügt = false;
								for (var h=0; h<Objekt.Beziehungssammlungen[g].Beziehungen.length; h++) {
									//durch die Felder der Beziehung loopen
									if (Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z]) {
										feldExistiert = true;
										//Feld kann string oder object sein. Object muss stringified werden
										if ((typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "number" && Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === parseInt(Filterwert_z, 10)) || (typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "object" && JSON.stringify(Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z]).toLowerCase().indexOf(Filterwert_z) >= 0) || (typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "string" && Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z].toLowerCase().indexOf(Filterwert_z) >= 0)) {
											objektHinzufügen = true;
											feldHinzugefügt = true;
										}
									}
								}
								if (feldExistiert && !feldHinzugefügt) {
									objektNichtHinzufügen = true;
									break loop_filterkriterien;
								}
							} else {
								//es gibt keine passende Beziehung, nicht hinzufügen
								objektNichtHinzufügen = true;
								break loop_filterkriterien;
							}
						}
					}
					if (!dsExistiert) {
						//es gibt keine passende Beziehung, nicht hinzufügen
						objektNichtHinzufügen = true;
					}
				} else if (DsTyp_z === "Datensammlung") {
					dsExistiert = false;
					//das ist ein Feld aus einer Datensammlung
					for (var k=0; k<Objekt.Datensammlungen.length; k++) {
						if (Objekt.Datensammlungen[k].Name === DsName_z) {
							dsExistiert = true;
							if (Objekt.Datensammlungen[k].Name === DsName_z && typeof Objekt.Datensammlungen[k].Daten !== "undefined" && typeof Objekt.Datensammlungen[k].Daten[Feldname_z] !== "undefined") {
								if (typeof Objekt.Datensammlungen[k].Daten[Feldname_z] === "number" && Objekt.Datensammlungen[k].Daten[Feldname_z] === parseInt(Filterwert_z, 10)) {
									objektHinzufügen = true;
								} else if (Objekt.Datensammlungen[k].Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
									objektHinzufügen = true;
								} else {
									objektNichtHinzufügen = true;
									break loop_filterkriterien;
								}
							} else {
								objektNichtHinzufügen = true;
								break loop_filterkriterien;
							}
						}
					}
					if (!dsExistiert) {
						//es gibt keine passende Beziehung, nicht hinzufügen
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				}
			}

			if (objektHinzufügen && objektNichtHinzufügen === false) {
				//alle Kriterien sind erfüllt
				//Neues Objekt aufbauen, das nur die gewünschten Felder enthält
				for (var e in Objekt) {
					//durch alle Eigenschaften des Dokuments loopen
					if (typeof Objekt[e] !== "object" && e !== "_rev") {
						for (i=0; i<felder.length; i++) {
							if (felder[i].DsName === "Objekt" && felder[i].Feldname === e) {
								exportObjekt[e] = Objekt[e];
							}
						}
					}
				}
				if (Objekt.Taxonomie && Objekt.Taxonomie.Daten) {
					for (var a in Objekt.Taxonomie.Daten) {
						for (var w in felder) {
							if (felder[w].DsTyp === "Taxonomie" && (fasseTaxonomienZusammen || felder[w].DsName === Objekt.Taxonomie.Name)) {
								if (felder[w].Feldname === a) {
									if (typeof exportObjekt.Taxonomie === "undefined") {
										exportObjekt.Taxonomie = {};
										exportObjekt.Taxonomie.Name = felder[w].DsName;
									}
									if (typeof exportObjekt.Taxonomie.Daten === "undefined") {
										exportObjekt.Taxonomie.Daten = {};
									}
									exportObjekt.Taxonomie.Daten[a] = Objekt.Taxonomie.Daten[a];
								}
							}
						}
					}
				}
				if (Objekt.Datensammlungen) {
					for (i=0; i<Objekt.Datensammlungen.length; i++) {
						if (Objekt.Datensammlungen[i].Daten) {
							for (var aa in Objekt.Datensammlungen[i].Daten) {
								for (var u=0; u<felder.length; u++) {
									if (felder[u].DsTyp === "Datensammlung" && felder[u].DsName === Objekt.Datensammlungen[i].Name) {
										if (felder[u].Feldname === aa) {
											if (typeof exportObjekt.Datensammlungen === "undefined") {
												Datensammlung = {};
												Datensammlung.Name = felder[u].DsName;
												Datensammlung.Daten = {};
												Datensammlung.Daten[aa] = Objekt.Datensammlungen[i].Daten[aa];
												exportObjekt.Datensammlungen = [];
												exportObjekt.Datensammlungen.push(Datensammlung);
											} else {
												dsExistiertSchon = false;
												//durch alle Datensammlungen loopen und die richtige suchen
												for (var b=0; b<exportObjekt.Datensammlungen.length; b++) {
													if (exportObjekt.Datensammlungen[b].Name === felder[u].DsName) {
														dsExistiertSchon = true;
														if (typeof exportObjekt.Datensammlungen[b] === "undefined") {
															exportObjekt.Datensammlungen[b].Daten = {};
														}
														exportObjekt.Datensammlungen[b].Daten[aa] = Objekt.Datensammlungen[i].Daten[aa];
													}
												}
												if (!dsExistiertSchon) {
													Datensammlung = {};
													Datensammlung.Daten = {};
													Datensammlung.Daten[aa] = Objekt.Datensammlungen[i].Daten[aa];
													//exportObjekt.Datensammlungen = [];
													exportObjekt.Datensammlungen.push(Datensammlung);
												}

											}
										}
									}
								}
							}
						}
					}
				}
				if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
					for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
						//durch Beziehungssammlungen loopen
						for (var ww=0; ww<felder.length; ww++) {
							if (felder[ww].DsTyp === "Beziehung" && felder[ww].DsName === Objekt.Beziehungssammlungen[i].Name) {
								for (var aaa=0; aaa<Objekt.Beziehungssammlungen[i].Beziehungen.length; aaa++) {
									//durch Beziehungen loopen
									if (Objekt.Beziehungssammlungen[i].Beziehungen[aaa][felder[ww].Feldname]) {
										//in der Beziehung gibt es das gesuchte Feld
										if (!exportObjekt.Beziehungssammlungen) {
											//im Exportobjekt Beziehungssammlungen anlegen, falls noch nicht vorhanden
											exportObjekt.Beziehungssammlungen = [];
										}
										dsExistiertSchon = false;
										for (var t=0; t<exportObjekt.Beziehungssammlungen.length; t++) {
											//im Exportobjekt die Beziehungssammlung suchen
											if (exportObjekt.Beziehungssammlungen[t].Name === felder[ww].DsName) {
												dsExistiertSchon = true;
												if (!exportObjekt.Beziehungssammlungen[t].Beziehungen) {
													exportObjekt.Beziehungssammlungen[t].Beziehungen = [];
												}
												//durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
												if (filterkriterien && filterkriterien.length > 0) {
													for (var l=0; l<filterkriterien.length; l++) {
														var DsTyp = filterkriterien[l].DsTyp;
														var DsName = filterkriterien[l].DsName;
														var Feldname = filterkriterien[l].Feldname;
														var Filterwert = filterkriterien[l].Filterwert;
														if (DsTyp === "Beziehung" && DsName === felder[ww].DsName && Feldname === felder[ww].Feldname) {
															if ((typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname] === "number" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname] === parseInt(Filterwert, 10)) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname] === "object" && JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname]).toLowerCase().indexOf(Filterwert) >= 0) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname] === "string" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname].toLowerCase().indexOf(Filterwert) >= 0)) {
																//Wenn Feldname = Beziehungspartner, durch die Partner loopen und nur hinzufügen, wer die Bedingung erfüllt
																if (Feldname === "Beziehungspartner") {
																	var bezPartner = [];
																	var beziehung = Objekt.Beziehungssammlungen[i].Beziehungen[aaa];
																	for (var m=0; m<Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname].length; m++) {
																		if (JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname][m]).toLowerCase().indexOf(Filterwert) >= 0) {
																			bezPartner.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname][m]);
																		}
																	}
																	beziehung.Beziehungspartner = bezPartner;
																	exportObjekt.Beziehungssammlungen[t].Beziehungen.push(beziehung);
																} else {
																	exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																}
															}
														}
													}
												} else {
													//kein Filter auf Feldern - Beziehung hinzufügen
													//aber sicherstellen, dass sie nicht schon drin ist
													if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[aaa], exportObjekt.Beziehungssammlungen[t].Beziehungen)) {
														exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
													}
												}
											}
										}
										if (!dsExistiertSchon) {
											Beziehungssammlung = {};
											Beziehungssammlung.Name = felder[ww].DsName;
											Beziehungssammlung.Beziehungen = [];
											if (filterkriterien && filterkriterien.length > 0) {
												//durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
												for (var ll=0; ll<filterkriterien.length; ll++) {
													Feldname2 = filterkriterien[ll].Feldname;
													Filterwert2 = filterkriterien[ll].Filterwert;
													if (filterkriterien[ll].DsTyp === "Beziehung" && filterkriterien[ll].DsName === felder[ww].DsName && Feldname2 === felder[ww].Feldname) {
														if ((typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "number" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === parseInt(Filterwert2, 10)) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "object" && JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2]).toLowerCase().indexOf(Filterwert2) >= 0) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "string" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2].toLowerCase().indexOf(Filterwert2) >= 0)) {
															//Wenn Feldname2 = Beziehungspartner, durch die Partner loopen und nur hinzufügen, wer die Bedingung erfüllt
															if (Feldname2 === "Beziehungspartner") {
																var bezPartner2 = [];
																var beziehung2 = Objekt.Beziehungssammlungen[i].Beziehungen[aaa];
																for (var mm=0; mm<Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2].length; mm++) {
																	if (JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2][mm]).toLowerCase().indexOf(Filterwert2) >= 0) {
																		bezPartner2.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2][mm]);
																	}
																}
																beziehung2.Beziehungspartner = bezPartner2;
																Beziehungssammlung.Beziehungen.push(beziehung2);
															} else {
																Beziehungssammlung.Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															}
														}
													}
												}
											} else {
												//kein Filter auf Feldern - alle hinzufügen
												if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[aaa], Beziehungssammlung.Beziehungen)) {
													Beziehungssammlung.Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
												}
											}
											exportObjekt.Beziehungssammlungen.push(Beziehungssammlung);
										}
									}
								}
							}
						}
					}
				}
				//Objekt zu Exportobjekten hinzufügen
				exportObjekte.push(exportObjekt);
			}
		}
		send(JSON.stringify(exportObjekte));
	});
}

function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
}