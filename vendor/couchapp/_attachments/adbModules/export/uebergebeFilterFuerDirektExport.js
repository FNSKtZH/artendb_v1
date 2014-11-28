/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (gruppen, gruppenArray, anzDsGewaehlt, filterkriterienObjekt, gewaehlteFelderObjekt) {
    // Alle Felder abfragen
    var fTz          = "false",
        queryParam,
        viewName,
        listName,
        gruppenliste = gruppen.split(","),
        format       = $('input[name="exportieren_exportieren_format"]:checked').val() || 'xlsx';

    // window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
    if (window.adb.fasseTaxonomienZusammen) {
        fTz = "true";
    }
    if ($("#exportierenSynonymInfos").prop('checked')) {
        listName = "exportMitSynonymenDirekt";
        if (gruppenliste.length > 1) {
            viewName = "all_docs_mit_synonymen";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            viewName = (gruppenliste[0] === "Lebensräume" ? "lr_mit_synonymen" : gruppenliste[0].toLowerCase() + "_mit_synonymen");
        }
    } else {
        listName = "export_direkt";
        if (gruppenliste.length > 1) {
            viewName = "all_docs";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            viewName = (gruppenliste[0] === "Lebensräume" ? "lr" : gruppenliste[0].toLowerCase());
        }
    }

    queryParam = listName + "/" + viewName + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlteFelderObjekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen + "&format=" + format;

    if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anzDsGewaehlt > 0) {
        // prüfen, ob mindestens ein Feld aus ds gewählt ist
        // wenn ja: true, sonst false
        queryParam += "&nurObjekteMitEigenschaften=true";
    } else {
        queryParam += "&nurObjekteMitEigenschaften=false";
    }
    if ($("#export_bez_in_zeilen").prop('checked')) {
        queryParam += "&bezInZeilen=true";
    } else {
        queryParam += "&bezInZeilen=false";
    }
    window.open('_list/' + queryParam);
};