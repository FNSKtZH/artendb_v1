'use strict'

var $ = require('jquery'),
  erstelleTabelle = require('../erstelleTabelle')

module.exports = function (alt) {
  alt = alt || ''

  if (window.adb.exportierenObjekte.length > 0) {
    if (alt) {
      erstelleTabelle(window.adb.exportierenObjekte, '', 'exportAltExportTabelle', 'exportAlt')
    } else {
      erstelleTabelle(window.adb.exportierenObjekte, '', 'exportExportTabelle', null)
      $('.exportBtn').show()
    }
  } else if (window.adb.exportierenObjekte && window.adb.exportierenObjekte.length === 0) {
    $('#export' + alt + 'ExportErrorTextText')
      .html('Keine Daten gefunden<br>Bitte passen Sie die Filterkriterien an')
    $('#export' + alt + 'ExportErrorText')
      .alert()
      .show()
  }
  if (!alt) {
    // Panel-Titel an oberen Rand scrollen (bei alt schon ausgelöst)
    $('html, body').animate({
      scrollTop: $('#exportExport').offset().top - 6
    }, 2000)
  }

  // Beschäftigungsmeldung verstecken
  $('#export' + alt + 'ExportHinweisText')
    .alert()
    .hide()
}
