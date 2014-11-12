// wenn #exportieren_exportieren_exportieren geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $      = require('jquery'),
    saveAs = require('saveAs');

module.exports = function () {
    var erstelleExportString = require('./erstelleExportString'),
        isFileAPIAvailable   = require('../isFileAPIAvailable'),
        exportstring,
        blob,
        d,
        month,
        day,
        dateString;

    if (isFileAPIAvailable()) {
        exportstring = erstelleExportString(window.adb.exportieren_objekte);
        blob         = new Blob([exportstring], {type: "text/csv;charset=utf-8;"});
        d            = new Date();
        month        = d.getMonth() + 1;
        day          = d.getDate();
        dateString   = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

        saveAs(blob, dateString + "_export.csv");
    }
};