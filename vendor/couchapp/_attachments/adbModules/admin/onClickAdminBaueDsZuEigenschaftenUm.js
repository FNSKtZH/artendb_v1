'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function () {
  var $adminBaueDsZuEigenschaftenUmRueckmeldung = $('#adminBaueDsZuEigenschaftenUmRueckmeldung'),
    $db = $.couch.db('artendb')

  $adminBaueDsZuEigenschaftenUmRueckmeldung.html('Daten werden analysiert...')
  $db.view('artendb/all_docs?include_docs=true', {
    success: function (data) {
      var korrigiert = 0,
        fehler = 0

      if (data.rows.length === 0) {
        $adminBaueDsZuEigenschaftenUmRueckmeldung.html('Keine Daten erhalten')
        return
      }
      _.each(data.rows, function (row) {
        var art = row.doc,
          datensammlungen,
          beziehungssammlungen,
          dsDaten,
          taxDaten,
          save = false
        // Datensammlungen umbenennen
        // ds und bs entfernen, danach in der richtigen Reihenfolge hinzufügen
        // damit die Reihenfolge bewahrt bleibt
        if (art.Taxonomie && art.Taxonomie.Daten) {
          taxDaten = art.Taxonomie.Daten
          delete art.Taxonomie.Daten
          art.Taxonomie.Eigenschaften = taxDaten
          save = true
        }
        if (art.Datensammlungen) {
          datensammlungen = art.Datensammlungen
          _.each(datensammlungen, function (ds) {
            if (ds.Daten) {
              dsDaten = ds.Daten
              delete ds.Daten
              ds.Eigenschaften = dsDaten
            }
          })
          delete art.Datensammlungen
          if (art.Beziehungssammlungen) {
            beziehungssammlungen = art.Beziehungssammlungen
            delete art.Beziehungssammlungen
          } else {
            beziehungssammlungen = {}
          }
          art.Eigenschaftensammlungen = datensammlungen
          art.Beziehungssammlungen = beziehungssammlungen
          save = true
        }
        if (save) {
          $db.saveDoc(art, {
            success: function () {
              korrigiert++
              $adminBaueDsZuEigenschaftenUmRueckmeldung.html('Anzahl Dokumente in DB: ' + data.rows.length + '. Umbenannt: ' + korrigiert + ', Fehler: ' + fehler)
            },
            error: function () {
              fehler++
              $adminBaueDsZuEigenschaftenUmRueckmeldung.html('Anzahl Dokumente in DB: ' + data.rows.length + '. Umbenannt: ' + korrigiert + ', Fehler: ' + fehler)
            }
          })
        }

      })
      if (korrigiert === 0) {
        $adminBaueDsZuEigenschaftenUmRueckmeldung.html('Es gibt offenbar keine Datensammlungen mehr, die umbenannt werden müssen')
      }
    },
    error: function () {
      console.log('onClickAdminBaueDsZuEigenschaftenUm: keine Daten erhalten')
    }
  })
}
