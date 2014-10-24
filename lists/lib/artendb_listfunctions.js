'use strict';

var _ = require("lists/lib/underscore");

// bekommt einen der existierenden Werte für Status bei Flora
// retourniert den einstelligen Code
// wird benötigt von EvAB
exports.codiereFloraStatus = function (status) {
    var codierteWerte = {
        "eigenständige Art aber im Index nicht enthalten":                  "?",
        "akzeptierter Name":                                                "A",
        "in anderem Taxon eingeschlossener Name":                           "E",
        "in anderem Taxon eingeschlossener Name. Im Index nicht enthalten": "f",
        "Synonym":                                                          "S",
        "zusammenfassender Name. Im Index nicht enthalten":                 "y",
        "zusammenfassender Name":                                           "Z"
    };
    if (codierteWerte[status]) {
        return codierteWerte[status];
    } else {
        return null;
    }
};

exports.erstelleExportString = function (exportobjekte) {
    var stringTitelzeile = "",
        stringZeilen = "",
        stringZeile;
    if (exportobjekte && exportobjekte.length > 0) {
        _.each(exportobjekte, function (exportobjekt) {
            // aus unerklärlichem Grund blieb stringTitelzeile leer, wenn nur ein Datensatz gefiltert wurde
            // daher bei jedem Datensatz prüfen, ob eine Titelzeile erstellt wurde und wenn nötig ergänzen
            if (stringTitelzeile === "" || stringTitelzeile === ",") {
                stringTitelzeile = "";
                // durch Spalten loopen
                _.each(exportobjekt, function (feldwert, feldname) {
                    if (stringTitelzeile !== "") {
                        stringTitelzeile += ',';
                    }
                    stringTitelzeile += '"' + feldname + '"';
                });
            }

            if (stringZeilen !== "") {
                stringZeilen += '\n';
            }
            stringZeile = "";
            // durch die Felder loopen
            _.each(exportobjekt, function (feldwert) {
                if (stringZeile !== "") {
                    stringZeile += ',';
                }
                // null-Werte als leere Werte
                if (feldwert === null) {
                    stringZeile += "";
                } else if (typeof feldwert === "number") {
                    // Zahlen ohne Anführungs- und Schlusszeichen exportieren
                    stringZeile += feldwert;
                } else if (typeof feldwert === "object") {
                    // Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
                    stringZeile += '"' + JSON.stringify(feldwert).replace(/"/g, "'") + '"';
                } else {
                    stringZeile += '"' + feldwert + '"';
                }
            });
            stringZeilen += stringZeile;
        });
    }
    return stringTitelzeile + "\n" + stringZeilen;
};

exports.filtereBeziehungspartner = function (beziehungspartner, Filterwert, Vergleichsoperator) {
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

exports.convertToCorrectType = function (feldWert) {
    var type = exports.myTypeOf(feldWert);
    if (type === "boolean") {
        return Boolean(feldWert);
    } else if (type === "float") {
        return parseFloat(feldWert);
    } else if (type === "integer") {
        return parseInt(feldWert, 10);
    } else if (type === "string") {
        // string jetzt kleinschreiben, damit das nicht später erfolgen muss
        return feldWert.toLowerCase();
    } else {
        // object nicht umwandeln. Man muss beim Vergleichen unterscheiden können, ob es ein Object war
        return feldWert;
    }
};

// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!
exports.myTypeOf = function (Wert) {
    if (typeof Wert === "boolean") {
        return "boolean";
    } else if (parseInt(Wert, 10) && parseFloat(Wert) && parseInt(Wert, 10) !== parseFloat(Wert) && parseInt(Wert, 10) == Wert) {
        // es ist eine Float
        return "float";
    // verhindern, dass führende Nullen abgeschnitten werden
    } else if ((parseInt(Wert, 10) == Wert && Wert.toString().length === Math.ceil(parseInt(Wert, 10)/10)) || Wert == "0") {
        // es ist eine Integer
        return "integer";
    } else if (typeof Wert === "object") {
        // es ist ein Objekt
        return "object";
    } else if (typeof Wert === "string") {
        // als String behandeln
        return "string";
    } else if (typeof Wert === "undefined") {
        return "undefined";
    } else if (typeof Wert === "function") {
        return "function";
    }
};

// beurteilt, ob ein Objekt exportiert werden soll
// indem er Feldwerte mit Filterkriterien vergleicht
// das Filterkriterium besteht aus einem Vergleichsoperator (oder auch nicht) und einem Filterwert
exports.beurteileFilterkriterien = function (feldwert, filterwert, vergleichsoperator) {
    if (vergleichsoperator === "kein" && feldwert == filterwert) {
        return true;
    } else if (vergleichsoperator === "kein" && exports.myTypeOf(feldwert) === "string" && feldwert.indexOf(filterwert) >= 0) {
        return true;
    } else if (vergleichsoperator === "=" && feldwert == filterwert) {
        return true;
    } else if (vergleichsoperator === ">" && feldwert > filterwert) {
        return true;
    } else if (vergleichsoperator === ">=" && feldwert >= filterwert) {
        return true;
    } else if (vergleichsoperator === "<" && feldwert < filterwert) {
        return true;
    } else if (vergleichsoperator === "<=" && feldwert <= filterwert) {
        return true;
    }
    return false;
};

exports.beurteileObInformationenEnthaltenSind = function (objekt, felder, filterkriterien) {
    // der Benutzer will nur Objekte mit Informationen aus den gewählten Eigenschaften- und Beziehungssammlungen erhalten
    // also müssen wir durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
    // wenn ja und Feld aus DS/BS und kein Filter gesetzt: objektHinzufügen = true
    // wenn ein Filter gesetzt wurde und keine Daten enthalten sind, nicht anzeigen
    var hinzufügen = false,
        // es reicht, wenn mindestens ein feld mit Werten enthalten ist!
        mindestens_ein_feld_hinzufügen = false,
        ds_typ,
        feldname,
        bs_mit_name,
        bez_mit_feldname,
        ds_mit_name,
        ds_name;
    if (felder && felder.length > 0) {
        _.each(felder, function (feld) {
            ds_typ = feld.DsTyp;
            ds_name = feld.DsName;
            feldname = feld.Feldname;
            if (ds_typ === "Beziehung") {
                // suche Beziehungssammlung mit ds_name
                bs_mit_name = _.find(objekt.Beziehungssammlungen, function (beziehungssammlung) {
                    return beziehungssammlung.Name === ds_name;
                });
                if (bs_mit_name && bs_mit_name.Beziehungen && bs_mit_name.Beziehungen.length > 0) {
                    // suche Feld feldname
                    bez_mit_feldname = _.find(bs_mit_name.Beziehungen, function (beziehung) {
                        return beziehung[feldname] || beziehung[feldname] === 0;
                    });
                    hinzufügen = !!bez_mit_feldname;
                    if (hinzufügen) {
                        mindestens_ein_feld_hinzufügen = true;
                    }
                }
            } else if (ds_typ === "Datensammlung") {
                // das ist ein Feld aus einer Datensammlung
                // suche Datensammlung mit Name = ds_name
                ds_mit_name = _.find(objekt.Eigenschaftensammlungen, function (datensammlung) {
                    return datensammlung.Name === ds_name;
                });
                // hinzufügen, wenn Feld mit feldname existiert und es Daten enthält
                hinzufügen = (ds_mit_name && typeof ds_mit_name.Eigenschaften !== "undefined" && typeof ds_mit_name.Eigenschaften[feldname] !== "undefined");
                if (hinzufügen) {
                    mindestens_ein_feld_hinzufügen = true;
                }
            }
        });
    }
    return mindestens_ein_feld_hinzufügen;
};

exports.prüfeObObjektKriterienErfüllt = function (objekt, felder, filterkriterien, fasseTaxonomienZusammen, nur_objekte_mit_eigenschaften) {
    var objekt_hinzufügen = false,
        objekt_nicht_hinzufügen = false,
        ds_typ,
        ds_name,
        ds_existiert,
        feldname,
        filterwert,
        feldwert,
        vergleichsoperator,
        feld_existiert,
        feld_hinzugefügt;

    // sicherstellen, dass DS und BS existieren
    objekt.Eigenschaftensammlungen = objekt.Eigenschaftensammlungen || [];
    objekt.Beziehungssammlungen = objekt.Beziehungssammlungen || [];

    // kein Filter aber nur Datensätze mit Infos aus DS/BS
    //objekt_hinzufügen = (filterkriterien.length === 0 && !nur_objekte_mit_eigenschaften);
    if (filterkriterien.length === 0 && !nur_objekte_mit_eigenschaften) {
        objekt_hinzufügen = true;
    }

    loop_filterkriterien:
    for (var z=0; z<filterkriterien.length; z++) {
        ds_typ = filterkriterien[z].DsTyp;
        ds_name = filterkriterien[z].DsName;
        feldname = filterkriterien[z].Feldname,
        filterwert = filterkriterien[z].Filterwert;
        if (feldname === "GUID") {
            // die ID darf nicht in Kleinschrift verwandelt werden
            filterwert = filterkriterien[z].Filterwert;
        } else {
            filterwert = exports.convertToCorrectType(filterkriterien[z].Filterwert);
        }
        vergleichsoperator = filterkriterien[z].Vergleichsoperator;
        if (ds_name === "objekt") {
            if (feldname === "GUID") {
                feldwert = objekt._id;
            } else {
                feldwert = objekt[feldname];
            }
            if (feldwert || feldwert === 0) {
                if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                    objekt_hinzufügen = true;
                } else {
                    objekt_nicht_hinzufügen = true;
                    break;
                }
            }
        } else if (ds_typ === "Taxonomie" && fasseTaxonomienZusammen) {
            feldwert = exports.convertToCorrectType(objekt.Taxonomie.Eigenschaften[feldname]);
            // das Feld ist aus Taxonomie und die werden zusammengefasst
            // daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
            if (feldwert || feldwert === 0) {
                if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                    objekt_hinzufügen = true;
                } else {
                    if (filterwert === false) {
                        // ausser: es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                        // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                        // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                        objekt_hinzufügen = true;
                    } else {
                        objekt_nicht_hinzufügen = true;
                        break;
                    }
                }
            } else {
                // Bedingung nicht erfüllt
                objekt_nicht_hinzufügen = true;
                break;
            }
        } else if (ds_typ === "Taxonomie") {
            feldwert = exports.convertToCorrectType(objekt.Taxonomie.Eigenschaften[feldname]);
            // das Feld ist aus Taxonomie und die werden nicht zusammengefasst
            if (feldwert || feldwert === 0) {
                if (objekt.Taxonomie.Name === ds_name) {
                    if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                        objekt_hinzufügen = true;
                    } else {
                        objekt_nicht_hinzufügen = true;
                        break;
                    }
                } else {
                    // Bedingung nicht erfüllt
                    objekt_nicht_hinzufügen = true;
                    break;
                }
            } else {
                if (filterwert === false) {
                    // ausser: es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                    // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                    // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                    objekt_hinzufügen = true;
                }
            }
        } else if (ds_typ === "Beziehung") {
            // durch alle Beziehungssammlungen loopen und suchen, ob Filter trifft
            ds_existiert = false;
                for (var g=0; g<objekt.Beziehungssammlungen.length; g++) {
                    if (objekt.Beziehungssammlungen[g].Name === ds_name) {
                        ds_existiert = true;
                        // durch Beziehungssammlungen der Beziehung loopen
                        if (objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
                            feld_existiert = false;
                            feld_hinzugefügt = false;
                            if (objekt.Beziehungssammlungen[g].Beziehungen && objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
                                _.each(objekt.Beziehungssammlungen[g].Beziehungen, function (beziehung) {
                                    // durch die Felder der Beziehung loopen
                                    if (beziehung[feldname] || beziehung[feldname] === 0) {
                                        feld_existiert = true;
                                        // Beziehungspartner sind Objekte und müssen separat gefiltert werden
                                        if (feldname === "Beziehungspartner") {
                                            var bezPartner = exports.filtereBeziehungspartner(feldwert, filterwert, vergleichsoperator);
                                            if (bezPartner.length > 0) {
                                                objekt_hinzufügen = true;
                                                feld_hinzugefügt = true;
                                            }
                                        } else {
                                            if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                                                objekt_hinzufügen = true;
                                                feld_hinzugefügt = true;
                                            }
                                            if (filterwert === false) {
                                                // es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                                                // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                                                // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                                                objekt_hinzufügen = true;
                                                feld_hinzugefügt = true;
                                            }
                                        }
                                    }
                                });
                            }
                            if (feld_existiert && !feld_hinzugefügt) {
                                objekt_nicht_hinzufügen = true;
                                break loop_filterkriterien;
                            }
                        } else {
                            if (filterwert === false) {
                                // ausser: es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                                // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                                // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                                objekt_hinzufügen = true;
                            } else {
                                // es gibt keine passende Beziehung, nicht hinzufügen
                                objekt_nicht_hinzufügen = true;
                                break loop_filterkriterien;
                            }
                        }
                        break;
                    }
                }
            if (!ds_existiert) {
                // es gibt keine passende Beziehung, nicht hinzufügen
                objekt_nicht_hinzufügen = true;
            }
        } else if (ds_typ === "Datensammlung") {
            ds_existiert = false;
            // das ist ein Feld aus einer Datensammlung
            // Wenn die Datensammlung nicht existiert aber nach false gesucht wurde, muss der Datensatz trotzdem geliefert werden
            for (var k=0; k<objekt.Eigenschaftensammlungen.length; k++) {
                if (objekt.Eigenschaftensammlungen[k].Name === ds_name) {
                    ds_existiert = true;
                    if (objekt.Eigenschaftensammlungen[k].Name === ds_name && typeof objekt.Eigenschaftensammlungen[k].Eigenschaften !== "undefined" && typeof objekt.Eigenschaftensammlungen[k].Eigenschaften[feldname] !== "undefined") {
                        // wir haben das gesuchte Feld gefunden!
                        feldwert = exports.convertToCorrectType(objekt.Eigenschaftensammlungen[k].Eigenschaften[feldname]);
                        // in Eigenschaftensammlungen gibt es keine Feldwerte vom Typ object, diesen Fall also nicht abfangen
                        if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                            objekt_hinzufügen = true;
                        } else {
                            // Feld existiert aber Kriterium ist nicht erfüllt
                            objekt_nicht_hinzufügen = true;
                            break loop_filterkriterien;
                        }
                    } else {
                        // das Feld existiert nicht, also Filterkriterium nicht erfüllt
                        if (filterwert === false) {
                            // ausser: es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                            // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                            // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                            objekt_hinzufügen = true;
                        } else {
                            objekt_nicht_hinzufügen = true;
                            break loop_filterkriterien;
                        }
                    }
                    break;
                }
            }
            if (!ds_existiert) {
                if (filterwert === false) {
                    // es handelt sich um ein ja/nein Feld und es wird nach false gesucht
                    // in diesem Fall kann es sein, dass das Feld einfach nicht existiert
                    // der Benutzer will aber wohl, dass auch dieser Datensatz geliefert wird
                    objekt_hinzufügen = true;
                } else {
                    // es gibt keine passende Beziehung, nicht hinzufügen
                    objekt_nicht_hinzufügen = true;
                    break;
                }
            }
        }
    }

    if (filterkriterien.length === 0 && nur_objekte_mit_eigenschaften) {
        // hoppla. jetzt müssen wir trotzdem durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
        // wenn ja und Feld aus DS/BS: objekt_hinzufügen = true;
        // wenn nein, soll der Datensatz ja nicht exportiert werden
        if (felder && felder.length > 0) {
            _.each(felder, function (feld) {
                ds_typ = feld.DsTyp;
                ds_name = feld.DsName;
                feldname = feld.Feldname;
                if (ds_typ === "Beziehung") {
                    // Beziehungssammlungen mit Namen = ds_name suchen
                    var bs_mit_name = _.find(objekt.Beziehungssammlungen, function (beziehungssammlung) {
                        return beziehungssammlung.Name === ds_name;
                    });
                    // Beziehung mit dem gesuchten Feld feldname suchen
                    if (bs_mit_name && bs_mit_name.Beziehungen && bs_mit_name.Beziehungen.length > 0) {
                        var bez_mit_feldname = _.find(bs_mit_name.Beziehungen, function (beziehung) {
                            return !!beziehung[feldname];
                        });
                        if (bez_mit_feldname) {
                            objekt_hinzufügen = true;
                        }
                    }
                } else if (ds_typ === "Datensammlung") {
                    // das ist ein Feld aus einer Datensammlung
                    // suchen, ob im objekt die gesuchte Datensammlung vorkommt und eine solches Feld mit Eigenschaften enthält
                    var ds_mit_feld = _.find(objekt.Eigenschaftensammlungen, function (datensammlung) {
                        return datensammlung.Name === ds_name && typeof datensammlung.Eigenschaften !== "undefined" && typeof datensammlung.Eigenschaften[feldname] !== "undefined";
                    });
                    // wenn das Feld vorkommt, exportieren
                    if (ds_mit_feld) {
                        objekt_hinzufügen = true;
                    }
                }
            });
        }
    }
    return objekt_hinzufügen && !objekt_nicht_hinzufügen;
};

