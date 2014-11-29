// event-handler liefern ungefragt den event mit
// daher _alt als zweiter Variable

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (event, _alt) {
    var $exportierenExportierenCollapse;

    _alt = _alt || '';
    $exportierenExportierenCollapse = $("#exportieren" + _alt + "ExportierenCollapse");


    // Export ausblenden, falls sie eingeblendet war
    if ($exportierenExportierenCollapse.is(':visible')) {
        $exportierenExportierenCollapse.collapse('hide');
    }
    $("#exportieren" + _alt + "ExportierenTabelle").hide();
    $(".exportieren" + _alt + "ExportierenExportieren").hide();
    $("#exportieren" + _alt + "ExportierenErrorText")
        .alert()
        .hide();
    $('#exportierenAltExportierenUrl').val('');
};