function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc["Aktuelle Taxonomie"]) {
		emit (doc._id);
	}
}