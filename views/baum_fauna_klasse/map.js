function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit (doc.Index.Felder.Klasse, null);
	}
}