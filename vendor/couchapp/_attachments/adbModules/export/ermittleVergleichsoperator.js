// erhält einen filterwert
// dieser kann zuvorderst einen Vergleichsoperator enthalten oder auch nicht
// retourniert einen Array mit 0 Vergleichsoperator und 1 filterwert

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

var returnFunction = function (filterwert) {
    var vergleichsoperator;
    if (filterwert.indexOf(">=") === 0) {
        vergleichsoperator = ">=";
        if (filterwert.indexOf(" ") === 2) {
            filterwert = filterwert.slice(3);
        } else {
            filterwert = filterwert.slice(2);
        }
    } else if (filterwert.indexOf("<=") === 0) {
        vergleichsoperator = "<=";
        if (filterwert.indexOf(" ") === 2) {
            filterwert = filterwert.slice(3);
        } else {
            filterwert = filterwert.slice(2);
        }
    } else if (filterwert.indexOf(">") === 0) {
        vergleichsoperator = ">";
        if (filterwert.indexOf(" ") === 1) {
            filterwert = filterwert.slice(2);
        } else {
            filterwert = filterwert.slice(1);
        }
    } else if (filterwert.indexOf("<") === 0) {
        vergleichsoperator = "<";
        if (filterwert.indexOf(" ") === 1) {
            filterwert = filterwert.slice(2);
        } else {
            filterwert = filterwert.slice(1);
        }
    } else if (filterwert.indexOf("=") === 0) {
        // abfangen, falls jemand "=" eingibt
        vergleichsoperator = "=";
        if (filterwert.indexOf(" ") === 1) {
            filterwert = filterwert.slice(2);
        } else {
            filterwert = filterwert.slice(1);
        }
    } else {
        vergleichsoperator = "kein";
    }
    return [vergleichsoperator, filterwert];
};

module.exports = returnFunction;