// wenn DsLöschen geklickt wird

'use strict'

var $ = require('jquery'),
  entferneDatensammlungAusAllenObjekten = require('./entferneDatensammlungAusAllenObjekten')

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false

  // Rückmeldung anzeigen
  $('#importierenDsDsBeschreibenHinweis')
    .alert()
    .show()
    .html('Bitte warten: Die Datensammlung wird entfernt...')
  entferneDatensammlungAusAllenObjekten($('#dsName').val())
}
