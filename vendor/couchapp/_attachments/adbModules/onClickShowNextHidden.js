'use strict'

var $ = require('jquery')

module.exports = function (event) {
  var $elementToShow = $(this)
    .parent()
    .find('.adb-hidden')
    .first()

  event.preventDefault ? event.preventDefault() : event.returnValue = false

  if ($elementToShow.is(':visible')) {
    $elementToShow.hide(400)
    $(this).text('...mehr')
  } else {
    $elementToShow.show(400)
    $(this).text('...weniger')
  }
}
