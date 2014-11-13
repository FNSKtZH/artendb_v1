/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    // csv-Tipps einblenden, wenn csv gewählt ist
    if ($('input[name="exportieren_exportieren_format"]:checked').val() === 'csv') {
        $('.well.format_csv').show({ duration: 1000 });
    } else {
        $('.well.format_csv').hide({ duration: 1000 });
    }
};