/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (event, _alt) {
    var $exportieren_exportieren_collapse = $("#exportieren" + _alt + "_exportieren_collapse");

    _alt = _alt || '';

    // Export ausblenden, falls sie eingeblendet war
    if ($exportieren_exportieren_collapse.css("display") !== "none") {
        $exportieren_exportieren_collapse.collapse('hide');
    }
    $("#exportieren" + _alt + "_exportieren_tabelle").hide();
    $(".exportieren" + _alt + "_exportieren_exportieren").hide();
    $("#exportieren" + _alt + "_exportieren_error_text")
        .alert()
        .hide();
    $('#exportieren_alt_exportieren_url').val('');
};