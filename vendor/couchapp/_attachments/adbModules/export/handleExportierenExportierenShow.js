// wenn exportieren_exportieren angezeigt wird
// zur Schaltfläche Vorschau scrollen

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    // Fehlermeldung verstecken, falls sie noch offen war
    $("#exportieren_exportieren_error_text")
        .alert()
        .hide();
    $('html, body').animate({
        scrollTop: $("#exportieren_exportieren_tabelle_aufbauen").offset().top
    }, 2000);
};