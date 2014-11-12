// wenn exportieren_ds_objekte_waehlen_gruppe geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var fuerExportGewaehlteGruppen = require('./fuerExportGewaehlteGruppen'),
        erstelleListeFuerFeldwahl  = require('./erstelleListeFuerFeldwahl'),
        gruppenGewaehlt;

    gruppenGewaehlt = fuerExportGewaehlteGruppen();
    erstelleListeFuerFeldwahl(gruppenGewaehlt);
};