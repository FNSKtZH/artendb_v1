function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Index) {
		emit (doc._id);
	}
}