function(doc) {
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			if (doc.Gruppe && doc[x] && doc[x].Felder && doc[x].Felder["Taxonomie ID"]) {
				emit ([doc.Gruppe, doc._id, doc[x].Felder["Taxonomie ID"]], null);
			}
			break;
		}
	}
}