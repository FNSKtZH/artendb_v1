// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensaetze) und die Liste der zu aktualisierenden Datensätze (window.adb.zuordbareDatensaetze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung

'use strict'

var _ = require('underscore'),
  $ = require('jquery'),
  fuegeDatensammlungZuObjekt = require('./fuegeDatensammlungZuObjekt')

// $ wird benötigt wegen .modal
module.exports = function () {
  var datensammlung,
    anzahlFelder,
    anzDs = window.adb.dsDatensaetze.length,
    // Der Verlauf soll angezeigt werden, daher braucht es einen zähler
    anzDsImportiert = 0,
    dsImportiert = $.Deferred(),
    $dsName = $('#dsName'),
    $dsBeschreibung = $('#dsBeschreibung'),
    nr,
    rueckmeldungLinks = '',
    rueckmeldung,
    $dsDatenstand = $('#dsDatenstand'),
    $dsNutzungsbedingungen = $('#dsNutzungsbedingungen'),
    $dsLink = $('#dsLink'),
    $dsUrsprungsDs = $('#dsUrsprungsDs'),
    $importDsImportAusfuehrenHinweis = $('#importDsImportAusfuehrenHinweis'),
    $importDsImportAusfuehrenHinweisText = $('#importDsImportAusfuehrenHinweisText'),
    erste10Ids,
    dsDatensatzMitRichtigerId

  // prüfen, ob ein DsName erfasst wurde. Wenn nicht: melden
  if (!$dsName.val()) {
    $('#meldungIndividuellLabel').html('Namen fehlt')
    $('#meldungIndividuellText').html('Bitte geben Sie der Datensammlung einen Namen')
    $('#meldungIndividuellSchliessen').html('schliessen')
    $('#meldungIndividuell').modal()
    $dsName.focus()
    return false
  }

  // changes feed einrichten
  // versucht, view als Filter zu verwenden, oder besser, den expliziten Filter dsimport mit dsname als Kriterium
  // Ergebnis: bei view kamen alle changes, auch design doc. Bei dsimport kam nichts.
  /*var changes_options = {}
  changes_options.dsname = $dsName.val()
  changes_options.filter = 'artendb/dsimport'
  window.adb.queryChangesStartingNow()

  // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
  $(document).bind('longpoll-data', function (event, data) {
      anzDsImportiert = anzDsImportiert + data.results.length
      var prozent = Math.round(anzDsImportiert/anzDs*100)
      $('#dsImportProgressbar').css('width', prozent +'%').attr('aria-valuenow', prozent)
      if (anzDsImportiert >= anzDs-1 && anzDsImportiert <= anzDs) {
          // Rückmeldung in Feld anzeigen:
          $importDsImportAusfuehrenHinweis.css('display', 'block')
      }
  });*/

  // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
  $(document).bind('adb.dsHinzugefuegt', function () {
    anzDsImportiert++
    var prozent = Math.round(anzDsImportiert / anzDs * 100),
      $db = $.couch.db('artendb')

    $('#dsImportProgressbar')
      .css('width', prozent + '%')
      .attr('aria-valuenow', prozent)
    $('#dsImportProgressbarText').html(prozent + '%')
    $importDsImportAusfuehrenHinweis.removeClass('alert-success').removeClass('alert-danger').addClass('alert-info')
    rueckmeldung = 'Die Daten wurden importiert.<br>Die Indexe werden aktualisiert...'
    $importDsImportAusfuehrenHinweisText.html(rueckmeldung)
    $('html, body').animate({
      scrollTop: $importDsImportAusfuehrenHinweis.offset().top
    }, 2000)
    if (anzDsImportiert === anzDs) {
      // die Indexe aktualisieren
      $db.view('artendb/lr', {
        success: function () {
          // melden, dass views aktualisiert wurden
          $importDsImportAusfuehrenHinweis.removeClass('alert-info').removeClass('alert-danger').addClass('alert-success')
          rueckmeldung = 'Die Daten wurden importiert.<br>'
          rueckmeldung += 'Die Indexe wurden aktualisiert.<br><br>'
          rueckmeldung += 'Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>'
          $importDsImportAusfuehrenHinweisText.html(rueckmeldung + rueckmeldungLinks)
          // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
          window.adb.rueckmeldungLinks = rueckmeldungLinks
          $('html, body').animate({
            scrollTop: $importDsImportAusfuehrenHinweis.offset().top
          }, 2000)
        },
        error: function () {
          console.log('importiereDatensammlung: keine Daten erhalten')
        }
      })
    }
  })

  _.each(window.adb.dsDatensaetze, function (dsDatensatz) {
    // Datensammlung als Objekt gründen
    datensammlung = {}
    datensammlung.Name = $dsName.val()
    if ($dsBeschreibung.val()) {
      datensammlung.Beschreibung = $dsBeschreibung.val()
    }
    if ($dsDatenstand.val()) {
      datensammlung.Datenstand = $dsDatenstand.val()
    }
    if ($dsNutzungsbedingungen.val()) {
      datensammlung.Nutzungsbedingungen = $dsNutzungsbedingungen.val()
    }
    if ($dsLink.val()) {
      datensammlung.Link = $dsLink.val()
    }
    // falls die Datensammlung zusammenfassend ist
    if ($('#dsZusammenfassend').prop('checked')) {
      datensammlung.zusammenfassend = true
    }
    if ($dsUrsprungsDs.val()) {
      datensammlung.Ursprungsdatensammlung = $dsUrsprungsDs.val()
    }
    datensammlung['importiert von'] = localStorage.email
    // Felder der Datensammlung als Objekt gründen
    datensammlung.Eigenschaften = {}
    // Felder anfügen, wenn sie Werte enthalten
    anzahlFelder = 0
    _.each(dsDatensatz, function (feldwert, feldname) {
      // nicht importiert wird die ID und leere Felder
      // und keine Taxonomie ID, wenn sie nur wegen der Identifikation mitgeliefert wurde
      // if (feldname !== window.adb.dsFelderId && feldwert !== '' && feldwert !== null && (window.adb.dsId !== 'guid' && feldname !== 'Taxonomie ID')) {
      if (feldname !== window.adb.dsFelderId && feldwert !== '' && feldwert !== null) {
        if (feldwert === -1) {
          // Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
          datensammlung.Eigenschaften[feldname] = true
        } else if (feldwert == 'true') {
          // true/false nicht als string importieren
          datensammlung.Eigenschaften[feldname] = true
        } else if (feldwert == 'false') {
          datensammlung.Eigenschaften[feldname] = false
        } else if (feldwert == parseInt(feldwert, 10)) {
          // Ganzzahlen als Zahlen importieren
          datensammlung.Eigenschaften[feldname] = parseInt(feldwert, 10)
        } else if (feldwert == parseFloat(feldwert)) {
          // Bruchzahlen als Zahlen importieren
          datensammlung.Eigenschaften[feldname] = parseFloat(feldwert)
        } else {
          // Normalfall
          datensammlung.Eigenschaften[feldname] = feldwert
        }
        anzahlFelder += 1
      }
    })
    // entsprechenden Index öffnen
    // sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
    if (anzahlFelder > 0) {
      // Datenbankabfrage ist langsam. Extern aufrufen,
      // sonst überholt die for-Schlaufe und Datensammlung ist bis zur saveDoc-Ausführung eine andere!
      var guid
      if (window.adb.dsId === 'guid') {
        // die in der Tabelle mitgelieferte id ist die guid
        guid = dsDatensatz[window.adb.dsFelderId]
      } else {
        dsDatensatzMitRichtigerId = _.find(window.adb.zuordbareDatensaetze, function (datensatz) {
          return datensatz.Id == dsDatensatz[window.adb.dsFelderId]
        })
        guid = dsDatensatzMitRichtigerId.Guid
      }
      // kann sein, dass der guid oben nicht zugeordnet werden konnte. Dann nicht anfügen
      if (guid) {
        console.log('füge ds zu objekt')
        fuegeDatensammlungZuObjekt(guid, datensammlung)
      }
    }
  })
  // Für 10 Kontrollbeispiele die Links aufbauen
  if (window.adb.dsId === 'guid') {
    erste10Ids = _.first(window.adb.zuordbareDatensaetze, 10)
  } else {
    erste10Ids = _.pluck(_.first(window.adb.zuordbareDatensaetze, 10), 'Guid')
  }
  _.each(erste10Ids, function (id, index) {
    nr = index + 1
    rueckmeldungLinks += '<a href="' + $(window.location).attr('protocol') + '//' + $(window.location).attr('host') + $(window.location).attr('pathname') + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>'
  })

  // Rückmeldung in Feld anzeigen
  $importDsImportAusfuehrenHinweis.removeClass('alert-success').removeClass('alert-danger').addClass('alert-info')
  rueckmeldung = 'Die Daten werden importiert...'
  $importDsImportAusfuehrenHinweisText.html(rueckmeldung)
  $importDsImportAusfuehrenHinweis.css('display', 'block')
  $('html, body').animate({
    scrollTop: $importDsImportAusfuehrenHinweis.offset().top
  }, 2000)
  dsImportiert.resolve()
}
