// übernimmt die id des zu verändernden Dokuments
// und den Namen der Datensammlung, die zu entfernen ist
// entfernt die Datensammlung

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (id, dsName) {
    var $db = $.couch.db('artendb');

    $db.openDoc(id, {
        success: function (doc) {
            // Datensammlung entfernen
            if (doc.Eigenschaftensammlungen) {
                doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function (datensammlung) {
                    return datensammlung.Name === dsName;
                });
                // in artendb speichern
                $db.saveDoc(doc);
                // mitteilen, dass eine ds entfernt wurde
                $(document).trigger('adb.dsEntfernt');
                // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
            }
        }
    });
};