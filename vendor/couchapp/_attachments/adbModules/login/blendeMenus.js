'use strict'

var $ = require('jquery')

module.exports = function () {
  if (window.localStorage.admin) {
    $('#menuBtn')
      .find('.admin')
      .show()
  } else {
    $('#menuBtn')
      .find('.admin')
      .hide()
  }
}
