function(doc) {
	if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Daten) {
		if (doc.Gruppe === "Fauna") {
			emit ([doc.Gruppe, doc.Taxonomie.Daten.Klasse, doc.Taxonomie.Daten.Ordnung, doc.Taxonomie.Daten.Familie, doc.Taxonomie.Daten.Gattung, doc.Taxonomie.Daten["Artname vollständig"]], doc._id);
		}
		if (doc.Gruppe === "Flora") {
			emit ([doc.Gruppe, doc.Taxonomie.Daten.Familie, doc.Taxonomie.Daten.Gattung, doc.Taxonomie.Daten["Artname vollständig"]], doc._id);
		}
		if (doc.Gruppe === "Moose") {
			emit ([doc.Gruppe, doc.Taxonomie.Daten.Klasse, doc.Taxonomie.Daten.Familie, doc.Taxonomie.Daten.Gattung, doc.Taxonomie.Daten["Artname vollständig"]], doc._id);
		}
	}
}