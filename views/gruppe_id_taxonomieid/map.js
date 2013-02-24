function(doc) {
	var nameDerTaxonomie;
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			nameDerTaxonomie = x;
			break;
		}
	}
	if (doc.Gruppe && doc.Typ && doc.Typ === "Objekt" && doc[nameDerTaxonomie] && doc[nameDerTaxonomie].Felder && doc[nameDerTaxonomie].Felder["Taxonomie ID"]) {
		emit ([doc.Gruppe, doc._id, doc[nameDerTaxonomie].Felder["Taxonomie ID"]], null);
	}
}