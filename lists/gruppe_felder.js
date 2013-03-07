function(head, req) {
	// specify that we're providing a JSON response
    provides('json', function() {
		var row, Objekt;
		var datensammlungen_namen = [];
		var datensammlungen = [];
		var taxonomien_namen = [];
		var taxonomien = [];
		var fasseTaxonomienZusammen = false;
		var gruppen = [];
		var returnObject = {};
		var zähler = 0;

		//übergebene Variabeln extrahieren
		for (i in req.query) {
			if (i === "fasseTaxonomienZusammen") {
				//true oder false wird als String übergeben > umwandeln
				fasseTaxonomienZusammen = (req.query[i] === 'true');
			}
			if (i === "gruppen") {
				gruppen = req.query[i].split(",");
			}
		}

		//Array mit allen Feldnamen erstellen
		while(row = getRow()) {
			Objekt = row.doc;
			if (Objekt.Gruppe.indexOf(gruppen) >= 0) {
				//Das ist eine gewünschte Gruppe
				zähler += 1;
				//durch alle Eigenschaften des Objekts loopen
				for (x in Objekt) {
					if (Objekt[x].Typ && Objekt[x].Typ === "Datensammlung") {
						if (datensammlungen_namen.indexOf(x) === -1) {
							datensammlungen_namen.push(x);
							//Namen der Datensammlung im Objekt ergänzen
							Objekt[x].Name = x;
							datensammlungen.push(Objekt[x]);
						} else if (Objekt[x].Felder) {
							//kontrollieren, ob alle Felder schon enthalten sind
							//fehlende ergänzen
							for (z in Objekt[x].Felder) {
								if (!datensammlungen[datensammlungen_namen.indexOf(x)].Felder[z]) {
									datensammlungen[datensammlungen_namen.indexOf(x)].Felder[z] = Objekt[x].Felder[z];
								}
							}
						}
					} else if (Objekt[x].Typ && Objekt[x].Typ === "Taxonomie") {
						if (!fasseTaxonomienZusammen) {
							if (taxonomien_namen.indexOf(x) === -1) {
								taxonomien_namen.push(x);
								//Namen der Taxonomie im Objekt ergänzen
								Objekt[x].Name = x;
								taxonomien.push(Objekt[x]);
							} else if (Objekt[x].Felder) {
								//kontrollieren, ob alle Felder schon enthalten sind
								//fehlende ergänzen
								for (z in Objekt[x].Felder) {
									if (!taxonomien[taxonomien_namen.indexOf(x)].Felder[z]) {
										taxonomien[taxonomien_namen.indexOf(x)].Felder[z] = Objekt[x].Felder[z];
									}
								}
							}
						} else {
							//Nur eine Taxonomie darstellen und auch so nennen, aber alle Felder anzeigen
							if (taxonomien_namen.indexOf("Taxonomie(n)") === -1) {
								taxonomien_namen.push("Taxonomie(n)");
								//Namen der Taxonomie im Objekt ergänzen
								Objekt[x].Name = "Taxonomie(n)";
								taxonomien.push(Objekt[x]);
							} else if (Objekt[x].Felder) {
								//kontrollieren, ob alle Felder schon enthalten sind
								//fehlende ergänzen
								for (z in Objekt[x].Felder) {
									if (!taxonomien[0].Felder[z]) {
										taxonomien[0].Felder[z] = Objekt[x].Felder[z];
									}
								}
							}
						}
					}
				}
			}
		}
		returnObject.Datensammlungen = datensammlungen;
		returnObject.Taxonomien = taxonomien;
		returnObject.AnzObjekte = zähler;
		send(JSON.stringify(returnObject));
	});
}