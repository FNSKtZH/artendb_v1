function (doc) {
    'use strict';
	// dieser View wird benutzt, wenn ein Objekt aktualisiert wird, um die entsprechenden Informationen (Name und ev. Taxonomie) allen Beziehungen weiterzuleiten
    var _ = require("views/lib/underscore");
	if (doc.Beziehungssammlungen) {
        _.each(doc.Beziehungssammlungen, function (beziehungssammlung) {
            if (beziehungssammlung.Beziehungen && beziehungssammlung.Beziehungen.length>0) {
                _.each(beziehungssammlung.Beziehungen, function (beziehung) {
                    if (beziehung.Beziehungspartner && beziehung.Beziehungspartner.length>0) {
                        _.each(beziehung.Beziehungspartner, function (bezpartner) {
                            if (bezpartner.GUID) {
                                emit([bezpartner.GUID, doc._id], null);
                            }
                        });
                    }
                });
            }
        });
	}
}