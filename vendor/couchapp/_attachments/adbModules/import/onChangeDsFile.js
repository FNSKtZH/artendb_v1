// wenn DsFile geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $               = require('jquery'),
    XLSX            = require('XLSX'),
    erstelleTabelle = require('../erstelleTabelle');

module.exports = function () {
    var file,
        filename,
        filetype,
        reader;

    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    if (event.target.files[0] === undefined) {
        // vorhandene Datei wurde entfernt
        $("#DsTabelleEigenschaften").hide();
        $("#importieren_ds_ids_identifizieren_hinweis_text").hide();
        $("#DsImportieren").hide();
        $("#DsEntfernen").hide();
    } else {
        file = event.target.files[0];
        filename = file.name;
        filetype = filename.split('.').pop();
        reader = new FileReader();

        if (filetype === 'csv') {
            reader.onload = function (event) {
                var data = event.target.result;

                window.adb.dsDatensaetze = $.csv.toObjects(data);
                erstelleTabelle(window.adb.dsDatensaetze, "DsFelder_div", "DsTabelleEigenschaften");
            };
            reader.readAsText(file);
        }
        if (filetype === 'xlsx') {
            reader.onload = function(event) {
                var data = event.target.result,
                    workbook = XLSX.read(data, {type: 'binary'}),
                    sheetName = workbook.SheetNames[0],
                    worksheet = workbook.Sheets[sheetName];

                window.adb.dsDatensaetze = XLSX.utils.sheet_to_json(worksheet);
                erstelleTabelle(window.adb.dsDatensaetze, "DsFelder_div", "DsTabelleEigenschaften");
            };
            reader.readAsBinaryString(file);
        }
    }
};