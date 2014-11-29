/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                          = require('jquery'),
    erstelleListeFuerFeldwahl  = require('./erstelleListeFuerFeldwahl'),
    fuerExportGewaehlteGruppen = require('./fuerExportGewaehlteGruppen');

module.exports = function (that) {
    var gruppenGewaehlt = fuerExportGewaehlteGruppen();

    if (gruppenGewaehlt.length === 0) {
        // keine Gruppe gewählt
        erstelleListeFuerFeldwahl(gruppenGewaehlt);
        // und den panel schliessen
        $(that).collapse('hide');
        return false;
    }
    // nach oben scrollen, damit der Bildschirm optimal genutzt wird
    $('html, body').animate({
        scrollTop: $(that).parent().offset().top - 6
    }, 2000);
    return true;
};