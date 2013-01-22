function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit (doc["Aktuelle Taxonomie"].Felder.Klasse, null);
	}
}