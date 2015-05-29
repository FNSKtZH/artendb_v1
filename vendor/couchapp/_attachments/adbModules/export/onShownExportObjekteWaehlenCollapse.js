'use strict'

var $ = require('jquery'),
  erstelleListeFuerFeldwahl = require('./erstelleListeFuerFeldwahl'),
  fuerExportGewaehlteGruppen = require('./fuerExportGewaehlteGruppen')

module.exports = function (that) {
  var gruppenGewaehlt = fuerExportGewaehlteGruppen()

  // wenn onShownExportObjekteWaehlenCollapse als event aufgerufen wurde ist das Element in event.currentTarget enthalten
  that = that.currentTarget || that

  if (gruppenGewaehlt.length === 0) {
    // keine Gruppe gewählt
    erstelleListeFuerFeldwahl(gruppenGewaehlt)
    // und den panel schliessen
    $(that).collapse('hide')
    return false
  }
  // nach oben scrollen, damit der Bildschirm optimal genutzt wird
  $('html, body').animate({
    scrollTop: $(that).parent().offset().top - 6
  }, 2000)
  return true
}
