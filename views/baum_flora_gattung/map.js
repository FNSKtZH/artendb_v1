function(doc) {
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			if (doc.Gruppe && doc.Gruppe === "Flora") {
				emit ([doc[x].Felder.Familie, doc[x].Felder.Gattung], null);
			}
			break;
		}
	}
}