exports.bereiteFilterkriterienVor = function (filterkriterien) {
    if (filterkriterien && filterkriterien.length > 0) {
        _.each(filterkriterien, function (filterkriterium) {
            // die id darf nicht in Kleinschrift verwandelt werden
            if (filterkriterium.Feldname !== "GUID") {
                // true wurde offenbar irgendwie umgewandelt
                // jedenfalls musste man als Kriterium 1 statt true erfassen, um die Resultate zu erhalten
                // leider kann true oder false nicht wie gewollt von exports.convertToCorrectType zurückgegeben werden
                if (filterkriterium.Filterwert === "true") {
                    filterkriterium.Filterwert = true;
                } else if (filterkriterium.Filterwert === "false") {
                    filterkriterium.Filterwert = false;
                } else {
                    filterkriterium.Filterwert = exports.convertToCorrectType(filterkriterium.Filterwert);
                }
            }
        });
    }
    return filterkriterien;
};

// ergänzt ein Objekt um fehlende Informationen seiner Synonyme
exports.ergänzeObjektUmInformationenVonSynonymen = function (objekt, datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen) {
    // allfällige DS und BS aus Synonymen anhängen
    // zuerst DS
    // eine Liste der im objekt enthaltenen DsNamen erstellen
    var dsNamen = [],
        ds_aus_syn_name2,
        bsNamen = [];
    if (objekt.Eigenschaftensammlungen.length > 0) {
        _.each(objekt.Eigenschaftensammlungen, function (datensammlung) {
            if (datensammlung.Name) {
                dsNamen.push(datensammlung.Name);
            }
        });
    }
    // nicht enthaltene Eigenschaftensammlungen ergänzen
    if (datensammlungen_aus_synonymen.length > 0) {
        _.each(datensammlungen_aus_synonymen, function (datensammlung) {
            ds_aus_syn_name2 = datensammlung.Name;
            if (dsNamen.length === 0 || ds_aus_syn_name2.indexOf(dsNamen) === -1) {
                objekt.Eigenschaftensammlungen.push(datensammlung);
                // den Namen zu den dsNamen hinzufügen, damit diese DS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
                dsNamen.push(ds_aus_syn_name2);
            }
        });
    }
    // jetzt BS aus Synonymen anhängen
    // eine Liste der im objekt enthaltenen BsNamen erstellen
    if (objekt.Beziehungssammlungen.length > 0) {
        _.each(objekt.Beziehungssammlungen, function (beziehungssammlung) {
            if (beziehungssammlung.Name) {
                bsNamen.push(beziehungssammlung.Name);
            }
        });
    }
    // nicht enthaltene Beziehungssammlungen ergänzen
    var bs_aus_syn_name2;
    if (beziehungssammlungen_aus_synonymen.length > 0) {
        _.each(beziehungssammlungen_aus_synonymen, function (beziehungssammlung) {
            bs_aus_syn_name2 = beziehungssammlung.Name;
            if (bsNamen.length === 0 || bs_aus_syn_name2.indexOf(bsNamen) === -1) {
                objekt.Beziehungssammlungen.push(beziehungssammlung);
                // den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird
                // auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
                bsNamen.push(bs_aus_syn_name2);
            }
        });
    }
    return objekt;
};

