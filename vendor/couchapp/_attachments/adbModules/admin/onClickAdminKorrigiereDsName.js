/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    // dieser Event wurde bei jedem Laden der Seite ausgelöst!
    if ($('#adminExportierenCollapse').is(':visible')) {
        window.adb.nenneDsUm();
    } else {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
    }
};