// erhält einen filterwert
// dieser kann zuvorderst einen Vergleichsoperator enthalten oder auch nicht
// retourniert einen Array mit 0 Vergleichsoperator und 1 filterwert

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

module.exports = function (filterwert) {
    var vergleichsoperator;

    if (filterwert.indexOf('>=') === 0) {
        vergleichsoperator = '>=';
        filterwert = (filterwert.indexOf(' ') === 2 ? filterwert.slice(3) : filterwert.slice(2));
    } else if (filterwert.indexOf('<=') === 0) {
        vergleichsoperator = '<=';
        filterwert = (filterwert.indexOf(' ') === 2 ? filterwert.slice(3) : filterwert.slice(2));
    } else if (filterwert.indexOf('>') === 0) {
        vergleichsoperator = '>';
        filterwert = (filterwert.indexOf(' ') === 1 ? filterwert.slice(2) : filterwert.slice(1));
    } else if (filterwert.indexOf('<') === 0) {
        vergleichsoperator = '<';
        filterwert = (filterwert.indexOf(' ') === 1 ? filterwert.slice(2) : filterwert.slice(1));
    } else if (filterwert.indexOf('=') === 0) {
        // abfangen, falls jemand '=' eingibt
        vergleichsoperator = '=';
        filterwert = (filterwert.indexOf(' ') === 1 ? filterwert.slice(2) : filterwert.slice(1));
    } else {
        vergleichsoperator = 'kein';
    }
    return [vergleichsoperator, filterwert];
};