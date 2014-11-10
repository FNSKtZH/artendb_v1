/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require("lists/lib/underscore");

module.exports = function (beziehungspartner, Filterwert, Vergleichsoperator) {
    // Wenn Feldname = Beziehungspartner, durch die Partner loopen und nur hinzufügen,
    // wessen Name die Bedingung erfüllt
    var bezPartner = [];
    if (beziehungspartner && beziehungspartner.length > 0) {
        _.each(beziehungspartner, function (partner) {
            var feldwert = partner.Name.toLowerCase();
            if (Vergleichsoperator === "kein" && feldwert == Filterwert) {
                bezPartner.push(partner);
            } else if (Vergleichsoperator === "kein" && typeof feldwert === "string" && feldwert.indexOf(Filterwert) >= 0) {
                bezPartner.push(partner);
            } else if (Vergleichsoperator === "=" && feldwert == Filterwert) {
                bezPartner.push(partner);
            } else if (Vergleichsoperator === ">" && feldwert > Filterwert) {
                bezPartner.push(partner);
            } else if (Vergleichsoperator === ">=" && feldwert >= Filterwert) {
                bezPartner.push(partner);
            } else if (Vergleichsoperator === "<" && feldwert < Filterwert) {
                bezPartner.push(partner);
            } else if (Vergleichsoperator === "<=" && feldwert <= Filterwert) {
                bezPartner.push(partner);
            }
        });
    }
    return bezPartner;
};