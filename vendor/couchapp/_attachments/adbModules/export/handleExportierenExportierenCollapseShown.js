// wenn #exportierenExportierenCollapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                            = require('jquery'),
    filtereFuerExport                            = require('./filtereFuerExport'),
    handleExportierenObjekteWaehlenCollapseShown = require('./handleExportierenObjekteWaehlenCollapseShown');

module.exports = function (that) {
    var fuerAlt = false;

    if (that.id === 'exportieren_altExportierenCollapse') {
        fuerAlt = true;
    }

    // nur ausführen, wenn exportierenExportierenCollapse offen ist
    // komischerweise wurde dieser Code immer ausgelöst, wenn bei Lebensräumen F5 gedrückt wurde!
    if ($("#exportierenExportierenCollapse").is(":visible")) {
        if (handleExportierenObjekteWaehlenCollapseShown(that)) {
            // Gruppe ist gewählt, weitermachen

            // Tabelle und Herunterladen-Schaltfläche ausblenden
            $(".exportierenExportierenTabelle").hide();
            $(".exportierenBtn").hide();

            // filtert und baut danach die Vorschautabelle auf
            filtereFuerExport(null, fuerAlt);
        }
    }
    if ($("#exportieren_altExportierenCollapse").is(":visible")) {
        // Tabelle und Herunterladen-Schaltfläche ausblenden
        $(".exportierenExportierenTabelle").hide();
        $(".exportierenBtn").hide();
        // filtert und baut danach die Vorschautabelle auf
        filtereFuerExport(null, fuerAlt);
    }
};