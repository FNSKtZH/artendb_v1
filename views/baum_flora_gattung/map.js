function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit ([doc.Taxonomie.Daten.Familie, doc.Taxonomie.Daten.Gattung], null);
	}
}