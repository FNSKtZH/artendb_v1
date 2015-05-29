// wenn exportExport angezeigt wird
// zur Schaltfläche Vorschau scrollen

'use strict'

var $ = require('jquery')

module.exports = function () {
  // Fehlermeldung verstecken, falls sie noch offen war
  $('#exportExportErrorText')
    .alert()
    .hide()
  $('html, body').animate({
    scrollTop: $('#exportExportTabelleAufbauen').offset().top
  }, 2000)
}
