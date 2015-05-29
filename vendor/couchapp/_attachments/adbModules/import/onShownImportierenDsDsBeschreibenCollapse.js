// wenn importDsDsBeschreibenCollapse geöffnet wird

'use strict'

var $ = require('jquery'),
  bereiteImportierenDsBeschreibenVor = require('./bereiteImportierenDsBeschreibenVor')

module.exports = function () {
  // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
  bereiteImportierenDsBeschreibenVor('ds')
  $('#dsImportiertVon').val(localStorage.email)
}
