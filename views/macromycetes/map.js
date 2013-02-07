function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc["Aktuelle Taxonomie"]) {
		emit ([doc._id, doc._rev]);
	}
}