// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// diese Funktion wird benötigt, wenn ein neuer LR erstellt wird
// LR kann mitgegeben werden, muss aber nicht
// wird mitgegeben, wenn an den betreffenden lr nichts ändert und nicht jedes mal die LR aus der DB neu abgerufen werden sollen
// manchmal ist es aber nötig, die LR neu zu holen, wenn dazwischen an LR geändert wird!

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

var returnFunction = function (lr, object, aktualisiere_hierarchiefeld) {
    var $db = $.couch.db('artendb'),
        aktualisiereHierarchieEinesNeuenLr_2 = require('./aktualisiereHierarchieEinesNeuenLr_2');

    if (lr) {
        aktualisiereHierarchieEinesNeuenLr_2(lr, object, aktualisiere_hierarchiefeld);
    } else {
        $db.view('artendb/lr?include_docs=true', {
            success: function (data) {
                aktualisiereHierarchieEinesNeuenLr_2(data, object, aktualisiere_hierarchiefeld);
            }
        });
    }
};

module.exports = returnFunction;