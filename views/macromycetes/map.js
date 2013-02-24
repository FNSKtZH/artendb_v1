function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Typ && doc.Typ === "Objekt") {
		emit ([doc._id, doc._rev]);
	}
}