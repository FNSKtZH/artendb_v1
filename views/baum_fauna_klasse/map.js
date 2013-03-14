function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Felder) {
		emit (doc.Taxonomie.Felder.Klasse, null);
	}
}