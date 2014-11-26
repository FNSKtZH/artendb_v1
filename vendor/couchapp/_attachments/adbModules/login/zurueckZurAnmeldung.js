/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                     = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (woher) {
    var praefix = "importieren_";

    // Bei LR muss der Anmeldungsabschnitt eingeblendet werden
    if (woher === "art") {
        praefix = "";
        $("#art_anmelden").show();
        $("#" + woher + "_anmelden_hinweis")
            .alert()
            .show();
    }

    // Mitteilen, dass Anmeldung nötig ist
    $("#" + praefix + woher + "_anmelden_hinweis")
        .alert()
        .show();
    $("#" + praefix + woher + "_anmelden_hinweis_text").html("Um Daten zu bearbeiten, müssen Sie angemeldet sein");
    $("#" + praefix + woher + "_anmelden_collapse").collapse('show');
    $(".anmelden_btn").show();
    $(".abmelden_btn").hide();
    // ausschalten, soll später bei Organisationen möglich werden
    //$(".konto_erstellen_btn").show();
    $(".konto_speichern_btn").hide();
    $("#email" + capitaliseFirstLetter(woher)).focus();
};