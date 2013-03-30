function(doc) {
	var Felder;
	if (doc.Datensammlungen) {
		for (var i=0; i<doc.Datensammlungen.length; i++) {
			Felder = {};
			for (var x in doc.Datensammlungen[i]) {
				if (x !== "Typ" && x !== "Name" && x !== "Daten" ) {
					Felder[x] = doc.Datensammlungen[i][x];
				}
			}
			emit (["Datensammlung", doc.Datensammlungen[i].Name, Felder], doc._id);
		}
	}
	if (doc.Beziehungssammlungen) {
		for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
			Felder = {};
			for (var x in doc.Beziehungssammlungen[i]) {
				if (x !== "Typ" && x !== "Name" && x !== "Beziehungen") {
					Felder[x] = doc.Beziehungssammlungen[i][x];
				}
			}
			emit (["Beziehungssammlung", doc.Beziehungssammlungen[i].Name, Felder], doc._id);
		}
	}
}