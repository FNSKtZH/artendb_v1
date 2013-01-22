function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit (doc["Aktuelle Taxonomie"].Felder.Klasse, null);
	}
}