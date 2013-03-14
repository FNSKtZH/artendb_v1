function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose" && doc.Taxonomie && doc.Taxonomie.Felder) {
		emit (doc.Taxonomie.Felder.Klasse, null);
	}
}