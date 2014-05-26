// wählt alle Dokumente, die GIS-Layer und Betrachtungsdistanz enthalten
// sowie ihre Synonyme
function(doc) {
    var _ = require("views/lib/underscore");
    if (doc.Gruppe) {
        if (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora") {
            // sicherstellen, dass GIS-Layer und Betrachtungsdistanz existieren
            if (doc.Datensammlungen && doc.Datensammlungen.length > 0) {
                // durch alle Datensammlungen loopen
                _.each(doc.Datensammlungen, function(datensammlung) {
                    if (datensammlung.Name && datensammlung.Name === "ZH GIS" && datensammlung.Daten && datensammlung.Daten["GIS-Layer"] && datensammlung.Daten["Betrachtungsdistanz (m)"]) {
                        // ok, alle benötigten Felder sind vorhanden
                        emit(doc._id);
                    }
                });
            }
        }
    }
}