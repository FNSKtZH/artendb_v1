// baut im Formular 'export' die Liste aller Eigenschaften auf
// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
// bekommt die Namen der Gruppen
// formular ist im Standard export, wenn anders (z.B. exportAlt), übergeben

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                          = require('underscore'),
    $                          = require('jquery'),
    erstelleListeFuerFeldwahl2 = require('./erstelleListeFuerFeldwahl2');

module.exports = function (exportGruppen, formular) {

    var gruppen                                        = [],
        exportFelderArrays,
        $db                                            = $.couch.db('artendb'),
        $exportierenObjekteWaehlenGruppenHinweisText   = $('#exportierenObjekteWaehlenGruppenHinweisText'),
        $exportierenNurObjekteMitEigenschaftenCheckbox = $('#exportierenNurObjekteMitEigenschaftenCheckbox'),
        $exportierenNurObjekteMitEigenschaften         = $('#exportierenNurObjekteMitEigenschaften'),
        $exportierenExportierenCollapse                = $('#exportierenExportierenCollapse'),
        $exportierenFelderWaehlenCollapse              = $('#exportierenFelderWaehlenCollapse'),
        $exportierenObjekteWaehlenDsCollapse           = $('#exportierenObjekteWaehlenDsCollapse');

    // falls noch offen: folgende Bereiche schliessen
    if ($exportierenExportierenCollapse.is(':visible')) {
        $exportierenExportierenCollapse.collapse('hide');
    }
    if ($exportierenFelderWaehlenCollapse.is(':visible')) {
        $exportierenFelderWaehlenCollapse.collapse('hide');
    }
    if ($exportierenObjekteWaehlenDsCollapse.is(':visible')) {
        $exportierenObjekteWaehlenDsCollapse.collapse('hide');
    }

    if (!formular || formular === 'export') {
        // Beschäftigung melden
        $exportierenObjekteWaehlenGruppenHinweisText
            .alert()
            .removeClass('alert-success')
            .removeClass('alert-danger')
            .addClass('alert-info')
            .show()
            .html('Eigenschaften werden ermittelt...');
        // scrollen, damit Hinweis sicher ganz sichtbar ist
        $('html, body').animate({
            scrollTop: $exportierenObjekteWaehlenGruppenHinweisText.offset().top
        }, 2000);
    } else {
        // für alt
        // Beschäftigung melden
        $('#exportierenaltFelderWaehlenHinweisText')
            .alert()
            .show();
    }

    // gewählte Gruppen ermitteln
    // globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
    // globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
    exportFelderArrays = [];
    /*if (exportGruppen.length > 1) {
        // wenn mehrere Gruppen gewählt werden
        // Option exportierenNurObjekteMitEigenschaften ausblenden
        // und false setzen
        // sonst kommen nur die DS einer Gruppe
        $exportierenNurObjekteMitEigenschaftenCheckbox.addClass('adb-hidden');
        $exportierenNurObjekteMitEigenschaften.prop('checked', false);
    } else {
        if ($exportierenNurObjekteMitEigenschaftenCheckbox.hasClass('adb-hidden')) {
            $exportierenNurObjekteMitEigenschaftenCheckbox.removeClass('adb-hidden')
            $exportierenNurObjekteMitEigenschaften.prop('checked', true);
        }
    }*/
    if (exportGruppen.length > 0) {
        // gruppen einzeln abfragen
        gruppen = exportGruppen;
        _.each(gruppen, function (gruppe) {
            // Felder abfragen
            $db.view('artendb/felder?group_level=5&startkey=["' + gruppe + '"]&endkey=["' + gruppe + '",{},{},{},{}]', {
                success: function (data) {
                    exportFelderArrays = _.union(exportFelderArrays, data.rows);
                    // eine Gruppe aus exportGruppen entfernen
                    exportGruppen.splice(0, 1);
                    if (exportGruppen.length === 0) {
                        // alle Gruppen sind verarbeitet
                        erstelleListeFuerFeldwahl2(exportFelderArrays, formular);
                    }
                },
                error: function () {
                    console.log('erstelleListeFuerFeldwahl: keine Daten erhalten');
                }
            });
        });
    } else {
        // letzte Rückmeldung anpassen
        $exportierenObjekteWaehlenGruppenHinweisText.html('bitte eine Gruppe wählen')
            .removeClass('alert-info')
            .removeClass('alert-success')
            .addClass('alert-danger');
        // Felder entfernen
        $('#export').find('.exportierenFelderWaehlenFelderliste')
            .html('');
        $('#exportierenObjekteWaehlenDsFelderliste')
            .html('');
    }
    // Tabelle ausblenden, falls sie eingeblendet war
    $('.exportierenExportierenTabelle')
        .hide();
};