// wenn dsZusammenfassend geändert wird
// dsUrsprungsDs zeigen oder verstecken

'use strict'

var $ = require('jquery')

module.exports = function () {
  if ($(this).prop('checked')) {
    $('#dsUrsprungsDsDiv').show()
  } else {
    $('#dsUrsprungsDsDiv').hide()
  }
}
