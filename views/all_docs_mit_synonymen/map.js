function (doc) {
    'use strict';
    var _ = require("views/lib/underscore");
    if (doc.Gruppe) {
        // erst mal das eigene Dokument senden
        // der zweite key markiert, dass dies das Original ist
        emit([doc._id, 1]);
        if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
            // durch alle Beziehungssammlungen loopen
            _.each(doc.Beziehungssammlungen, function (beziehungssammlung) {
                if (beziehungssammlung.Typ && beziehungssammlung.Typ === "taxonomisch" && beziehungssammlung["Art der Beziehungen"] && beziehungssammlung["Art der Beziehungen"] === "synonym" && beziehungssammlung.Beziehungen && beziehungssammlung.Beziehungen.length > 0) {
                    // jetzt durch alle synonymen Beziehungen loopen
                    _.each(beziehungssammlung.Beziehungen, function (beziehung) {
                        if (beziehung.Beziehungspartner && beziehung.Beziehungspartner.length > 0) {
                            // durch alle Beziehungspartner der synonymen Beziehungen loopen
                            for (var z=0; z<beziehung.Beziehungspartner.length; z++) {
                                if (beziehung.Beziehungspartner[z].GUID) {
                                    // veranlassen, dass mit include_docs=true auch das Dokument dieses Synonyms gesendet wird
                                    // der zweite key markiert, dass es ein Synonym ist
                                    emit([doc._id, 0], {_id: beziehung.Beziehungspartner[z].GUID});
                                }
                            }
                        }
                    });
                }
            });
        }
    }
}