// wenn DsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist

'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function () {
  var that = this,
    dsKey,
    $importDsDsBeschreibenHinweis2 = $('#importDsDsBeschreibenHinweis2')

  dsKey = _.find(window.adb.dsNamenEindeutig, function (key) {
    return key[0] === that.value && key[2] !== window.localStorage.email && !key[1]
  })

  if (dsKey) {
    $importDsDsBeschreibenHinweis2
      .alert()
      .show()
      .html('Es existiert schon eine gleich heissende und nicht zusammenfassende Datensammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.')
    setTimeout(function () {
      $importDsDsBeschreibenHinweis2
        .alert()
        .hide()
    }, 30000)
    $('#dsName')
      .val('')
      .focus()
  } else {
    $importDsDsBeschreibenHinweis2
      .alert()
      .hide()
  }
}
