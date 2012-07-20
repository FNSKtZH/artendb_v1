function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora" && doc.Index) {
		emit (doc._id);
	}
}