/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var pruefeBrowserKompatibilitaet = require('./pruefeBrowserKompatibilitaet'),
        oeffneUri                    = require('./oeffneUri');

    pruefeBrowserKompatibilitaet();

    // falls URL übergeben wurde, das entsprechende Dokument öffnen
    // soll auch ausgelöst werden, wenn die Rücktaste oder Vortaste getätigt wird
    window.addEventListener('popstate', function () {
        oeffneUri();
    });

    // Wenn Fenster geladen wird, löst IE und Firefox keinen popstate event aus
    // daher öffneUri nochmals auslösen
    window.onload = function () {
        oeffneUri();
    };

    // wenn User noch angemeldet ist, UI anpassen
    if (localStorage.Email) {
        $("#art_anmelden_titel").text(localStorage.Email + " ist angemeldet");
        $(".importieren_anmelden_titel").text("1. " + localStorage.Email + " ist angemeldet");
        $(".anmelden_btn").hide();
        $(".abmelden_btn").show();
        $(".kontoErstellenBtn").hide();
        $(".konto_speichern_btn").hide();
    }
};