// wenn exportierenExportieren angezeigt wird
// zur Schaltfläche Vorschau scrollen

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    // Fehlermeldung verstecken, falls sie noch offen war
    $("#exportierenExportierenErrorText")
        .alert()
        .hide();
    $('html, body').animate({
        scrollTop: $("#exportierenExportierenTabelleAufbauen").offset().top
    }, 2000);
};