function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit ([doc["Aktuelle Taxonomie"].Felder.Klasse, doc["Aktuelle Taxonomie"].Felder.Familie, doc["Aktuelle Taxonomie"].Felder.Gattung, doc["Aktuelle Taxonomie"].Felder["Artname vollständig"]], doc._id);
	}
}