// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben

'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  sortiereObjektarrayNachName = require('../sortiereObjektarrayNachName')

module.exports = function (guid, datensammlung) {
  var $db = $.couch.db('artendb')

  $db.openDoc(guid, {
    success: function (doc) {
      // sicherstellen, dass Eigenschaftensammlung existiert
      if (!doc.Eigenschaftensammlungen) {
        doc.Eigenschaftensammlungen = []
      }
      // falls dieselbe Datensammlung schon existierte: löschen
      // trifft z.B. zu bei zusammenfassenden
      doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function (es) {
        return es.Name === datensammlung.Name
      })
      // Datensammlung anfügen
      doc.Eigenschaftensammlungen.push(datensammlung)
      // sortieren
      // Eigenschaftensammlungen nach Name sortieren
      doc.Eigenschaftensammlungen = sortiereObjektarrayNachName(doc.Eigenschaftensammlungen)
      // in artendb speichern
      $db.saveDoc(doc)
      // mitteilen, dass ein ds importiert wurde
      $(document).trigger('adb.dsHinzugefuegt')
    // TODO: Scheitern des Speicherns abfangen (trigger adb.ds_nicht_hinzugefügt)
    }
  })
}
