// fügt die für ALT obligatorischen Felder ein
// und entfernt diese aus dem übergebenen exportObjekt, falls sie schon darin enthalten waren
// erhält das Objekt und das exportObjekt
// retourniert das angepasste exportObjekt

'use strict'

var _ = require('lists/lib/underscore')

function isInt (value) {
  return !isNaN(value) && parseInt(Number(value), 10) == value && !isNaN(parseInt(value, 10))
}

module.exports = function (objekt, exportObjekt) {
  var dsZhArtwert,
    dsZhGis

  // übergebene Variabeln prüfen
  if (!objekt) return {}
  if (!objekt.Taxonomie) return {}
  if (!objekt.Taxonomie.Eigenschaften) return {}
  if (!exportObjekt) exportObjekt = {}

  // sicherstellen, dass GUID korrekt formattiert ist
  var isGuidFormatCorrect = new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$').test(objekt._id)
  if (!isGuidFormatCorrect) return {}
  // sicherstellen, dass Taxonomie ID ein integer ist
  if (!isInt(objekt.Taxonomie.Eigenschaften['Taxonomie ID'])) return {}

  // Felder ergänzen
  // immer sicherstellen, dass das Feld existiert
  exportObjekt.idArt = '{' + objekt._id + '}'
  exportObjekt.ref = objekt.Taxonomie.Eigenschaften['Taxonomie ID']

  dsZhGis = _.find(objekt.Eigenschaftensammlungen, function (ds) {
      return ds.Name === 'ZH GIS'
    }) || {}

  if (dsZhGis && dsZhGis.Eigenschaften && dsZhGis.Eigenschaften['GIS-Layer']) {
    exportObjekt.gisLayer = dsZhGis.Eigenschaften['GIS-Layer'].substring(0, 50)
  } else {
    // sollte nicht vorkommen, da der view nur objekte mit werten wählt
    exportObjekt.gisLayer = ''
  }

  if (dsZhGis && dsZhGis.Eigenschaften && dsZhGis.Eigenschaften['Betrachtungsdistanz (m)'] && isInt(dsZhGis.Eigenschaften['Betrachtungsdistanz (m)'])) {
    exportObjekt.distance = dsZhGis.Eigenschaften['Betrachtungsdistanz (m)']
  } else {
    // sollte nicht vorkommen, da der view nur objekte mit werten wählt
    exportObjekt.distance = 500
  }

  var artname = objekt.Taxonomie.Eigenschaften.Artname
  if (artname && artname !== '(kein Artname)') {
    exportObjekt.nameLat = objekt.Taxonomie.Eigenschaften.Artname.substring(0, 255)
  } else if (objekt.Taxonomie.Eigenschaften.Gattung) {
    var art = objekt.Taxonomie.Eigenschaften.Gattung + ' ' + objekt.Taxonomie.Eigenschaften.Art
    exportObjekt.nameLat = art.substring(0, 255)
  } else {
    exportObjekt.nameLat = '(kein Artname)'
  }

  if (objekt.Taxonomie.Eigenschaften['Name Deutsch']) {
    exportObjekt.nameDeu = objekt.Taxonomie.Eigenschaften['Name Deutsch'].substring(0, 255)
  } else {
    exportObjekt.nameDeu = ''
  }

  dsZhArtwert = _.find(objekt.Eigenschaftensammlungen, function (ds) {
      return ds.Name === 'ZH Artwert (aktuell)'
    }) || {}

  if (dsZhArtwert && dsZhArtwert.Eigenschaften && (dsZhArtwert.Eigenschaften.Artwert || dsZhArtwert.Eigenschaften.Artwert === 0) && isInt(dsZhArtwert.Eigenschaften.Artwert)) {
    exportObjekt.artwert = dsZhArtwert.Eigenschaften.Artwert
  } else {
    exportObjekt.artwert = 0
  }

  return exportObjekt
}
