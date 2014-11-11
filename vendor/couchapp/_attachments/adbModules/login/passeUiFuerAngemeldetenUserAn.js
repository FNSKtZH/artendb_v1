/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (woher) {
    var praefix = "importieren_";

    if (woher === "art") {
        praefix = "";
    }
    $("#art_anmelden_titel").text(localStorage.Email + " ist angemeldet");
    $(".importieren_anmelden_titel").text("1. " + localStorage.Email + " ist angemeldet");
    if (woher !== "art") {
        $("#" + praefix + woher + "_anmelden_collapse").collapse('hide');
        $("#importieren_" + woher + "_ds_beschreiben_collapse").collapse('show');
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