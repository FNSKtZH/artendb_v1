function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit (doc.Taxonomie.Daten.Klasse, null);
	}
}