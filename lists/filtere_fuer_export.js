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

		//übergebene Variabeln extrahieren
		for (i in req.query) {
			if (i === "fasseTaxonomienZusammen") {
				//true oder false wird als String übergeben > umwandeln
				fasseTaxonomienZusammen = (req.query[i] === 'true');
				//send('fasseTaxonomienZusammen = ' + fasseTaxonomienZusammen + '        //////////         ');
			}
			if (i === "filterkriterien") {
				//true oder false wird als String übergeben > umwandeln
				filterkriterienObjekt = JSON.parse(req.query[i]);
				filterkriterien = filterkriterienObjekt.rows;
				//send('filterkriterien = ' + JSON.stringify(filterkriterien) + '        //////////         ');
			}
			if (i === "gewaehlte_felder") {
				//true oder false wird als String übergeben > umwandeln
				felderObjekt = JSON.parse(req.query[i]);
				felder = felderObjekt.rows;
				//send('filterkriterien = ' + JSON.stringify(filterkriterien) + '        //////////         ');
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
				objektNichtHinzufügen = true;
				//break;
			}

			//send('gruppen = ' + gruppen + '   /   ');
			//send('Objekt.Gruppe = ' + Objekt.Gruppe + '   /   ');
			//send('Objekt.Gruppe.indexOf(gruppen) = ' + Objekt.Gruppe.indexOf(gruppen) + '   /   ');
			//send('gruppen.indexOf(Objekt.Gruppe) = ' + gruppen.indexOf(Objekt.Gruppe) + '   /   ');
			
			//durch alle Eigenschaften des Objekts loopen
			objectLoop:
			for (x in Objekt) {
				//durch alle Filter loopen
				for (z in filterkriterien) {
					DsName_z = filterkriterien[z].DsName;
					Feldname_z = filterkriterien[z].Feldname;
					Filterwert_z = filterkriterien[z].Filterwert;

					//Spezialfall Filter nach ID
					if (x === "_id" && DsName_z === "keine") {
						//das ist der guid
						if (Objekt._id === Filterwert_z) {
							//Kriterium ist erfüllt
							objektHinzufügen = true;
							break;
						} else {
							//Kriterium ist nicht erfüllt > zum nächsten Objekt
							objektNichtHinzufügen = true;
							//break;
							break objectLoop;
						}
					}

					//Filter nach Datensammlungen
					if (typeof Objekt[x] === "object" && Objekt[x].Typ && Objekt[x].Felder) {
						for (m in Objekt[x].Felder) {
							if (m === Feldname_z) {
								//Für dieses Feld gibt es Kriterien
								if (DsName_z === "Taxonomie(n)" && fasseTaxonomienZusammen === true && Objekt[x].Typ === "Taxonomie") {
									//Das ist eine Taxonomie und Taxonomien sollen zusammengefasst werden
									//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
									if (Objekt[x].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
										//Kriterium ist erfüllt
										objektHinzufügen = true;
										break;
									} else {
										//Kriterium ist nicht erfüllt > zum nächsten Objekt
										objektNichtHinzufügen = true;
										//break;
										break objectLoop;
									}
								} else if (DsName_z === x && (Objekt[x].Typ === "Datensammlung" || Objekt[x].Typ === "Taxonomie")) {
									//Das ist ein Feld einer Datensammlung oder: der Taxonomie und Taxonomien sollen nicht zusammengefasst werden
									//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
									if ((Objekt[x].Felder[Feldname_z] || Objekt[x].Felder[Feldname_z] === 0) && Objekt[x].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
									//if (Objekt[x].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
										objektHinzufügen = true;
										break;
									} else {
										//Kriterium ist nicht erfüllt > zum nächsten Objekt
										objektNichtHinzufügen = true;
										//break;
										break objectLoop;
									}
								} else {
									//falls uns bei den Kriterien was durch die Latten ging
									objektNichtHinzufügen = true;
								}
							}
						}
					}
				}
			}
			//send('objektHinzufügen = ' + objektHinzufügen + '  /  ');
			//send('objektNichtHinzufügen = ' + objektNichtHinzufügen + '  /  ');
			if (objektHinzufügen == true && objektNichtHinzufügen == false) {
				//alle Kriterien sind erfüllt
				//Neues Objekt aufbauen, das nur die gewünschten Felder enthält
				//exportobjekt zurücksetzen
				exportObjekt = {};
				for (x in Objekt) {
					//durch alle Eigenschaften des Dokuments loopen
					if (typeof Objekt[x] !== "object" && x !== "_rev") {
						for (i in felder) {
							if (felder[i].DsName === "Objekt" && felder[i].Feldname === x) {
								exportObjekt[x] = Objekt[x];
								break;
							}
						}
					}
					if (Objekt[x].Typ && (Objekt[x].Typ === "Datensammlung" || Objekt[x].Typ === "Taxonomie")) {
						for (a in Objekt[x]) {
							if (a !== "Felder") {
								for (v in felder) {
									if (felder[v].DsName === x && felder[v].Feldname === a) {
										exportObjekt[x][a] = Objekt[x][a];
										break;
									}
								}
							} else if (a === "Felder") {
								for (b in Objekt[x][a]) {
									for (w in felder) {
										if (felder[w].DsName === x && felder[w].Feldname === a) {
											exportObjekt[x][a][b] = Objekt[x][a][b];
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