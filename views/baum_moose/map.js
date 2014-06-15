function(doc) {
    'use strict';
	var klasse,
		familie,
		gattung,
		artname_vollständig;
	if (doc.Gruppe && doc.Gruppe === "Moose" && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
		klasse = doc.Taxonomie.Eigenschaften.Klasse || "(unbekannte Klasse)";
		familie = doc.Taxonomie.Eigenschaften.Familie || "(unbekannte Familie)";
		gattung = doc.Taxonomie.Eigenschaften.Gattung || "(unbekannte Gattung)";
		artname_vollständig = doc.Taxonomie.Eigenschaften["Artname vollständig"] || "(unbekannter Artname vollständig)";
		emit([klasse, familie, gattung, artname_vollständig, doc._id], null);
	}
}