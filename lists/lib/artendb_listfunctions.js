var _ = require("lists/lib/underscore");

exports.erstelleExportString = function(exportobjekte) {
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

exports.filtereBeziehungspartner = function(beziehungspartner, Filterwert, Vergleichsoperator) {
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

exports.convertToCorrectType = function(feldWert) {
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
exports.myTypeOf = function(Wert) {
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
exports.beurteileFilterkriterien = function(feldwert, filterwert, vergleichsoperator) {
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

exports.beurteileObInformationenEnthaltenSind = function(objekt, felder, filterkriterien) {
    // der Benutzer will nur Objekte mit Informationen aus den gewählten Daten- und Beziehungssammlungen erhalten
    // also müssen wir durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
    // wenn ja und Feld aus DS/BS und kein Filter gesetzt: objektHinzufügen = true
    // wenn ein Filter gesetzt wurde und keine Daten enthalten sind, nicht anzeigen
    var hinzufügen = false,
        ds_typ,
        feldname,
        bs_mit_name,
        bez_mit_feldname,
        ds_mit_name;
    if (felder && felder.length > 0) {
        _.each(felder, function (feld) {
            ds_typ = feld.DsTyp;
            DsName_z = feld.DsName;
            feldname = feld.Feldname;
            if (ds_typ === "Beziehung") {
                // suche Beziehungssammlung mit DsName_z
                bs_mit_name = _.find(objekt.Beziehungssammlungen, function (beziehungssammlung) {
                    return beziehungssammlung.Name === DsName_z;
                });
                if (bs_mit_name && bs_mit_name.Beziehungen && bs_mit_name.Beziehungen.length > 0) {
                    // suche Feld feldname
                    bez_mit_feldname = _.find(bs_mit_name.Beziehungen, function (beziehung) {
                        return beziehung[feldname] || beziehung[feldname] === 0;
                    });
                    hinzufügen = !!bez_mit_feldname;
                }
            } else if (ds_typ === "Datensammlung") {
                // das ist ein Feld aus einer Datensammlung
                // suche Datensammlung mit Name = DsName_z
                ds_mit_name = _.find(objekt.Datensammlungen, function (datensammlung) {
                    return datensammlung.Name === DsName_z;
                });
                // hinzufügen, wenn Feld mit feldname existiert und es Daten enthält
                hinzufügen = (ds_mit_name && typeof ds_mit_name.Daten !== "undefined" && typeof ds_mit_name.Daten[feldname] !== "undefined");
            }
        });
    }

    return hinzufügen;
};

exports.prüfeObObjektKriterienErfüllt = function(objekt, felder, filterkriterien, fasseTaxonomienZusammen, nur_objekte_mit_eigenschaften) {
    var objekt_hinzufügen = false,
        objekt_nicht_hinzufügen = false,
        ds_typ,
        ds_name,
        feldname,
        filterwert,
        feldwert,
        vergleichsoperator,
        feld_existiert,
        feld_hinzugefügt;

    // sicherstellen, dass DS und BS existieren
    objekt.Datensammlungen = objekt.Datensammlungen || [];
    objekt.Beziehungssammlungen = objekt.Beziehungssammlungen || [];

    // kein Filter aber nur Datensätze mit Infos aus DS/BS
    objekt_hinzufügen = (filterkriterien.length === 0 && !nur_objekte_mit_eigenschaften);

    loop_filterkriterien:
    for (var z=0; z<filterkriterien.length; z++) {
        ds_typ = filterkriterien[z].DsTyp;
        ds_name = filterkriterien[z].DsName;
        feldname = filterkriterien[z].Feldname;
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
            feldwert = exports.convertToCorrectType(objekt.Taxonomie.Daten[feldname]);
            // das Feld ist aus Taxonomie und die werden zusammengefasst
            // daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
            if (feldwert || feldwert === 0) {
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
        } else if (ds_typ === "Taxonomie") {
            feldwert = exports.convertToCorrectType(objekt.Taxonomie.Daten[feldname]);
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
                                        }
                                    }
                                });
                            }
                            if (feld_existiert && !feld_hinzugefügt) {
                                objekt_nicht_hinzufügen = true;
                                break loop_filterkriterien;
                            }
                        } else {
                            // es gibt keine passende Beziehung, nicht hinzufügen
                            objekt_nicht_hinzufügen = true;
                            break loop_filterkriterien;
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
            for (var k=0; k<objekt.Datensammlungen.length; k++) {
                if (objekt.Datensammlungen[k].Name === ds_name) {
                    ds_existiert = true;
                    if (objekt.Datensammlungen[k].Name === ds_name && typeof objekt.Datensammlungen[k].Daten !== "undefined" && typeof objekt.Datensammlungen[k].Daten[feldname] !== "undefined") {
                        // wir haben das gesuchte Feld gefunden!
                        feldwert = exports.convertToCorrectType(objekt.Datensammlungen[k].Daten[feldname]);
                        // in Datensammlungen gibt es keine Feldwerte vom Typ object, diesen Fall also nicht abfangen
                        if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                            objekt_hinzufügen = true;
                        } else {
                            // Feld existiert aber Kriterium ist nicht erfüllt
                            objekt_nicht_hinzufügen = true;
                            break loop_filterkriterien;
                        }
                    } else {
                        // das Feld existiert nicht, also Filterkriterium nicht erfüllt
                        objekt_nicht_hinzufügen = true;
                        break loop_filterkriterien;
                    }
                    break;
                }
            }
            if (!ds_existiert) {
                // es gibt keine passende Beziehung, nicht hinzufügen
                objekt_nicht_hinzufügen = true;
                break;
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
                        objekt_hinzufügen = !!bez_mit_feldname;
                    }
                } else if (ds_typ === "Datensammlung") {
                    // das ist ein Feld aus einer Datensammlung
                    // suchen, ob im objekt die gesuchte Datensammlung vorkommt und eine solches Feld mit Daten enthält
                    var ds_mit_feld = _.find(objekt.Datensammlungen, function (datensammlung) {
                        return datensammlung.Name === ds_name && typeof datensammlung.Daten !== "undefined" && typeof datensammlung.Daten[feldname] !== "undefined";
                    });
                    // wenn das Feld vorkommt, exportieren
                    objekt_hinzufügen = !!ds_mit_feld;
                }
            });
        }
    }
    return objekt_hinzufügen && !objekt_nicht_hinzufügen;
};

