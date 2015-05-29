// wenn bsImportieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)

'use strict'

var $ = require('jquery'),
  zeigeFormular = require('./zeigeFormular'),
  pruefeAnmeldung = require('./login/pruefeAnmeldung'),
  isFileAPIAvailable = require('./isFileAPIAvailable')

module.exports = function () {
  if (isFileAPIAvailable()) {
    zeigeFormular('importBs')
    // Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
    if (pruefeAnmeldung('bs')) {
      $('#importBsDsBeschreibenCollapse').collapse('show')
    }
  }
}
