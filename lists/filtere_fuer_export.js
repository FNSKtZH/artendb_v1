function(head, req) {
	// specify that we're providing a JSON response
    provides('json', function() {
		var row, Objekt;
		var rückgabeObjekt = {};
		var exportObjekte = [];
		var filterkriterien = [];
		var filterkriterienObjekt;
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
				filterkriterien = filterkriterienObjekt.kriterien;
				//send('filterkriterien = ' + JSON.stringify(filterkriterien) + '        //////////         ');
			}
		}

		//Array mit allen Feldnamen erstellen
		while(row = getRow()) {
			Objekt = row.doc;
			objektHinzufügen = false;
			//durch alle Eigenschaften des Objekts loopen
			objectLoop:
			for (x in Objekt) {
				//durch alle Filter loopen
				for (z in filterkriterien) {
					DsName_z = filterkriterien[z].DsName;
					Feldname_z = filterkriterien[z].Feldname;
					Filterwert_z = filterkriterien[z].Filterwert;
					//send('DsName_z = ' + DsName_z + ' / ');
					//send('Feldname_z = ' + Feldname_z + ' / ');
					//send('Filterwert_z = ' + Filterwert_z + ' / ');
					//Spezialfall Filter nach ID
					if (x === "_id" && DsName_z === "keine") {
						//send('aha, guid ist Kriterium');
						//das ist der guid
						if (Objekt._id === Filterwert_z) {
							//Kriterium ist erfüllt
							//send('Kriterium erfüllt: guid');
							objektHinzufügen = true;
						} else {
							//Kriterium ist nicht erfüllt > zum nächsten Objekt
							break objectLoop;
						}
					}
					//Filter nach Datensammlungen
					//send('typeof Objekt[' + x + '] = ' + typeof Objekt[x] + ' / ');
					if (typeof Objekt[x] === "object" && x === DsName_z) {
						//send('typeof Objekt[' + x + '][' + DsName_z + '] = ' + typeof Objekt[x] + ' / ');
						if (typeof Objekt[x].Felder[Feldname_z] !== "undefined") {
							//send('Objekt[' + x + '].Felder[' + Feldname_z + '] = ' + Objekt[x].Felder[Feldname_z] + ' / ');
							//Datensammlung und Feld sind im Filter enthalten, Feldinhalt ist kein Objekt
							if (fasseTaxonomienZusammen === true && Objekt[x].Typ && Objekt[x].Typ === "Taxonomie") {
								//Das ist eine Taxonomie und Taxonomien sollen zusammengefasst werden
								//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
								if (Objekt[x].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
									//Kriterium ist erfüllt
									//send('Krterium erfüllt: Taxonomie wird zusammengefasst');
									objektHinzufügen = true;
									//TO DO: IN OBJEKT TAXONOMIE UMBENENNEN
								} else {
									//Kriterium ist nicht erfüllt > zum nächsten Objekt
									break objectLoop;
								}
							} else {
								//Das ist ein Feld einer Datensammlung oder: der Taxonomie und Taxonomien sollen nicht zusammengefasst werden
								//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
								if (Objekt[x].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
									//send('Kriterium erfüllt: Taxonomie/Datensammlung');
									objektHinzufügen = true;
								} else {
									//Kriterium ist nicht erfüllt > zum nächsten Objekt
									break objectLoop;
								}
							}
						}
					}
						
				}
				if (objektHinzufügen) {
					//send('objektHinzufügen = ' + objektHinzufügen + '        //////////         ');
					//alle Kriterien sind erfüllt
					//Objekt zu Exportobjekten hinzufügen
					exportObjekte.push(Objekt);
				}
			}
		}
		rückgabeObjekt.Objekte = exportObjekte;
		send(JSON.stringify(rückgabeObjekt));
	});
}