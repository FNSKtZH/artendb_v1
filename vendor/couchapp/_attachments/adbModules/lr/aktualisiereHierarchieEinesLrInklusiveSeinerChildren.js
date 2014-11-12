// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// und auch den parent
// prüft, ob dieses Objekt children hat
// wenn ja, wird deren Hierarchie auch aktualisiert
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// wird das Ergebnis der DB-Abfrage mitgegeben, wird die Abfrage nicht wiederholt
// diese Funktion wird benötigt, wenn Namen oder Label eines bestehenden LR verändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (lr, object, aktualisiereHierarchiefeld, einheitIstTaxonomiename) {
    var $db = $.couch.db('artendb'),
        aktualisiereHierarchieEinesLrInklusiveSeinerChildren2 = require('./aktualisiereHierarchieEinesLrInklusiveSeinerChildren2');

    if (lr) {
        aktualisiereHierarchieEinesLrInklusiveSeinerChildren2(lr, object, aktualisiereHierarchiefeld, einheitIstTaxonomiename);
    } else {
        $db.view('artendb/lr?include_docs=true', {
            success: function (lr) {
                aktualisiereHierarchieEinesLrInklusiveSeinerChildren2(lr, object, aktualisiereHierarchiefeld, einheitIstTaxonomiename);
            },
            error: function () {
                console.log('aktualisiereHierarchieEinesLrInklusiveSeinerChildren: keine Daten erhalten');
            }
        });
    }
};