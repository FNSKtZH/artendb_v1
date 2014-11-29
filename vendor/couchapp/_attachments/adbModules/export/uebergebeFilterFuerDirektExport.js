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
        format       = $('input[name="exportierenExportierenFormat"]:checked').val() || 'xlsx';

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
        listName = "exportDirekt";
        if (gruppenliste.length > 1) {
            viewName = "all_docs";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            viewName = (gruppenliste[0] === "Lebensräume" ? "lr" : gruppenliste[0].toLowerCase());
        }
    }

    queryParam = listName + "/" + viewName + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterienObjekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewaehlteFelderObjekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen + "&format=" + format;

    // prüfen, ob mindestens ein Feld aus ds gewählt ist
    // wenn ja: true, sonst false
    queryParam += ($("#exportierenNurObjekteMitEigenschaften").prop('checked') && anzDsGewaehlt > 0 ? "&nurObjekteMitEigenschaften=true" : "&nurObjekteMitEigenschaften=false");
    queryParam += ($("#exportBezInZeilen").prop('checked') ? "&bezInZeilen=true" : "&bezInZeilen=false");
    window.open('_list/' + queryParam);
};