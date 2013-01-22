function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes") {
		emit (doc["Aktuelle Taxonomie"].Felder.Gattung, null);
	}
}