function(doc) {

	var Felder,
		ds_zusammenfassend,
		bs_zusammenfassend,
		i,
		h,
		x,
		y;

	if (doc.Datensammlungen) {
		for (i=0; i<doc.Datensammlungen.length; i++) {
			// ds_zusammenfassend ergänzen
			if (doc.Datensammlungen[i].zusammenfassend) {
				ds_zusammenfassend = true;
			} else {
				ds_zusammenfassend = false;
			}
			Felder = {};
			for (x in doc.Datensammlungen[i]) {
				if (x !== "Typ" && x !== "Name" && x !== "Daten" ) {
					Felder[x] = doc.Datensammlungen[i][x];
				}
			}
			emit (["Datensammlung", doc.Datensammlungen[i].Name, ds_zusammenfassend, doc.Datensammlungen[i]["importiert von"], Felder], doc._id);
		}
	}

	if (doc.Beziehungssammlungen) {
		for (h=0; h<doc.Beziehungssammlungen.length; h++) {
			// bs_zusammenfassend ergänzen
			if (doc.Beziehungssammlungen[h].zusammenfassend) {
				bs_zusammenfassend = true;
			} else {
				bs_zusammenfassend = false;
			}
			Felder = {};
			for (y in doc.Beziehungssammlungen[h]) {
				if (y !== "Typ" && y !== "Name" && y !== "Beziehungen") {
					Felder[y] = doc.Beziehungssammlungen[h][y];
				}
			}
			emit (["Beziehungssammlung", doc.Beziehungssammlungen[h].Name, bs_zusammenfassend, doc.Beziehungssammlungen[h]["importiert von"], Felder], doc._id);
		}
	}
	
}