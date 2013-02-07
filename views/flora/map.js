function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora" && doc["Aktuelle Taxonomie"]) {
		emit ([doc._id, doc._rev]);
	}
}