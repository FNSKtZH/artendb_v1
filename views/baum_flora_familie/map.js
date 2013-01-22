function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora") {
		emit (doc["Aktuelle Taxonomie"].Felder.Familie, null);
	}
}