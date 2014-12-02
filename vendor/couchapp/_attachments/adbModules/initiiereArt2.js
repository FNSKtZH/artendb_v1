/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                               = require('jquery'),
    setzteLinksZuBilderUndWikipedia = require('./setzteLinksZuBilderUndWikipedia'),
    zeigeFormular                   = require('./zeigeFormular');

module.exports = function (htmlArt, art) {
    // panel beenden
    $('#artInhalt').html(htmlArt);
    // richtiges Formular anzeigen
    zeigeFormular('art');

    if (art.Gruppe !== 'Lebensräume') {
        // Anmeldung soll nur kurzfristig sichtbar sein, wenn eine Anmeldung erfolgen soll
        $('#artAnmelden').hide();
    }

    // Wenn nur eine Datensammlung (die Taxonomie) existiert, diese öffnen
    if (art.Eigenschaftensammlungen.length === 0 && art.Beziehungssammlungen.length === 0) {
        $('.panel-collapse.Taxonomie').each(function () {
            $(this).collapse('show');
        });
    }
    // jetzt die Links im Menu setzen
    // wird zwar in zeigeFormular schon gemacht
    // trotzdem nötig, weil dort erst mal leere links gesetzt werden
    // hier wird die url angefügt
    setzteLinksZuBilderUndWikipedia(art);
    // und die URL anpassen
    history.pushState(null, null, 'index.html?id=' + art._id);
};