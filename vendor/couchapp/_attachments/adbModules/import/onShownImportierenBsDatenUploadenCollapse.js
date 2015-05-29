// wenn importBsDatenUploadenCollapse geöffnet wird

'use strict'

var $ = require('jquery'),
  pruefeAnmeldung = require('../login/pruefeAnmeldung')

module.exports = function (that) {
  if (!pruefeAnmeldung('bs')) {
    $(that).collapse('hide')
  } else {
    $('#bsFile').fileupload()
  }
  $('html, body').animate({
    scrollTop: $('#importBsDatenUploadenCollapse').offset().top
  }, 2000)
}
