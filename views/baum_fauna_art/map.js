function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit ([doc.Taxonomie.Daten.Klasse, doc.Taxonomie.Daten.Ordnung, doc.Taxonomie.Daten.Familie, doc.Taxonomie.Daten["Artname vollständig"]], doc._id);
	}
}