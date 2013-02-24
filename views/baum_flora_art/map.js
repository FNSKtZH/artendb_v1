function(doc) {
	var nameDerTaxonomie;
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			nameDerTaxonomie = x;
			break;
		}
	}
	if (doc.Gruppe && doc.Gruppe === "Flora") {
		emit ([doc[nameDerTaxonomie].Felder.Familie, doc[nameDerTaxonomie].Felder.Gattung, doc[nameDerTaxonomie].Felder["Artname vollständig"]], doc._id);
	}
}