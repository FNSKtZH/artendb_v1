'use strict'

var _ = require('underscore'),
  $ = require('jquery'),
  ergaenzeFelderObjekt = require('./ergaenzeFelderObjekt'),
  erstelleExportfelder = require('./erstelleExportfelder'),
  sortKeysOfObject = require('../sortKeysOfObject'),
  holeDatensammlungenFuerExportfelder = require('./holeDatensammlungenFuerExportfelder')

module.exports = function (exportFelderArrays, formular) {
  var felderObjekt = {},
    hinweisTaxonomien,
    taxonomien,
    datensammlungen,
    beziehungssammlungen

  // in exportFelderArrays ist eine Liste der Felder, die in dieser Gruppe enthalten sind
    // sie kann aber Mehrfacheinträge enthalten, die sich in der Gruppe unterscheiden
    // Muster: Gruppe, Typ der Datensammlung, Name der Datensammlung, Name des Felds
    // Mehrfacheinträge sollen entfernt werden

  // dazu muss zuerst die Gruppe entfernt werden
  _.each(exportFelderArrays, function (exportFelder) {
    exportFelder.key.splice(0, 1)
  })

  // jetzt nur noch eineindeutige Array-Objekte (=Eigenschaftensammlungen) belassen
  exportFelderArrays = _.union(exportFelderArrays)
  // jetzt den Array von Objekten nach key sortieren
  exportFelderArrays = _.sortBy(exportFelderArrays, function (object) {
    return object.key
  })

  // Im Objekt 'FelderObjekt' werden die Felder aller gewählten Gruppen gesammelt
  felderObjekt = ergaenzeFelderObjekt(felderObjekt, exportFelderArrays)

  // bei allfälligen 'Taxonomie(n)' Feldnamen sortieren
  if (felderObjekt['Taxonomie(n)'] && felderObjekt['Taxonomie(n)'].Eigenschaften) {
    felderObjekt['Taxonomie(n)'].Eigenschaften = sortKeysOfObject(felderObjekt['Taxonomie(n)'].Eigenschaften)
  }

  // Taxonomien und Datensammlungen aus dem FelderObjekt extrahieren
  taxonomien = []
  datensammlungen = []
  beziehungssammlungen = []

  _.each(felderObjekt, function (ds) {
    if (typeof ds === 'object' && ds.Typ) {
      // das ist Datensammlung oder Taxonomie
      if (ds.Typ === 'Datensammlung') {
        datensammlungen.push(ds)
      } else if (ds.Typ === 'Taxonomie') {
        taxonomien.push(ds)
      } else if (ds.Typ === 'Beziehung') {
        beziehungssammlungen.push(ds)
      }
    }
  })

  $.when(holeDatensammlungenFuerExportfelder()).done(function () {
    erstelleExportfelder(taxonomien, datensammlungen, beziehungssammlungen, formular)
  })

  if (!formular || formular === 'export') {
    // kontrollieren, ob Taxonomien zusammengefasst werden
    if ($('#exportObjekteTaxonomienZusammenfassen').hasClass('active')) {
      hinweisTaxonomien = 'Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien sind zusammengefasst'
    } else {
      hinweisTaxonomien = 'Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien werden einzeln dargestellt'
    }
    // Ergebnis rückmelden
    $('#exportObjekteWaehlenGruppenHinweisText')
      .alert()
      .removeClass('alert-info')
      .removeClass('alert-danger')
      .addClass('alert-success')
      .show()
      .html(hinweisTaxonomien)
  }
}
