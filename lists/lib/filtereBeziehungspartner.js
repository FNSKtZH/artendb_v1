'use strict'

var _ = require('lists/lib/underscore'),
  beurteileFilterkriterien = require('lists/lib/beurteileFilterkriterien')

module.exports = function (beziehungspartner, filterwert, vergleichsoperator) {
  // Wenn Feldname = Beziehungspartner, durch die Partner loopen und nur hinzufügen,
  // wessen Name die Bedingung erfüllt
  var bezPartner = []

  if (beziehungspartner && beziehungspartner.length > 0) {
    _.each(beziehungspartner, function (partner) {
      var feldwert = partner.Name.toLowerCase()

      if (beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
        bezPartner.push(partner)
      }
    })
  }
  return bezPartner
}
