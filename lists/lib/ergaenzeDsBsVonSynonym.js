'use strict'

var _ = require('lists/lib/underscore')

module.exports = function (objekt, datensammlungenAusSynonymen, beziehungssammlungenAusSynonymen) {
  var dsAusSynNamen = [],
    bsAusSynNamen = [],
    dsAusSynName,
    bsAusSynName

  if (objekt.Eigenschaftensammlungen && objekt.Eigenschaftensammlungen.length > 0) {
    if (datensammlungenAusSynonymen.length > 0) {
      _.each(datensammlungenAusSynonymen, function (datensammlung) {
        if (datensammlung.Name) {
          dsAusSynNamen.push(datensammlung.Name)
        }
      })
    }
    _.each(objekt.Eigenschaftensammlungen, function (datensammlung) {
      dsAusSynName = datensammlung.Name
      if (dsAusSynNamen.length === 0 || dsAusSynName.indexOf(dsAusSynNamen) === -1) {
        datensammlungenAusSynonymen.push(datensammlung)
        // sicherstellen, dass diese ds nicht nochmals gepuscht wird
        dsAusSynNamen.push(dsAusSynName)
      }
    })
  }
  if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
    if (beziehungssammlungenAusSynonymen.length > 0) {
      _.each(beziehungssammlungenAusSynonymen, function (beziehungssammlung) {
        if (beziehungssammlung.Name) {
          bsAusSynNamen.push(beziehungssammlung.Name)
        }
      })
    }
    _.each(objekt.Beziehungssammlungen, function (beziehungssammlung) {
      bsAusSynName = beziehungssammlung.Name
      if (bsAusSynNamen.length === 0 || bsAusSynName.indexOf(bsAusSynNamen) === -1) {
        beziehungssammlungenAusSynonymen.push(beziehungssammlung)
        // sicherstellen, dass diese bs nicht nochmals gepuscht wird
        bsAusSynNamen.push(bsAusSynName)
      }
    })
  }
  return [datensammlungenAusSynonymen, beziehungssammlungenAusSynonymen]
}
