// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (guid, datensammlung) {
    var $db = $.couch.db('artendb');

    $db.openDoc(guid, {
        success: function (doc) {
            // sicherstellen, dass Eigenschaftensammlung existiert
            if (!doc.Eigenschaftensammlungen) {
                doc.Eigenschaftensammlungen = [];
            }
            // falls dieselbe Datensammlung schon existierte: löschen
            // trifft z.B. zu bei zusammenfassenden
            doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function (es) {
                return es.Name === datensammlung.Name;
            });
            // Datensammlung anfügen
            doc.Eigenschaftensammlungen.push(datensammlung);
            // sortieren
            // Eigenschaftensammlungen nach Name sortieren
            doc.Eigenschaftensammlungen = window.adb.sortiereObjektarrayNachName(doc.Eigenschaftensammlungen);
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass ein ds importiert wurde
            $(document).trigger('adb.ds_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.ds_nicht_hinzugefügt)
        }
    });
};