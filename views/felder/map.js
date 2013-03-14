function(doc) {
	if (doc.Gruppe && doc.Typ && doc.Typ === "Objekt") {
		if (doc.Taxonomie && doc.Taxonomie.Felder) {
			for (x in doc.Taxonomie.Felder) {
				emit ([doc.Gruppe, "Taxonomie", doc.Taxonomie.Name, x, typeof doc.Taxonomie.Felder[x]], doc._id);
			}
		}
		if (doc.Datensammlungen) {
			for (x in doc.Datensammlungen) {
				if (doc.Datensammlungen[x].Felder) {
					for (y in doc.Datensammlungen[x].Felder) {
						emit ([doc.Gruppe, "Datensammlung", doc.Datensammlungen[x].Name, y, typeof doc.Datensammlungen[x].Felder[y]], doc._id);
					}
				}
			}
		}
		if (doc.Beziehungen) {
			for (x in doc.Beziehungen) {
				if (doc.Beziehungen[x].Beziehungen) {
					for (y in doc.Beziehungen[x].Beziehungen) {
						for (z in doc.Beziehungen[x].Beziehungen[y]) {
							//jetzt loopen wir durch die Felder der Beziehung
							emit ([doc.Gruppe, "Beziehung", doc.Beziehungen[x].Name, z, typeof doc.Beziehungen[x].Beziehungen[y][z]], doc._id);
						}
					}
				}
			}
		}
	}
}