function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Lebensräume") {
		emit ([doc._id, doc._rev]);
	}
}