// beurteilt, ob ein Objekt exportiert werden soll
// indem er Feldwerte mit Filterkriterien vergleicht
// das Filterkriterium besteht aus einem Vergleichsoperator (oder auch nicht) und einem Filterwert

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

module.exports = function (feldwert, filterwert, vergleichsoperator) {
    var myTypeOf = require('lists/lib/myTypeOf');

    if (vergleichsoperator === "kein" && feldwert == filterwert) { return true; }
    if (vergleichsoperator === "kein" && myTypeOf(feldwert) === "string" && feldwert.indexOf(filterwert) >= 0) { return true; }
    if (vergleichsoperator === "=" && feldwert == filterwert)    { return true; }
    if (vergleichsoperator === ">" && feldwert > filterwert)     { return true; }
    if (vergleichsoperator === ">=" && feldwert >= filterwert)   { return true; }
    if (vergleichsoperator === "<" && feldwert < filterwert)     { return true; }
    if (vergleichsoperator === "<=" && feldwert <= filterwert)   { return true; }

    return false;
};