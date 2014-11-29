// event-handler liefern ungefragt den event mit
// daher _alt als zweiter Variable

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (event, _alt) {
    var $exportieren_exportieren_collapse;

    _alt = _alt || '';
    $exportieren_exportieren_collapse = $("#exportieren" + _alt + "_exportieren_collapse");


    // Export ausblenden, falls sie eingeblendet war
    if ($exportieren_exportieren_collapse.is(':visible')) {
        $exportieren_exportieren_collapse.collapse('hide');
    }
    $("#exportieren" + _alt + "_exportieren_tabelle").hide();
    $(".exportieren" + _alt + "_exportieren_exportieren").hide();
    $("#exportieren" + _alt + "ExportierenErrorText")
        .alert()
        .hide();
    $('#exportierenAltExportierenUrl').val('');
};