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
										//send('objekt hinzufügen = true  /  ');
										objektHinzufügen = true;
										break;
									} else {
										//Kriterium ist nicht erfüllt > zum nächsten Objekt
										send('objekt nicht hinzufügen = true  /  ');
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
			send('objektHinzufügen = ' + objektHinzufügen + '  /  ');
			send('objektNichtHinzufügen = ' + objektNichtHinzufügen + '  /  ');
			if (objektHinzufügen && objektNichtHinzufügen === false) {
				send('Felder hinzufügen  /  ');
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
					//if (typeof Objekt[e].Typ !== "undefined" && (Objekt[e].Typ === "Datensammlung" || Objekt[e].Typ === "Taxonomie")) {
					if (Objekt[e].Typ && (Objekt[e].Typ === "Datensammlung" || Objekt[e].Typ === "Taxonomie")) {
						for (a in Objekt[e]) {
							if (a !== "Felder") {
								//das sind die Felder, die die Datensammlung beschreiben
								//im Normalfall können die gar nicht gewählt werden
								for (v in felder) {
									if (Objekt[e][a] != "Taxonomie" && Objekt[e][a] != "Datensammlung" && a != "Typ" && felder[v].DsName !== "Objekt") {
										if (felder[v].DsName == e && felder[v].Feldname == a) {
											exportObjekt[e][a] = Objekt[e][a];
											break;
										}
									}
								}
							} else if (a === "Felder") {
								//send('Feld  /  ');
								//das sind die Eigenschaften der Datensammlung
								for (b in Objekt[e][a]) {
									//send('Objekt['+e+']['+a+']['+b+'] = ' + Objekt[e][a][b] + '  /  ');
									for (w in felder) {
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
						}
					}
				}
				//Objekt zu Exportobjekten hinzufügen
				exportObjekte.push(exportObjekt);
			} else {
				send('objekt NICHT hinzufügen  /  ');
			}
		}
		send(JSON.stringify(exportObjekte));
	});
}