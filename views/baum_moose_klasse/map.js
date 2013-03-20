function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit (doc.Taxonomie.Daten.Klasse, null);
	}
}