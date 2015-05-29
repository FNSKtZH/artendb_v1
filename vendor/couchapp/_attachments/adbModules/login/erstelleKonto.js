'use strict'

var $ = require('jquery'),
  capitaliseFirstLetter = require('../capitaliseFirstLetter'),
  passeUiFuerAngemeldetenUserAn = require('./passeUiFuerAngemeldetenUserAn'),
  bearbeiteLrTaxonomie = require('../lr/bearbeiteLrTaxonomie')

module.exports = function (woher) {
  // User in _user eintragen
  $.couch.signup({
    name: $('#email' + capitaliseFirstLetter(woher)).val()
  }, $('#passwort' + capitaliseFirstLetter(woher)).val(), {
    success: function () {
      window.localStorage.email = $('#email' + capitaliseFirstLetter(woher)).val()
      if (woher === 'art') {
        bearbeiteLrTaxonomie()
      }
      passeUiFuerAngemeldetenUserAn(woher)
      // Werte aus Feldern entfernen
      $('#email' + capitaliseFirstLetter(woher)).val('')
      $('#passwort' + capitaliseFirstLetter(woher)).val('')
      $('#passwort2' + capitaliseFirstLetter(woher)).val('')
    },
    error: function () {
      var praefix = 'import'
      if (woher === 'art') {
        praefix = ''
      }
      $('#' + praefix + capitaliseFirstLetter(woher) + 'AnmeldenFehlerText').html('Fehler: Das Konto wurde nicht erstellt')
      $('#' + praefix + capitaliseFirstLetter(woher) + 'AnmeldenFehler')
        .alert()
        .show()
    }
  })
}
