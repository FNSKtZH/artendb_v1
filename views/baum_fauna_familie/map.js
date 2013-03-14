function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Felder) {
		emit ([doc.Taxonomie.Felder.Klasse, doc.Taxonomie.Felder.Ordnung, doc.Taxonomie.Felder.Familie], null);
	}
}