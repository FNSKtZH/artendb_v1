function(doc) {
    'use strict';
	var gattung,
		artname_vollständig;
	if (doc.Gruppe && doc.Gruppe === "Macromycetes" && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
		gattung = doc.Taxonomie.Eigenschaften.Gattung || "(unbekannte Gattung)";
		artname_vollständig = doc.Taxonomie.Eigenschaften["Artname vollständig"] || "(unbekannter Artname vollständig)";
		emit([gattung, artname_vollständig, doc._id], null);
	}
}