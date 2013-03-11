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

		//übergebene Variabeln extrahieren
		for (i in req.query) {
			if (i === "fasseTaxonomienZusammen") {
				//true oder false wird als String übergeben > umwandeln
				fasseTaxonomienZusammen = (req.query[i] === 'true');
				//send('fasseTaxonomienZusammen = ' + fasseTaxonomienZusammen + '        //////////         ');
			}
			if (i === "filter") {
				//true oder false wird als String übergeben > umwandeln
				filterkriterienObjekt = JSON.parse(req.query[i]);
				filterkriterien = filterkriterienObjekt.rows;
				//send('filterkriterien = ' + JSON.stringify(filterkriterien) + '        //////////         ');
			}
			if (i === "felder") {
				//true oder false wird als String übergeben > umwandeln
				felderObjekt = JSON.parse(req.query[i]);
				felder = felderObjekt.rows;
				//send('felder = ' + JSON.stringify(felder) + '        //////////         ');
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
			//if (Objekt.Gruppe.indexOf(gruppen) >= 0) {
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
					//daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wirde "Taxonomie(n)"
					for (i in Objekt) {
						if (Objekt[i].Typ && Objekt[i].Typ === "Taxonomie") {
							if (Objekt[i].Felder[Feldname_z]) {
								//Taxonomie heisst i
								if ((typeof Objekt[i].Felder[Feldname_z] === "number" && Objekt[i].Felder[Feldname_z].indexOf(Filterwert_z) >= 0) || (Objekt[i].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
									objektHinzufügen = true;
								} else {
									objektNichtHinzufügen = true;
								}
							} else {
								objektNichtHinzufügen = true;
							}
							break;
						}
					}
				} else if (DsTyp_z === "Beziehung" && Objekt[DsName_z] && Objekt[DsName_z].Beziehungen) {
					//das sind Beziehungen
					//durch alle Beziehungen loopen und suchen, ob Filter trifft
					for (g in Objekt[DsName_z].Beziehungen) {
						//Feld kann string oder object sein. Object muss stringified werden
						if (Objekt[DsName_z].Beziehungen[g][Feldname_z] && ((typeof Objekt[DsName_z].Beziehungen[g][Feldname_z] === "number" && Objekt[DsName_z].Beziehungen[g][Feldname_z].indexOf(Filterwert_z) >= 0) || (JSON.stringify(Objekt[DsName_z].Beziehungen[g][Feldname_z]).toLowerCase().indexOf(Filterwert_z) >= 0))) {
							objektHinzufügen = true;
							//break;
						} else {
							objektNichtHinzufügen = true;
						}
					}
				} else {
					//das ist ein Feld aus Taxonomie oder Datensammlung
					if (Objekt[DsName_z] && Objekt[DsName_z].Felder && Objekt[DsName_z].Felder[Feldname_z] && ((typeof Objekt[DsName_z].Felder[Feldname_z] === "number" && Objekt[DsName_z].Felder[Feldname_z].indexOf(Filterwert_z) >= 0) || (Objekt[DsName_z].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0))) {
						objektHinzufügen = true;
					} else {
						objektNichtHinzufügen = true;
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
					if (Objekt[e].Typ && (Objekt[e].Typ === "Datensammlung" || Objekt[e].Typ === "Taxonomie" || Objekt[e].Typ === "Beziehung")) {
						for (a in Objekt[e]) {
							if (a !== "Felder" && a !== "Beziehungen") {
								//das sind die Felder, die die Datensammlung/Taxonomie beschreiben
								//im Normalfall können die gar nicht gewählt werden
								/*for (v in felder) {
									if (Objekt[e][a] != "Taxonomie" && Objekt[e][a] != "Datensammlung" && a != "Typ" && felder[v].DsName !== "Objekt") {
										if (felder[v].DsName == e && felder[v].Feldname == a) {
											exportObjekt[e][a] = Objekt[e][a];
											break;
										}
									}
								}*/
							} else if (a === "Felder") {
								//das sind die Eigenschaften der Datensammlung/Taxonomie
								for (b in Objekt[e][a]) {
									for (w in felder) {
										if (fasseTaxonomienZusammen && felder[w].DsTyp === "Taxonomie") {
											//Das ist ein Feld der Taxonomie und die wird zusammengefasst
											//hier ist felder[w].DsName "Taxonomie(n)", also ungleich e
											if (felder[w].Feldname === b) {
												if (typeof exportObjekt[e] === "undefined") {
													exportObjekt[e] = {};
												}
												if (typeof exportObjekt[e][a] === "undefined") {
													exportObjekt[e][a] = {};
												}
												exportObjekt[e][a][b] = Objekt[e][a][b];
												//Typ der Datensammlung muss immer mit
												exportObjekt[e].Typ = Objekt[e].Typ;
												break;
											}
										} else {
											if (felder[w].DsName === e && felder[w].Feldname === b) {
												if (typeof exportObjekt[e] === "undefined") {
													exportObjekt[e] = {};
												}
												if (typeof exportObjekt[e][a] === "undefined") {
													exportObjekt[e][a] = {};
												}
												exportObjekt[e][a][b] = Objekt[e][a][b];
												//Typ der Datensammlung muss immer mit
												exportObjekt[e].Typ = Objekt[e].Typ;
												break;
											}
										}
									}
								}
							} else if (a === "Beziehungen") {
								//das sind die Eigenschaften einer Beziehung
								for (b in Objekt[e][a]) {
									//wir loopen durch b=Beziehungen
									objektHinzufügen = false;
									objektNichtHinzufügen = false;
									for (c in Objekt[e][a][b]) {
										//jetzt loopen wir durch c= Felder einer Beziehung
										for (w in felder) {
											if (felder[w].DsName === e && felder[w].Feldname === c) {
												//jetzt alle Beziehungen ergänzen, welche die Kriterien erfüllen
												for (q in filterkriterien) {
													//durch Filterkriterien loopen
													DsTyp_q = filterkriterien[q].DsTyp;
													DsName_q = filterkriterien[q].DsName;
													Feldname_q = filterkriterien[q].Feldname;
													Filterwert_q = filterkriterien[q].Filterwert;
													if (DsTyp_q === "Beziehung") {
														if ((typeof Objekt[e][a][b][c] === "number" && JSON.stringify(Objekt[e][a][b][c]).indexOf(Filterwert_q) >= 0) || (JSON.stringify(Objekt[e][a][b][c]).toLowerCase().indexOf(Filterwert_q) >= 0) || (Objekt[e][a][b][c].toString().toLowerCase().indexOf(Filterwert_q) >= 0)) {
															if (typeof exportObjekt[e] === "undefined") {
																//Datensammlung gründen
																exportObjekt[e] = {};
																exportObjekt[e].Typ = "Beziehung";
															}
															if (typeof exportObjekt[e][a] === "undefined") {
																//Feld Beziehungen gründen
																exportObjekt[e][a] = [];
															}
															objektHinzufügen = true;
															if (containsObject(Objekt[e][a][b], exportObjekt[e][a])) {
																//Objekt schon enthalten, nicht machen
															} else {
																exportObjekt[e][a].push(Objekt[e][a][b]);
															}
														} else {
															objektNichtHinzufügen = true;
														}
													}
												}
											}
										}
									}
									if (objektHinzufügen && !objektNichtHinzufügen) {
										exportObjekt[e][a].push(Objekt[e][a][b]);
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