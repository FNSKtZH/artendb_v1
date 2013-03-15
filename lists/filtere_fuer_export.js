function(head, req) {
	// specify that we're providing a JSON response
    provides('json', function() {
		var row, Objekt;
		var rückgabeObjekt = {};
		var exportObjekte = [];
		var exportObjekt = {};
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
		var dsExistiertSchon;

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
			
			//Filter nach Gruppen
			if (gruppen && gruppen.indexOf(Objekt.Gruppe) >= 0) {
				//Kriterium ist erfüllt
				objektHinzufügen = true;
			} else {
				//Kriterium ist nicht erfüllt > zum nächsten Objekt
				continue;
			}
			
			for (z in filterkriterien) {
				DsTyp_z = filterkriterien[z].DsTyp;
				DsName_z = filterkriterien[z].DsName;
				Feldname_z = filterkriterien[z].Feldname;
				Filterwert_z = filterkriterien[z].Filterwert;
				if (DsName_z === "Objekt") {
					//Das ist eine simple Eigenschaft des Objekts
					if ((typeof Objekt[Feldname_z] === "number" && Objekt[Feldname_z].indexOf(Filterwert_z) >= 0) || (Objekt[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
						objektHinzufügen = true;
					} else {
						objektNichtHinzufügen = true;
					}
				} else if (DsTyp_z === "Taxonomie" && fasseTaxonomienZusammen) {
					//das Feld ist aus Taxonomie und die werden zusammengefasst
					//daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
					if (Objekt.Taxonomie.Felder[Feldname_z]) {
						if ((typeof Objekt.Taxonomie.Felder[Feldname_z] === "number" && Objekt.Taxonomie.Felder[Feldname_z].indexOf(Filterwert_z) >= 0) || (Objekt.Taxonomie.Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
							objektHinzufügen = true;
						} else {
							objektNichtHinzufügen = true;
						}
					} else {
						objektNichtHinzufügen = true;
					}
				} else if (DsTyp_z === "Taxonomie") {
					//das Feld ist aus Taxonomie und die werden nicht zusammengefasst
					if (Objekt.Taxonomie.Name === DsName_z && Objekt.Taxonomie.Felder[Feldname_z]) {
						if ((typeof Objekt.Taxonomie.Felder[Feldname_z] === "number" && Objekt.Taxonomie.Felder[Feldname_z].indexOf(Filterwert_z) >= 0) || (Objekt.Taxonomie.Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
							objektHinzufügen = true;
						} else {
							objektNichtHinzufügen = true;
						}
					} else {
						objektNichtHinzufügen = true;
					}
				} else if (DsTyp_z === "Beziehung" && Objekt.Beziehungen) {
					//durch alle Beziehungen loopen und suchen, ob Filter trifft
					for (g in Objekt.Beziehungen) {
						//Feld kann string oder object sein. Object muss stringified werden
						if (Objekt.Beziehungen[g].Name === DsName_z && Objekt.Beziehungen[g][Feldname_z] && ((typeof Objekt.Beziehungen[g][Feldname_z] === "number" && Objekt.Beziehungen[g][Feldname_z].indexOf(Filterwert_z) >= 0) || (JSON.stringify(Objekt.Beziehungen[g][Feldname_z]).toLowerCase().indexOf(Filterwert_z) >= 0))) {
							objektHinzufügen = true;
						} else {
							objektNichtHinzufügen = true;
						}
					}
				} else if (DsTyp_z === "Datensammlung" && Objekt.Datensammlungen) {
					//das ist ein Feld aus einer Datensammlung
					for (h in Objekt.Datensammlungen) {
						if (Objekt.Datensammlungen[h].Name === DsName_z && typeof Objekt.Datensammlungen[h].Felder !== "undefined" && typeof Objekt.Datensammlungen[h].Felder[Feldname_z] !== "undefined") {
							if (typeof Objekt.Datensammlungen[h].Felder[Feldname_z] === "number" && Objekt.Datensammlungen[h].Felder[Feldname_z].indexOf(Filterwert_z) >= 0) {
								objektHinzufügen = true;
							} else if (Objekt.Datensammlungen[h].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
								objektHinzufügen = true;
							} else {
								objektNichtHinzufügen = true;
							}
						} else {
							objektNichtHinzufügen = true;
						}
					}
				}
			}
			if (objektHinzufügen && objektNichtHinzufügen === false) {
				//alle Kriterien sind erfüllt
				//Neues Objekt aufbauen, das nur die gewünschten Felder enthält
				//exportobjekt zurücksetzen
				exportObjekt = {};
				for (e in Objekt) {
					//durch alle Eigenschaften des Dokuments loopen
					if (typeof Objekt[e] !== "object" && e !== "_rev") {
						for (i in felder) {
							if (felder[i].DsName === "Objekt" && felder[i].Feldname === e) {
								exportObjekt[e] = Objekt[e];
								break;
							}
						}
					}
				}
				if (Objekt.Taxonomie && Objekt.Taxonomie.Felder) {
					for (a in Objekt.Taxonomie.Felder) {
						for (w in felder) {
							if (felder[w].DsTyp === "Taxonomie" && (fasseTaxonomienZusammen || felder[w].DsName === Objekt.Taxonomie.Name)) {
								if (felder[w].Feldname === b) {
									if (typeof exportObjekt.Taxonomie === "undefined") {
										exportObjekt.Taxonomie = {};
									}
									if (typeof exportObjekt.Taxonomie.Felder === "undefined") {
										exportObjekt.Taxonomie.Felder = {};
									}
									exportObjekt.Taxonomie.Felder[a] = Objekt.Taxonomie.Felder[a];
									break;
								}
							}
						}
					}
				}
				if (Objekt.Datensammlungen) {
					for (i in Objekt.Datensammlungen) {
						if (Objekt.Datensammlungen[i].Felder) {
							for (a in Objekt.Datensammlungen[i].Felder) {
								for (w in felder) {
									if (felder[w].DsTyp === "Datensammlung" && felder[w].DsName === Objekt.Datensammlungen[i].Name) {
										if (felder[w].Feldname === a) {
											if (typeof exportObjekt.Datensammlungen === "undefined") {
												Datensammlung = {};
												Datensammlung.Felder = {};
												Datensammlung.Felder[a] = Objekt.Datensammlungen[i].Felder[a];
												exportObjekt.Datensammlungen = [];
												exportObjekt.Datensammlungen.push(Datensammlung);
											} else {
												dsExistiertSchon = false;
												//durch alle Datensammlungen loopen und die richtige suchen
												for (b in exportObjekt.Datensammlungen) {
													if (exportObjekt.Datensammlungen[b].Name = felder[w].DsName) {
														dsExistiertSchon = true;
														if (typeof exportObjekt.Datensammlungen[b] === "undefined") {
															exportObjekt.Datensammlungen[b].Felder = {};
														}
														exportObjekt.Datensammlungen[b].Felder[a] = Objekt.Datensammlungen[i].Felder[a];
													}
												}
												if (!dsExistiertSchon) {
													Datensammlung = {};
													Datensammlung.Felder = {};
													Datensammlung.Felder[a] = Objekt.Datensammlungen[i].Felder[a];
													exportObjekt.Datensammlungen = [];
													exportObjekt.Datensammlungen.push(Datensammlung);
												}

											}
											break;
										}
									}
								}
							}
						}
					}
				}
				if (Objekt.Beziehungen) {
					for (i in Objekt.Beziehungen) {
						if (Objekt.Beziehungen[i].Felder) {


							
							for (a in Objekt.Beziehungen[i].Felder) {
								for (w in felder) {
									if (felder[w].DsTyp === "Datensammlung" && felder[w].DsName === Objekt.Beziehungen[i].Name) {
										if (felder[w].Feldname === a) {
											if (typeof exportObjekt.Beziehungen === "undefined") {
												Datensammlung = {};
												Datensammlung.Felder = {};
												Datensammlung.Felder[a] = Objekt.Beziehungen[i].Felder[a];
												exportObjekt.Beziehungen = [];
												exportObjekt.Beziehungen.push(Datensammlung);
											} else {
												dsExistiertSchon = false;
												//durch alle Datensammlungen loopen und die richtige suchen
												for (b in exportObjekt.Beziehungen) {
													if (exportObjekt.Beziehungen[b].Name = felder[w].DsName) {
														dsExistiertSchon = true;
														if (typeof exportObjekt.Beziehungen[b] === "undefined") {
															exportObjekt.Beziehungen[b].Felder = {};
														}
														exportObjekt.Beziehungen[b].Felder[a] = Objekt.Beziehungen[i].Felder[a];
													}
												}
												if (!dsExistiertSchon) {
													Datensammlung = {};
													Datensammlung.Felder = {};
													Datensammlung.Felder[a] = Objekt.Beziehungen[i].Felder[a];
													exportObjekt.Beziehungen = [];
													exportObjekt.Beziehungen.push(Datensammlung);
												}

											}
											break;
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