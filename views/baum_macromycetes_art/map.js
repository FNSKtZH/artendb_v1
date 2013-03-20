function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit ([doc.Taxonomie.Daten.Gattung, doc.Taxonomie.Daten["Artname vollständig"]], doc._id);
	}
}