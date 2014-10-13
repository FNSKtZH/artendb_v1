'use strict';

var _ = require('underscore');

// braucht $ wegen .alert
var returnFunction = function ($, gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt) {
    // Alle Felder abfragen
    var fTz = "false",
        anz_gruppen_abgefragt = 0,
        listName,
        queryParam;
    // window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
    if (window.adb.fasseTaxonomienZusammen) {
        fTz = "true";
    }
    // globale Variable vorbereiten
    window.adb.exportieren_objekte = [];
    // in anz_gruppen_abgefragt wird gezählt, wieviele Gruppen schon abgefragt wurden
    // jede Abfrage kontrolliert nach Erhalt der Daten, ob schon alle Gruppen abgefragt wurden und macht weiter, wenn ja
    _.each(gruppen_array, function(gruppe) {
        if ($("#exportieren_synonym_infos").prop('checked')) {
            listName = "export_mit_synonymen";
            queryParam = gruppe + "_mit_synonymen?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
        } else {
            listName = "export";
            queryParam = gruppe + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
        }
        if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewählt > 0) {
            // prüfen, ob mindestens ein Feld aus ds gewählt ist
            // wenn ja: true, sonst false
            queryParam += "&nur_objekte_mit_eigenschaften=true";
        } else {
            queryParam += "&nur_objekte_mit_eigenschaften=false";
        }
        if ($("#export_bez_in_zeilen").prop('checked')) {
            queryParam += "&bez_in_zeilen=true";
        } else {
            queryParam += "&bez_in_zeilen=false";
        }

        $.ajax('http://localhost:5984/artendb/_design/artendb/_list/' + listName + '/' + queryParam, {
            type: 'GET',
            dataType: "json"
        }).done(function (data) {
            // alle Objekte in data in window.adb.exportieren_objekte anfügen
            window.adb.exportieren_objekte = _.union(window.adb.exportieren_objekte, data);
            // speichern, dass eine Gruppe abgefragt wurde
            anz_gruppen_abgefragt++;
            if (anz_gruppen_abgefragt === gruppen_array.length) {
                // alle Gruppen wurden abgefragt, jetzt kann es weitergehen
                // Ergebnis rückmelden
                $("#exportieren_exportieren_hinweis_text")
                    .alert()
                    .show()
                    .html(window.adb.exportieren_objekte.length + " Objekte sind gewählt");
                window.adb.baueTabelleFürExportAuf();
            }
        }).fail(function () {
            console.log('error in $db.list');
        });
    });
};

module.exports = returnFunction;