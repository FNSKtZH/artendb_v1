// wenn importDsIdsIdentifizierenCollapse geöffnet wird

'use strict'

var $ = require('jquery'),
  pruefeAnmeldung = require('../login/pruefeAnmeldung')

module.exports = function (that) {
  if (!pruefeAnmeldung('ds')) {
    $(that).collapse('hide')
  }
  $('html, body').animate({
    scrollTop: $('#importDsIdsIdentifizierenCollapse').offset().top
  }, 2000)
}
