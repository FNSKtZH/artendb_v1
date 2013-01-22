function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes") {
		emit ([doc["Aktuelle Taxonomie"].Felder.Gattung, doc["Aktuelle Taxonomie"].Felder["Artname vollständig"]], doc._id);
	}
}