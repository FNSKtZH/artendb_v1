/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $             = require('jquery'),
    Modernizr     = require('Modernizr'),
    browserDetect = require('./browserDetect');

module.exports = function () {
    browserDetect.init();

    // zunächst mal den gröbsten Bock abfangen
    if (browserDetect.browser === 'Explorer' && browserDetect.version < 9) {
        $('#meldungIndividuellAbschliessendText').html("arteigenschaften.ch funktioniert nicht in Ihrem Browser.<br><br>Verwenden Sie eine aktuelle Version von z.B.<ul><li><a href='//google.de/chrome/'>Google Chrome</a> (empfohlen)</li><li><a href='//mozilla.org/de/firefox/new/'>Mozilla Firefox</a></li><li><a href='http://windows.microsoft.com/de-de/internet-explorer/download-ie'>Internet Explorer</a></li></ul>");
        $('#meldungIndividuellAbschliessendLabel').html("inkompatibler Browser");
        $('#meldungIndividuellAbschliessend').modal();
        // jetzt den nächstgrössten Bock
    } else if (browserDetect.browser === 'Explorer' && browserDetect.version === 9) {
        $('#meldungIndividuellText').html("Ihr Browser unterstützt einige Funktionen nicht, die ArtenDb benötigt,<br>zum Beispiel:<br><br><ul><li>importieren</li><li>Exporte direkt herunterladen</li><li>Feldlisten mehrspaltig darstellen</li><li>in Exporten Informationen zu Eigenschaften- und Beziehungssammlungen korrekt darstellen</li><li>in Exporten eine Vorschau der Daten anzeigen</li><li>eine korrekte URL anzeigen</li><li>mit den Schaltflächen 'zurück' und 'vorwärts' navigieren<br>(benützen Sie stattdessen den Strukturbaum und das Menu)</li></ul><br>Tipp: Verwenden Sie eine aktuelle Version von z.B.<ul><li><a href='//google.de/chrome/'>Google Chrome</a> (empfohlen)</li><li><a href='//mozilla.org/de/firefox/new/'>Mozilla Firefox</a></li><li><a href='http://windows.microsoft.com/de-de/internet-explorer/download-ie'>Internet Explorer</a></li></ul>");
        $("#meldungIndividuellSchliessen").html("trotzdem weiterfahren");
        $('#meldungIndividuellLabel').html("ungeeigneter Browser");
        $('#meldungIndividuell').modal();
    } else {
        // jetzt weniger schlimme Inkompatibilitäten
        // prüfen, ob media queries unterstützt werden. Wenn nein, melden
        if (!Modernizr.mq('(min-width: 10px)')) {
            $('#meldungIndividuellText').html("Ihr Browser unterstützt keine media queries.<br>ArtenDb wird nicht optimal funktionieren.<br><br>Tipp: Verwenden Sie eine aktuelle Version von z.B.<ul><li><a href='//google.de/chrome/'>Google Chrome</a> (empfohlen)</li><li><a href='//mozilla.org/de/firefox/new/'>Mozilla Firefox</a></li><li><a href='http://windows.microsoft.com/de-de/internet-explorer/download-ie'>Internet Explorer</a></li></ul>");
            $("#meldungIndividuellSchliessen").html("schliessen");
            $('#meldungIndividuellLabel').html("inkompatibler Browser");
            $('#meldungIndividuell').modal();
        }

        // prüfen, ob history unterstützt wird. Wenn nein, shim laden
        // achtung: der shim ermöglicht zwar, Links zu Arten zu laden (mit nachfolgendem window.onload)
        // aber er hängt einen # an die url und erzeugt daher müll, was komisch aussieht
        // zurück-Taste funktioniert dann auch nicht
        if (!Modernizr.history) {
            $('#meldungIndividuellText').html("Ihr Browser unterstützt keine history.<br>Daher können Sie nicht mit den Schaltflächen 'zurück' und 'vorwärts' navigieren<br>Benützen Sie stattdessen den Strukturbaum und das Menu.<br><br>Tipp: Verwenden Sie eine aktuelle Version von z.B.<ul><li><a href='//google.de/chrome/'>Google Chrome</a> (empfohlen)</li><li><a href='//mozilla.org/de/firefox/new/'>Mozilla Firefox</a></li><li><a href='http://windows.microsoft.com/de-de/internet-explorer/download-ie'>Internet Explorer</a></li></ul>");
            $("#meldungIndividuellSchliessen").html("schliessen");
            $('#meldungIndividuellLabel').html("inkompatibler Browser");
            $('#meldungIndividuell').modal();
        }
    }

    Modernizr.load({
        test: Modernizr.csstransforms,
        nope: 'style/artendbOhneMq.css'
    });

    /*
    DAS HAT ALLES NICHT GEKLAPPT
    DARUM IN SCRIPTS GELADEN
    Modernizr.load({
        test: Modernizr.history,
        nope: 'vendor/couchapp/history.js'
    });

    if (!window.history || !history.pushState) {
        $.getScript('vendor/couchapp/history.js');
    }*/

    /* ausgeschaltet, weil IE9 Zugriffsfehler meldete
    Modernizr.load({
        test: Modernizr.
                csscolumns,
        nope: 'vendor/couchapp/css3-multi-column.js'
        // scheint nicht zu funktionieren, auf IE8 und IE9
    });*/

};