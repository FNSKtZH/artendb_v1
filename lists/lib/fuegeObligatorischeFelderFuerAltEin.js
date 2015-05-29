// fügt die für ALT obligatorischen Felder ein
// und entfernt diese aus dem übergebenen exportObjekt, falls sie schon darin enthalten waren
// erhält das Objekt und das exportObjekt
// retourniert das angepasste exportObjekt

'use strict'

var _ = require('lists/lib/underscore')

module.exports = function (objekt, exportObjekt) {
  var dsZhArtwert1995,
    dsZhGis

  // übergebene Variabeln prüfen
  if (!objekt) { return {}; }
  if (!objekt.Taxonomie) { return {}; }
  if (!objekt.Taxonomie.Eigenschaften) { return {}; }
  if (!exportObjekt) { exportObjekt = {}; }

  // Felder ergänzen
  // immer sicherstellen, dass das Feld existiert
  exportObjekt.idArt = '{' + objekt._id + '}'
  exportObjekt.ref = objekt.Taxonomie.Eigenschaften['Taxonomie ID']

  dsZhGis = _.find(objekt.Eigenschaftensammlungen, function (ds) {
      return ds.Name === 'ZH GIS'
    }) || {}

  if (dsZhGis && dsZhGis.Eigenschaften && dsZhGis.Eigenschaften['GIS-Layer']) {
    exportObjekt.gisLayer = dsZhGis.Eigenschaften['GIS-Layer'].substring(0, 50)
  }

  if (dsZhGis && dsZhGis.Eigenschaften && dsZhGis.Eigenschaften['Betrachtungsdistanz (m)']) {
    exportObjekt.distance = dsZhGis.Eigenschaften['Betrachtungsdistanz (m)']
  }

  if (objekt.Taxonomie.Eigenschaften.Artname) {
    exportObjekt.nameLat = objekt.Taxonomie.Eigenschaften.Artname.substring(0, 255)
  }

  if (objekt.Taxonomie.Eigenschaften['Name Deutsch']) {
    exportObjekt.nameDeu = objekt.Taxonomie.Eigenschaften['Name Deutsch'].substring(0, 255)
  }

  dsZhArtwert1995 = _.find(objekt.Eigenschaftensammlungen, function (ds) {
      return ds.Name === 'ZH Artwert (1995)'
    }) || {}

  if (dsZhArtwert1995 && dsZhArtwert1995.Eigenschaften && (dsZhArtwert1995.Eigenschaften.Artwert || dsZhArtwert1995.Eigenschaften.Artwert === 0)) {
    exportObjekt.artwert = dsZhArtwert1995.Eigenschaften.Artwert
  }

  return exportObjekt
}
