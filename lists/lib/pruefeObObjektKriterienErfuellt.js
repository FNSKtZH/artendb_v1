/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require("lists/lib/underscore");

module.exports = function (objekt, felder, filterkriterien, fasseTaxonomienZusammen, nurObjekteMitEigenschaften) {
    var objektHinzufuegen = false,
        objektNichtHinzufuegen = false,
        dsTyp,
        dsName,
        dsExistiert,
        feldname,
        filterwert,
        feldwert,
        vergleichsoperator,
        feldExistiert,
        feldHinzugefuegt,
        filtereBeziehungspartner = require('lists/lib/filtereBeziehungspartner'),
        convertToCorrectType     = require('lists/lib/convertToCorrectType'),
        beurteileFilterkriterien = require('lists/lib/beurteileFilterkriterien'),
        z,
        g,
        k,
        dsMitFeld,
        bezMitFeldname;

    // sicherstellen, dass DS und BS existieren
    objekt.Eigenschaftensammlungen = objekt.Eigenschaftensammlungen || [];
    objekt.Beziehungssammlungen = objekt.Beziehungssammlungen || [];

    // kein Filter aber nur Datensätze mit Infos aus DS/BS
    //objektHinzufuegen = (filterkriterien.length === 0 && !nurObjekteMitEigenschaften);
    if (filterkriterien.length === 0 && !nurObjekteMitEigenschaften) {
        objektHinzufuegen = true;
    }

    loopFilterkriterien:
    for (z = 0; z < filterkriterien.length; z++) {
        dsTyp      = filterkriterien[z].DsTyp;
        dsName     = filterkriterien[z].DsName;
        feldname   = filterkriterien[z].Feldname;
        filterwert = filterkriterien[z].Filterwert;
        if (feldname === "GUID") {
            // die ID darf nicht in Kleinschrift verwandelt werden
            filterwert = filterkriterien[z].Filterwert;
        } else {
            filterwert = convertToCorrectType(filterkriterien[z].Filterwert);
        }
        vergleichsoperator = filterkriterien[z].Vergleichsoperator;
        if (dsName === "objekt") {
            feldwert = (feldname === "GUID" ? objekt._id : objekt[feldname]);
            if (feldwert || feldwert === 0) {
                if (beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                    objektHinzufuegen = true;
                } else {
                    objektNichtHinzufuegen = true;
                    break;
                }
            }
        } else if (dsTyp === "Taxonomie" && fasseTaxonomienZusammen) {
            feldwert = convertToCorrectType(objekt.Taxonomie.Eigenschaften[feldname]);
            // das Feld ist aus Taxonomie und die werden zusammengefasst
            // daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
            if (feldwert || feldwert === 0) {
                if (beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                    objektHinzufuegen = true;
                } else {
                    if (filterwert === false) {
                        // ausser: es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                        // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                        // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                        objektHinzufuegen = true;
                    } else {
                        objektNichtHinzufuegen = true;
                        break;
                    }
                }
            } else {
                // Bedingung nicht erfüllt
                objektNichtHinzufuegen = true;
                break;
            }
        } else if (dsTyp === "Taxonomie") {
            feldwert = convertToCorrectType(objekt.Taxonomie.Eigenschaften[feldname]);
            // das Feld ist aus Taxonomie und die werden nicht zusammengefasst
            if (feldwert || feldwert === 0) {
                if (objekt.Taxonomie.Name === dsName) {
                    if (beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                        objektHinzufuegen = true;
                    } else {
                        objektNichtHinzufuegen = true;
                        break;
                    }
                } else {
                    // Bedingung nicht erfüllt
                    objektNichtHinzufuegen = true;
                    break;
                }
            } else {
                if (filterwert === false) {
                    // ausser: es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                    // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                    // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                    objektHinzufuegen = true;
                }
            }
        } else if (dsTyp === "Beziehung") {
            // durch alle Beziehungssammlungen loopen und suchen, ob Filter trifft
            dsExistiert = false;
            for (g = 0; g < objekt.Beziehungssammlungen.length; g++) {
                if (objekt.Beziehungssammlungen[g].Name === dsName) {
                    dsExistiert = true;
                    // durch Beziehungssammlungen der Beziehung loopen
                    if (objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
                        feldExistiert = false;
                        feldHinzugefuegt = false;
                        if (objekt.Beziehungssammlungen[g].Beziehungen && objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
                            _.each(objekt.Beziehungssammlungen[g].Beziehungen, function (beziehung) {
                                // durch die Felder der Beziehung loopen
                                if (beziehung[feldname] || beziehung[feldname] === 0) {
                                    feldExistiert = true;
                                    // Beziehungspartner sind Objekte und müssen separat gefiltert werden
                                    if (feldname === "Beziehungspartner") {
                                        var bezPartner = filtereBeziehungspartner(feldwert, filterwert, vergleichsoperator);
                                        if (bezPartner.length > 0) {
                                            objektHinzufuegen = true;
                                            feldHinzugefuegt = true;
                                        }
                                    } else {
                                        if (beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                                            objektHinzufuegen = true;
                                            feldHinzugefuegt = true;
                                        }
                                        if (filterwert === false) {
                                            // es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                                            // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                                            // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                                            objektHinzufuegen = true;
                                            feldHinzugefuegt = true;
                                        }
                                    }
                                }
                            });
                        }
                        if (feldExistiert && !feldHinzugefuegt) {
                            objektNichtHinzufuegen = true;
                            break loopFilterkriterien;
                        }
                    } else {
                        if (filterwert === false) {
                            // ausser: es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                            // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                            // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                            objektHinzufuegen = true;
                        } else {
                            // es gibt keine passende Beziehung, nicht hinzufügen
                            objektNichtHinzufuegen = true;
                            break loopFilterkriterien;
                        }
                    }
                    break;
                }
            }
            if (!dsExistiert) {
                // es gibt keine passende Beziehung, nicht hinzufügen
                objektNichtHinzufuegen = true;
            }
        } else if (dsTyp === "Datensammlung") {
            dsExistiert = false;
            // das ist ein Feld aus einer Datensammlung
            // Wenn die Datensammlung nicht existiert aber nach false gesucht wurde, muss der Datensatz trotzdem geliefert werden
            for (k = 0; k < objekt.Eigenschaftensammlungen.length; k++) {
                if (objekt.Eigenschaftensammlungen[k].Name === dsName) {
                    dsExistiert = true;
                    if (objekt.Eigenschaftensammlungen[k].Name === dsName && objekt.Eigenschaftensammlungen[k].Eigenschaften !== undefined && objekt.Eigenschaftensammlungen[k].Eigenschaften[feldname] !== undefined) {
                        // wir haben das gesuchte Feld gefunden!
                        feldwert = convertToCorrectType(objekt.Eigenschaftensammlungen[k].Eigenschaften[feldname]);
                        // in Eigenschaftensammlungen gibt es keine Feldwerte vom Typ object, diesen Fall also nicht abfangen
                        if (beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                            objektHinzufuegen = true;
                        } else {
                            // Feld existiert aber Kriterium ist nicht erfüllt
                            objektNichtHinzufuegen = true;
                            break loopFilterkriterien;
                        }
                    } else {
                        // das Feld existiert nicht, also Filterkriterium nicht erfüllt
                        if (filterwert === false) {
                            // ausser: es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                            // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                            // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                            objektHinzufuegen = true;
                        } else {
                            objektNichtHinzufuegen = true;
                            break loopFilterkriterien;
                        }
                    }
                    break;
                }
            }
            if (!dsExistiert) {
                if (filterwert === false) {
                    // es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                    // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                    // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                    objektHinzufuegen = true;
                } else {
                    // es gibt keine passende Beziehung, nicht hinzufügen
                    objektNichtHinzufuegen = true;
                    break;
                }
            }
        }
    }

    if (filterkriterien.length === 0 && nurObjekteMitEigenschaften) {
        // hoppla. jetzt müssen wir trotzdem durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
        // wenn ja und Feld aus DS/BS: objektHinzufuegen = true;
        // wenn nein, soll der Datensatz ja nicht exportiert werden
        if (felder && felder.length > 0) {
            _.each(felder, function (feld) {
                dsTyp = feld.DsTyp;
                dsName = feld.DsName;
                feldname = feld.Feldname;
                if (dsTyp === "Beziehung") {
                    // Beziehungssammlungen mit Namen = dsName suchen
                    var bsMitName = _.find(objekt.Beziehungssammlungen, function (beziehungssammlung) {
                        return beziehungssammlung.Name === dsName;
                    });
                    // Beziehung mit dem gesuchten Feld feldname suchen
                    if (bsMitName && bsMitName.Beziehungen && bsMitName.Beziehungen.length > 0) {
                        bezMitFeldname = _.find(bsMitName.Beziehungen, function (beziehung) {
                            return !!beziehung[feldname];
                        });
                        if (bezMitFeldname) {
                            objektHinzufuegen = true;
                        }
                    }
                } else if (dsTyp === "Datensammlung") {
                    // das ist ein Feld aus einer Datensammlung
                    // suchen, ob im objekt die gesuchte Datensammlung vorkommt und eine solches Feld mit Eigenschaften enthält
                    dsMitFeld = _.find(objekt.Eigenschaftensammlungen, function (datensammlung) {
                        return datensammlung.Name === dsName && datensammlung.Eigenschaften !== undefined && datensammlung.Eigenschaften[feldname] !== undefined;
                    });
                    // wenn das Feld vorkommt, exportieren
                    if (dsMitFeld) {
                        objektHinzufuegen = true;
                    }
                }
            });
        }
    }
    return objektHinzufuegen && !objektNichtHinzufuegen;
};