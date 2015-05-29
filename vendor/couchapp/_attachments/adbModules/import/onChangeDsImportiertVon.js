// Wenn dsImportiertVon geändert wird
// kontrollieren, dass es die email der angemeldeten Person ist

'use strict'

var $ = require('jquery')

module.exports = function () {
  var $importDsDsBeschreibenHinweis2 = $('#importDsDsBeschreibenHinweis2')

  $('#dsImportiertVon').val(localStorage.email)
  $importDsDsBeschreibenHinweis2
    .alert()
    .show()
    .html('"importiert von" ist immer die email-Adresse der angemeldeten Person')
  setTimeout(function () {
    $importDsDsBeschreibenHinweis2
      .alert()
      .hide()
  }, 10000)
}
