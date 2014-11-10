function (doc) {
    'use strict';

    var Felder,
        ds_zusammenfassend,
        bs_zusammenfassend,
        x,
        y,
        _ = require("views/lib/underscore");

    if (doc.Eigenschaftensammlungen) {
        _.each(doc.Eigenschaftensammlungen, function (es) {
            // ds_zusammenfassend ergänzen
            ds_zusammenfassend = !!es.zusammenfassend;
            Felder = {};
            for (x in es) {
                if (x !== "Typ" && x !== "Name" && x !== "Eigenschaften" ) {
                    Felder[x] = es[x];
                }
            }
            emit(["Datensammlung", es.Name, ds_zusammenfassend, es["importiert von"], Felder], doc._id);
        });
    }

    if (doc.Beziehungssammlungen) {
        _.each(doc.Beziehungssammlungen, function (bs) {
            // bs_zusammenfassend ergänzen
            bs_zusammenfassend = !!bs.zusammenfassend;
            Felder = {};
            for (y in bs) {
                if (y !== "Typ" && y !== "Name" && y !== "Beziehungen") {
                    Felder[y] = bs[y];
                }
            }
            emit(["Beziehungssammlung", bs.Name, bs_zusammenfassend, bs["importiert von"], Felder], doc._id);
        });
    }
    
}