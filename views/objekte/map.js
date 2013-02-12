function(doc) {
	if (doc.Typ && doc.Typ === "Objekt") {
		emit (doc._id, null);
	}
}