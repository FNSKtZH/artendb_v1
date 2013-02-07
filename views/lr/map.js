function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie) {
		emit ([doc._id, doc._rev]);
	}
}