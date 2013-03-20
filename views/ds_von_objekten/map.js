function(doc) {
	var Datensammlung;
	if (doc.Datensammlungen) {
		for (i in doc.Datensammlungen) {
			Datensammlung = {};
			for (x in doc.Datensammlungen[i]) {
				if (x !== "Daten" && x !== "Typ") {
					Datensammlung[x] = doc.Datensammlungen[i][x];
				}
			}
			emit ([doc.Datensammlungen[i].Name, Datensammlung], 1);
		}
	}
}