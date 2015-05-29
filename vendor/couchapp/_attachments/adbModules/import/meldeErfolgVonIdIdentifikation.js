// erhält dbs = 'Ds' oder 'Bs'

'use strict'

var _ = require('underscore'),
  $ = require('jquery'),
  meldeErfolgVonIdIdentifikation2 = require('./meldeErfolgVonIdIdentifikation2')

module.exports = function (dbs) {
  var $dbsFelderSelected = $('#' + dbs.toLowerCase() + 'Felder option:selected'),
    $dbsIdSelected = $('#' + dbs.toLowerCase() + 'Id option:selected'),
    idsVonDatensaetzen = [],
    mehrfachVorkommendeIds = [],
    idsVonNichtImportierbarenDatensaetzen = [],
    $db = $.couch.db('artendb')

  if ($dbsFelderSelected.length && $dbsIdSelected.length) {
    // beide ID's sind gewählt
    window.adb[dbs.toLowerCase() + 'FelderId'] = $dbsFelderSelected.val()
    window.adb.dsId = $dbsIdSelected.val()
    window.adb[dbs.toLowerCase() + 'Id'] = $dbsIdSelected.val()
    // das hier wird später noch für den Inmport gebraucht > globale Variable machen
    window.adb.zuordbareDatensaetze = []
    $('#import' + dbs + 'IdsIdentifizierenHinweisText')
      .alert()
      .html('Bitte warten, die Daten werden analysiert.<br>Das kann eine Weile dauern...')
      .removeClass('alert-success')
      .removeClass('alert-danger')
      .addClass('alert-info')
      .show()
    $('html, body').animate({
      scrollTop: $('#import' + dbs + 'IdsIdentifizierenCollapse').offset().top
    }, 2000)

    // Dokumente aus der Gruppe der Datensätze holen
    // durch alle loopen. Dabei einen Array von Objekten bilden mit id und guid
    // kontrollieren, ob eine id mehr als einmal vorkommt
    if (window.adb.dsId === 'guid') {
      $db.view('artendb/all_docs', {
        success: function (data) {
          var nameDesIdFelds = window.adb[dbs.toLowerCase() + 'FelderId'],
            zugehoerigesObjekt

          // durch die importierten Datensätze loopen
          _.each(window.adb[dbs.toLowerCase() + 'Datensaetze'], function (importDatensatz) {
            if (idsVonDatensaetzen.indexOf(importDatensatz[nameDesIdFelds]) === -1) {
              // diese ID wurde noch nicht hinzugefügt > hinzufügen
              idsVonDatensaetzen.push(importDatensatz[nameDesIdFelds])
              // prüfen, ob die ID zugeordnet werden kann
              zugehoerigesObjekt = _.find(data.rows, function (objektRow) {
                return objektRow.key === importDatensatz[nameDesIdFelds]
              })
              if (zugehoerigesObjekt) {
                window.adb.zuordbareDatensaetze.push(importDatensatz[nameDesIdFelds])
              } else {
                // diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
                idsVonNichtImportierbarenDatensaetzen.push(importDatensatz[nameDesIdFelds])
              }
            } else {
              // diese ID wurden schon hinzugefügt > mehrfach!
              mehrfachVorkommendeIds.push(importDatensatz[nameDesIdFelds])
            }
          })
          meldeErfolgVonIdIdentifikation2(mehrfachVorkommendeIds, idsVonDatensaetzen, idsVonNichtImportierbarenDatensaetzen, dbs)
        },
        error: function () {
          console.log('meldeErfolgVonIdentifikation: keine Daten erhalten')
        }
      })
    } else {
      $db.view('artendb/gruppe_id_taxonomieid?startkey=["' + window.adb.dsId + '"]&endkey=["' + window.adb.dsId + '",{},{}]', {
        success: function (data) {
          var nameDesIdFelds = window.adb[dbs.toLowerCase() + 'FelderId'],
            objekt

          // durch die importierten Datensätze loopen
          _.each(window.adb[dbs.toLowerCase() + 'Datensaetze'], function (importDatensatz) {
            if (idsVonDatensaetzen.indexOf(importDatensatz[nameDesIdFelds]) === -1) {
              // diese ID wurde noch nicht hinzugefügt > hinzufügen
              idsVonDatensaetzen.push(importDatensatz[nameDesIdFelds])
              // prüfen, ob die ID zugeordnet werden kann
              var zugehoerigesObjekt = _.find(data.rows, function (objektRow) {
                return objektRow.key[2] === importDatensatz[nameDesIdFelds]
              })
              if (zugehoerigesObjekt) {
                objekt = {}
                objekt.Id = parseInt(importDatensatz[nameDesIdFelds], 10)
                objekt.Guid = zugehoerigesObjekt.key[1]
                window.adb.zuordbareDatensaetze.push(objekt)
              } else {
                // diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
                idsVonNichtImportierbarenDatensaetzen.push(importDatensatz[nameDesIdFelds])
              }
            } else {
              // diese ID wurden schon hinzugefügt > mehrfach!
              mehrfachVorkommendeIds.push(importDatensatz[nameDesIdFelds])
            }
          })
          meldeErfolgVonIdIdentifikation2(mehrfachVorkommendeIds, idsVonDatensaetzen, idsVonNichtImportierbarenDatensaetzen, dbs)
        },
        error: function () {
          console.log('meldeErfolgVonIdentifikation: keine Daten erhalten')
        }
      })
    }
  }
}
