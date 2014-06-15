function(doc) {
    'use strict';
	var klasse,
		ordnung,
		familie,
		artname_vollständig;
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
		klasse = doc.Taxonomie.Eigenschaften.Klasse || "(unbekannte Klasse)";
		ordnung = doc.Taxonomie.Eigenschaften.Ordnung || "(unbekannte Ordnung)";
		familie = doc.Taxonomie.Eigenschaften.Familie || "(unbekannte Familie)";
		artname_vollständig = doc.Taxonomie.Eigenschaften["Artname vollständig"] || "(unbekannter Artname vollständig)";
		emit([klasse, ordnung, familie, artname_vollständig, doc._id], null);
	}
}