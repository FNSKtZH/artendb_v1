function(doc) {

	var Felder,
		ds_zusammenfassend,
		bs_zusammenfassend,
		i,
		h,
		x,
		y;

	if (doc.Eigenschaftensammlungen) {
		for (i=0; i<doc.Eigenschaftensammlungen.length; i++) {
			// ds_zusammenfassend ergänzen
			ds_zusammenfassend = !!doc.Eigenschaftensammlungen[i].zusammenfassend;
			Felder = {};
			for (x in doc.Eigenschaftensammlungen[i]) {
				if (x !== "Typ" && x !== "Name" && x !== "Eigenschaften" ) {
					Felder[x] = doc.Eigenschaftensammlungen[i][x];
				}
			}
			emit (["Datensammlung", doc.Eigenschaftensammlungen[i].Name, ds_zusammenfassend, doc.Eigenschaftensammlungen[i]["importiert von"], Felder], doc._id);
		}
	}

	if (doc.Beziehungssammlungen) {
		for (h=0; h<doc.Beziehungssammlungen.length; h++) {
			// bs_zusammenfassend ergänzen
			bs_zusammenfassend = !!doc.Beziehungssammlungen[h].zusammenfassend;
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