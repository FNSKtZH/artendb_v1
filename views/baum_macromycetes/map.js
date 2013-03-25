function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten.Gattung && doc.Taxonomie.Daten["Artname vollständig"]) {
		emit ([doc.Taxonomie.Daten.Gattung, doc.Taxonomie.Daten["Artname vollständig"], doc._id], null);
	}
}