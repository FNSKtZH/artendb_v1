// prüft, ob der Benutzer angemeldet ist
// ja: retourniert true
// nein: retourniert false und öffnet die Anmeldung
// welche anmeldung hängt ab, woher die Prüfung angefordert wurde
// darum erwartet die Funktion den parameter woher

'use strict'

var zurueckZurAnmeldung = require('./zurueckZurAnmeldung')

module.exports = function (woher) {
  if (!window.localStorage.email) {
    setTimeout(function () {
      zurueckZurAnmeldung(woher)
    }, 600)
    return false
  }
  return true
}
