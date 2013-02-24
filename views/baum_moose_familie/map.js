﻿function(doc) {
	var nameDerTaxonomie;
	for (x in doc) {
		if (typeof doc[x].Typ !== "undefined" && doc[x].Typ === "Taxonomie") {
			nameDerTaxonomie = x;
			break;
		}
	}
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit ([doc[nameDerTaxonomie].Felder.Klasse, doc[nameDerTaxonomie].Felder.Familie], null);
	}
}