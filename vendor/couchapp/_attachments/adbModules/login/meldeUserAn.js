/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                     = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (woher) {
    var email       = $('#email' + capitaliseFirstLetter(woher)).val(),
        passwort    = $('#passwort' + capitaliseFirstLetter(woher)).val(),
        blendeMenus                   = require('./blendeMenus'),
        passeUiFuerAngemeldetenUserAn = require('./passeUiFuerAngemeldetenUserAn'),
        validiereUserAnmeldung        = require('./validiereUserAnmeldung'),
        bearbeiteLrTaxonomie          = require('../lr/bearbeiteLrTaxonomie');

    if (validiereUserAnmeldung(woher)) {
        $.couch.login({
            name : email,
            password : passwort,
            success : function (r) {
                localStorage.Email = $('#email' + capitaliseFirstLetter(woher)).val();
                if (woher === "art") {
                    bearbeiteLrTaxonomie();
                }
                passeUiFuerAngemeldetenUserAn(woher);
                // Werte aus Feldern entfernen
                $("#email" + capitaliseFirstLetter(woher)).val("");
                $("#passwort" + capitaliseFirstLetter(woher)).val("");
                $("#art_anmelden").show();
                // admin-Funktionen
                if (r.roles.indexOf("_admin") !== -1) {
                    // das ist ein admin
                    console.log("hallo admin");
                    localStorage.admin = true;
                } else {
                    delete localStorage.admin;
                }
                blendeMenus();
            },
            error: function () {
                var praefix = "importieren_";
                if (woher === "art") {
                    praefix = "";
                }
                // zuerst allfällige bestehende Hinweise ausblenden
                $(".hinweis").hide();
                $("#" + praefix + woher + "_anmelden_fehler_text")
                    .html("Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?")
                    .alert()
                    .show();
            }
        });
    }
};