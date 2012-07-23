function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes") {
		emit ([doc.Index.Felder.Gattung, doc.Index.Felder["Artname vollständig"]], doc._id);
	}
}