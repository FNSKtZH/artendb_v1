function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie.Felder.Hierarchie) {
		emit (doc.Taxonomie.Felder.Hierarchie.reverse(), doc._id);
	}
}