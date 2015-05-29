'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function (dsName, objekt) {
  var $db = $.couch.db('artendb')

  if (objekt.Eigenschaftensammlungen && objekt.Eigenschaftensammlungen.length > 0) {
    objekt.Eigenschaftensammlungen = _.reject(objekt.Eigenschaftensammlungen, function (datensammlung) {
      return datensammlung.Name === dsName
    })
    // in artendb speichern
    $db.saveDoc(objekt)
    // mitteilen, dass eine ds entfernt wurde
    $(document).trigger('adb.dsEntfernt')
    // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)

  /* am 12.11.2014 durch obigen Code ersetzt
  for (i = 0; i < objekt.Eigenschaftensammlungen.length; i++) {
      if (objekt.Eigenschaftensammlungen[i].Name === dsName) {
          objekt.Eigenschaftensammlungen.splice(i, 1)
          $db.saveDoc(objekt)
          // mitteilen, dass eine ds entfernt wurde
          $(document).trigger('adb.dsEntfernt')
          // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
          break
      }
  }*/
  }
}
