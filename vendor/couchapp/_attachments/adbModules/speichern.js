// schreibt Änderungen in Feldern in die Datenbank
// wird vorläufig nur für LR Taxonomie verwendet

'use strict'

var Uri = require('jsuri'),
  $ = require('jquery'),
  initiiereArt = require('./initiiereArt'),
  ersetzeUngueltigeZeichenInIdNamen = require('./ersetzeUngueltigeZeichenInIdNamen'),
  convertToCorrectType = require('./convertToCorrectType'),
  erstelleLrLabelName = require('./lr/erstelleLrLabelName'),
  aktualisiereHierarchieEinesLrInklusiveSeinerChildren = require('./lr/aktualisiereHierarchieEinesLrInklusiveSeinerChildren')

module.exports = function () {
  // zuerst die id des Objekts holen
  var that = this,
    uri = new Uri($(window.location).attr('href')),
    id = uri.getQueryParamValue('id'),
    // wenn browser history nicht unterstützt, erstellt history.js eine hash
    // dann muss die id durch die id in der hash ersetzt werden
    hash = uri.anchor(),
    uri2,
    neuerNodetext,
    $db = $.couch.db('artendb'),
    feldwert,
    feldname

  // TODO: später für alle Feldtypen verallgemeinern
  feldwert = $(that).val()
  feldname = that.id

  // in dieser Funktion lassen, sonst ist $ nicht definiert
  function meldeFehler (feldname) {
    $('#meldungIndividuellLabel').html('Fehler')
    $('#meldungIndividuellText').html('Die letzte Änderung im Feld ' + feldname + ' wurde nicht gespeichert')
    $('#meldungIndividuellSchliessen').html('schliessen')
    $('#meldungIndividuell').modal()
  }

  if (hash) {
    uri2 = new Uri(hash)
    id = uri2.getQueryParamValue('id')
  }
  // sicherstellen, dass boolean, float und integer nicht in Text verwandelt werden
  feldwert = convertToCorrectType(feldwert)

  $db.openDoc(id, {
    success: function (object) {
      // prüfen, ob Einheit eines LR verändert wurde. Wenn ja: Name der Taxonomie anpassen
      if (feldname === 'Einheit' && object.Taxonomie.Eigenschaften.Einheit === object.Taxonomie.Eigenschaften.Taxonomie) {
        // das ist die Wurzel der Taxonomie
        // somit ändert auch der Taxonomiename
        // diesen mitgeben
        // Einheit ändert und Taxonomiename muss auch angepasst werden
        object.Taxonomie.Name = feldwert
        object.Taxonomie.Eigenschaften.Taxonomie = feldwert
      // TODO: prüfen, ob die Änderung zulässig ist (Taxonomiename eindeutig) --- VOR DEM SPEICHERN
      // TODO: allfällige Beziehungen anpassen
      }
      // den übergebenen Wert im übergebenen Feldnamen speichern
      object.Taxonomie.Eigenschaften[feldname] = feldwert

      $db.saveDoc(object, {
        success: function (data) {
          console.log('data: ', data)
          console.log('object: ', object)
          object._rev = data.rev
          // prüfen, ob Label oder Name eines LR verändert wurde. Wenn ja: Hierarchie aktualisieren
          if (feldname === 'Label' || feldname === 'Einheit') {
            if (feldname === 'Einheit' && object.Taxonomie.Eigenschaften.Einheit === object.Taxonomie.Eigenschaften.Taxonomie) {
              // das ist die Wurzel der Taxonomie
              // somit ändert auch der Taxonomiename
              // diesen mitgeben
              // Einheit ändert und Taxonomiename muss auch angepasst werden
              aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, feldwert)
              // Feld Taxonomie und Beschriftung des Accordions aktualisiern
              // dazu neu initiieren, weil sonst das Accordion nicht verändert wird
              initiiereArt(id)
              // Taxonomie anzeigen
              $('#' + ersetzeUngueltigeZeichenInIdNamen(feldwert)).collapse('show')
            } else {
              aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, false)
            }
            // node umbenennen
            if (feldname === 'Label') {
              // object hat noch den alten Wert für Label, neuen verwenden
              neuerNodetext = erstelleLrLabelName(feldwert, object.Taxonomie.Eigenschaften.Einheit)
            } else {
              // object hat noch den alten Wert für Einheit, neuen verwenden
              neuerNodetext = erstelleLrLabelName(object.Taxonomie.Eigenschaften.Label, feldwert)
            }
            $('#tree' + window.adb.gruppe).jstree('rename_node', '#' + object._id, neuerNodetext)
          }
        },
        error: function () {
          meldeFehler(feldname)
        }
      })
    },
    error: function () {
      meldeFehler(feldname)
    }
  })
}
