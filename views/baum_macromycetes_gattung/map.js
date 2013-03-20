function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit (doc.Taxonomie.Daten.Gattung, null);
	}
}