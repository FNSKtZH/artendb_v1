// wenn DsFile geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (event) {
    var erstelleTabelle = require('../erstelleTabelle'),
        file,
        reader;

    if (event.target.files[0] === undefined) {
        // vorhandene Datei wurde entfernt
        $("#DsTabelleEigenschaften").hide();
        $("#importieren_ds_ids_identifizieren_hinweis_text").hide();
        $("#DsImportieren").hide();
        $("#DsEntfernen").hide();
    } else {
        file = event.target.files[0];
        reader = new FileReader();

        reader.onload = function (event) {
            window.adb.dsDatensaetze = $.csv.toObjects(event.target.result);
            erstelleTabelle(window.adb.dsDatensaetze, "DsFelder_div", "DsTabelleEigenschaften");
        };
        reader.readAsText(file);
    }
};