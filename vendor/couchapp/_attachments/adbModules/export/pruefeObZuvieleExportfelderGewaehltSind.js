/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that, _alt) {
    var count = 0;

    $("#export" + _alt)
        .find(".exportieren_felder_waehlen_felderliste")
        .find(".feld_waehlen")
        .each(function () {
            if ($(this).prop('checked')) {
                // gewähltes Feld > zählen
                count++;
            }
        });

    // Anzahl Felder kontrollieren
    if (count > 50) {
        // zuviele gewählt
        $('#meldung_zuviele_exportfelder').modal();
        $(that).prop('checked', false);
        return true;
    }
    return false;
};