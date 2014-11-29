// wenn #exportierenObjekteTaxonomienZusammenfassen geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                          = require('jquery'),
    erstelleListeFuerFeldwahl  = require('./erstelleListeFuerFeldwahl'),
    fuerExportGewaehlteGruppen = require('./fuerExportGewaehlteGruppen');

module.exports = function (that) {
    var gruppenGewaehlt;

    if ($(that).hasClass('active')) {
        window.adb.fasseTaxonomienZusammen = false;
        $(that).html('Alle Taxonomien zusammenfassen');
    } else {
        window.adb.fasseTaxonomienZusammen = true;
        $(that).html('Taxonomien einzeln behandeln');
    }
    // Felder neu aufbauen, aber nur, wenn eine Gruppe gewählt ist
    gruppenGewaehlt = fuerExportGewaehlteGruppen();
    if (gruppenGewaehlt.length > 0) {
        erstelleListeFuerFeldwahl(gruppenGewaehlt);
    }
};