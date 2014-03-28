function(doc) {

	var gattung,
		artname_vollstaendig;

	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Daten) {

		gattung = doc.Taxonomie.Daten.Gattung || "(unbekannte Gattung)";
		artname_vollstaendig = doc.Taxonomie.Daten["Artname vollständig"] || "(unbekannter Artname vollständig)";

		emit ([gattung, artname_vollstaendig, doc._id], null);
	}

}