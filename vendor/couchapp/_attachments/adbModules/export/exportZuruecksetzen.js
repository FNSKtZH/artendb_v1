// event-handler liefern ungefragt den event mit
// daher alt als zweiter Variable

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (event, alt) {
    var $exportierenExportierenCollapse;

    alt = alt || '';
    $exportierenExportierenCollapse = $('#exportieren' + alt + 'ExportierenCollapse');


    // Export ausblenden, falls sie eingeblendet war
    if ($exportierenExportierenCollapse.is(':visible')) {
        $exportierenExportierenCollapse.collapse('hide');
    }
    $('#exportieren' + alt + 'ExportierenTabelle').hide();
    $('.exportieren' + alt + 'ExportierenExportieren').hide();
    $('#exportieren' + alt + 'ExportierenErrorText')
        .alert()
        .hide();
    $('#exportierenAltExportierenUrl').val('');
};