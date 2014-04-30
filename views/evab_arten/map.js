function(doc) {
	if (doc.Gruppe && (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora" || doc.Gruppe === "Moose" || doc.Gruppe === "Macromycetes")) {
		emit (doc._id);
	}
}