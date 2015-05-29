// wenn importBsDsBeschreibenCollapse geöffnet wird

'use strict'

var $ = require('jquery'),
  bereiteImportierenBsBeschreibenVor = require('./bereiteImportierenBsBeschreibenVor')

module.exports = function () {
  // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
  bereiteImportierenBsBeschreibenVor('bs')
  $('#bsImportiertVon').val(window.localStorage.email)
}
