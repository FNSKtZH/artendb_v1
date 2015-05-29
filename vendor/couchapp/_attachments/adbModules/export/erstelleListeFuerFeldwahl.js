// baut im Formular 'export' die Liste aller Eigenschaften auf
// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
// bekommt die Namen der Gruppen
// formular ist im Standard export, wenn anders (z.B. exportAlt), übergeben

'use strict'

var _ = require('underscore'),
  $ = require('jquery'),
  erstelleListeFuerFeldwahl2 = require('./erstelleListeFuerFeldwahl2')

module.exports = function (exportGruppen, formular) {
  var gruppen = [],
    exportFelderArrays,
    $db = $.couch.db('artendb'),
    $exportObjekteWaehlenGruppenHinweisText = $('#exportObjekteWaehlenGruppenHinweisText'),
    $exportNurObjekteMitEigenschaftenCheckbox = $('#exportNurObjekteMitEigenschaftenCheckbox'),
    $exportNurObjekteMitEigenschaften = $('#exportNurObjekteMitEigenschaften'),
    $exportExportCollapse = $('#exportExportCollapse'),
    $exportFelderWaehlenCollapse = $('#exportFelderWaehlenCollapse'),
    $exportObjekteWaehlenDsCollapse = $('#exportObjekteWaehlenDsCollapse')

  // falls noch offen: folgende Bereiche schliessen
  if ($exportExportCollapse.is(':visible')) {
    $exportExportCollapse.collapse('hide')
  }
  if ($exportFelderWaehlenCollapse.is(':visible')) {
    $exportFelderWaehlenCollapse.collapse('hide')
  }
  if ($exportObjekteWaehlenDsCollapse.is(':visible')) {
    $exportObjekteWaehlenDsCollapse.collapse('hide')
  }

  if (!formular || formular === 'export') {
    // Beschäftigung melden
    $exportObjekteWaehlenGruppenHinweisText
      .alert()
      .removeClass('alert-success')
      .removeClass('alert-danger')
      .addClass('alert-info')
      .show()
      .html('Eigenschaften werden ermittelt...')
    // scrollen, damit Hinweis sicher ganz sichtbar ist
    $('html, body').animate({
      scrollTop: $exportObjekteWaehlenGruppenHinweisText.offset().top
    }, 2000)
  } else {
    // für alt
    // Beschäftigung melden
    $('#exportAltFelderWaehlenHinweisText')
      .alert()
      .show()
  }

  // gewählte Gruppen ermitteln
  // globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
  // globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
  exportFelderArrays = []
  /*if (exportGruppen.length > 1) {
      // wenn mehrere Gruppen gewählt werden
      // Option exportNurObjekteMitEigenschaften ausblenden
      // und false setzen
      // sonst kommen nur die DS einer Gruppe
      $exportNurObjekteMitEigenschaftenCheckbox.addClass('adb-hidden')
      $exportNurObjekteMitEigenschaften.prop('checked', false)
  } else {
      if ($exportNurObjekteMitEigenschaftenCheckbox.hasClass('adb-hidden')) {
          $exportNurObjekteMitEigenschaftenCheckbox.removeClass('adb-hidden')
          $exportNurObjekteMitEigenschaften.prop('checked', true)
      }
  }*/
  if (exportGruppen.length > 0) {
    // gruppen einzeln abfragen
    gruppen = exportGruppen
    _.each(gruppen, function (gruppe) {
      // Felder abfragen
      $db.view('artendb/felder?group_level=5&startkey=["' + gruppe + '"]&endkey=["' + gruppe + '",{},{},{},{}]', {
        success: function (data) {
          exportFelderArrays = _.union(exportFelderArrays, data.rows)
          // eine Gruppe aus exportGruppen entfernen
          exportGruppen.splice(0, 1)
          if (exportGruppen.length === 0) {
            // alle Gruppen sind verarbeitet
            erstelleListeFuerFeldwahl2(exportFelderArrays, formular)
          }
        },
        error: function () {
          console.log('erstelleListeFuerFeldwahl: keine Daten erhalten')
        }
      })
    })
  } else {
    // letzte Rückmeldung anpassen
    $exportObjekteWaehlenGruppenHinweisText.html('bitte eine Gruppe wählen')
      .removeClass('alert-info')
      .removeClass('alert-success')
      .addClass('alert-danger')
    // Felder entfernen
    $('#export').find('.exportFelderWaehlenFelderliste')
      .html('')
    $('#exportObjekteWaehlenDsFelderliste')
      .html('')
  }
  // Tabelle ausblenden, falls sie eingeblendet war
  $('.exportExportTabelle')
    .hide()
}
