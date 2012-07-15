function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Flora") {
		emit ([doc.Index.Felder.Familie, doc.Index.Felder.Gattung, doc.Index.Felder["Artname vollständig"]], doc._id);
	}
}