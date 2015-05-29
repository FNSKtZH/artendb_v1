// holt eine Liste aller Datensammlungen, wenn nötig
// speichert sie in einer globalen Variable, damit sie wiederverwendet werden kann

'use strict'

var $ = require('jquery')

module.exports = function () {
  var exfeGeholt = $.Deferred(),
    $db = $.couch.db('artendb')

  if (window.adb.dsBsVonObjekten) {
    exfeGeholt.resolve()
  } else {
    $db.view('artendb/ds_von_objekten?group_level=5', {
      success: function (data) {
        // Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
        window.adb.dsBsVonObjekten = data
        exfeGeholt.resolve()
      }
    })
  }
  return exfeGeholt.promise()
}
