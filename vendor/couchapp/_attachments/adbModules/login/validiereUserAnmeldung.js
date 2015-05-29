'use strict'

var $ = require('jquery'),
  capitaliseFirstLetter = require('../capitaliseFirstLetter')

module.exports = function (woher) {
  woher = capitaliseFirstLetter(woher)
  var email = $('#email' + woher).val(),
    passwort = $('#passwort' + woher).val()

  if (!email) {
    setTimeout(function () {
      $('#email' + woher).focus()
    }, 50)  // need to use a timer so that .blur() can finish before you do .focus()
    $('#emailHinweis' + woher).show()
    return false
  }
  if (!passwort) {
    setTimeout(function () {
      $('#passwort' + woher).focus()
    }, 50)  // need to use a timer so that .blur() can finish before you do .focus()
    $('#passwortHinweis' + woher).show()
    return false
  }
  return true
}
