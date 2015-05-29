// wenn bsLoeschen geklickt wird

'use strict'

var $ = require('jquery'),
  entferneBeziehungssammlungAusAllenObjekten = require('./entferneBeziehungssammlungAusAllenObjekten')

module.exports = function (event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false

  // Rückmeldung anzeigen
  $('#importBsDsBeschreibenHinweis')
    .alert()
    .removeClass('alert-success')
    .removeClass('alert-danger')
    .addClass('alert-info')
    .show()
  $('#importBsDsBeschreibenHinweisText').html('Bitte warten: Die Beziehungssammlung wird entfernt...')
  entferneBeziehungssammlungAusAllenObjekten($('#bsName').val())
}
