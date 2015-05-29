// wenn importDsDatenUploadenCollapse geöffnet wird

'use strict'

var $ = require('jquery'),
  pruefeAnmeldung = require('../login/pruefeAnmeldung')

module.exports = function (that) {
  if (!pruefeAnmeldung('ds')) {
    $(that).collapse('hide')
  } else {
    $('#dsFile').fileupload()
  }
  $('html, body').animate({
    scrollTop: $('#importDsDatenUploadenCollapse').offset().top
  }, 2000)
}
