// wenn exportierenDsObjekteWaehlenGruppe geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var fuerExportGewaehlteGruppen = require('./fuerExportGewaehlteGruppen'),
    erstelleListeFuerFeldwahl  = require('./erstelleListeFuerFeldwahl');

module.exports = function () {
    var gruppenGewaehlt = fuerExportGewaehlteGruppen();

    erstelleListeFuerFeldwahl(gruppenGewaehlt);
};