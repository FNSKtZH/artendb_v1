/**
 * Benutzt view evab_arten
 * produziert die API für ALT gemäss Vorgaben der EBP
 */

function (head, req) {
  'use strict'
  
  start({
    'headers': {
      'Accept-Charset': 'utf-8',
      'Content-Type': 'json; charset=utf-8;',
      'Accept-Encoding': 'gzip,deflate'
    }
  })

  var _ = require('lists/lib/underscore'),
    codiereFloraStatus = require('lists/lib/codiereFloraStatus'),
    row,
    Objekt,
    exportObjekte = [],
    exportObjekt,
    dsTaxonomie = {},
    floraStatusCodiert

  while (row = getRow()) {
    Objekt = row.doc

    // exportobjekt gründen bzw. zurücksetzen
    exportObjekt = {}

    // dsTaxonomie bereitstellen
    if (Objekt.Taxonomie && Objekt.Taxonomie.Eigenschaften) {
      dsTaxonomie = Objekt.Taxonomie.Eigenschaften
    }

    // bei allen Gruppen gleiche Eigenschaften setzen
    exportObjekt.idArt = '{' + Objekt._id + '}'
    if (dsTaxonomie['Taxonomie ID']) {
      exportObjekt.nummer = dsTaxonomie['Taxonomie ID']
    }

    if (dsTaxonomie.Artname) {
      exportObjekt.wissenschArtname = dsTaxonomie.Artname.substring(0, 255)    // klasse darf max. 255 Zeichen lang sein
    } else {
      // Feld Artname ist nicht obligatorisch
      var art = dsTaxonomie.Gattung + ' ' + dsTaxonomie.Art
      exportObjekt.wissenschArtname = art.substring(0, 255)
    }
    // Name Deutsch existiert bei Moosen nicht, das macht aber nichts
    if (dsTaxonomie['Name Deutsch']) {
      exportObjekt.deutscherArtname = dsTaxonomie['Name Deutsch'].substring(0, 255)    // klasse darf max. 255 Zeichen lang sein
    }

    // gruppen-abhängige Eigenschaften setzen
    switch(Objekt.Gruppe) {

    case 'Fauna':
      // Status ist bei Fauna immer A
      exportObjekt.status = 'A'

      // Datensammlung 'ZH GIS' holen
      var dsZhGis = _.find(Objekt.Eigenschaftensammlungen, function (ds) {
        return ds.Name === 'ZH GIS'
      }) || {}
      
      if (dsZhGis && dsZhGis.Eigenschaften && dsZhGis.Eigenschaften['GIS-Layer']) {
        exportObjekt.klasse = dsZhGis.Eigenschaften['GIS-Layer'].substring(0, 50)    // klasse darf max. 50 Zeichen lang sein
      }
      break

    case 'Flora':
      // Felder aktualisieren, wo Daten vorhanden
      if (dsTaxonomie.Status) {
        // Status codieren
        floraStatusCodiert = codiereFloraStatus(dsTaxonomie.Status)
        if (floraStatusCodiert) { exportObjekt.status = floraStatusCodiert }
      }
      // GIS-Layer ist bei Flora immer Flora
      exportObjekt.klasse = 'Flora'
      break

    case 'Moose':
      // Status ist bei Moose immer A
      exportObjekt.status = 'A'
      // GIS-Layer ist bei Moose immer Moose
      exportObjekt.klasse = 'Moose'
      break

    default:
      // zum nächsten row
      continue
    }
    
    // Objekt zu Exportobjekten hinzufügen
    exportObjekte.push(exportObjekt)
  }

  send(JSON.stringify(exportObjekte))
}