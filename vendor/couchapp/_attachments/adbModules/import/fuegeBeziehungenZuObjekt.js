// fügt der Art eine Beziehungssammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben

'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  sortiereBeziehungenNachName = require('../sortiereBeziehungenNachName'),
  sortiereObjektarrayNachName = require('../sortiereObjektarrayNachName')

module.exports = function (guid, beziehungssammlung, beziehungen) {
  var $db = $.couch.db('artendb'),
    hinzugefuegt,
    entsprechendeBezSammlungInObjekt

  $db.openDoc(guid, {
    success: function (doc) {
      // prüfen, ob die Beziehung schon existiert
      if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
        hinzugefuegt = false
        entsprechendeBezSammlungInObjekt = _.find(doc.Beziehungssammlungen, function (bezSammlungInObjekt) {
          return bezSammlungInObjekt.Name === beziehungssammlung.Name
        })
        if (entsprechendeBezSammlungInObjekt) {
          _.each(beziehungen, function (beziehung) {
            if (!_.contains(entsprechendeBezSammlungInObjekt.Beziehungen, beziehung)) {
              entsprechendeBezSammlungInObjekt.Beziehungen.push(beziehung)
            }
          })
          // Beziehungen nach Name sortieren
          entsprechendeBezSammlungInObjekt.Beziehungen = sortiereBeziehungenNachName(entsprechendeBezSammlungInObjekt.Beziehungen)
          hinzugefuegt = true
        }
        if (!hinzugefuegt) {
          // die Beziehungssammlung existiert noch nicht
          beziehungssammlung.Beziehungen = []
          _.each(beziehungen, function (beziehung) {
            beziehungssammlung.Beziehungen.push(beziehung)
          })
          // Beziehungen nach Name sortieren
          beziehungssammlung.Beziehungen = sortiereBeziehungenNachName(beziehungssammlung.Beziehungen)
          doc.Beziehungssammlungen.push(beziehungssammlung)
        }
      } else {
        // Beziehungssammlung anfügen
        beziehungssammlung.Beziehungen = []
        _.each(beziehungen, function (beziehung) {
          beziehungssammlung.Beziehungen.push(beziehung)
        })
        // Beziehungen nach Name sortieren
        beziehungssammlung.Beziehungen = sortiereBeziehungenNachName(beziehungssammlung.Beziehungen)
        doc.Beziehungssammlungen = []
        doc.Beziehungssammlungen.push(beziehungssammlung)
      }
      // Beziehungssammlungen nach Name sortieren
      doc.Beziehungssammlungen = sortiereObjektarrayNachName(doc.Beziehungssammlungen)
      // in artendb speichern
      $db.saveDoc(doc)
      // mitteilen, dass eine bs importiert wurde
      $(document).trigger('adb.bsHinzugefuegt')
    // TODO: Scheitern des Speicherns abfangen (trigger adb.bs_nicht_hinzugefügt)
    }
  })
}
