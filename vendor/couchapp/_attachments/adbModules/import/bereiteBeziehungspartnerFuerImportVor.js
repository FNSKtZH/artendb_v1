'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function () {
  var alleBezPartnerArray = [],
    BezPartnerArray,
    beziehungspartnerVorbereitet = $.Deferred(),
    $db = $.couch.db('artendb')

  window.adb.bezPartnerObjekt = {}

  _.each(window.adb.bsDatensaetze, function (bsDatensatz) {
    if (bsDatensatz.Beziehungspartner) {
      // bsDatensatz.Beziehungspartner ist eine kommagetrennte Liste von guids
      // diese Liste in Array verwandeln
      BezPartnerArray = bsDatensatz.Beziehungspartner.split(', ')
      // und in window.adb.bsDatensaetze nachführen
      bsDatensatz.Beziehungspartner = BezPartnerArray
      // und vollständige Liste aller Beziehungspartner nachführen
      alleBezPartnerArray = _.union(alleBezPartnerArray, BezPartnerArray)
    }
  })
  // jetzt wollen wir ein Objekt bauen, das für alle Beziehungspartner das auszutauschende Objekt enthält
  // danach für jede guid Gruppe, Taxonomie (bei LR) und Name holen und ein Objekt draus machen
  $db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(alleBezPartnerArray)) + '&include_docs=true', {
    success: function (data) {
      var objekt,
        bezPartner

      _.each(data.rows, function (dataRow) {
        objekt = dataRow.doc
        bezPartner = {}
        bezPartner.Gruppe = objekt.Gruppe
        if (objekt.Gruppe === 'Lebensräume') {
          bezPartner.Taxonomie = objekt.Taxonomie.Eigenschaften.Taxonomie
          if (objekt.Taxonomie.Eigenschaften.Taxonomie.Label) {
            bezPartner.Name = objekt.Taxonomie.Eigenschaften.Label + ': ' + objekt.Taxonomie.Eigenschaften.Taxonomie.Einheit
          } else {
            bezPartner.Name = objekt.Taxonomie.Eigenschaften.Einheit
          }
        } else {
          bezPartner.Name = objekt.Taxonomie.Eigenschaften['Artname vollständig']
        }
        bezPartner.GUID = objekt._id
        window.adb.bezPartnerObjekt[objekt._id] = bezPartner
      })
    },
    error: function () {
      console.log('bereiteBeziehungspartnerFürImportVor: keine Daten erhalten')
    }
  })
  beziehungspartnerVorbereitet.resolve()
  return beziehungspartnerVorbereitet.promise()
}
