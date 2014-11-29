// Nimmt ein FelderObjekt entgegen. Das ist entweder leer (erste Gruppe) oder enthält schon Felder (ab der zweiten Gruppe)
// Nimmt ein Array mit Feldern entgegen
// mit der Struktur: {'key':['Flora','Datensammlung','Blaue Liste (1998)','Anwendungshäufigkeit zur Erhaltung'],'value':null}
// ergänzt das FelderObjekt um diese Felder
// retourniert das ergänzte FelderObjekt
// das FelderObjekt enthält alle gewünschten Felder. Darin sind nullwerte

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore');

module.exports = function (felderObjekt, felderArray) {
    var dsTyp,
        dsName,
        feldname,
        feldtyp;

    _.each(felderArray, function (feldObjekt) {
        if (feldObjekt.key) {
            // Gruppe wurde entfernt, so sind alle keys um 1 kleiner als ursprünglich
            dsTyp    = feldObjekt.key[0];
            dsName   = feldObjekt.key[1];
            feldname = feldObjekt.key[2];
            feldtyp  = feldObjekt.key[3];
            if (dsTyp === 'Objekt') {
                // das ist eine Eigenschaft des Objekts
                //FelderObjekt[FeldName] = null;    // NICHT HINZUFÜGEN, DIESE FELDER SIND SCHON IM FORMULAR FIX DRIN
            } else if (window.adb.fasseTaxonomienZusammen && dsTyp === 'Taxonomie') {
                // Datensammlungen werden zusammengefasst. DsTyp muss 'Taxonomie(n)' heissen und die Felder aller Taxonomien sammeln
                // Wenn Datensammlung noch nicht existiert, gründen
                if (!felderObjekt['Taxonomie(n)']) {
                    felderObjekt['Taxonomie(n)']               = {};
                    felderObjekt['Taxonomie(n)'].Typ           = dsTyp;
                    felderObjekt['Taxonomie(n)'].Name          = 'Taxonomie(n)';
                    felderObjekt['Taxonomie(n)'].Eigenschaften = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felderObjekt['Taxonomie(n)'].Eigenschaften[feldname] = feldtyp;
            } else if (dsTyp === 'Datensammlung' || dsTyp === 'Taxonomie') {
                // Wenn Datensammlung oder Taxonomie noch nicht existiert, gründen
                if (!felderObjekt[dsName]) {
                    felderObjekt[dsName]               = {};
                    felderObjekt[dsName].Typ           = dsTyp;
                    felderObjekt[dsName].Name          = dsName;
                    felderObjekt[dsName].Eigenschaften = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felderObjekt[dsName].Eigenschaften[feldname] = feldtyp;
            } else if (dsTyp === 'Beziehung') {
                // Wenn Beziehungstyp noch nicht existiert, gründen
                if (!felderObjekt[dsName]) {
                    felderObjekt[dsName]             = {};
                    felderObjekt[dsName].Typ         = dsTyp;
                    felderObjekt[dsName].Name        = dsName;
                    felderObjekt[dsName].Beziehungen = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felderObjekt[dsName].Beziehungen[feldname] = feldtyp;
            }
        }
    });
    return felderObjekt;
};