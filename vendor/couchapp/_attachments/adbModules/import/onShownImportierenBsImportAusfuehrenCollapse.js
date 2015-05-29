// wenn importBsImportAusfuehrenCollapse geöffnet wird

'use strict'

var $ = require('jquery'),
  pruefeAnmeldung = require('../login/pruefeAnmeldung')

module.exports = function (that) {
  if (!pruefeAnmeldung('bs')) {
    $(that).collapse('hide')
  }
  $('html, body').animate({
    scrollTop: $('#importBsImportAusfuehrenCollapse').offset().top
  }, 2000)
}
