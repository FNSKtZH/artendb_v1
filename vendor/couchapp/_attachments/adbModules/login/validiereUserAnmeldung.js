/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                     = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (woher) {
    var email    = $('#Email_' + woher).val(),
        passwort = $('#passwort' + capitaliseFirstLetter(woher)).val();

    if (!email) {
        setTimeout(function () {
            $('#Email_' + woher).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        $("#Emailhinweis_" + woher).show();
        return false;
    }
    if (!passwort) {
        setTimeout(function () {
            $('#passwort' + capitaliseFirstLetter(woher)).focus();
        }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
        $("#Passworthinweis_" + woher).show();
        return false;
    }
    return true;
};