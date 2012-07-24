function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Methode.Felder.Hierarchie) {
		emit (doc.Methode.Felder.Hierarchie, doc._id);
	}
}