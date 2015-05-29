// wenn #exportExportCollapse geöffnet wird

'use strict'

var $ = require('jquery'),
  filtereFuerExport = require('./filtereFuerExport'),
  onShownExportObjekteWaehlenCollapse = require('./onShownExportObjekteWaehlenCollapse'),
  scrollThisToTop = require('../scrollThisToTop')

module.exports = function () {
  var that = this,
    fuerAlt

  // nur ausführen, wenn exportExportCollapse offen ist
  // komischerweise wurde dieser Code immer ausgelöst, wenn bei Lebensräumen F5 gedrückt wurde!
  // if ($('#exportExportCollapse').is(':visible')) {
  if (that.id === 'exportExportCollapse') {
    if (onShownExportObjekteWaehlenCollapse(that)) {
      // Gruppe ist gewählt, weitermachen

      // Tabelle und Herunterladen-Schaltfläche ausblenden
      $('.exportExportTabelle').hide()
      $('.exportBtn').hide()

      // filtert und baut danach die Vorschautabelle auf
      fuerAlt = false
      filtereFuerExport(null, fuerAlt)
    }
  }
  if (that.id === 'exportAltExportCollapse') {
    // Tabelle und Herunterladen-Schaltfläche ausblenden
    $('.exportExportTabelle').hide()
    $('.exportBtn').hide()
    // filtert und baut danach die Vorschautabelle auf
    fuerAlt = true
    filtereFuerExport(null, fuerAlt)
    scrollThisToTop(that, 6)
  }
}
