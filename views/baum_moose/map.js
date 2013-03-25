function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose" && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten.Klasse && doc.Taxonomie.Daten.Familie && doc.Taxonomie.Daten.Gattung && doc.Taxonomie.Daten["Artname vollständig"]) {
		emit ([doc.Taxonomie.Daten.Klasse, doc.Taxonomie.Daten.Familie, doc.Taxonomie.Daten.Gattung, doc.Taxonomie.Daten["Artname vollständig"], doc._id], null);
	}
}