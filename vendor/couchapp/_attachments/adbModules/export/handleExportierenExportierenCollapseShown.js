// wenn #exportExportCollapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                            = require('jquery'),
    filtereFuerExport                            = require('./filtereFuerExport'),
    handleExportierenObjekteWaehlenCollapseShown = require('./handleExportierenObjekteWaehlenCollapseShown');

module.exports = function (that) {
    var fuerAlt = false;

    if (that.id === 'exportAltExportCollapse') {
        fuerAlt = true;
    }

    // nur ausführen, wenn exportExportCollapse offen ist
    // komischerweise wurde dieser Code immer ausgelöst, wenn bei Lebensräumen F5 gedrückt wurde!
    if ($('#exportExportCollapse').is(':visible')) {
        if (handleExportierenObjekteWaehlenCollapseShown(that)) {
            // Gruppe ist gewählt, weitermachen

            // Tabelle und Herunterladen-Schaltfläche ausblenden
            $('.exportExportTabelle').hide();
            $('.exportBtn').hide();

            // filtert und baut danach die Vorschautabelle auf
            filtereFuerExport(null, fuerAlt);
        }
    }
    if ($('#exportAltExportCollapse').is(':visible')) {
        // Tabelle und Herunterladen-Schaltfläche ausblenden
        $('.exportExportTabelle').hide();
        $('.exportBtn').hide();
        // filtert und baut danach die Vorschautabelle auf
        filtereFuerExport(null, fuerAlt);
    }
};