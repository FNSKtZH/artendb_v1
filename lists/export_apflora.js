/**
 * Benutzt view flora
 * produziert die API für apflora Artenliste
 */

function (head, req) {
  'use strict'

  start({
    'headers': {
      'Accept-Charset': 'utf-8',
      'Content-Type': 'json; charset=utf-8;'
    }
  })

  var _ = require('lists/lib/underscore'),
    row,
    objekt,
    exportObjekte = [],
    exportObjekt,
    dsTaxonomie,
    dsArtwert,
    dsKef

  // list wird mit view flora abgerufen
  while (row = getRow()) {
    objekt = row.doc

    // exportobjekt gründen bzw. zurücksetzen
    exportObjekt = {}

    // GUID wird gebraucht, um beim Export nach EVAB dem Projekt zuzuweisen
    exportObjekt.GUID = objekt._id

    // zunächst leere Felder anfügen, damit jeder Datensatz jedes Feld hat
    exportObjekt.TaxonomieId = null
    exportObjekt.Familie = null
    exportObjekt.Artname = null
    exportObjekt.NameDeutsch = null
    exportObjekt.Status = null
    exportObjekt.Artwert = null
    exportObjekt.KefArt = null
    exportObjekt.KefKontrolljahr = null

    // Felder aktualisieren, wo Daten vorhanden
    if (objekt.Taxonomie && objekt.Taxonomie.Eigenschaften) {
      dsTaxonomie = objekt.Taxonomie.Eigenschaften
      exportObjekt.TaxonomieId = dsTaxonomie['Taxonomie ID']
      if (dsTaxonomie.Familie) {
        exportObjekt.Familie = dsTaxonomie.Familie
      }
      if (dsTaxonomie['Artname vollständig']) {
        exportObjekt.Artname = dsTaxonomie['Artname vollständig']
      }
      // wird beim Export nach EvAB benutzt
      if (dsTaxonomie['Name Deutsch']) {
        exportObjekt.NameDeutsch = dsTaxonomie['Name Deutsch']
      }
      if (dsTaxonomie.Status) {
        exportObjekt.Status = dsTaxonomie.Status
      }
    }

    if (objekt.Eigenschaftensammlungen.length > 0) {

      dsArtwert = _.find(objekt.Eigenschaftensammlungen, function (ds) {
        return ds.Name === 'ZH Artwert (aktuell)'
      })
      if (dsArtwert && dsArtwert.Eigenschaften && dsArtwert.Eigenschaften.Artwert) {
        exportObjekt.Artwert = dsArtwert.Eigenschaften.Artwert
      }

      dsKef = _.find(objekt.Eigenschaftensammlungen, function (ds) {
        return ds.Name === 'ZH KEF'
      })
      if (dsKef && dsKef.Eigenschaften && dsKef.Eigenschaften['Art ist KEF-Kontrollindikator']) {
        // MySQL erwartet für true eine -1
        exportObjekt.KefArt = -1
      }
      if (dsKef && dsKef.Eigenschaften && dsKef.Eigenschaften['Erstes Kontrolljahr']) {
        // MySQL erwartet für true eine 1
        exportObjekt.KefKontrolljahr = dsKef.Eigenschaften['Erstes Kontrolljahr']
      }
    }
    
    // objekt zu Exportobjekten hinzufügen
    exportObjekte.push(exportObjekt)
  }

  send(JSON.stringify(exportObjekte))
}