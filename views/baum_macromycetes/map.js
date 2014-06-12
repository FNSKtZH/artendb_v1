function(doc) {

	var gattung,
		artname_vollstaendig;

	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {

		gattung = doc.Taxonomie.Eigenschaften.Gattung || "(unbekannte Gattung)";
		artname_vollstaendig = doc.Taxonomie.Eigenschaften["Artname vollständig"] || "(unbekannter Artname vollständig)";

		emit ([gattung, artname_vollstaendig, doc._id], null);
	}

}