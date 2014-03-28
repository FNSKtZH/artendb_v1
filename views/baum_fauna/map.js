function(doc) {
	var klasse = doc.Taxonomie.Daten.Klasse || "(unbekannte Klasse)",
		ordnung = doc.Taxonomie.Daten.Ordnung || "(unbekannte Ordnung)",
		familie = doc.Taxonomie.Daten.Familie || "(unbekannte Familie)",
		artname_vollstaendig = doc.Taxonomie.Daten["Artname vollständig"] || "(unbekannter Artname vollständig)";
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit ([klasse, ordnung, familie, artname_vollstaendig, doc._id], null);
	}
}