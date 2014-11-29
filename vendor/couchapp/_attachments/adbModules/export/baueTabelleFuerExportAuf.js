/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (_alt) {
    var erstelleTabelle = require('../erstelleTabelle');

    _alt = _alt || '';

    if (window.adb.exportierenObjekte.length > 0) {
        if (_alt) {
            erstelleTabelle(window.adb.exportierenObjekte, "", "exportieren_alt_exportieren_tabelle", 'exportAlt');
        } else {
            erstelleTabelle(window.adb.exportierenObjekte, "", "exportieren_exportieren_tabelle", null);
            $(".exportieren_btn").show();
        }
    } else if (window.adb.exportierenObjekte && window.adb.exportierenObjekte.length === 0) {
        $("#exportieren" + _alt + "_exportieren_error_text_text")
            .html("Keine Daten gefunden<br>Bitte passen Sie die Filterkriterien an");
        $("#exportieren" + _alt + "_exportieren_error_text")
            .alert()
            .show();
    }
    if (!_alt) {
        // Panel-Titel an oberen Rand scrollen (bei alt schon ausgelöst)
        $('html, body').animate({
            scrollTop: $("#exportieren_exportieren").offset().top - 6
        }, 2000);
    }

    // Beschäftigungsmeldung verstecken
    $("#exportieren" + _alt + "ExportierenHinweisText")
        .alert()
        .hide();
};