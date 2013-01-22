function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit ([doc["Aktuelle Taxonomie"].Felder.Klasse, doc["Aktuelle Taxonomie"].Felder.Ordnung], null);
	}
}