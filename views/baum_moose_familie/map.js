function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit ([doc.Index.Felder.Klasse, doc.Index.Felder.Familie], null);
	}
}