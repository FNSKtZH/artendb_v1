/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    // csv-Tipps einblenden, wenn csv gewählt ist
    if ($('input[name="exportExportFormat"]:checked').val() === 'csv') {
        $('.well.formatCsv').show({ duration: 800 });
    } else {
        $('.well.formatCsv').hide({ duration: 800 });
    }
};