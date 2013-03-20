function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie && doc.Taxonomie.Daten) {
		if (doc.Taxonomie.Daten.Hierarchie && doc.Taxonomie.Daten.Hierarchie.length === 8) {
			emit (doc.Taxonomie.Daten.Hierarchie, doc._id);
		}
	}
}