function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie.Felder.Hierarchie.length === 3) {
		emit (doc.Taxonomie.Felder.Hierarchie, doc._id);
	}
}