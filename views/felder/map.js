function(doc) {
	if (doc.Gruppe && doc.Typ && doc.Typ === "Objekt") {
		if (doc.Taxonomie && doc.Taxonomie.Daten) {
			for (x in doc.Taxonomie.Daten) {
				emit ([doc.Gruppe, "Taxonomie", doc.Taxonomie.Name, x, typeof doc.Taxonomie.Daten[x]], doc._id);
			}
		}
		if (doc.Datensammlungen) {
			for (x in doc.Datensammlungen) {
				if (doc.Datensammlungen[x].Daten) {
					for (y in doc.Datensammlungen[x].Daten) {
						emit ([doc.Gruppe, "Datensammlung", doc.Datensammlungen[x].Name, y, typeof doc.Datensammlungen[x].Daten[y]], doc._id);
					}
				}
			}
		}
		if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
			for (x=0; x<doc.Beziehungssammlungen.length; x++) {
				if (doc.Beziehungssammlungen[x].Beziehungen && doc.Beziehungssammlungen[x].Beziehungen.length > 0) {
					for (y=0; y<doc.Beziehungssammlungen[x].Beziehungen.length; y++) {
						for (z in doc.Beziehungssammlungen[x].Beziehungen[y]) {
							if (isNaN(parseInt(z))) {
								// irgendwie liefert dieser Loop auch Zahlen, die aussehen als wären sie die keys eines Arrays. Ausschliessen
								// jetzt loopen wir durch die Daten der Beziehung
								emit ([doc.Gruppe, "Beziehung", doc.Beziehungssammlungen[x].Name, z, typeof doc.Beziehungssammlungen[x].Beziehungen[y][z]], doc._id);
							}
						}
					}
				}
			}
		}
	}
}