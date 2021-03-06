'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function () {
  $('#adminKorrigiereArtwertnameInFloraRueckmeldung').html('Daten werden analysiert...')
  var $db = $.couch.db('artendb')

  $db.view('artendb/flora?include_docs=true', {
    success: function (data) {
      var korrigiert = 0,
        fehler = 0,
        save

      _.each(data.rows, function (row) {
        var art = row.doc,
          dsArtwert,
          daten = {}

        if (art.Eigenschaftensammlungen) {
          dsArtwert = _.find(art.Eigenschaftensammlungen, function (ds) {
            return ds.Name === 'ZH Artwert (aktuell)'
          })
          // if (dsArtwert && dsArtwert.Eigenschaften && dsArtwert.Eigenschaften['Artwert KT ZH']) {
          if (dsArtwert && dsArtwert.Eigenschaften) {
            save = false
            // loopen und neu aufbauen, damit die Reihenfolge der keys erhalten bleibt (hoffentlich)
            _.each(dsArtwert.Eigenschaften, function (value, key) {
              if (key === 'Artwert KT ZH') {
                key = 'Artwert'
                save = true
              }
              daten[key] = value
            })
            if (save) {
              dsArtwert.Eigenschaften = daten
              $db.saveDoc(art, {
                success: function () {
                  korrigiert++
                  $('#adminKorrigiereArtwertnameInFloraRueckmeldung').html('Total: ' + data.rows.length + '. Korrigiert: ' + korrigiert + ', Fehler: ' + fehler)
                },
                error: function () {
                  fehler++
                  $('#adminKorrigiereArtwertnameInFloraRueckmeldung').html('Total: ' + data.rows.length + '. Korrigiert: ' + korrigiert + ', Fehler: ' + fehler)
                }
              })
            }
          }
        }
      })
      if (korrigiert === 0) {
        $('#adminKorrigiereArtwertnameInFloraRueckmeldung').html("Es gibt offenbar keine Felder mehr mit Namen 'Artwert KT ZH'")
      }
    },
    error: function () {
      console.log('onClickAdminKorrigiereArtwertnameInFlora: keine Daten erhalten')
    }
  })
}
