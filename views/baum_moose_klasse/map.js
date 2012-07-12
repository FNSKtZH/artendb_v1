function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit (doc.Index.Felder.Klasse, null);
	}
}