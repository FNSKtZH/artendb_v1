/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var count = 0,
        $formular;

    // ermitteln, aus welchem Formular aufgerufen wurde
    $formular = $(that).closest('form');

    $formular
        .find('.exportFelderWaehlenFelderliste')
        .find('.feldWaehlen[dstyp="Datensammlung"]')
        .each(function () {
            if ($(this).prop('checked')) {
                // gewähltes Feld > zählen
                count++;
            }
        });

    $formular
        .find('.exportFelderWaehlenFelderliste')
        .find('.feldWaehlen[dstyp="Taxonomie"]')
        .each(function () {
            if ($(this).prop('checked')) {
                // gewähltes Feld > zählen
                count++;
            }
        });

    // Anzahl Felder kontrollieren
    if (count > 35) {
        // zuviele gewählt
        $('#meldungZuvieleExportfelder').modal();
        $(that).prop('checked', false);
        return true;
    }
    return false;
};