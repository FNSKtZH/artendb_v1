function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume") {
		for (x in doc) {
			if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
				emit ([doc._id, doc._rev]);
				break;
			}
		}
	}
}