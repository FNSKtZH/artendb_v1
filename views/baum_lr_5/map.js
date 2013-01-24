function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie.Felder.Hierarchie.length === 6) {
		emit (doc.Taxonomie.Felder.Hierarchie, doc._id);
	}
}