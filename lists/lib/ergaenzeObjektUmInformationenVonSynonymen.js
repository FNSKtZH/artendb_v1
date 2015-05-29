'use strict'

var _ = require('lists/lib/underscore')

// ergänzt ein Objekt um fehlende Informationen seiner Synonyme
module.exports = function (objekt, datensammlungenAusSynonymen, beziehungssammlungenAusSynonymen) {
  // allfällige DS und BS aus Synonymen anhängen
  // zuerst DS
  // eine Liste der im objekt enthaltenen DsNamen erstellen
  var dsNamen = [],
    bsNamen = [],
    dsAusSynName2,
    bsAusSynName2

  if (objekt.Eigenschaftensammlungen.length > 0) {
    _.each(objekt.Eigenschaftensammlungen, function (datensammlung) {
      if (datensammlung.Name) {
        dsNamen.push(datensammlung.Name)
      }
    })
  }
  // nicht enthaltene Eigenschaftensammlungen ergänzen
  if (datensammlungenAusSynonymen.length > 0) {
    _.each(datensammlungenAusSynonymen, function (datensammlung) {
      dsAusSynName2 = datensammlung.Name
      if (dsNamen.length === 0 || dsAusSynName2.indexOf(dsNamen) === -1) {
        objekt.Eigenschaftensammlungen.push(datensammlung)
        // den Namen zu den dsNamen hinzufügen, damit diese DS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
        dsNamen.push(dsAusSynName2)
      }
    })
  }
  // jetzt BS aus Synonymen anhängen
  // eine Liste der im objekt enthaltenen BsNamen erstellen
  if (objekt.Beziehungssammlungen.length > 0) {
    _.each(objekt.Beziehungssammlungen, function (beziehungssammlung) {
      if (beziehungssammlung.Name) {
        bsNamen.push(beziehungssammlung.Name)
      }
    })
  }
  // nicht enthaltene Beziehungssammlungen ergänzen
  if (beziehungssammlungenAusSynonymen.length > 0) {
    _.each(beziehungssammlungenAusSynonymen, function (beziehungssammlung) {
      bsAusSynName2 = beziehungssammlung.Name
      if (bsNamen.length === 0 || bsAusSynName2.indexOf(bsNamen) === -1) {
        objekt.Beziehungssammlungen.push(beziehungssammlung)
        // den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird
        // auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
        bsNamen.push(bsAusSynName2)
      }
    })
  }
  return objekt
}