exports.bereiteFilterkriterienVor = function(filterkriterien) {
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

// baut die Export-Objekte auf für alle export-lists
// benötigt Objekt und felder
// retourniert schon_kopiert und export_objekt
exports.ergänzeExportobjekteUmExportobjekt = function(objekt, felder, bez_in_zeilen, fasse_taxonomien_zusammen, filterkriterien, export_objekte) {
    var export_objekt = {},
        schon_kopiert = false;

    // es müssen Felder übergeben worden sein
    // wenn nicht, aufhören
    if (!felder || felder.length === 0) {
        return {};
    }
    // Neues Objekt aufbauen, das nur die gewünschten Felder enthält
    _.each(objekt, function(feldwert, feldname) {
        if (typeof feldwert !== "Object" && feldname !== "_rev") {
            _.each(felder, function(feld) {
                if (feld.DsName === "Objekt" && feld.Feldname === feldname) {
                    export_objekt[feldname] = feldwert;
                }
                if (feld.DsName === "Objekt" && feld.Feldname === "GUID" && feldname === "_id") {
                    export_objekt["GUID"] = feldwert;
                }
            });
        }
    });

    _.each(felder, function(feld) {
        var export_feldname = feld.DsName + ": " + feld.Feldname;
        // Taxonomie: Felder übernehmen
        if (feld.DsTyp === "Taxonomie" && (fasse_taxonomien_zusammen || feld.DsName === objekt.Taxonomie.Name)) {
            // wenn im objekt das zu exportierende Feld vorkommt, den Wert übernehmen
            if (typeof objekt.Taxonomie.Daten[feld.Feldname] !== "undefined") {
                if (fasse_taxonomien_zusammen) {
                    export_objekt["Taxonomie(n): " + feld.Feldname] = objekt.Taxonomie.Daten[feld.Feldname];
                } else {
                    export_objekt[export_feldname] = objekt.Taxonomie.Daten[feld.Feldname];
                }
            } else {
                // sonst einen leerwert setzen
                if (fasse_taxonomien_zusammen) {
                    export_objekt["Taxonomie(n): " + feld.Feldname] = "";
                } else {
                    export_objekt[export_feldname] = "";
                }
            }
        }

        // Datensammlungen: Felder übernehmen
        if (feld.DsTyp === "Datensammlung") {
            // das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
            export_objekt[export_feldname] = "";
            if (objekt.Datensammlungen && objekt.Datensammlungen.length > 0) {
                // Enthält das objekt diese Datensammlung?
                var gesuchte_ds = _.find(objekt.Datensammlungen, function(datensammlung) {
                    return datensammlung.Name && datensammlung.Name === feld.DsName;
                });
                if (gesuchte_ds) {
                    // ja. Wenn die Datensammlung das Feld enthält > exportieren
                    if (gesuchte_ds.Daten && typeof gesuchte_ds.Daten[feld.Feldname] !== "undefined") {
                        export_objekt[export_feldname] = gesuchte_ds.Daten[feld.Feldname];
                    }
                }
            }
        }

        if (feld.DsTyp === "Beziehung") {
            // das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
            export_objekt[export_feldname] = "";

            // wurde schon ein zusätzliches Feld geschaffen? wenn ja: hinzufügen
            if (feld.Feldname === "Beziehungspartner") {
                // noch ein Feld hinzufügen
                export_objekt[feld.DsName + ": Beziehungspartner GUID(s)"] = "";
            }

            if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
                // suchen, ob das objekt diese Beziehungssammlungen hat
                // suche im objekt die Beziehungssammlung mit Name = feld.DsName
                var bs_mit_namen = _.find(objekt.Beziehungssammlungen, function(beziehungssammlung) {
                    return beziehungssammlung.Name && beziehungssammlung.Name === feld.DsName;
                });
                if (bs_mit_namen && bs_mit_namen.Beziehungen && bs_mit_namen.Beziehungen.length > 0) {
                    // Beziehungen, die exportiert werden sollen, in der Variablen "export_beziehungen" sammeln
                    // durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
                    var export_beziehungen = [];
                    _.each(bs_mit_namen.Beziehungen, function(beziehung) {
                        if (typeof beziehung[feld.Feldname] !== "undefined") {
                            // das gesuchte Feld kommt in dieser Beziehung vor
                            feldwert = exports.convertToCorrectType(beziehung[feld.Feldname]);
                            if (filterkriterien && filterkriterien.length > 0) {
                                _.each(filterkriterien, function(filterkriterium) {
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
                                // export_objekt kopieren
                                var export_objekt_kopiert = _.clone(export_objekt);
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
                                        if (!export_objekt[feld.DsName + ": " + feldname]) {
                                            export_objekt[feld.DsName + ": " + feldname] = [];
                                        }
                                        export_objekt[feld.DsName + ": " + feldname].push(feldwert);
                                        // Reines GUID-Feld ergänzen
                                        if (!export_objekt[feld.DsName + ": Beziehungspartner GUID(s)"]) {
                                            export_objekt[feld.DsName + ": Beziehungspartner GUID(s)"] = feldwert[0].GUID;
                                        } else {
                                            export_objekt[feld.DsName + ": Beziehungspartner GUID(s)"] += ", " + feldwert[0].GUID;
                                        }
                                        // es gibt einen Fehler, wenn replace für einen leeren Wert ausgeführt wird, also kontrollieren
                                    } else if (typeof feldwert === "number") {
                                        // Vorsicht: in Nummern können keine Kommas ersetzt werden - gäbe einen error
                                        if (!export_objekt[feld.DsName + ": " + feldname]) {
                                            export_objekt[feld.DsName + ": " + feldname] = feldwert;
                                        } else {
                                            export_objekt[feld.DsName + ": " + feldname] += ", " + feldwert;
                                        }
                                    } else {
                                        // Vorsicht: Werte werden kommagetrennt. Also müssen Kommas ersetzt werden
                                        if (!export_objekt[feld.DsName + ": " + feldname]) {
                                            export_objekt[feld.DsName + ": " + feldname] = feldwert.replace(/,/g, '\(Komma\)');
                                        } else {
                                            export_objekt[feld.DsName + ": " + feldname] += ", " + feldwert.replace(/,/g, '\(Komma\)');
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
        export_objekte.push(export_objekt);
    }

    return export_objekte;
};