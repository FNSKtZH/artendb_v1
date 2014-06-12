function(doc) {

	var klasse,
		ordnung,
		familie,
		artname_vollstaendig;

	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {

		klasse = doc.Taxonomie.Eigenschaften.Klasse || "(unbekannte Klasse)";
		ordnung = doc.Taxonomie.Eigenschaften.Ordnung || "(unbekannte Ordnung)";
		familie = doc.Taxonomie.Eigenschaften.Familie || "(unbekannte Familie)";
		artname_vollstaendig = doc.Taxonomie.Eigenschaften["Artname vollständig"] || "(unbekannter Artname vollständig)";

		emit ([klasse, ordnung, familie, artname_vollstaendig, doc._id], null);
	}

}