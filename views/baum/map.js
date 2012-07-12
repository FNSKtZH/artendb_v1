function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit ([doc.Gruppe, doc.Index.Felder.Klasse, doc.Index.Felder.Ordnung, doc.Index.Felder.Familie, doc.Index.Felder.Gattung, doc.Index.Felder.Artname_vollständig], doc._id);
	}
	if (doc.Gruppe && doc.Gruppe === "Flora") {
		emit ([doc.Gruppe, doc.Index.Felder.Familie, doc.Index.Felder.Gattung, doc.Index.Felder.Artname_vollständig], doc._id);
	}
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit ([doc.Gruppe, doc.Index.Felder.Klasse, doc.Index.Felder.Familie, doc.Index.Felder.Gattung, doc.Index.Felder.Artname_vollständig], doc._id);
	}
}