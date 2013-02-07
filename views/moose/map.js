function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose" && doc["Aktuelle Taxonomie"]) {
		emit ([doc._id, doc._id]);
	}
}