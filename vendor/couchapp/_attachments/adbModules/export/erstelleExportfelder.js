// übernimmt anfangs drei arrays: taxonomien, datensammlungen und beziehungssammlungen
// verarbeitet immer den ersten array und ruft sich mit den übrigen selber wieder auf
// formular: hier kommt 'exportAlt', wenn die Felder für das ALT gewählt werden (sonst nichts)

'use strict'

var _ = require('underscore')
// Autolinker caused error: Uncaught TypeError: textOrHtml.substring is not a function
// make sure not to update above v0.22
var Autolinker = require('autolinker')
var $ = require('jquery')
var ersetzeUngueltigeZeichenInIdNamen = require('../ersetzeUngueltigeZeichenInIdNamen')
var capitaliseFirstLetter = require('../capitaliseFirstLetter')

var erstelleExportfelder = function (taxonomien, datensammlungen, beziehungssammlungen, formular) {
  var htmlFelderWaehlen = '',
    htmlFiltern = '',
    dsTyp,
    dsbsVonObjekten = [],
    dsbsVonObjekt,
    dsFelderObjekt,
    html,
    alt = ''

  if (formular === 'exportAlt') {
    alt = 'Alt'
    // fürs alt muss die GUID nicht mitgeliefert werden
    $('#exportAltFelderWaehlenObjektId').prop('checked', false)
  }

  // Eigenschaftensammlungen vorbereiten
  // Struktur von window.adb.dsBsVonObjekten ist jetzt: [dsTyp, ds.Name, ds.zusammenfassend, ds['importiert von'], Felder_array]
  // erst mal die nicht benötigten Werte entfernen
  _.each(window.adb.dsBsVonObjekten.rows, function (objectWithArrayInKey) {
    dsbsVonObjekten.push([objectWithArrayInKey.key[1], objectWithArrayInKey.key[4]])
  })
  // Struktur von dsbsVonObjekten ist jetzt: [ds.Name, felderObjekt]
  // jetzt gibt es Mehrfacheinträge, diese entfernen
  dsbsVonObjekten = _.union(dsbsVonObjekten)

  if (taxonomien && datensammlungen && beziehungssammlungen) {
    dsTyp = 'Taxonomie'
    htmlFelderWaehlen += '<h3>Taxonomie</h3>'
    htmlFiltern += '<h3>Taxonomie</h3>'
  } else if (taxonomien && datensammlungen) {
    dsTyp = 'Datensammlung'
    htmlFelderWaehlen += '<h3>Eigenschaftensammlungen</h3>'
    htmlFiltern += '<h3>Eigenschaftensammlungen</h3>'
  } else {
    dsTyp = 'Beziehung'
    // bei 'felder wählen' soll man auch wählen können, ob pro Beziehung eine Zeile oder alle Beziehungen in ein Feld geschrieben werden sollen
    // das muss auch erklärt sein
    htmlFelderWaehlen += '<h3>Beziehungssammlungen</h3><div class="exportZumTitelGehoerig"><div class="well well-sm" style="margin-top:9px;"><b>Sie können aus zwei Varianten wählen</b> <a href="#" class="showNextHidden">...mehr</a><ol class="adb-hidden"><li>Pro Beziehung eine Zeile (Standardeinstellung):<ul><li>Für jede Art oder Lebensraum wird pro Beziehung eine neue Zeile erzeugt</li><li>Anschliessende Auswertungen sind so meist einfacher auszuführen</li><li>Dafür können Sie aus maximal einer Beziehungssammlung Felder wählen (aber wie gewohnt mit beliebig vielen Feldern aus Taxonomie(n) und Eigenschaftensammlungen ergänzen)</li></ul></li><li>Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld:<ul><li>Von allen Beziehungen der Art oder des Lebensraums wird der Inhalt des Feldes kommagetrennt in das Feld der einzigen Zeile geschrieben</li><li>Sie können Felder aus beliebigen Beziehungssammlungen gleichzeitig exportieren</li></ul></li></ol></div><div class="radio"><label><input type="radio" id="export' + alt + 'BezInZeilen" checked="checked" name="exportBezWie">Pro Beziehung eine Zeile</label></div><div class="radio"><label><input type="radio" id="export' + alt + 'BezInFeldern" name="exportBezWie">Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld</label></div></div><hr>'
    htmlFiltern += '<h3>Beziehungssammlungen</h3>'
  }
  taxonomien = _.filter(taxonomien, function (taxonomie) {
    return taxonomie.Name !== 'Aktuelle Taxonomie'
  })
  _.each(taxonomien, function (taxonomie, index) {
    var x

    if (index > 0) {
      htmlFelderWaehlen += '<hr>'
      htmlFiltern += '<hr>'
    }

    htmlFelderWaehlen += '<h5>' + taxonomie.Name
    htmlFiltern += '<h5>' + taxonomie.Name
    // informationen zur ds holen
    dsbsVonObjekt = _.find(dsbsVonObjekten, function (array) {
      return array[0] === taxonomie.Name
    })
    if (dsbsVonObjekt && dsbsVonObjekt[1]) {
      htmlFelderWaehlen += ' <a href="#" class="showNextHiddenExport">...mehr</a>'
      htmlFiltern += ' <a href="#" class="showNextHiddenExport">...mehr</a>'
      // ds-titel abschliessen
      htmlFelderWaehlen += '</h5>'
      htmlFiltern += '</h5>'
      // Felder der ds darstellen
      htmlFelderWaehlen += '<div class="adb-hidden">'
      htmlFiltern += '<div class="adb-hidden">'
      dsFelderObjekt = dsbsVonObjekt[1]
      _.each(dsFelderObjekt, function (feldwert, feldname) {
        if (feldname === 'zusammenfassend') {
          // nicht sagen, woher die Infos stammen, weil das Objekt-abhängig ist
          html = '<div class="dsBeschreibungZeile"><div>Zus.-fassend:</div><div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen</div></div>'
          htmlFelderWaehlen += html
          htmlFiltern += html
        } else if (feldname !== 'Ursprungsdatensammlung') {
          html = '<div class="dsBeschreibungZeile"><div>' + feldname + ':</div><div>' + Autolinker.link(feldwert ? '' + feldwert : '') + '</div></div>'
          htmlFelderWaehlen += html
          htmlFiltern += html
        }
      })
      htmlFelderWaehlen += '</div>'
      htmlFiltern += '</div>'
    } else {
      // ds-titel abschliessen
      htmlFelderWaehlen += '</h5>'
      htmlFiltern += '</h5>'
    }

    // jetzt die checkbox um alle auswählen zu können
    // aber nur, wenn mehr als 1 Feld existieren
    if ((taxonomie.Eigenschaften && _.size(taxonomie.Eigenschaften) > 1) || (taxonomie.Beziehungen && _.size(taxonomie.Beziehungen) > 1)) {
      htmlFelderWaehlen += '<div class="checkbox"><label>'
      htmlFelderWaehlen += '<input class="feldWaehlenAlleVonDs' + alt + '" type="checkbox" DsTyp="' + dsTyp + '" Datensammlung="' + taxonomie.Name + '"><em>alle</em>'
      htmlFelderWaehlen += '</div></label>'
    }
    htmlFelderWaehlen += '<div class="felderspalte">'

    htmlFiltern += '<div class="felderspalte">'
    for (x in (taxonomie.Eigenschaften || taxonomie.Beziehungen)) {
      // felder wählen
      htmlFelderWaehlen += '<div class="checkbox"><label>'
      htmlFelderWaehlen += '<input class="feldWaehlen" type="checkbox" DsTyp="' + dsTyp + '" Datensammlung="' + taxonomie.Name + '" Feld="' + x + '">' + x
      htmlFelderWaehlen += '</div></label>'
      // filtern
      htmlFiltern += '<div class="form-group">'
      htmlFiltern += '<label class="control-label" for="exportObjekteWaehlenDs' + capitaliseFirstLetter(ersetzeUngueltigeZeichenInIdNamen(x)) + '"'
      // Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
      if (x.length > 28) {
        htmlFiltern += ' style="padding-top:0px"'
      }
      htmlFiltern += '>' + x + '</label>'
      // if (taxonomie.Feldtyp === 'boolean') {
      if ((taxonomie.Eigenschaften && (taxonomie.Eigenschaften[x] === 'boolean')) || (taxonomie.Beziehungen && (taxonomie.Beziehungen[x] === 'boolean'))) {
        // in einer checkbox darstellen
        // readonly markiert, dass kein Wert erfasst wurde
        htmlFiltern += '<input class="controls form-control exportFeldFiltern form-control" type="checkbox" id="exportObjekteWaehlenDs' + capitaliseFirstLetter(ersetzeUngueltigeZeichenInIdNamen(x)) + '" DsTyp="' + dsTyp + '" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '" readonly>'
      } else {
        // in einem input-feld darstellen
        htmlFiltern += '<input class="controls form-control exportFeldFiltern form-control input-sm" type="text" id="exportObjekteWaehlenDs' + capitaliseFirstLetter(ersetzeUngueltigeZeichenInIdNamen(x)) + '" DsTyp="' + dsTyp + '" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '">'
      }
      htmlFiltern += '</div>'
    }
    // Spalten abschliessen
    htmlFelderWaehlen += '</div>'
    htmlFiltern += '</div>'
  })
  // linie voranstellen
  htmlFelderWaehlen = '<hr>' + htmlFelderWaehlen
  htmlFiltern = '<hr>' + htmlFiltern

  // html anfügen
  if (!formular || formular === 'export') {
    if (beziehungssammlungen) {
      $('#exportFelderWaehlenFelderliste').html(htmlFelderWaehlen)
      $('#exportObjekteWaehlenDsFelderliste').html(htmlFiltern)
      erstelleExportfelder(datensammlungen, beziehungssammlungen)
    } else if (datensammlungen) {
      $('#exportFelderWaehlenFelderliste').append(htmlFelderWaehlen)
      $('#exportObjekteWaehlenDsFelderliste').append(htmlFiltern)
      erstelleExportfelder(datensammlungen)
    } else {
      $('#exportFelderWaehlenFelderliste').append(htmlFelderWaehlen)
      $('#exportObjekteWaehlenDsFelderliste')
        .append(htmlFiltern)
        .find("input[type='checkbox']").each(function () {
        this.indeterminate = true
      })
    }
  }
  if (formular === 'exportAlt') {
    if (beziehungssammlungen) {
      $('#exportAltFelderWaehlenFelderliste').html(htmlFelderWaehlen)
      erstelleExportfelder(datensammlungen, beziehungssammlungen, null, 'exportAlt')
    } else if (datensammlungen) {
      $('#exportAltFelderWaehlenFelderliste').append(htmlFelderWaehlen)
      erstelleExportfelder(datensammlungen, null, null, 'exportAlt')
    } else {
      $('#exportAltFelderWaehlenFelderliste').append(htmlFelderWaehlen)
      // Rückmeldung ausblenden
      $('#exportAltFelderWaehlenHinweisText').hide()
    }
  }
}

module.exports = erstelleExportfelder
