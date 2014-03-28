function(doc) {

	var klasse,
		familie,
		gattung,
		artname_vollstaendig;

	if (doc.Gruppe && doc.Gruppe === "Moose" && doc.Taxonomie && doc.Taxonomie.Daten) {

		klasse = doc.Taxonomie.Daten.Klasse || "(unbekannte Klasse)";
		familie = doc.Taxonomie.Daten.Familie || "(unbekannte Familie)";
		gattung = doc.Taxonomie.Daten.Gattung || "(unbekannte Gattung)";
		artname_vollstaendig = doc.Taxonomie.Daten["Artname vollständig"] || "(unbekannter Artname vollständig)";

		emit ([klasse, familie, gattung, artname_vollstaendig, doc._id], null);
	}

}