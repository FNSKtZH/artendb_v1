// wenn exportDsObjekteWaehlenGruppe geändert wird

'use strict'

var fuerExportGewaehlteGruppen = require('./fuerExportGewaehlteGruppen'),
  erstelleListeFuerFeldwahl = require('./erstelleListeFuerFeldwahl')

module.exports = function () {
  var gruppenGewaehlt = fuerExportGewaehlteGruppen()

  erstelleListeFuerFeldwahl(gruppenGewaehlt)
}