// liest übergebene Variabeln für Export aus
// und bereitet sie für die Verwendung auf
exports.holeÜbergebeneVariablen = function (query_objekt) {
    var ü_var = {
            fasseTaxonomienZusammen: false,
            filterkriterien: [],
            felder: [],
            nur_objekte_mit_eigenschaften: true,
            bez_in_zeilen: true
        },
        filterkriterien_objekt,
        felder_objekt;
    _.each(query_objekt, function (value, key) {
        switch (key) {
            case "fasseTaxonomienZusammen":
                // true oder false wird als String übergeben > umwandeln
                ü_var.fasseTaxonomienZusammen = (value === 'true');
                break;
            case "filter":
                filterkriterien_objekt = JSON.parse(value);
                ü_var.filterkriterien = filterkriterien_objekt.filterkriterien || [];
                // jetzt strings in Kleinschrift und Nummern in Zahlen verwandeln
                // damit das später nicht dauern wiederholt werden muss
                ü_var.filterkriterien = exports.bereiteFilterkriterienVor(ü_var.filterkriterien);
                break;
            case "felder":
                felder_objekt = JSON.parse(value);
                ü_var.felder = felder_objekt.felder || [];
                break;
            case "gruppen":
                ü_var.gruppen = value.split(",");
                break;
            case "nur_objekte_mit_eigenschaften":
                // true oder false wird als String übergeben > umwandeln
                ü_var.nur_objekte_mit_eigenschaften = (value == 'true');
                break;
            case "bez_in_zeilen":
                // true oder false wird als String übergeben > umwandeln
                ü_var.bez_in_zeilen = (value === 'true');
                break;
        }
    });
    return ü_var;
};

