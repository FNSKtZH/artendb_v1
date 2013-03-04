function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume") {
		for (x in doc) {
			if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
				if (doc[x].Felder.Hierarchie && doc[x].Felder.Hierarchie.length === 4) {
					emit (doc[x].Felder.Hierarchie, doc._id);
					break;
				}
			}
		}
	}
}