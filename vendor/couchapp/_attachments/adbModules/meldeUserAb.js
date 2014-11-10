/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

var returnFunction = function () {
    // IE8 kann nicht deleten
    try {
        delete localStorage.Email;
    } catch (e) {
        localStorage.Email = undefined;
    }
    $(".art_anmelden_titel").text("Anmelden");
    $(".importieren_anmelden_titel").text("1. Anmelden");
    $(".alert").hide();
    $(".hinweis").hide();
    $(".well.anmelden").show();
    $(".Email").show();
    $(".Passwort").show();
    $(".anmelden_btn").show();
    $(".abmelden_btn").hide();
    // ausschalten, soll später bei Organisation möglich werden
    // $(".konto_erstellen_btn").show();
    $(".konto_speichern_btn").hide();
    $("#art_anmelden").hide();
    window.adb.schuetzeLrTaxonomie();
    // falls dieser User admin war: vergessen
    delete localStorage.admin;
    // für diesen Nutzer passende Menus anzeigen
    window.adb.blendeMenus();
};

module.exports = returnFunction;