/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

var returnFunction = function (woher) {
    var email = $('#Email_' + woher).val(),
        passwort = $('#Passwort_' + woher).val();

    if (window.adb.validiereUserAnmeldung(woher)) {
        $.couch.login({
            name : email,
            password : passwort,
            success : function (r) {
                localStorage.Email = $('#Email_' + woher).val();
                if (woher === "art") {
                    window.adb.bearbeiteLrTaxonomie();
                }
                window.adb.passeUiFürAngemeldetenUserAn(woher);
                // Werte aus Feldern entfernen
                $("#Email_"+woher).val("");
                $("#Passwort_"+woher).val("");
                $("#art_anmelden").show();
                // admin-Funktionen
                if (r.roles.indexOf("_admin") !== -1) {
                    // das ist ein admin
                    console.log("hallo admin");
                    localStorage.admin = true;
                } else {
                    delete localStorage.admin;
                }
                window.adb.blendeMenus();
            },
            error: function () {
                var präfix = "importieren_";
                if (woher === "art") {
                    präfix = "";
                }
                // zuerst allfällige bestehende Hinweise ausblenden
                $(".hinweis").hide();
                $("#" + präfix + woher + "_anmelden_fehler_text")
                    .html("Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?")
                    .alert()
                    .show();
            }
        });
    }
};

module.exports = returnFunction;