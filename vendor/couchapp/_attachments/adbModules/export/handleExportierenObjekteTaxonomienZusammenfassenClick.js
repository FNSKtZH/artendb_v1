// wenn #exportieren_objekte_Taxonomien_zusammenfassen geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var erstelleListeFuerFeldwahl  = require('./erstelleListeFuerFeldwahl'),
        fuerExportGewaehlteGruppen = require('./fuerExportGewaehlteGruppen'),
        gruppenGewaehlt;

    if ($(that).hasClass("active")) {
        window.adb.fasseTaxonomienZusammen = false;
        $(that).html("Alle Taxonomien zusammenfassen");
    } else {
        window.adb.fasseTaxonomienZusammen = true;
        $(that).html("Taxonomien einzeln behandeln");
    }
    // Felder neu aufbauen, aber nur, wenn eine Gruppe gewählt ist
    gruppenGewaehlt = fuerExportGewaehlteGruppen();
    if (gruppenGewaehlt.length > 0) {
        erstelleListeFuerFeldwahl(gruppenGewaehlt);
    }
};