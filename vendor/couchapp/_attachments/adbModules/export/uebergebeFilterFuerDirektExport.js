/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

var returnFunction = function (gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt) {
    // Alle Felder abfragen
    var fTz = "false",
        queryParam,
        view_name,
        list_name,
        gruppenliste = gruppen.split(",");
    // window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
    if (window.adb.fasseTaxonomienZusammen) {
        fTz = "true";
    }
    if ($("#exportieren_synonym_infos").prop('checked')) {
        list_name = "export_mit_synonymen_direkt";
        if (gruppenliste.length > 1) {
            view_name = "all_docs_mit_synonymen";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            if (gruppenliste[0] === "Lebensräume") {
                view_name = "lr_mit_synonymen";
            } else {
                view_name = gruppenliste[0].toLowerCase() + "_mit_synonymen";
            }
        }
    } else {
        list_name = "export_direkt";
        if (gruppenliste.length > 1) {
            view_name = "all_docs";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            if (gruppenliste[0] === "Lebensräume") {
                view_name = "lr";
            } else {
                view_name = gruppenliste[0].toLowerCase();
            }

        }
    }

    queryParam = list_name + "/" + view_name + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;

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
    window.open('_list/' + queryParam);
};

module.exports = returnFunction;