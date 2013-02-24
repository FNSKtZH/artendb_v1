function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose" && doc.Typ && doc.Typ === "Objekt") {
		emit ([doc._id, doc._id]);
	}
}