/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    Modernizr = require('Modernizr');

module.exports = function () {
    var browserDetect = require('./browserDetect');

    browserDetect.init();

    // zunächst mal den gröbsten Bock abfangen
    if (browserDetect.browser == 'Explorer' && browserDetect.version < 9) {
        $('#meldung_individuell_abschliessend_text').html("arteigenschaften.ch funktioniert nicht in Ihrem Browser.<br><br>Verwenden Sie eine aktuelle Version von z.B.<ul><li><a href='//google.de/chrome/'>Google Chrome</a> (empfohlen)</li><li><a href='//mozilla.org/de/firefox/new/'>Mozilla Firefox</a></li><li><a href='http://windows.microsoft.com/de-de/internet-explorer/download-ie'>Internet Explorer</a></li></ul>");
        $('#meldung_individuell_abschliessend_label').html("inkompatibler Browser");
        $('#meldung_individuell_abschliessend').modal();
        // jetzt den nächstgrössten Bock
    } else if (browserDetect.browser == 'Explorer' && browserDetect.version === 9) {
        $('#meldung_individuell_text').html("Ihr Browser unterstützt einige Funktionen nicht, die ArtenDb benötigt,<br>zum Beispiel:<br><br><ul><li>importieren</li><li>Exporte direkt herunterladen</li><li>Feldlisten mehrspaltig darstellen</li><li>In Exporten Informationen zu Eigenschaften- und Beziehungssammlungen korrekt darstellen</li><li>In Exporten eine Vorschau der Daten anzeigen</li><li>mit den Schaltflächen 'zurück' und 'vorwärts' navigieren.<br>Benützen Sie stattdessen den Strukturbaum und das Menu</li></ul><br>Tipp: Verwenden Sie eine aktuelle Version von z.B.<ul><li><a href='//google.de/chrome/'>Google Chrome</a> (empfohlen)</li><li><a href='//mozilla.org/de/firefox/new/'>Mozilla Firefox</a></li><li><a href='http://windows.microsoft.com/de-de/internet-explorer/download-ie'>Internet Explorer</a></li></ul>");
        $("#meldung_individuell_schliessen").html("trotzdem weiterfahren");
        $('#meldung_individuell_label').html("ungeeigneter Browser");
        $('#meldung_individuell').modal();
    } else {
        // jetzt weniger schlimme Inkompatibilitäten
        // prüfen, ob media queries unterstützt werden. Wenn nein, melden
        if (!Modernizr.mq('(min-width: 10px)')) {
            $('#meldung_individuell_text').html("Ihr Browser unterstützt keine media queries.<br>ArtenDb wird nicht optimal funktionieren.<br><br>Tipp: Verwenden Sie eine aktuelle Version von z.B.<ul><li><a href='//google.de/chrome/'>Google Chrome</a> (empfohlen)</li><li><a href='//mozilla.org/de/firefox/new/'>Mozilla Firefox</a></li><li><a href='http://windows.microsoft.com/de-de/internet-explorer/download-ie'>Internet Explorer</a></li></ul>");
            $("#meldung_individuell_schliessen").html("schliessen");
            $('#meldung_individuell_label').html("inkompatibler Browser");
            $('#meldung_individuell').modal();
        }

        // prüfen, ob history unterstützt wird. Wenn nein, shim laden
        // achtung: der shim ermöglicht zwar, Links zu Arten zu laden (mit nachfolgendem window.onload)
        // aber er hängt einen # an die url und erzeugt daher müll, was komisch aussieht
        // zurück-Taste funktioniert dann auch nicht
        if (!Modernizr.history) {
            $('#meldung_individuell_text').html("Ihr Browser unterstützt keine history.<br>Daher können Sie nicht mit den Schaltflächen 'zurück' und 'vorwärts' navigieren<br>Benützen Sie stattdessen den Strukturbaum und das Menu.<br><br>Tipp: Verwenden Sie eine aktuelle Version von z.B.<ul><li><a href='//google.de/chrome/'>Google Chrome</a> (empfohlen)</li><li><a href='//mozilla.org/de/firefox/new/'>Mozilla Firefox</a></li><li><a href='http://windows.microsoft.com/de-de/internet-explorer/download-ie'>Internet Explorer</a></li></ul>");
            $("#meldung_individuell_schliessen").html("schliessen");
            $('#meldung_individuell_label').html("inkompatibler Browser");
            $('#meldung_individuell').modal();
        }
    }

    Modernizr.load({
        test: Modernizr.csstransforms,
        nope: 'style/artendb_ohne_mq.css'
    });

};