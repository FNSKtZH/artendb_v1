// event-handler liefern ungefragt den event mit
// daher alt als zweiter Variable

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (event, alt) {
    var $exportExportCollapse;

    alt = alt || '';
    $exportExportCollapse = $('#export' + alt + 'ExportCollapse');


    // Export ausblenden, falls sie eingeblendet war
    if ($exportExportCollapse.is(':visible')) {
        $exportExportCollapse.collapse('hide');
    }
    $('#export' + alt + 'ExportTabelle').hide();
    $('.export' + alt + 'ExportBtn').hide();
    $('#export' + alt + 'ExportErrorText')
        .alert()
        .hide();
    $('#exportAltExportUrl').val('');
};