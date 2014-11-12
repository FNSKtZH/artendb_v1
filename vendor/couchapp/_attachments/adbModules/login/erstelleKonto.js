/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (woher) {
    var passeUiFuerAngemeldetenUserAn = require('./passeUiFuerAngemeldetenUserAn'),
    bearbeiteLrTaxonomie              = require('../lr/bearbeiteLrTaxonomie');

    // User in _user eintragen
    $.couch.signup({
        name: $('#Email_' + woher).val()
    }, $('#Passwort_' + woher).val(), {
        success: function () {
            localStorage.Email = $('#Email_' + woher).val();
            if (woher === "art") {
                bearbeiteLrTaxonomie();
            }
            passeUiFuerAngemeldetenUserAn(woher);
            // Werte aus Feldern entfernen
            $("#Email_" + woher).val("");
            $("#Passwort_" + woher).val("");
            $("#Passwort2_" + woher).val("");
        },
        error: function () {
            var praefix = "importieren_";
            if (woher === "art") {
                praefix = "";
            }
            $("#" + praefix + woher + "_anmelden_fehler_text").html("Fehler: Das Konto wurde nicht erstellt");
            $("#" + praefix + woher + "_anmelden_fehler")
                .alert()
                .show();
        }
    });
};