function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie && doc.Taxonomie.Felder) {
		if (doc.Taxonomie.Felder.Hierarchie && doc.Taxonomie.Felder.Hierarchie.length > 0) {
			emit (doc.Taxonomie.Felder.Hierarchie.reverse(), 1);
		}
	}
}