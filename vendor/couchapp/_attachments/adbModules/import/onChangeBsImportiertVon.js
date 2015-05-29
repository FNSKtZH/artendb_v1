// Wenn bsImportiertVon geändert wird
// Kontrollieren, dass es die email der angemeldeten Person ist

'use strict'

var $ = require('jquery')

module.exports = function () {
  $('#bsImportiertVon').val(window.localStorage.email)
  $('#importBsDsBeschreibenHinweis2')
    .alert()
    .removeClass('alert-success')
    .removeClass('alert-danger')
    .addClass('alert-info')
    .show()
  $('#importBsDsBeschreibenHinweis2Text').html('"importiert von" ist immer die email-Adresse der angemeldeten Person')
  setTimeout(function () {
    $('#importBsDsBeschreibenHinweis2')
      .alert()
      .hide()
  }, 10000)
}
