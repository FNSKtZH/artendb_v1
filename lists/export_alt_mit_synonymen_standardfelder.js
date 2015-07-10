/**
 * Benutzt view alt_arten_mit_synonymen
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

  var ergaenzeObjektUmInformationenVonSynonymen = require('lists/lib/ergaenzeObjektUmInformationenVonSynonymen'),
    ergaenzeDsBsVonSynonym = require('lists/lib/ergaenzeDsBsVonSynonym'),
    fuegeObligatorischeFelderFuerAltEin = require('lists/lib/fuegeObligatorischeFelderFuerAltEin'),
    _ = require('lists/lib/underscore'),
    row,
    objekt,
    exportObjekte = [],
    exportObjekt,
    gruppen,
    beziehungssammlungenAusSynonymen,
    datensammlungenAusSynonymen,
    ergänzeDsBsVonSynonymReturn

  // arrays für sammlungen aus synonymen gründen
  beziehungssammlungenAusSynonymen = []
  datensammlungenAusSynonymen = []

  while (row = getRow()) {
    objekt = row.doc

    if (row.key[1] === 0) {
      // das ist ein Synonym
      // wir erstellen je eine Liste aller in Synonymen enthaltenen Eigenschaften- und Beziehungssammlungen inkl. der darin enthaltenen Daten
      // nämlich: datensammlungenAusSynonymen und beziehungssammlungenAusSynonymen
      // später können diese, wenn nicht im Originalobjekt enthalten, angefügt werden
      ergänzeDsBsVonSynonymReturn = ergaenzeDsBsVonSynonym(objekt, datensammlungenAusSynonymen, beziehungssammlungenAusSynonymen)
      datensammlungenAusSynonymen = ergänzeDsBsVonSynonymReturn[0]
      beziehungssammlungenAusSynonymen = ergänzeDsBsVonSynonymReturn[1]

    } else if (row.key[1] === 1) {
      // wir sind jetzt im Originalobjekt
      // sicherstellen, dass DS und BS existieren
      objekt.Eigenschaftensammlungen = objekt.Eigenschaftensammlungen || []
      objekt.Beziehungssammlungen = objekt.Beziehungssammlungen || []

      // allfällige DS und BS aus Synonymen anhängen
      objekt = ergaenzeObjektUmInformationenVonSynonymen(objekt, datensammlungenAusSynonymen, beziehungssammlungenAusSynonymen)

      // exportobjekt gründen bzw. zurücksetzen
      exportObjekt = {}

      // Für das ALT obligatorische Felder hinzufügen
      exportObjekt = fuegeObligatorischeFelderFuerAltEin(objekt, exportObjekt)

      // Objekt zu Exportobjekten hinzufügen
      // wenn etwas versagte ist exportObjekt = {}
      if (_.keys(exportObjekt).length > 0) exportObjekte.push(exportObjekt)

      // arrays für sammlungen aus synonymen zurücksetzen
      beziehungssammlungenAusSynonymen = []
      datensammlungenAusSynonymen = []
    }
  }

  send(JSON.stringify(exportObjekte))
}