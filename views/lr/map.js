function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Methode) {
		emit (doc._id);
	}
}