// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

module.exports = function (Wert) {
    if (typeof Wert === "boolean")   { return "boolean"; }
    if (parseInt(Wert, 10) && parseFloat(Wert) && parseInt(Wert, 10) !== parseFloat(Wert) && parseInt(Wert, 10) == Wert) { return "float"; }
    // verhindern, dass führende Nullen abgeschnitten werden
    if ((parseInt(Wert, 10) == Wert && Wert.toString().length === Math.ceil(parseInt(Wert, 10) / 10)) || Wert == "0")    { return "integer"; }
    if (typeof Wert === "object")    { return "object"; }
    if (typeof Wert === "string")    { return "string"; }
    if (Wert === undefined)          { return "undefined"; }
    if (typeof Wert === "function")  { return "function"; }
};