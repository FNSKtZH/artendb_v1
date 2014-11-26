// kontrollieren, ob die erforderlichen Felder etwas enthalten
// wenn ja wird true retourniert, sonst false

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                     = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (woher) {
    var email,
        passwort,
        passwort2;

    woher = capitaliseFirstLetter(woher);

    // zunächst alle Hinweise ausblenden (falls einer von einer früheren Prüfung her noch eingeblendet wäre)
    $(".hinweis").hide();
    // erfasste Werte holen
    email     = $("#email" + woher).val();
    passwort  = $("#passwort" + woher).val();
    passwort2 = $("#passwort2" + woher).val();
    // prüfen
    if (!email) {
        $("#emailhinweis" + woher).show();
        setTimeout(function () {
            $("#email" + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    if (!passwort) {
        $("#passworthinweis" + woher).show();
        setTimeout(function () {
            $("#passwort" + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    if (!passwort2) {
        $("#passwort2hinweis" + woher).show();
        setTimeout(function () {
            $("#passwort2" + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    if (passwort !== passwort2) {
        $("#passwort2hinweisFalsch" + woher).show();
        setTimeout(function () {
            $("#passwort2" + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        return false;
    }
    return true;
};