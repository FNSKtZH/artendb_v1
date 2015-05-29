'use strict'

var $ = require('jquery'),
  pruefeAnmeldung = require('../login/pruefeAnmeldung')

module.exports = function () {
  // Benutzer muss anmelden
  if (!pruefeAnmeldung('art')) {
    return false
  }

  // Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
  window.localStorage.lrBearb = true

  // Anmeldung: zeigen, aber geschlossen
  $('#artAnmelden .in').collapse('hide')
  $('#artAnmelden').show()

  // alle Felder schreibbar setzen
  $('.Lebensräume.Taxonomie').find('.controls').each(function () {
    // einige Felder nicht bearbeiten
    if ($(this).attr('id') !== 'GUID' && $(this).attr('id') !== 'Parent' && $(this).attr('id') !== 'Taxonomie' && $(this).attr('id') !== 'Hierarchie') {
      var parent = $(this).parent()

      $(this).attr('readonly', false)
      if (parent.attr('href')) {
        parent.attr('href', '#')
        // Standardverhalten beim Klicken von Links verhindern
        parent.attr('onclick', 'return false;')
        // Mauspointer nicht mehr als Finger
        this.style.cursor = ''
      }
    }
  })

  // Schreibbarkeit in den Symbolen anzeigen
  $('.lrBearb').removeClass('disabled')
  $('.lrBearbBtn').addClass('disabled')
}
