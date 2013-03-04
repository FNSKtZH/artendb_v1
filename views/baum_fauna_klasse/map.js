function(doc) {
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			if (doc.Gruppe && doc.Gruppe === "Fauna") {
				emit (doc[x].Felder.Klasse, null);
			}
			break;
		}
	}
}