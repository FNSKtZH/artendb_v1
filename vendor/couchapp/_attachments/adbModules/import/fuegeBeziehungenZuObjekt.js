// fügt der Art eine Beziehungssammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (guid, beziehungssammlung, beziehungen) {
    var $db = $.couch.db('artendb'),
        hinzugefuegt,
        entsprechendeBezSammlungInObjekt,
        sortiereBeziehungenNachName = require('../sortiereBeziehungenNachName');

    $db.openDoc(guid, {
        success: function (doc) {
            // prüfen, ob die Beziehung schon existiert
            if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
                hinzugefuegt = false;
                entsprechendeBezSammlungInObjekt = _.find(doc.Beziehungssammlungen, function (bezSammlungInObjekt) {
                    return bezSammlungInObjekt.Name === beziehungssammlung.Name;
                });
                if (entsprechendeBezSammlungInObjekt) {
                    _.each(beziehungen, function (beziehung) {
                        if (!_.contains(entsprechendeBezSammlungInObjekt.Beziehungen, beziehung)) {
                            entsprechendeBezSammlungInObjekt.Beziehungen.push(beziehung);
                        }
                    });
                    // Beziehungen nach Name sortieren
                    entsprechendeBezSammlungInObjekt.Beziehungen = sortiereBeziehungenNachName(entsprechendeBezSammlungInObjekt.Beziehungen);
                    hinzugefuegt = true;
                }
                if (!hinzugefuegt) {
                    // die Beziehungssammlung existiert noch nicht
                    beziehungssammlung.Beziehungen = [];
                    _.each(beziehungen, function (beziehung) {
                        beziehungssammlung.Beziehungen.push(beziehung);
                    });
                    // Beziehungen nach Name sortieren
                    beziehungssammlung.Beziehungen = sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);
                    doc.Beziehungssammlungen.push(beziehungssammlung);
                }
            } else {
                // Beziehungssammlung anfügen
                beziehungssammlung.Beziehungen = [];
                _.each(beziehungen, function (beziehung) {
                    beziehungssammlung.Beziehungen.push(beziehung);
                });
                // Beziehungen nach Name sortieren
                beziehungssammlung.Beziehungen = sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);
                doc.Beziehungssammlungen = [];
                doc.Beziehungssammlungen.push(beziehungssammlung);
            }
            // Beziehungssammlungen nach Name sortieren
            doc.Beziehungssammlungen = window.adb.sortiereObjektarrayNachName(doc.Beziehungssammlungen);
            // in artendb speichern
            $db.saveDoc(doc);
            // mitteilen, dass eine bs importiert wurde
            $(document).trigger('adb.bs_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.bs_nicht_hinzugefügt)
        }
    });
};