exports.ergänzeDsBsVonSynonym = function (objekt, datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen) {
    var ds_aus_syn_namen = [],
        bs_aus_syn_namen = [],
        ds_aus_syn_name,
        bs_aus_syn_name;
    if (objekt.Eigenschaftensammlungen && objekt.Eigenschaftensammlungen.length > 0) {
        if (datensammlungen_aus_synonymen.length > 0) {
            _.each(datensammlungen_aus_synonymen, function (datensammlung) {
                if (datensammlung.Name) {
                    ds_aus_syn_namen.push(datensammlung.Name);
                }
            });
        }
        _.each(objekt.Eigenschaftensammlungen, function (datensammlung) {
            ds_aus_syn_name = datensammlung.Name;
            if (ds_aus_syn_namen.length === 0 || ds_aus_syn_name.indexOf(ds_aus_syn_namen) === -1) {
                datensammlungen_aus_synonymen.push(datensammlung);
                // sicherstellen, dass diese ds nicht nochmals gepuscht wird
                ds_aus_syn_namen.push(ds_aus_syn_name);
            }
        });
    }
    if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
        if (beziehungssammlungen_aus_synonymen.length > 0) {
            _.each(beziehungssammlungen_aus_synonymen, function (beziehungssammlung) {
                if (beziehungssammlung.Name) {
                    bs_aus_syn_namen.push(beziehungssammlung.Name);
                }
            });
        }
        _.each(objekt.Beziehungssammlungen, function (beziehungssammlung) {
            bs_aus_syn_name = beziehungssammlung.Name;
            if (bs_aus_syn_namen.length === 0 || bs_aus_syn_name.indexOf(bs_aus_syn_namen) === -1) {
                beziehungssammlungen_aus_synonymen.push(beziehungssammlung);
                // sicherstellen, dass diese bs nicht nochmals gepuscht wird
                bs_aus_syn_namen.push(bs_aus_syn_name);
            }
        });
    }
    return [datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen];
};

