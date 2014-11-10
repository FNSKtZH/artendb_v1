/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require("lists/lib/underscore");

module.exports = function (objekt, felder, filterkriterien) {
    // der Benutzer will nur Objekte mit Informationen aus den gewählten Eigenschaften- und Beziehungssammlungen erhalten
    // also müssen wir durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
    // wenn ja und Feld aus DS/BS und kein Filter gesetzt: objektHinzufügen = true
    // wenn ein Filter gesetzt wurde und keine Daten enthalten sind, nicht anzeigen
    var hinzufuegen = false,
        // es reicht, wenn mindestens ein feld mit Werten enthalten ist!
        mindestensEinFeldHinzufuegen = false,
        dsTyp,
        feldName,
        bsMitName,
        bezMitFeldname,
        ds_mit_name,
        dsName;

    if (felder && felder.length > 0) {
        _.each(felder, function (feld) {
            dsTyp = feld.DsTyp;
            dsName = feld.DsName;
            feldName = feld.Feldname;
            if (dsTyp === "Beziehung") {
                // suche Beziehungssammlung mit dsName
                bsMitName = _.find(objekt.Beziehungssammlungen, function (beziehungssammlung) {
                    return beziehungssammlung.Name === dsName;
                });
                if (bsMitName && bsMitName.Beziehungen && bsMitName.Beziehungen.length > 0) {
                    // suche Feld feldName
                    bezMitFeldname = _.find(bsMitName.Beziehungen, function (beziehung) {
                        return beziehung[feldName] || beziehung[feldName] === 0;
                    });
                    hinzufuegen = !!bezMitFeldname;
                    if (hinzufuegen) {
                        mindestensEinFeldHinzufuegen = true;
                    }
                }
            } else if (dsTyp === "Datensammlung") {
                // das ist ein Feld aus einer Datensammlung
                // suche Datensammlung mit Name = dsName
                ds_mit_name = _.find(objekt.Eigenschaftensammlungen, function (datensammlung) {
                    return datensammlung.Name === dsName;
                });
                // hinzufuegen, wenn Feld mit feldName existiert und es Daten enthält
                hinzufuegen = (ds_mit_name && ds_mit_name.Eigenschaften !== undefined && ds_mit_name.Eigenschaften[feldName] !== undefined);
                if (hinzufuegen) {
                    mindestensEinFeldHinzufuegen = true;
                }
            }
        });
    }
    return mindestensEinFeldHinzufuegen;
};