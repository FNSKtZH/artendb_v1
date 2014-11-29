/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that, _alt) {
    var count = 0;

    $("#export" + _alt)
        .find(".exportierenFelderWaehlenFelderliste")
        .find(".feldWaehlen")
        .each(function () {
            if ($(this).prop('checked')) {
                // gewähltes Feld > zählen
                count++;
            }
        });

    // Anzahl Felder kontrollieren
    if (count > 50) {
        // zuviele gewählt
        $('#meldungZuvieleExportfelder').modal();
        $(that).prop('checked', false);
        return true;
    }
    return false;
};