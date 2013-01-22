function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora") {
		emit ([doc["Aktuelle Taxonomie"].Felder.Familie, doc["Aktuelle Taxonomie"].Felder.Gattung], null);
	}
}