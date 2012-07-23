function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes") {
		emit (doc.Index.Felder.Gattung, null);
	}
}