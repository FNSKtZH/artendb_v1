function(doc) {
	if (doc.Typ && doc.Typ === "Objekt") {
		for (i in doc) {
			if (doc[i].Typ && doc[i].Typ === "Datensammlung") {
				emit ([i, doc._id], 1);
			}
		}
	}
}