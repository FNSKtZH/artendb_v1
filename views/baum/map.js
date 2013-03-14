function(doc) {
	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Felder) {
		if (doc.Gruppe === "Fauna") {
			emit ([doc.Gruppe, doc.Taxonomie.Felder.Klasse, doc.Taxonomie.Felder.Ordnung, doc.Taxonomie.Felder.Familie, doc.Taxonomie.Felder.Gattung, doc.Taxonomie.Felder["Artname vollständig"]], doc._id);
		}
		if (doc.Gruppe === "Flora") {
			emit ([doc.Gruppe, doc.Taxonomie.Felder.Familie, doc.Taxonomie.Felder.Gattung, doc.Taxonomie.Felder["Artname vollständig"]], doc._id);
		}
		if (doc.Gruppe === "Moose") {
			emit ([doc.Gruppe, doc.Taxonomie.Felder.Klasse, doc.Taxonomie.Felder.Familie, doc.Taxonomie.Felder.Gattung, doc.Taxonomie.Felder["Artname vollständig"]], doc._id);
		}
	}
}