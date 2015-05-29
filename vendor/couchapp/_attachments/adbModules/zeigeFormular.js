// managed die Sichtbarkeit von Formularen
// wird von allen initiiere_-Funktionen verwendet
// wird ein Formularname übergeben, wird dieses Formular gezeigt
// und alle anderen ausgeblendet
// zusätzlich wird die Höhe von textinput-Feldern an den Textinhalt angepasst

'use strict'

var $ = require('jquery'),
  setzteLinksZuBilderUndWikipedia = require('./setzteLinksZuBilderUndWikipedia')

module.exports = function (formularname) {
  var formularAngezeigt = $.Deferred(),
    $form = $('form')

  // zuerst alle Formulare ausblenden
  $('#forms').hide()
  $form.each(function () {
    $(this).hide()
  })

  if (formularname) {
    if (formularname !== 'art') {
      // Spuren des letzten Objekts entfernen
      // IE8 kann nicht deleten
      try {
        delete localStorage.art_id
      } catch (e) {
        localStorage.art_id = undefined
      }
      // URL anpassen, damit kein Objekt angezeigt wird
      // TODO: DIESER BEFEHL LÖST IN IE11 EINFÜGEN VON :/// AUS!!!!
      history.pushState(null, null, 'index.html')
      // alle Bäume ausblenden, suchfeld, Baumtitel
      $('.suchen').hide()
      $('.baum').hide()
      $('.treeBeschriftung').hide()
      // Gruppe Schaltfläche deaktivieren
      $('#gruppe').find('.active').removeClass('active')
    }
    $form.each(function () {
      var that = $(this)
      if (that.attr('id') === formularname) {
        $('#forms').show()
        that.show()
      }
    })
    $(window).scrollTop(0)

    // weitere urls anpassen
    switch (formularname) {
      case 'export':
        // TODO: DIESER BEFEHL LÖST IN IE11 EINFÜGEN VON :/// AUS!!!!
        history.pushState(null, null, 'index.html?exportieren=true')
        break
      case 'exportAlt':
        // TODO: DIESER BEFEHL LÖST IN IE11 EINFÜGEN VON :/// AUS!!!!
        history.pushState(null, null, 'index.html?exportieren_fuer_artenlistentool=true')
        // ganze Breite nutzen (menu bleibt ausgeblendet)
        $('body').toggleClass('force-mobile')
        break
      case 'importDs':
        // TODO: DIESER BEFEHL LÖST IN IE11 EINFÜGEN VON :/// AUS!!!!
        history.pushState(null, null, 'index.html?importieren_datensammlung=true')
        break
      case 'importBs':
        // TODO: DIESER BEFEHL LÖST IN IE11 EINFÜGEN VON :/// AUS!!!!
        history.pushState(null, null, 'index.html?importieren_beziehungssammlung=true')
        break
    }

    // jetzt die Links im Menu (de)aktivieren
    setzteLinksZuBilderUndWikipedia()
    formularAngezeigt.resolve()
  }
  return formularAngezeigt.promise()
}
