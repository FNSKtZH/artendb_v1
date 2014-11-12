/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var blendeMenus     = require('./blendeMenus'),
    schuetzeLrTaxonomie = require('../lr/schuetzeLrTaxonomie');

    delete localStorage.Email;
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
    schuetzeLrTaxonomie();
    // falls dieser User admin war: vergessen
    delete localStorage.admin;
    // für diesen Nutzer passende Menus anzeigen
    blendeMenus();
};