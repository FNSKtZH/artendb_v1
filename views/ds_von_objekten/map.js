function(doc) {
	var Datensammlung;
	var Beziehungssammlung;
	if (doc.Datensammlungen) {
		for (var i=0; i<doc.Datensammlungen.length; i++) {
			Datensammlung = {};
			for (var x in doc.Datensammlungen[i]) {
				if (x !== "Daten" && x !== "Typ") {
					Datensammlung[x] = doc.Datensammlungen[i][x];
				}
			}
			emit (["Datensammlung", doc.Datensammlungen[i].Name, Datensammlung], null);
		}
	}
	if (doc.Beziehungssammlungen) {
		for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
			Beziehungssammlung = {};
			for (var x in doc.Beziehungssammlungen[i]) {
				if (x !== "Daten" && x !== "Typ") {
					Beziehungssammlung[x] = doc.Beziehungssammlungen[i][x];
				}
			}
			emit (["Beziehungssammlung", doc.Beziehungssammlungen[i].Name, Beziehungssammlung], null);
		}
	}
}