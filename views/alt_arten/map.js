// stellt alle Objekte zur Verfügung, die in alt gebraucht werden

function(doc) {
    'use strict';
	if (doc.Typ && doc.Typ === "Objekt" && doc.Gruppe && (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora") && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften["Taxonomie ID"]) {
		emit(doc._id, null);
	}
}