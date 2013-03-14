function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Felder) {
		emit ([doc.Taxonomie.Felder.Gattung, doc.Taxonomie.Felder["Artname vollständig"]], doc._id);
	}
}