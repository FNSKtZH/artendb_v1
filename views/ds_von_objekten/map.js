function(doc) {
	var Felder;
	var zusammenfassend = false;
	if (doc.Datensammlungen) {
		for (var i=0; i<doc.Datensammlungen.length; i++) {
			//zusammenfassend ergänzen
			if (doc.Datensammlungen[i].zusammenfassend) {
				zusammenfassend = true;
			}
			Felder = {};
			for (var x in doc.Datensammlungen[i]) {
				if (x !== "Typ" && x !== "Name" && x !== "Daten" ) {
					Felder[x] = doc.Datensammlungen[i][x];
				}
			}
			emit (["Datensammlung", doc.Datensammlungen[i].Name, zusammenfassend, Felder], doc._id);
		}
	}
	if (doc.Beziehungssammlungen) {
		for (var h=0; h<doc.Beziehungssammlungen.length; h++) {
			Felder = {};
			for (var y in doc.Beziehungssammlungen[h]) {
				if (y !== "Typ" && y !== "Name" && y !== "Beziehungen") {
					Felder[y] = doc.Beziehungssammlungen[h][y];
				}
			}
			emit (["Beziehungssammlung", doc.Beziehungssammlungen[h].Name, zusammenfassend, Felder], doc._id);
		}
	}
}