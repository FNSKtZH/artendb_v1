'use strict'

var _ = require('lists/lib/underscore'),
  bereiteFilterkriterienVor = require('lists/lib/bereiteFilterkriterienVor')

// liest übergebene Variabeln für Export aus
// und bereitet sie für die Verwendung auf
module.exports = function (query_objekt) {
  var ueVar = {
      fasseTaxonomienZusammen: false,
      filterkriterien: [],
      felder: [],
      nurObjekteMitEigenschaften: true,
      bezInZeilen: true,
      format: 'xlsx'
    },
    filterkriterienObjekt,
    felderObjekt

  _.each(query_objekt, function (value, key) {
    switch (key) {
      case 'fasseTaxonomienZusammen':
        // true oder false wird als String übergeben > umwandeln
        ueVar.fasseTaxonomienZusammen = (value === 'true')
        break
      case 'filter':
        filterkriterienObjekt = JSON.parse(value)
        ueVar.filterkriterien = filterkriterienObjekt.filterkriterien || []
        // jetzt strings in Kleinschrift und Nummern in Zahlen verwandeln
        // damit das später nicht dauern wiederholt werden muss
        ueVar.filterkriterien = bereiteFilterkriterienVor(ueVar.filterkriterien)
        break
      case 'felder':
        felderObjekt = JSON.parse(value)
        ueVar.felder = felderObjekt.felder || []
        break
      case 'gruppen':
        ueVar.gruppen = value.split(',')
        break
      case 'nurObjekteMitEigenschaften':
        // true oder false wird als String übergeben > umwandeln
        ueVar.nurObjekteMitEigenschaften = (value == 'true')
        break
      case 'bezInZeilen':
        // true oder false wird als String übergeben > umwandeln
        ueVar.bezInZeilen = (value === 'true')
        break
      case 'format':
        // true oder false wird als String übergeben > umwandeln
        ueVar.format = value
        break
    }
  })
  return ueVar
}
