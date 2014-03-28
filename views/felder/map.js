function(doc) {

	var a,
		b,
		c,
		x,
		y,
		z;

	if (doc.Gruppe && doc.Typ && doc.Typ === "Objekt") {

		if (doc.Taxonomie && doc.Taxonomie.Daten) {
			for (a in doc.Taxonomie.Daten) {
				emit ([doc.Gruppe, "Taxonomie", doc.Taxonomie.Name, a, typeof doc.Taxonomie.Daten[a]], doc._id);
			}
		}

		if (doc.Datensammlungen) {
			for (b in doc.Datensammlungen) {
				if (doc.Datensammlungen[b].Daten) {
					for (c in doc.Datensammlungen[b].Daten) {
						emit ([doc.Gruppe, "Datensammlung", doc.Datensammlungen[b].Name, c, typeof doc.Datensammlungen[b].Daten[c]], doc._id);
					}
				}
			}
		}
		
		if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
			for (x=0; x<doc.Beziehungssammlungen.length; x++) {
				if (doc.Beziehungssammlungen[x].Beziehungen && doc.Beziehungssammlungen[x].Beziehungen.length > 0) {
					for (y=0; y<doc.Beziehungssammlungen[x].Beziehungen.length; y++) {
						for (z in doc.Beziehungssammlungen[x].Beziehungen[y]) {
							// irgendwie liefert dieser Loop auch Zahlen, die aussehen als wären sie die keys eines Arrays. Ausschliessen
							if (isNaN(parseInt(z))) {
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