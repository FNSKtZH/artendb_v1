function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose" && doc.Index) {
		emit (doc._id);
	}
}