/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $               = require('jquery'),
    erstelleTabelle = require('../erstelleTabelle');

module.exports = function (alt) {
    alt = alt || '';

    if (window.adb.exportierenObjekte.length > 0) {
        if (alt) {
            erstelleTabelle(window.adb.exportierenObjekte, '', 'exportierenAltExportierenTabelle', 'exportAlt');
        } else {
            erstelleTabelle(window.adb.exportierenObjekte, '', 'exportierenExportierenTabelle', null);
            $('.exportierenBtn').show();
        }
    } else if (window.adb.exportierenObjekte && window.adb.exportierenObjekte.length === 0) {
        $('#exportieren' + alt + 'ExportierenErrorTextText')
            .html('Keine Daten gefunden<br>Bitte passen Sie die Filterkriterien an');
        $('#exportieren' + alt + 'ExportierenErrorText')
            .alert()
            .show();
    }
    if (!alt) {
        // Panel-Titel an oberen Rand scrollen (bei alt schon ausgelöst)
        $('html, body').animate({
            scrollTop: $('#exportierenExportieren').offset().top - 6
        }, 2000);
    }

    // Beschäftigungsmeldung verstecken
    $('#exportieren' + alt + 'ExportierenHinweisText')
        .alert()
        .hide();
};