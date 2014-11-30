/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                        = require('underscore'),
    $                        = require('jquery'),
    baueTabelleFuerExportAuf = require('./baueTabelleFuerExportAuf');

// braucht $ wegen .alert
module.exports = function (gruppen, gruppenArray, anzDsGewaehlt, filterkriterienObjekt, gewaehlteFelderObjekt) {
    // Alle Felder abfragen
    var fTz                 = 'false',
        anzGruppenAbgefragt = 0,
        listName,
        queryParam,
        $db                 = $.couch.db('artendb'),
        format              = $('input[name="exportExportFormat"]:checked').val() || 'xlsx';

    // window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
    if (window.adb.fasseTaxonomienZusammen) {
        fTz = 'true';
    }
    // globale Variable vorbereiten
    window.adb.exportierenObjekte = [];
    // in anzGruppenAbgefragt wird gezählt, wieviele Gruppen schon abgefragt wurden
    // jede Abfrage kontrolliert nach Erhalt der Daten, ob schon alle Gruppen abgefragt wurden und macht weiter, wenn ja
    _.each(gruppenArray, function (gruppe) {
        if ($('#exportSynonymInfos').prop('checked')) {
            listName   = 'artendb/exportMitSynonymen';
            queryParam = gruppe + '_mit_synonymen?include_docs=true&filter=' + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + '&felder=' + encodeURIComponent(JSON.stringify(gewaehlteFelderObjekt)) + '&fasseTaxonomienZusammen=' + fTz + '&gruppen=' + gruppen;
        } else {
            listName   = 'artendb/export';
            queryParam = gruppe + '?include_docs=true&filter=' + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + '&felder=' + encodeURIComponent(JSON.stringify(gewaehlteFelderObjekt)) + '&fasseTaxonomienZusammen=' + fTz + '&gruppen=' + gruppen;
        }
        // prüfen, ob mindestens ein Feld aus ds gewählt ist
        // wenn ja: true, sonst false
        queryParam += ($('#exportNurObjekteMitEigenschaften').prop('checked') && anzDsGewaehlt > 0 ? '&nurObjekteMitEigenschaften=true' : '&nurObjekteMitEigenschaften=false');
        queryParam += ($('#exportBezInZeilen').prop('checked') ? '&bezInZeilen=true' : '&bezInZeilen=false');

        // format ergänzen
        queryParam += '&format=' + format;

        $db.list(listName, queryParam, {
            success: function (data) {
                // alle Objekte in data in window.adb.exportierenObjekte anfügen
                window.adb.exportierenObjekte = _.union(window.adb.exportierenObjekte, data);
                // speichern, dass eine Gruppe abgefragt wurde
                anzGruppenAbgefragt++;
                if (anzGruppenAbgefragt === gruppenArray.length) {
                    // alle Gruppen wurden abgefragt, jetzt kann es weitergehen
                    // Ergebnis rückmelden
                    $('#exportExportHinweisText')
                        .alert()
                        .show()
                        .html(window.adb.exportierenObjekte.length + ' Objekte sind gewählt');
                    baueTabelleFuerExportAuf();
                }
            },
            error: function () {
                console.log('uebergebeFilterFuerExportMitVorschau: keine Daten erhalten');
            }
        });
    });
};