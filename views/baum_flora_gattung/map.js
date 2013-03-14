function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora" && doc.Taxonomie && doc.Taxonomie.Felder) {
		emit ([doc.Taxonomie.Felder.Familie, doc.Taxonomie.Felder.Gattung], null);
	}
}