// event-handler liefern ungefragt den event mit
// daher alt als zweiter Variable

'use strict'

var $ = require('jquery')

module.exports = function (element) {
  var $exportExportCollapse,
    formularName

  // wenn exportZuruecksetzen als event aufgerufen wurde ist das Element in event.currentTarget enthalten
  element = element.currentTarget || element

  // ermitteln, aus welchem Formular aufgerufen wurde
  formularName = $(element).closest('form').attr('id')

  $exportExportCollapse = $('#' + formularName + 'ExportCollapse')

  // Export ausblenden, falls sie eingeblendet war
  if ($exportExportCollapse.is(':visible')) {
    $exportExportCollapse.collapse('hide')
  }
  $('#' + formularName + 'ExportTabelle').hide()
  $('.' + formularName + 'ExportBtn').hide()
  $('#' + formularName + 'ExportErrorText')
    .alert()
    .hide()
  $('#exportAltExportUrl').val('')
}
