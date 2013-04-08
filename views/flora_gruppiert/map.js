function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora") {
		emit ([doc._id, doc._rev]);
	}
}