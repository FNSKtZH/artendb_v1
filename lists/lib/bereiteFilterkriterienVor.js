'use strict'

var _ = require('lists/lib/underscore'),
  convertToCorrectType = require('lists/lib/convertToCorrectType')

module.exports = function (filterkriterien) {
  if (filterkriterien && filterkriterien.length > 0) {
    _.each(filterkriterien, function (filterkriterium) {
      // die id darf nicht in Kleinschrift verwandelt werden
      if (filterkriterium.Feldname !== 'GUID') {
        // true wurde offenbar irgendwie umgewandelt
        // jedenfalls musste man als Kriterium 1 statt true erfassen, um die Resultate zu erhalten
        // leider kann true oder false nicht wie gewollt von convertToCorrectType zurückgegeben werden
        if (filterkriterium.Filterwert === 'true') {
          filterkriterium.Filterwert = true
        } else if (filterkriterium.Filterwert === 'false') {
          filterkriterium.Filterwert = false
        } else {
          filterkriterium.Filterwert = convertToCorrectType(filterkriterium.Filterwert)
        }
      }
    })
  }
  return filterkriterien
}
