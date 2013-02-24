function(doc) {
	var nameDerTaxonomie;
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			nameDerTaxonomie = x;
			break;
		}
	}
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc[nameDerTaxonomie].Felder.Hierarchie) {
		emit (doc[nameDerTaxonomie].Felder.Hierarchie.reverse(), doc._id);
	}
}