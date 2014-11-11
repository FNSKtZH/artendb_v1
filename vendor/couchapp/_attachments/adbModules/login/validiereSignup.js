// kontrollieren, ob die erforderlichen Felder etwas enthalten
// wenn ja wird true retourniert, sonst false

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (woher) {
    var email,
        passwort,
        passwort2;

    // zunächst alle Hinweise ausblenden (falls einer von einer früheren Prüfung her noch eingeblendet wäre)
    $(".hinweis").hide();
    // erfasste Werte holen
    email = $("#Email_" + woher).val();
    passwort = $("#Passwort_" + woher).val();
    passwort2 = $("#Passwort2_" + woher).val();
    // prüfen
    if (!email) {
        $("#Emailhinweis_" + woher).show();
        setTimeout(function () {
            $("#Email_" + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    if (!passwort) {
        $("#Passworthinweis_" + woher).show();
        setTimeout(function () {
            $("#Passwort_" + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    if (!passwort2) {
        $("#Passwort2hinweis_" + woher).show();
        setTimeout(function () {
            $("#Passwort2_" + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    if (passwort !== passwort2) {
        $("#Passwort2hinweisFalsch_" + woher).show();
        setTimeout(function () {
            $("#Passwort2_" + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    return true;
};