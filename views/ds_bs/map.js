function(doc) {
	var Felder;
	var ds_zusammenfassend, bs_zusammenfassend;
	if (doc.Datensammlungen) {
		for (var i=0; i<doc.Datensammlungen.length; i++) {
			//ds_zusammenfassend ergänzen
			if (doc.Datensammlungen[i].ds_zusammenfassend) {
				ds_zusammenfassend = true;
			} else {
				ds_zusammenfassend = false;
			}
			Felder = {};
			for (var x in doc.Datensammlungen[i]) {
				if (x !== "Typ" && x !== "Name" && x !== "Daten" ) {
					Felder[x] = doc.Datensammlungen[i][x];
				}
			}
			emit (["Datensammlung", doc.Datensammlungen[i].Name, ds_zusammenfassend], Felder);
		}
	}
	if (doc.Beziehungssammlungen) {
		for (var h=0; h<doc.Beziehungssammlungen.length; h++) {
			//bs_zusammenfassend ergänzen
			if (doc.Beziehungssammlungen[h].bs_zusammenfassend) {
				bs_zusammenfassend = true;
			} else {
				bs_zusammenfassend = false;
			}
			Felder = {};
			for (var y in doc.Beziehungssammlungen[h]) {
				if (y !== "Typ" && y !== "Name" && y !== "Beziehungen") {
					Felder[y] = doc.Beziehungssammlungen[h][y];
				}
			}
			emit (["Beziehungssammlung", doc.Beziehungssammlungen[h].Name, bs_zusammenfassend], Felder);
		}
	}
}