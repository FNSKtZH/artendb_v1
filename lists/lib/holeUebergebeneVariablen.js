/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require("lists/lib/underscore");

// liest übergebene Variabeln für Export aus
// und bereitet sie für die Verwendung auf
module.exports = function (query_objekt) {
    var ueVar = {
            fasseTaxonomienZusammen: false,
            filterkriterien: [],
            felder: [],
            nur_objekte_mit_eigenschaften: true,
            bez_in_zeilen: true,
            format: 'xlsx'
        },
        filterkriterienObjekt,
        felderObjekt,
        bereiteFilterkriterienVor = require('lists/lib/bereiteFilterkriterienVor');

    _.each(query_objekt, function (value, key) {
        switch (key) {
        case "fasseTaxonomienZusammen":
            // true oder false wird als String übergeben > umwandeln
            ueVar.fasseTaxonomienZusammen = (value === 'true');
            break;
        case "filter":
            filterkriterienObjekt = JSON.parse(value);
            ueVar.filterkriterien = filterkriterienObjekt.filterkriterien || [];
            // jetzt strings in Kleinschrift und Nummern in Zahlen verwandeln
            // damit das später nicht dauern wiederholt werden muss
            ueVar.filterkriterien = bereiteFilterkriterienVor(ueVar.filterkriterien);
            break;
        case "felder":
            felderObjekt = JSON.parse(value);
            ueVar.felder = felderObjekt.felder || [];
            break;
        case "gruppen":
            ueVar.gruppen = value.split(",");
            break;
        case "nur_objekte_mit_eigenschaften":
            // true oder false wird als String übergeben > umwandeln
            ueVar.nur_objekte_mit_eigenschaften = (value == 'true');
            break;
        case "bez_in_zeilen":
            // true oder false wird als String übergeben > umwandeln
            ueVar.bez_in_zeilen = (value === 'true');
            break;
        case "format":
            // true oder false wird als String übergeben > umwandeln
            ueVar.format = value;
            break;
        }
    });
    return ueVar;
};