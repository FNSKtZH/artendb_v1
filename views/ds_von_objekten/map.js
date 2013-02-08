function(doc) {
	if (doc.Typ && doc.Typ === "Objekt") {
		for (i in doc) {
			if (doc[i].Typ && doc[i].Typ === "Datensammlung") {
				var Datensammlung = {};
				for (x in doc[i]) {
					if (x !== "Felder" && x !== "Typ") {
						Datensammlung[x] = doc[i][x];
					}
				}
				emit ([i, Datensammlung], 1);
			}
		}
	}
}