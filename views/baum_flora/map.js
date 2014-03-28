function(doc) {
	var familie = doc.Taxonomie.Daten.Familie || "(unbekannte Familie)",
		gattung = doc.Taxonomie.Daten.Gattung || "(unbekannte Gattung)",
		artname_vollständig = doc.Taxonomie.Daten["Artname vollständig"] || "(unbekannter Artname vollständig)";
	if (doc.Gruppe && doc.Gruppe === "Flora" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit ([familie, gattung, artname_vollständig, doc._id], null);
	}
}