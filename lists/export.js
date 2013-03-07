function(head, req) {
	// specify that we're providing a JSON response
    provides('json', function() {
		var row, Objekt;
		var exportObjekte = [];
		var zähler = 0;

		//übergebene Variabeln extrahieren
		for (i in req.query) {
			if (i !== "include_docs") {
				//das ist ein übergebenes Kriterium
				send(JSON.stringify(req.query[i]));
				filterObjekt = ;
			}
		}

		//Array mit allen Feldnamen erstellen
		while(row = getRow()) {
			Objekt = row.doc;
			//durch alle Eigenschaften des Objekts loopen
			for (x in Objekt) {
				//durch alle Filter loopen
				for (z in filterObjekt) {
					if (filterObjekt[z].DsName === "keine") {
						//das ist der guid
						if (Objekt._id === Filterwert) {
							//Objekt hinzufügen
							exportObjekte.push(Objekt);
						}
					} else if (window.fasseTaxonomienZusammen) {
						//ist die Taxonomie der lr
						//Achtung: DsName ist unbekannt, daher muss duch Eigenschaften des Typs Taxonomie geloopt werden
						//es muss im Index von oben nach unten gezählt werden, weil splice zu einer Reindexierung führt 
						var i = window.exportieren_objekte.length;
						var entfernen;
						while (i--) {
							if (typeof window.exportieren_objekte[i] !== "object") {
								//entfernen, ist kein Objekt
								window.exportieren_objekte.splice(i, 1);
							} else {
								entfernen = true;
								for (x in window.exportieren_objekte[i]) {
									if (typeof window.exportieren_objekte[i][x] === "object" && typeof window.exportieren_objekte[i][x].Typ === "string" && window.exportieren_objekte[i][x].Typ === "Taxonomie" && typeof window.exportieren_objekte[i][x].Felder[FeldName] !== "undefined" && typeof window.exportieren_objekte[i][x].Felder[FeldName] !== "object") {
										//Achtung: Feldwert in einen String verwandeln - Nummern können nicht mit indexOf untersucht werden
										if (window.exportieren_objekte[i][x].Felder[FeldName].toString().toLowerCase().indexOf(Filterwert) >= 0) {
											//Objekt belassen
											entfernen = false;
										}	
									}
								}
								if (entfernen) {
									window.exportieren_objekte.splice(i, 1);
								}
							}
						}
					} else {
						//ein Feld der Taxonomie oder einer Datensammlung wurde gewählt
						//es muss im Index von oben nach unten gezählt werden, weil splice zu einer Reindexierung führt 
						var i = window.exportieren_objekte.length;
						while (i--) {
							if (typeof window.exportieren_objekte[i] !== "object" || typeof window.exportieren_objekte[i][DsName] === "undefined" || typeof window.exportieren_objekte[i][DsName].Felder[FeldName] === "undefined" || window.exportieren_objekte[i][DsName].Felder[FeldName].toString().toLowerCase().indexOf(Filterwert) === -1) {
								//Objekt entfernen
								window.exportieren_objekte.splice(i, 1);
							}
						}
					}
				}
			}
		}

		send(JSON.stringify(returnObject));
	});
}