// baut die Export-Objekte auf für alle export-lists
// benötigt Objekt und felder
// retourniert schon_kopiert und exportObjekt
// export_für: ermöglicht anpassungen für spezielle Exporte, z.b. für das Artenlistentool
exports.ergänzeExportobjekteUmExportobjekt = function (objekt, felder, bez_in_zeilen, fasse_taxonomien_zusammen, filterkriterien, export_objekte, export_für) {
    var exportObjekt = {},
        schon_kopiert = false;

    // es müssen Felder übergeben worden sein
    // wenn nicht, aufhören
    if (!felder || felder.length === 0) {
        return {};
    }

    // wenn der Export für das Artenlistentool erstellt wird: Obligatorische Felder einfügen
    if (export_für && export_für === "alt") {
        // Für das ALT obligatorische Felder hinzufügen
        exportObjekt = fuegeObligatorischeFelderFuerAltEin (objekt, exportObjekt);

        // Für das ALT obligatorische Felder aus felder entfernen, sonst gibt es Probleme und es wäre unschön
        felder = _.reject(felder, function (feld) {
            return ["Artwert"].indexOf(feld.Feldname) >=0;
        });
    }

    // Neues Objekt aufbauen, das nur die gewünschten Felder enthält
    _.each(objekt, function (feldwert, feldname) {
        if (typeof feldwert !== "Object" && feldname !== "_rev") {
            _.each(felder, function (feld) {
                if (feld.DsName === "Objekt" && feld.Feldname === feldname) {
                    exportObjekt[feldname] = feldwert;
                }
                if (feld.DsName === "Objekt" && feld.Feldname === "GUID" && feldname === "_id") {
                    exportObjekt["GUID"] = feldwert;
                }
            });
        }
    });

    _.each(felder, function (feld) {
        var export_feldname = feld.DsName + ": " + feld.Feldname,
            feldwert;
        // Taxonomie: Felder übernehmen
        // 2014.06.15: zweite Bedingung ausgeklammert, weil die Felder nur geliefert wurden, wenn zusammenfassend true war
        if (feld.DsTyp === "Taxonomie"/* && (fasse_taxonomien_zusammen || feld.DsName === objekt.Taxonomie.Name)*/) {
            // Leerwert setzen. Wird überschrieben, falls danach ein Wert gefunden wird
            if (fasse_taxonomien_zusammen) {
                exportObjekt["Taxonomie(n): " + feld.Feldname] = "";
            } else {
                exportObjekt[export_feldname] = "";
            }
            // wenn im objekt das zu exportierende Feld vorkommt, den Wert übernehmen
            if (objekt.Taxonomie && objekt.Taxonomie.Eigenschaften && typeof objekt.Taxonomie.Eigenschaften[feld.Feldname] !== "undefined") {
                if (fasse_taxonomien_zusammen) {
                    exportObjekt["Taxonomie(n): " + feld.Feldname] = objekt.Taxonomie.Eigenschaften[feld.Feldname];
                } else {
                    exportObjekt[export_feldname] = objekt.Taxonomie.Eigenschaften[feld.Feldname];
                }
            }
        }

        // Eigenschaftensammlungen: Felder übernehmen
        if (feld.DsTyp === "Datensammlung") {
            // das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
            exportObjekt[export_feldname] = "";
            if (objekt.Eigenschaftensammlungen && objekt.Eigenschaftensammlungen.length > 0) {
                // Enthält das objekt diese Datensammlung?
                var gesuchte_ds = _.find(objekt.Eigenschaftensammlungen, function (datensammlung) {
                    return datensammlung.Name && datensammlung.Name === feld.DsName;
                });
                if (gesuchte_ds) {
                    // ja. Wenn die Datensammlung das Feld enthält > exportieren
                    if (gesuchte_ds.Eigenschaften && typeof gesuchte_ds.Eigenschaften[feld.Feldname] !== "undefined") {
                        exportObjekt[export_feldname] = gesuchte_ds.Eigenschaften[feld.Feldname];
                    }
                }
            }
        }

        if (feld.DsTyp === "Beziehung") {
            // das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
            exportObjekt[export_feldname] = "";

            // wurde schon ein zusätzliches Feld geschaffen? wenn ja: hinzufügen
            if (feld.Feldname === "Beziehungspartner") {
                // noch ein Feld hinzufügen
                exportObjekt[feld.DsName + ": Beziehungspartner GUID(s)"] = "";
            }

            if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
                // suchen, ob das objekt diese Beziehungssammlungen hat
                // suche im objekt die Beziehungssammlung mit Name = feld.DsName
                var bs_mit_namen = _.find(objekt.Beziehungssammlungen, function (beziehungssammlung) {
                    return beziehungssammlung.Name && beziehungssammlung.Name === feld.DsName;
                });
                if (bs_mit_namen && bs_mit_namen.Beziehungen && bs_mit_namen.Beziehungen.length > 0) {
                    // Beziehungen, die exportiert werden sollen, in der Variablen "export_beziehungen" sammeln
                    // durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
                    var export_beziehungen = [];
                    _.each(bs_mit_namen.Beziehungen, function (beziehung) {
                        if (typeof beziehung[feld.Feldname] !== "undefined") {
                            // das gesuchte Feld kommt in dieser Beziehung vor
                            feldwert = exports.convertToCorrectType(beziehung[feld.Feldname]);
                            if (filterkriterien && filterkriterien.length > 0) {
                                _.each(filterkriterien, function (filterkriterium) {
                                    var ds_typ = filterkriterium.DsTyp,
                                        ds_name = filterkriterium.DsName,
                                        feldname = filterkriterium.Feldname,
                                        filterwert = exports.convertToCorrectType(filterkriterium.Filterwert),
                                        vergleichsoperator = filterkriterium.Vergleichsoperator,
                                        beziehungspartner;
                                    if (ds_typ === "Beziehung" && ds_name === feld.DsName && feldname === feld.Feldname) {
                                        // Beziehungspartner sind Objekte und müssen separat gefiltert werden
                                        if (feldname === "Beziehungspartner") {
                                            beziehungspartner = exports.filtereBeziehungspartner(feldwert, filterwert, vergleichsoperator);
                                            if (beziehungspartner.length > 0) {
                                                beziehung.Beziehungspartner = beziehungspartner;
                                                export_beziehungen.push(beziehung);
                                            }
                                        } else {
                                            // jetzt müssen die möglichen Vergleichsoperatoren berücksichtigt werden
                                            if (vergleichsoperator === "kein" && feldwert == filterwert) {
                                                export_beziehungen.push(beziehung);
                                            } else if (vergleichsoperator === "kein" && typeof feldwert === "string" && feldwert.indexOf(filterwert) >= 0) {
                                                export_beziehungen.push(beziehung);
                                            } else if (vergleichsoperator === "=" && feldwert == filterwert) {
                                                export_beziehungen.push(beziehung);
                                            } else if (vergleichsoperator === ">" && feldwert > filterwert) {
                                                export_beziehungen.push(beziehung);
                                            } else if (vergleichsoperator === ">=" && feldwert >= filterwert) {
                                                export_beziehungen.push(beziehung);
                                            } else if (vergleichsoperator === "<" && feldwert < filterwert) {
                                                export_beziehungen.push(beziehung);
                                            } else if (vergleichsoperator === "<=" && feldwert <= filterwert) {
                                                export_beziehungen.push(beziehung);
                                            }
                                        }
                                    }
                                });
                            } else {
                                // kein Filter auf Feldern - Beziehung hinzufügen
                                // aber sicherstellen, dass sie nicht schon drin ist
                                if (!_.contains(export_beziehungen, beziehung)) {
                                    export_beziehungen.push(beziehung);
                                }
                            }
                        }
                    });
                    if (export_beziehungen.length > 0) {
                        // jetzt unterscheiden, ob alle Treffer in einem Feld oder pro Treffer eine Zeile exportiert wird
                        if (bez_in_zeilen) {
                            // pro Treffer eine neue Zeile erstellen
                            schon_kopiert = false;
                            // durch Beziehungen loopen
                            _.each(export_beziehungen, function (export_beziehung) {
                                // exportObjekt kopieren
                                var export_objekt_kopiert = _.clone(exportObjekt);
                                // durch die Felder der Beziehung loopen
                                _.each(export_beziehung, function (export_beziehung_feldwert, export_beziehung_feldname) {
                                    if (export_beziehung_feldname === "Beziehungspartner") {
                                        // zuerst die Beziehungspartner in JSON hinzufügen
                                        export_objekt_kopiert[feld.DsName + ": " + export_beziehung_feldname] = export_objekt_kopiert[feld.DsName + ": " + export_beziehung_feldname] || [];
                                        export_objekt_kopiert[feld.DsName + ": " + export_beziehung_feldname].push(export_beziehung_feldwert);
                                        // Reines GUID-Feld ergänzen
                                        if (!export_objekt_kopiert[feld.DsName + ": Beziehungspartner GUID(s)"]) {
                                            export_objekt_kopiert[feld.DsName + ": Beziehungspartner GUID(s)"] = export_beziehung_feldwert[0].GUID;
                                        } else {
                                            export_objekt_kopiert[feld.DsName + ": Beziehungspartner GUID(s)"] += ", " + export_beziehung_feldwert[0].GUID;
                                        }
                                    } else {
                                        // Vorsicht: Werte werden kommagetrennt. Also müssen Kommas ersetzt werden
                                        if (!export_objekt_kopiert[feld.DsName + ": " + export_beziehung_feldname]) {
                                            export_objekt_kopiert[feld.DsName + ": " + export_beziehung_feldname] = export_beziehung_feldwert;
                                        } else {
                                            export_objekt_kopiert[feld.DsName + ": " + export_beziehung_feldname] += ", " + export_beziehung_feldwert;
                                        }
                                    }
                                });
                                export_objekte.push(export_objekt_kopiert);
                                schon_kopiert = true;
                            });
                        } else {
                            // jeden Treffer kommagetrennt in dasselbe Feld einfügen
                            // durch Beziehungen loopen
                            _.each(export_beziehungen, function (export_beziehung) {
                                // durch die Felder der Beziehung loopen
                                _.each(export_beziehung, function (feldwert, feldname) {
                                    if (feldname === "Beziehungspartner") {
                                        // zuerst die Beziehungspartner in JSON hinzufügen
                                        if (!exportObjekt[feld.DsName + ": " + feldname]) {
                                            exportObjekt[feld.DsName + ": " + feldname] = [];
                                        }
                                        exportObjekt[feld.DsName + ": " + feldname].push(feldwert);
                                        // Reines GUID-Feld ergänzen
                                        if (!exportObjekt[feld.DsName + ": Beziehungspartner GUID(s)"]) {
                                            exportObjekt[feld.DsName + ": Beziehungspartner GUID(s)"] = feldwert[0].GUID;
                                        } else {
                                            exportObjekt[feld.DsName + ": Beziehungspartner GUID(s)"] += ", " + feldwert[0].GUID;
                                        }
                                        // es gibt einen Fehler, wenn replace für einen leeren Wert ausgeführt wird, also kontrollieren
                                    } else if (typeof feldwert === "number") {
                                        // Vorsicht: in Nummern können keine Kommas ersetzt werden - gäbe einen error
                                        if (!exportObjekt[feld.DsName + ": " + feldname]) {
                                            exportObjekt[feld.DsName + ": " + feldname] = feldwert;
                                        } else {
                                            exportObjekt[feld.DsName + ": " + feldname] += ", " + feldwert;
                                        }
                                    } else {
                                        // Vorsicht: Werte werden kommagetrennt. Also müssen Kommas ersetzt werden
                                        if (!exportObjekt[feld.DsName + ": " + feldname]) {
                                            exportObjekt[feld.DsName + ": " + feldname] = feldwert.replace(/,/g, '\(Komma\)');
                                        } else {
                                            exportObjekt[feld.DsName + ": " + feldname] += ", " + feldwert.replace(/,/g, '\(Komma\)');
                                        }
                                    }
                                });
                            });
                        }
                    }
                }
            }
        }
    });

    // objekt zu Exportobjekten hinzufügen - wenn nicht schon kopiert
    if (!schon_kopiert) {
        export_objekte.push(exportObjekt);
    }

    return export_objekte;
};

