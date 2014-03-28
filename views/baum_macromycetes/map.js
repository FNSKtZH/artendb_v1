function(doc) {
	var gattung = doc.Taxonomie.Daten.Gattung || "(unbekannte Gattung)",
		artname_vollstaendig = doc.Taxonomie.Daten["Artname vollständig"] || "(unbekannter Artname vollständig)";
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Daten) {
		emit ([gattung, artname_vollstaendig, doc._id], null);
	}
}