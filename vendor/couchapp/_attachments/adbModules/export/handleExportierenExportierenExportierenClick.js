// wenn #exportieren_exportieren_exportieren geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $      = require('jquery'),
    saveAs = require('saveAs');

module.exports = function () {
    var erstelleExportString = require('./erstelleExportString'),
        createBlobDataXlsx   = require('./createBlobDataXlsx'),
        isFileAPIAvailable   = require('../isFileAPIAvailable'),
        exportstring,
        blobData,
        blob,
        d,
        month,
        day,
        dateString,
        format = $('input[name="exportieren_exportieren_format"]:checked').val() || 'xlsx';

    if (isFileAPIAvailable()) {
        d            = new Date();
        month        = d.getMonth() + 1;
        day          = d.getDate();
        dateString   = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

        if (format === 'csv') {
            exportstring = erstelleExportString(window.adb.exportierenObjekte);
            blob         = new Blob([exportstring], {type: "text/csv;charset=utf-8;"});
            saveAs(blob, dateString + "_export.csv");
        } else {
            blobData     = createBlobDataXlsx(window.adb.exportierenObjekte);
            blob         = new Blob([blobData], {type: "application/octet-stream;charset=utf-8;"});
            saveAs(blob, dateString + "_export.xlsx");
        }
    }
};