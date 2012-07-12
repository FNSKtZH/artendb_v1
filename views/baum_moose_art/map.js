function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit ([doc.Index.Felder.Klasse, doc.Index.Felder.Familie, doc.Index.Felder.Gattung, doc.Index.Felder.Artname_vollständig], doc._id);
	}
}