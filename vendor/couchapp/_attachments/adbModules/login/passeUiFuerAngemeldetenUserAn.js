/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (woher) {
    $("#art_anmelden_titel").text(localStorage.Email + " ist angemeldet");
    $(".importieren_anmelden_titel").text("1. " + localStorage.Email + " ist angemeldet");

    if (woher === "art") {
        $("#art_anmelden_collapse").collapse('hide');
    } else {
        $("#importieren_" + woher + "_anmelden_collapse").collapse('hide');
        $("#importieren" + capitaliseFirstLetter(woher) + "DsBeschreibenCollapse").collapse('show');
    }
    $(".alert").hide();
    $(".hinweis").hide();
    $(".well.anmelden").hide();
    $(".Email").hide();
    $(".Passwort").hide();
    $(".anmelden_btn").hide();
    $(".abmelden_btn").show();
    $(".konto_erstellen_btn").hide();
    $(".konto_speichern_btn").hide();
    // in LR soll Anmelde-Accordion nicht sichtbar sein
    $("#art_anmelden").hide();
};