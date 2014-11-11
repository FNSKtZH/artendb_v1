/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (dsName, objekt) {
    var $db = $.couch.db('artendb'),
        i;

    if (objekt.Eigenschaftensammlungen && objekt.Eigenschaftensammlungen.length > 0) {
        /* hat nicht funktioniert
        var datensammlung = _.find(objekt.Eigenschaftensammlungen, function (datensammlung) {
            return datensammlung.Name === dsName;
        });
        objekt.Eigenschaftensammlungen = _.without(Objekt.Eigenschaftensammlungen, datensammlung);
        $db = $.couch.db('artendb');
        $db.saveDoc(objekt);*/
        for (i = 0; i < objekt.Eigenschaftensammlungen.length; i++) {
            if (objekt.Eigenschaftensammlungen[i].Name === dsName) {
                objekt.Eigenschaftensammlungen.splice(i, 1);
                $db.saveDoc(objekt);
                // mitteilen, dass eine ds entfernt wurde
                $(document).trigger('adb.dsEntfernt');
                // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
                break;
            }
        }
    }
};