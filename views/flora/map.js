function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora" && doc.Typ && doc.Typ === "Objekt") {
		emit ([doc._id, doc._rev]);
	}
}