function(head, req) {
	// specify that we're providing a JSON response
    provides('json', function() {
		var row, Objekt;
		var rückgabeObjekt = {};
		var exportObjekte = [];
		var exportObjekt;
		var filterkriterien = [];
		var filterkriterienObjekt;
		var felder = [];
		var felderObjekt;
		var objektHinzufügen;
		var DsName_z;
		var Feldname_z;
		var Filterwert_z;
		var DsName_q;
		var Feldname_q;
		var Filterwert_q;
		var Datensammlung;
		var Beziehungssammlungen;
		var Beziehung;
		var dsExistiertSchon;
		var dsExistiert;

		//übergebene Variabeln extrahieren
		for (i in req.query) {
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

		while(row = getRow()) {
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
			for (z in filterkriterien) {
				DsTyp_z = filterkriterien[z].DsTyp;
				DsName_z = filterkriterien[z].DsName;
				Feldname_z = filterkriterien[z].Feldname;
				Filterwert_z = filterkriterien[z].Filterwert;
				if (DsName_z === "Objekt") {
					//Das ist eine simple Eigenschaft des Objekts - der view liefert hier als DsName Objekt
					if ((typeof Objekt[Feldname_z] === "number" && Objekt[Feldname_z] === parseInt(Filterwert_z)) || (Objekt[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
						objektHinzufügen = true;
					} else {
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				} else if (DsTyp_z === "Taxonomie" && fasseTaxonomienZusammen) {
					//das Feld ist aus Taxonomie und die werden zusammengefasst
					//daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
					if (Objekt.Taxonomie.Daten[Feldname_z]) {
						if ((typeof Objekt.Taxonomie.Daten[Feldname_z] === "number" && Objekt.Taxonomie.Daten[Feldname_z] === parseInt(Filterwert_z)) || (Objekt.Taxonomie.Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
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
						if ((typeof Objekt.Taxonomie.Daten[Feldname_z] === "number" && Objekt.Taxonomie.Daten[Feldname_z] === parseInt(Filterwert_z)) || (Objekt.Taxonomie.Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
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
					for (g in Objekt.Beziehungssammlungen) {
						if (Objekt.Beziehungssammlungen[g].Name === DsName_z) {
							dsExistiert = true;
							//durch Beziehungssammlungen der Beziehung loopen
							if (Objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
								for (h in Objekt.Beziehungssammlungen[g].Beziehungen) {
									//durch die Felder der Beziehung loopen
									if (Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z]) {
										//Feld kann string oder object sein. Object muss stringified werden
										if ((typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "number" && Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === parseInt(Filterwert_z)) || (typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "object" && JSON.stringify(Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z]).toLowerCase().indexOf(Filterwert_z) >= 0) || (typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "string" && Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z].toLowerCase().indexOf(Filterwert_z) >= 0)) {
											objektHinzufügen = true;
										} else {
											objektNichtHinzufügen = true;
											break loop_filterkriterien;
										}
									}
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
					for (h in Objekt.Datensammlungen) {
						if (Objekt.Datensammlungen[h].Name === DsName_z) {
							dsExistiert = true;
							if (Objekt.Datensammlungen[h].Name === DsName_z && typeof Objekt.Datensammlungen[h].Daten !== "undefined" && typeof Objekt.Datensammlungen[h].Daten[Feldname_z] !== "undefined") {
								if (typeof Objekt.Datensammlungen[h].Daten[Feldname_z] === "number" && Objekt.Datensammlungen[h].Daten[Feldname_z] === parseInt(Filterwert_z)) {
									objektHinzufügen = true;
								} else if (Objekt.Datensammlungen[h].Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
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
				for (e in Objekt) {
					//durch alle Eigenschaften des Dokuments loopen
					if (typeof Objekt[e] !== "object" && e !== "_rev") {
						for (i in felder) {
							if (felder[i].DsName === "Objekt" && felder[i].Feldname === e) {
								exportObjekt[e] = Objekt[e];
							}
						}
					}
				}
				if (Objekt.Taxonomie && Objekt.Taxonomie.Daten) {
					for (a in Objekt.Taxonomie.Daten) {
						for (w in felder) {
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
					for (i in Objekt.Datensammlungen) {
						if (Objekt.Datensammlungen[i].Daten) {
							for (a in Objekt.Datensammlungen[i].Daten) {
								for (w in felder) {
									if (felder[w].DsTyp === "Datensammlung" && felder[w].DsName === Objekt.Datensammlungen[i].Name) {
										if (felder[w].Feldname === a) {
											if (typeof exportObjekt.Datensammlungen === "undefined") {
												Datensammlung = {};
												Datensammlung.Name = felder[w].DsName;
												Datensammlung.Daten = {};
												Datensammlung.Daten[a] = Objekt.Datensammlungen[i].Daten[a];
												exportObjekt.Datensammlungen = [];
												exportObjekt.Datensammlungen.push(Datensammlung);
											} else {
												dsExistiertSchon = false;
												//durch alle Datensammlungen loopen und die richtige suchen
												for (b in exportObjekt.Datensammlungen) {
													if (exportObjekt.Datensammlungen[b].Name = felder[w].DsName) {
														dsExistiertSchon = true;
														if (typeof exportObjekt.Datensammlungen[b] === "undefined") {
															exportObjekt.Datensammlungen[b].Daten = {};
														}
														exportObjekt.Datensammlungen[b].Daten[a] = Objekt.Datensammlungen[i].Daten[a];
													}
												}
												if (!dsExistiertSchon) {
													Datensammlung = {};
													Datensammlung.Daten = {};
													Datensammlung.Daten[a] = Objekt.Datensammlungen[i].Daten[a];
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
					for (i in Objekt.Beziehungssammlungen) {
						//wir loopen jetzt durch die Felder der Beziehung
						for (w in felder) {
							if (felder[w].DsTyp === "Beziehung" && felder[w].DsName === Objekt.Beziehungssammlungen[i].Name) {
								for (a in Objekt.Beziehungssammlungen[i].Beziehungen) {
									for (b in Objekt.Beziehungssammlungen[i].Beziehungen[a]) {
										if (felder[w].Feldname === b) {
											if (typeof exportObjekt.Beziehungssammlungen === "undefined") {
												exportObjekt.Beziehungssammlungen = [];
											}
											dsExistiertSchon = false;
											//durch alle Beziehungssammlungen loopen und die richtige suchen
											for (t in exportObjekt.Beziehungssammlungen) {
												if (exportObjekt.Beziehungssammlungen[t].Name === felder[w].DsName) {
													dsExistiertSchon = true;
													if (typeof exportObjekt.Beziehungssammlungen[t].Beziehungen === "undefined") {
														exportObjekt.Beziehungssammlungen[t].Beziehungen = [];
													}
													//Beziehung = {};
													//Beziehung[b] = Objekt.Beziehungssammlungen[i].Beziehungen[a][b];
													//exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Beziehung);
													if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[a], exportObjekt.Beziehungssammlungen[t].Beziehungen)) {
														//irgendwie enthilten alle Beziehungs-Arrays die Beziehungen doppelt, daher nur hinzufügen, wenn nicht enthalten
														exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[a]);
													}
												}
											}
											if (!dsExistiertSchon) {
												Beziehungssammlungen = {};
												Beziehungssammlungen.Name = felder[w].DsName;
												Beziehungssammlungen.Beziehungen = [];
												//Beziehung = {};
												//Beziehung[b] = Objekt.Beziehungssammlungen[i].Beziehungen[a][b];
												//Beziehungssammlungen.Beziehungen.push(Beziehung);
												Beziehungssammlungen.Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[a]);
												//exportObjekt.Beziehungssammlungen = [];
												exportObjekt.Beziehungssammlungen.push(Beziehungssammlungen);
											}
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