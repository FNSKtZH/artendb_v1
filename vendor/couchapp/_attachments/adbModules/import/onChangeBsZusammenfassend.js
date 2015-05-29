// wenn bsZusammenfassend geändert wird
// bsUrsprungsBsDiv zeigen oder verstecken

'use strict'

var $ = require('jquery')

module.exports = function () {
  if ($(this).prop('checked')) {
    $('#bsUrsprungsBsDiv').show()
  } else {
    $('#bsUrsprungsBsDiv').hide()
  }
}
