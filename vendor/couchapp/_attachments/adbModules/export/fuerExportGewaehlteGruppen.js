'use strict'

var $ = require('jquery')

module.exports = function () {
  var gruppen = []

  $('.exportDsObjekteWaehlenGruppe').each(function () {
    if ($(this).prop('checked')) {
      gruppen.push($(this).val())
    }
  })
  return gruppen
}
