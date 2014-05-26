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
                        // erst mal das eigene Dokument senden
                        // der zweite key markiert, dass dies das Original ist
                        emit([doc._id, 1]);
                        if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
                            // durch alle Beziehungssammlungen loopen
                            _.each(doc.Beziehungssammlungen, function(beziehungssammlung) {
                                if (beziehungssammlung.Typ && beziehungssammlung.Typ === "taxonomisch" && beziehungssammlung["Art der Beziehungen"] && beziehungssammlung["Art der Beziehungen"] === "synonym" && beziehungssammlung.Beziehungen && beziehungssammlung.Beziehungen.length > 0) {
                                    // jetzt durch alle synonymen Beziehungen loopen
                                    _.each(beziehungssammlung.Beziehungen, function(beziehung) {
                                        if (beziehung.Beziehungspartner && beziehung.Beziehungspartner.length > 0) {
                                            // durch alle Beziehungspartner der synonymen Beziehungen loopen
                                            _.each(beziehung.Beziehungspartner, function(bez_partner) {
                                                if (bez_partner.GUID) {
                                                    // veranlassen, dass mit include_docs=true auch das Dokument dieses Synonyms gesendet wird
                                                    // der zweite key markiert, dass es ein Synonym ist
                                                    emit([doc._id, 0], {_id: bez_partner.GUID});
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
	}
}