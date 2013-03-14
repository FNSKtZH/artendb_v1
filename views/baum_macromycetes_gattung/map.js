function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Felder) {
		emit (doc.Taxonomie.Felder.Gattung, null);
	}
}