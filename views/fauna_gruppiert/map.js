function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit ([doc._id, doc._rev]);
	}
}