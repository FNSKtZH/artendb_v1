function(doc) {
    'use strict';

	var _ = require("views/lib/underscore");

	if (doc.Gruppe && doc.Typ && doc.Typ === "Objekt") {

		if (doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
            _.each(doc.Taxonomie.Eigenschaften, function(feldwert, feldname) {
                emit([doc.Gruppe, "Taxonomie", doc.Taxonomie.Name, feldname, typeof feldwert], doc._id);
            });
		}

		if (doc.Eigenschaftensammlungen) {
            _.each(doc.Eigenschaftensammlungen, function(datensammlung) {
                if (datensammlung.Eigenschaften) {
                    _.each(datensammlung.Eigenschaften, function(feldwert, feldname) {
                        emit([doc.Gruppe, "Datensammlung", datensammlung.Name, feldname, typeof feldwert], doc._id);
                    });
                }
            });
		}
		
		if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
            _.each(doc.Beziehungssammlungen, function(beziehungssammlung) {
                if (beziehungssammlung.Beziehungen && beziehungssammlung.Beziehungen.length > 0) {
                    _.each(beziehungssammlung.Beziehungen, function(beziehung) {
                        _.each(beziehung, function(bez_feldwert, bez_feldname) {
                            // irgendwie liefert dieser Loop auch Zahlen, die aussehen als wären sie die keys eines Arrays. Ausschliessen
                            if (isNaN(parseInt(bez_feldname))) {
                                // jetzt loopen wir durch die Daten der Beziehung
                                emit([doc.Gruppe, "Beziehung", beziehungssammlung.Name, bez_feldname, typeof bez_feldwert], doc._id);
                            }
                        });
                    });
                }
            });
		}
	}
}