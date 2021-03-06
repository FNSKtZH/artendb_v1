// wenn BsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist

'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function () {
  var bsKey,
    that = this

  bsKey = _.find(window.adb.dsNamenEindeutig, function (key) {
    return key[0] === that.value && key[2] !== window.localStorage.email && !key[1]
  })

  if (bsKey) {
    $('#importBsDsBeschreibenHinweis2')
      .alert()
      .removeClass('alert-success')
      .removeClass('alert-danger')
      .addClass('alert-info')
      .show()
    $('#importBsDsBeschreibenHinweis2Text').html('Es existiert schon eine gleich heissende und nicht zusammenfassende Beziehungssammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.')
    setTimeout(function () {
      $('#importBsDsBeschreibenHinweis2')
        .alert()
        .hide()
    }, 30000)
    $('#bsName')
      .val('')
      .focus()
  } else {
    $('#importBsDsBeschreibenHinweis2')
      .alert()
      .hide()
  }
}
