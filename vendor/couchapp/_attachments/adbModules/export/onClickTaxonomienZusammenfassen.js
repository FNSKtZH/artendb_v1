/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var exportZuruecksetzen = require('./exportZuruecksetzen');

module.exports = function () {
    // event stoppen, um zu verhindern, dass bootstrap ganz nach oben scrollt
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    // this übergeben!
    window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick(this);
    window.adb.handleExportierenDsObjekteWaehlenGruppeChange();
    exportZuruecksetzen(this);
};