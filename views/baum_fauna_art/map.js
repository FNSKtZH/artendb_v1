function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit ([doc.Index.Felder.Klasse, doc.Index.Felder.Ordnung, doc.Index.Felder.Familie, doc.Index.Felder["Artname vollständig"]], doc._id);
	}
}