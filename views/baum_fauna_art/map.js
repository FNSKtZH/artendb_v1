function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Index.Felder.Klasse && doc.Index.Felder.Ordnung && doc.Index.Felder.Familie && doc.Index.Felder.Gattung && doc.Index.Felder.Artname_vollständig) {
		emit ([doc.Index.Felder.Klasse, doc.Index.Felder.Ordnung, doc.Index.Felder.Familie, doc.Index.Felder.Artname_vollständig], doc._id);
	}
}