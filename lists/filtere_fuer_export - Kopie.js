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

		while(row = getRow()) {
			Objekt = row.doc;
			objektHinzufügen = false;
			//durch alle Filter loopen
			for (z in filterkriterien) {
				DsName_z = filterkriterien[z].DsName;
				Feldname_z = filterkriterien[z].Feldname;
				Filterwert_z = filterkriterien[z].Filterwert;
				//Spezialfall Filter nach ID
				if (DsName_z === "keine") {
					//das ist der guid
					if (Objekt._id === Filterwert_z) {
						//Kriterium ist erfüllt
						objektHinzufügen = true;
					} else {
						//Kriterium ist nicht erfüllt > zum nächsten Objekt
						break;
					}
				}
				//Filter nach Datensammlungen
				if (typeof Objekt[DsName_z] !== "undefined" && typeof Objekt[DsName_z] === "object") {
					if (typeof Objekt[DsName_z].Felder[Feldname_z] !== "undefined") {
						//Datensammlung und Feld sind im Filter enthalten, Feldinhalt ist kein Objekt
						if (fasseTaxonomienZusammen === true && Objekt[DsName_z].Typ && Objekt[DsName_z].Typ === "Taxonomie") {
							//Das ist eine Taxonomie und Taxonomien sollen zusammengefasst werden
							//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
							if (Objekt[DsName_z].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
								//Kriterium ist erfüllt
								objektHinzufügen = true;
								//TO DO: IN OBJEKT TAXONOMIE UMBENENNEN?
							} else {
								//Kriterium ist nicht erfüllt > zum nächsten Objekt
								break;
							}
						} else {
							//Das ist ein Feld einer Datensammlung oder: der Taxonomie und Taxonomien sollen nicht zusammengefasst werden
							//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
							if (Objekt[DsName_z].Felder[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
								//send('Kriterium erfüllt: Taxonomie/Datensammlung');
								objektHinzufügen = true;
							} else {
								//Kriterium ist nicht erfüllt > zum nächsten Objekt
								break;
							}
						}
					}
				}
					
			}
			if (objektHinzufügen) {
				//alle Kriterien sind erfüllt
				//Objekt zu Exportobjekten hinzufügen
				exportObjekte.push(Objekt);
			}
		}
		send(JSON.stringify(exportObjekte));
	});
}