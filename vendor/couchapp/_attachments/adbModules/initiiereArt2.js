/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

// $ muss übernommen werden, wegen .collapse
var returnFunction = function ($, html_art, art) {
    var setzteLinksZuBilderUndWikipedia = require('./setzteLinksZuBilderUndWikipedia'),
        zeigeFormular = require('./zeigeFormular');
    // panel beenden
    $("#art_inhalt").html(html_art);
    // richtiges Formular anzeigen
    zeigeFormular("art");
    // Anmeldung soll nur kurzfristig sichtbar sein, wenn eine Anmeldung erfolgen soll
    $("#art_anmelden").hide();
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
    history.pushState(null, null, "index.html?id=" + art._id);
};

module.exports = returnFunction;