// wenn #exportieren_exportieren_collapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var filtereFuerExport = require('./filtereFuerExport'),
        fuerAlt = false;

    if (that.id === 'exportieren_alt_exportieren_collapse') {
        fuerAlt = true;
    }

    // nur ausführen, wenn exportieren_exportieren_collapse offen ist
    // komischerweise wurde dieser Code immer ausgelöst, wenn bei Lebensräumen F5 gedrückt wurde!
    if ($("#exportieren_exportieren_collapse").is(":visible")) {
        if (window.adb.handleExportierenObjekteWaehlenCollapseShown(that)) {
            // Gruppe ist gewählt, weitermachen

            // Tabelle und Herunterladen-Schaltfläche ausblenden
            $(".exportieren_exportieren_tabelle").hide();
            $(".exportieren_exportieren_exportieren").hide();

            // filtert und baut danach die Vorschautabelle auf
            filtereFuerExport(null, fuerAlt);
        }
    }
    if ($("#exportieren_alt_exportieren_collapse").is(":visible")) {
        // Tabelle und Herunterladen-Schaltfläche ausblenden
        $(".exportieren_exportieren_tabelle").hide();
        $(".exportieren_exportieren_exportieren").hide();
        // filtert und baut danach die Vorschautabelle auf
        filtereFuerExport(null, fuerAlt);
    }
};