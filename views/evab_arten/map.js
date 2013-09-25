function(doc) {
	if (doc.Gruppe && (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora" || doc.Gruppe === "Moose")) {
		emit (doc._id);
	}
}