// wenn BsFile geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (event) {
    var erstelleTabelle = require('../erstelleTabelle'),
        file,
        reader;

    if (event.target.files[0] === undefined) {
        // vorhandene Datei wurde entfernt
        $("#BsTabelleEigenschaften").hide();
        $("#importieren_bs_ids_identifizieren_hinweis_text").hide();
        $("#BsImportieren").hide();
        $("#BsEntfernen").hide();
    } else {
        file = event.target.files[0];
        reader = new FileReader();
        reader.onload = function (event) {
            window.adb.bsDatensaetze = $.csv.toObjects(event.target.result);
            erstelleTabelle(window.adb.bsDatensaetze, "BsFelder_div", "BsTabelleEigenschaften");
        };
        reader.readAsText(file);
    }
};