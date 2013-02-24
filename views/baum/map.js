function(doc) {
	var nameDerTaxonomie;
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			nameDerTaxonomie = x;
			break;
		}
	}
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit ([doc.Gruppe, doc[nameDerTaxonomie].Felder.Klasse, doc[nameDerTaxonomie].Felder.Ordnung, doc[nameDerTaxonomie].Felder.Familie, doc[nameDerTaxonomie].Felder.Gattung, doc[nameDerTaxonomie].Felder.Artname_vollständig], doc._id);
	}
	if (doc.Gruppe && doc.Gruppe === "Flora") {
		emit ([doc.Gruppe, doc[nameDerTaxonomie].Felder.Familie, doc[nameDerTaxonomie].Felder.Gattung, doc[nameDerTaxonomie].Felder.Artname_vollständig], doc._id);
	}
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit ([doc.Gruppe, doc[nameDerTaxonomie].Felder.Klasse, doc[nameDerTaxonomie].Felder.Familie, doc[nameDerTaxonomie].Felder.Gattung, doc[nameDerTaxonomie].Felder.Artname_vollständig], doc._id);
	}
}