// fügt die für ALT obligatorischen Felder ein
// und entfernt diese aus dem übergebenen exportObjekt, falls sie schon darin enthalten waren
// erhält das Objekt und das exportObjekt
// retourniert das angepasste exportObjekt
exports.fuegeObligatorischeFelderFuerAltEin = fuegeObligatorischeFelderFuerAltEin();

function fuegeObligatorischeFelderFuerAltEin (objekt, exportObjekt) {
    // übergebene Variabeln prüfen
    if (!objekt) return {};
    if (!exportObjekt) exportObjekt = {};

    // Felder ergänzen
    // immer sicherstellen, dass das Feld existiert
    exportObjekt.ref = '';
    exportObjekt.ref = objekt.Taxonomie.Eigenschaften["Taxonomie ID"];

    exportObjekt.gisLayer = '';
    var ds_zh_gis = _.find(objekt.Eigenschaftensammlungen, function (ds) {
        return ds.Name === "ZH GIS";
    }) || {};

    if (ds_zh_gis && ds_zh_gis.Eigenschaften && ds_zh_gis.Eigenschaften["GIS-Layer"]) {
        exportObjekt.gisLayer = ds_zh_gis.Eigenschaften["GIS-Layer"].substring(0, 50);
    }

    exportObjekt.distance = '';
    if (ds_zh_gis && ds_zh_gis.Eigenschaften && ds_zh_gis.Eigenschaften["Betrachtungsdistanz (m)"]) {
        exportObjekt.distance = ds_zh_gis.Eigenschaften["Betrachtungsdistanz (m)"];
    }

    exportObjekt.nameLat = '';
    if (objekt.Taxonomie.Eigenschaften.Artname) {
        exportObjekt.nameLat = objekt.Taxonomie.Eigenschaften.Artname.substring(0, 255);    
    }
    
    exportObjekt.nameDeu = '';
    if (objekt.Taxonomie.Eigenschaften["Name Deutsch"]) {
        exportObjekt.nameDeu = objekt.Taxonomie.Eigenschaften["Name Deutsch"].substring(0, 255);
    }

    var ds_zh_artwert_1995 = _.find(objekt.Eigenschaftensammlungen, function (ds) {
        return ds.Name === "ZH Artwert (1995)";
    }) || {};

    exportObjekt.artwert = '';
    if (ds_zh_artwert_1995 && ds_zh_artwert_1995.Eigenschaften && (ds_zh_artwert_1995.Eigenschaften.Artwert || ds_zh_artwert_1995.Eigenschaften.Artwert === 0)) {
        exportObjekt.artwert = ds_zh_artwert_1995.Eigenschaften.Artwert;
    }

    return exportObjekt;
}