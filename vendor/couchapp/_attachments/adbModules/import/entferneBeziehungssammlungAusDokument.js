// übernimmt die id des zu verändernden Dokuments
// und den Namen der Beziehungssammlung, die zu entfernen ist
// entfernt die Beziehungssammlung

'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function (id, bsName) {
  var $db = $.couch.db('artendb')

  $db.openDoc(id, {
    success: function (doc) {
      // Beziehungssammlung entfernen
      doc.Beziehungssammlungen = _.reject(doc.Beziehungssammlungen, function (beziehungssammlung) {
        return beziehungssammlung.Name === bsName
      })
      // in artendb speichern
      $db.saveDoc(doc)
      // mitteilen, dass eine ds entfernt wurde
      $(document).trigger('adb.bsEntfernt')
    // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
    }
  })
}
