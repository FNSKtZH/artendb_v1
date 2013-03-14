function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie && doc.Taxonomie.Felder) {
		if (doc.Taxonomie.Felder.Hierarchie && doc.Taxonomie.Felder.Hierarchie.length === 4) {
			emit (doc.Taxonomie.Felder.Hierarchie, doc._id);
		}
	}
}