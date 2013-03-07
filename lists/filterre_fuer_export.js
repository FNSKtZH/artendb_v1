function(head, req) {
	// specify that we're providing a JSON response
    provides('json', function() {
		var row, Objekt;
		var exportObjekte = [];
		var filterkriterien = [];
		var objektHinzufügen;
		var zähler = 0;

		//übergebene Variabeln extrahieren
		for (i in req.query) {
			if (i === "fasseTaxonomienZusammen") {
				//true oder false wird als String übergeben > umwandeln
				fasseTaxonomienZusammen = (req.query[i] === 'true');
			}
			if (i === "filterkriterien") {
				//true oder false wird als String übergeben > umwandeln
				filterkriterien = (req.query[i] === 'true');
			}
		}

		//Array mit allen Feldnamen erstellen
		while(row = getRow()) {
			Objekt = row.doc;
			objektHinzufügen = [];
			//durch alle Eigenschaften des Objekts loopen
			for (x in Objekt) {
				//durch alle Filter loopen
				for (z in filterkriterien) {
					if (filterkriterien[z].DsName === "keine") {
						//das ist der guid
						if (Objekt._id === filterkriterien[z].Filterwert) {
							//Kriterium ist erfüllt
							objektHinzufügen.push(true);
						} else {
							//Kriterium ist nicht erfüllt
							objektHinzufügen.push(false);
						}
					}
					if (typeof Objekt[x] === "object" && typeof Objekt[x][filterkriterien[z].DsName] !== "undefined" && typeof Objekt[x][filterkriterien[z].DsName].Felder[filterkriterien[z].FeldName] !== "undefined" && typeof Objekt[x].Felder[filterkriterien[z].FeldName] !== "object") {
						//Datensammlung und Feld sind im Filter enthalten, Feldinhalt ist kein Objekt
						if (fasseTaxonomienZusammen && typeof Objekt[x].Typ === "string" && Objekt[x].Typ === "Taxonomie") {
							//Das ist eine Taxonomie und Taxonomien sollen zusammengefasst werden
							//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
							if (Objekt[x].Felder[filterkriterien[z].FeldName].toString().toLowerCase().indexOf(filterkriterien[z].Filterwert) >= 0) {
								//Kriterium ist erfüllt
								objektHinzufügen.push(true);
								//TO DO: IN OBJEKT TAXONOMIE UMBENENNEN
							} else {
								//Kriterium ist nicht erfüllt
								objektHinzufügen.push(false);
							}
						} else {
							//Das ist ein Feld einer Datensammlung oder: der Taxonomie und Taxonomien sollen nicht zusammengefasst werden
							//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
							if (Objekt[x].Felder[filterkriterien[z].FeldName].toString().toLowerCase().indexOf(filterkriterien[z].Filterwert) >= 0) {
								objektHinzufügen.push(true);
								//TO DO: IN OBJEKT FELDER ERGÄNZEN
							} else {
								//Kriterium ist nicht erfüllt
								objektHinzufügen.push(false);
							}
						}
					}
						
				}
				for (z in objektHinzufügen) {
					if (!objektHinzufügen[z]) {
						//mindestens ein Kriterium ist nicht erfüllt
						break;
					}
					//alle Kriterien sind erfüllt
					//Objekt zu Exportobjekten hinzufügen
					exportObjekte.push(Objekt);
				}
			}
		}

		send(JSON.stringify(exportObjekte));
	});
}