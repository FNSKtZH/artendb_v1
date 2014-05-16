var _ = require("lists/lib/underscore");

exports.erstelleExportString = function(exportobjekte) {
	var stringTitelzeile = "",
		stringZeilen = "",
		stringZeile;
	for (var i in exportobjekte) {
		// aus unerklärlichem Grund blieb stringTitelzeile leer, wenn nur ein Datensatz gefiltert wurde
		// daher bei jedem Datensatz prüfen, ob eine Titelzeile erstellt wurde und wenn nötig ergänzen
		if (stringTitelzeile === "" || stringTitelzeile === ",") {
			stringTitelzeile = "";
			// durch Spalten loopen
			for (var a in exportobjekte[i]) {
				if (stringTitelzeile !== "") {
					stringTitelzeile += ',';
				}
				stringTitelzeile += '"' + a + '"';
			}
		}

		if (stringZeilen !== "") {
			stringZeilen += '\n';
		}
		stringZeile = "";
		// durch die Felder loopen
		for (var x in exportobjekte[i]) {
		//for (var x = 0; x < exportobjekte[i].length; x++) {
			if (stringZeile !== "") {
				stringZeile += ',';
			}
			// null-Werte als leere Werte
			if (exportobjekte[i][x] === null) {
				stringZeile += "";
			} else if (typeof exportobjekte[i][x] === "number") {
				// Zahlen ohne Anführungs- und Schlusszeichen exportieren
				stringZeile += exportobjekte[i][x];
			} else if (typeof exportobjekte[i][x] === "object") {
				// Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
				stringZeile += '"' + JSON.stringify(exportobjekte[i][x]).replace(/"/g, "'") + '"';
			} else {
				stringZeile += '"' + exportobjekte[i][x] + '"';
			}
		}
		stringZeilen += stringZeile;
	}
	return stringTitelzeile + "\n" + stringZeilen;
};

exports.filtereBeziehungspartner = function(beziehungspartner, Filterwert, Vergleichsoperator) {
	// Wenn Feldname = Beziehungspartner, durch die Partner loopen und nur hinzufügen, wessen Name die Bedingung erfüllt
	var bezPartner = [];
	for (var m=0; m<beziehungspartner.length; m++) {
		var feldwert = beziehungspartner[m].Name.toLowerCase();
		if (Vergleichsoperator === "kein" && feldwert == Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === "kein" && typeof feldwert === "string" && feldwert.indexOf(Filterwert) >= 0) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === "=" && feldwert == Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === ">" && feldwert > Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === ">=" && feldwert >= Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === "<" && feldwert < Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		} else if (Vergleichsoperator === "<=" && feldwert <= Filterwert) {
			bezPartner.push(beziehungspartner[m]);
		}
	}
	return bezPartner;
};

exports.containsObject = function(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
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

exports.beurteileObInformationenEnthaltenSind = function(Objekt, felder, filterkriterien) {
    // der Benutzer will nur Objekte mit Informationen aus den gewählten Daten- und Beziehungssammlungen erhalten
    // also müssen wir durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
    // wenn ja und Feld aus DS/BS und kein Filter gesetzt: objektHinzufügen = true
    // wenn ein Filter gesetzt wurde und keine Daten enthalten sind, nicht anzeigen
    var hinzufügen = false,
        ds_typ,
        ds_name,
        feldname,
        bs_mit_name,
        bez_mit_feldname,
        ds_mit_name;
    _.each(felder, function(feld) {
        ds_typ = feld.DsTyp;
        DsName_z = feld.DsName;
        feldname = feld.Feldname;
        if (ds_typ === "Beziehung") {
            // suche Beziehungssammlung mit DsName_z
            bs_mit_name = _.find(Objekt.Beziehungssammlungen, function(beziehungssammlung) {
                return beziehungssammlung.Name === DsName_z;
            });
            if (bs_mit_name && bs_mit_name.Beziehungen && bs_mit_name.Beziehungen.length > 0) {
                // suche Feld feldname
                bez_mit_feldname = _.find(bs_mit_name.Beziehungen, function(beziehung) {
                    return beziehung[feldname] || beziehung[feldname] === 0;
                });
                hinzufügen = !!bez_mit_feldname;
            }
        } else if (ds_typ === "Datensammlung") {
            // das ist ein Feld aus einer Datensammlung
            // suche Datensammlung mit Name = DsName_z
            ds_mit_name = _.find(Objekt.Datensammlungen, function(datensammlung) {
                return datensammlung.Name === DsName_z;
            });
            // hinzufügen, wenn Feld mit feldname existiert und es Daten enthält
            hinzufügen = (ds_mit_name && typeof ds_mit_name.Daten !== "undefined" && typeof ds_mit_name.Daten[feldname] !== "undefined");
        }
    });

    // nicht hinzufügen, wenn ein Filter gesetzt wurde und keine Daten aus BS oder DS enthalten sind
    objektNichtHinzufügen = (filterkriterien.length > 0 && !hinzufügen);

    // hinzufügen, wenn kein Filter gesetzt wurde und Daten aus BS oder DS enthalten sind
    objektHinzufügen = (filterkriterien.length === 0 && hinzufügen);

    var return_object = {};
    return_object.objektNichtHinzufügen = objektNichtHinzufügen;
    return_object.objektHinzufügen = objektHinzufügen;

    return return_object;
};

exports.prüfeObObjektKriterienErfüllt = function(Objekt, felder, filterkriterien, fasseTaxonomienZusammen, nur_ds) {
    var objektHinzufügen = false,
        objektNichtHinzufügen = false,
        ds_typ,
        ds_name,
        feldname,
        filterwert,
        feldwert,
        vergleichsoperator,
        return_object = {};

    // sicherstellen, dass DS und BS existieren
    Objekt.Datensammlungen = Objekt.Datensammlungen || [];
    Objekt.Beziehungssammlungen = Objekt.Beziehungssammlungen || [];

    // kein Filter aber nur Datensätze mit Infos aus DS/BS
    objektHinzufügen = (filterkriterien.length === 0 && !nur_ds);

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
        if (ds_name === "Objekt") {
            if (feldname === "GUID") {
                feldwert = Objekt._id;
            } else {
                feldwert = Objekt[feldname];
            }
            if (feldwert || feldwert === 0) {
                if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                    objektHinzufügen = true;
                } else {
                    objektNichtHinzufügen = true;
                    break;
                }
            }
        } else if (ds_typ === "Taxonomie" && fasseTaxonomienZusammen) {
            feldwert = exports.convertToCorrectType(Objekt.Taxonomie.Daten[feldname]);
            // das Feld ist aus Taxonomie und die werden zusammengefasst
            // daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
            if (feldwert || feldwert === 0) {
                if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                    objektHinzufügen = true;
                } else {
                    objektNichtHinzufügen = true;
                    break;
                }
            } else {
                // Bedingung nicht erfüllt
                objektNichtHinzufügen = true;
                break;
            }
        } else if (ds_typ === "Taxonomie") {
            feldwert = exports.convertToCorrectType(Objekt.Taxonomie.Daten[feldname]);
            // das Feld ist aus Taxonomie und die werden nicht zusammengefasst
            if (feldwert || feldwert === 0) {
                if (Objekt.Taxonomie.Name === ds_name) {
                    if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                        objektHinzufügen = true;
                    } else {
                        objektNichtHinzufügen = true;
                        break;
                    }
                } else {
                    // Bedingung nicht erfüllt
                    objektNichtHinzufügen = true;
                    break;
                }
            }
        } else if (ds_typ === "Beziehung") {
            // durch alle Beziehungssammlungen loopen und suchen, ob Filter trifft
            dsExistiert = false;
                for (var g=0; g<Objekt.Beziehungssammlungen.length; g++) {
                    if (Objekt.Beziehungssammlungen[g].Name === ds_name) {
                        dsExistiert = true;
                        // durch Beziehungssammlungen der Beziehung loopen
                        if (Objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
                            var feldExistiert = false;
                            var feldHinzugefügt = false;
                            _.each(Objekt.Beziehungssammlungen[g].Beziehungen, function(beziehung) {
                                // durch die Felder der Beziehung loopen
                                if (beziehung[feldname] || beziehung[feldname] === 0) {
                                    feldExistiert = true;
                                    // Beziehungspartner sind Objekte und müssen separat gefiltert werden
                                    if (feldname === "Beziehungspartner") {
                                        var bezPartner = exports.filtereBeziehungspartner(feldwert, filterwert, vergleichsoperator);
                                        if (bezPartner.length > 0) {
                                            objektHinzufügen = true;
                                            feldHinzugefügt = true;
                                        }
                                    } else {
                                        if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                                            objektHinzufügen = true;
                                            feldHinzugefügt = true;
                                        }
                                    }
                                }
                            });
                            if (feldExistiert && !feldHinzugefügt) {
                                objektNichtHinzufügen = true;
                                break loop_filterkriterien;
                            }
                        } else {
                            // es gibt keine passende Beziehung, nicht hinzufügen
                            objektNichtHinzufügen = true;
                            break loop_filterkriterien;
                        }
                        break;
                    }
                }
            if (!dsExistiert) {
                // es gibt keine passende Beziehung, nicht hinzufügen
                objektNichtHinzufügen = true;
            }
        } else if (ds_typ === "Datensammlung") {
            dsExistiert = false;
            // das ist ein Feld aus einer Datensammlung
            for (var k=0; k<Objekt.Datensammlungen.length; k++) {
                if (Objekt.Datensammlungen[k].Name === ds_name) {
                    dsExistiert = true;
                    if (Objekt.Datensammlungen[k].Name === ds_name && typeof Objekt.Datensammlungen[k].Daten !== "undefined" && typeof Objekt.Datensammlungen[k].Daten[feldname] !== "undefined") {
                        // wir haben das gesuchte Feld gefunden!
                        feldwert = exports.convertToCorrectType(Objekt.Datensammlungen[k].Daten[feldname]);
                        // in Datensammlungen gibt es keine Feldwerte vom Typ object, diesen Fall also nicht abfangen
                        if (exports.beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                            objektHinzufügen = true;
                        } else {
                            // Feld existiert aber Kriterium ist nicht erfüllt
                            objektNichtHinzufügen = true;
                            break loop_filterkriterien;
                        }
                    } else {
                        // das Feld existiert nicht, also Filterkriterium nicht erfüllt
                        objektNichtHinzufügen = true;
                        break loop_filterkriterien;
                    }
                    break;
                }
            }
            if (!dsExistiert) {
                // es gibt keine passende Beziehung, nicht hinzufügen
                objektNichtHinzufügen = true;
                break;
            }
        }
    }

    if (filterkriterien.length === 0 && nur_ds) {
        // hoppla. jetzt müssen wir trotzdem durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
        // wenn ja und Feld aus DS/BS: objektHinzufügen = true;
        // wenn nein, soll der Datensatz ja nicht exportiert werden
        _.each(felder, function(feld) {
            ds_typ = feld.DsTyp;
            ds_name = feld.DsName;
            feldname = feld.Feldname;
            if (ds_typ === "Beziehung") {
                // Beziehungssammlungen mit Namen = ds_name suchen
                var bs_mit_name = _.find(Objekt.Beziehungssammlungen, function(beziehungssammlung) {
                    return beziehungssammlung.Name === ds_name;
                });
                // Beziehung mit dem gesuchten Feld feldname suchen
                if (bs_mit_name && bs_mit_name.Beziehungen && bs_mit_name.Beziehungen.length > 0) {
                    var bez_mit_feldname = _.find(bs_mit_name.Beziehungen, function(beziehung) {
                        return !!beziehung[feldname];
                    });
                    objektHinzufügen = !!bez_mit_feldname;
                }
            } else if (ds_typ === "Datensammlung") {
                // das ist ein Feld aus einer Datensammlung
                // suchen, ob im Objekt die gesuchte Datensammlung vorkommt und eine solches Feld mit Daten enthält
                var ds_mit_feld = _.find(Objekt.Datensammlungen, function(datensammlung) {
                    return datensammlung.Name === ds_name && typeof datensammlung.Daten !== "undefined" && typeof datensammlung.Daten[feldname] !== "undefined";
                });
                // wenn das Feld vorkommt, exportieren
                objektHinzufügen = !!ds_mit_feld;
            }
        });
    }
    return_object.objektHinzufügen = objektHinzufügen;
    return_object.objektNichtHinzufügen = objektNichtHinzufügen;
    return return_object;
};

// baut die Export-Objekte auf für alle export-lists
// benötigt Objekt und felder
// retourniert schonKopiert und exportObjekt
exports.erstelleExportobjekt = function(Objekt, felder, bez_in_zeilen, fasseTaxonomienZusammen, filterkriterien, exportObjekte) {
    var exportObjekt = {},
        schonKopiert = false;

    // Neues Objekt aufbauen, das nur die gewünschten Felder enthält
    _.each(Objekt, function(feldwert, feldname) {
        if (typeof feldwert !== "object" && feldname !== "_rev") {
            _.each(felder, function(feld) {
                if (feld.DsName === "Objekt" && feld.Feldname === feldname) {
                    exportObjekt[feldname] = feldwert;
                }
                if (feld.DsName === "Objekt" && feld.Feldname === "GUID" && feldname === "_id") {
                    exportObjekt["GUID"] = feldwert;
                }
            });
        }
    });
    _.each(felder, function(feld) {
        if (feld.DsTyp === "Taxonomie" && (fasseTaxonomienZusammen || feld.DsName === Objekt.Taxonomie.Name)) {
            // wenn im Objekt das zu exportierende Feld vorkommt, den Wert übernehmen
            if (typeof Objekt.Taxonomie.Daten[feld.Feldname] !== "undefined") {
                if (fasseTaxonomienZusammen) {
                    exportObjekt["Taxonomie(n): " + feld.Feldname] = Objekt.Taxonomie.Daten[feld.Feldname];
                } else {
                    exportObjekt[feld.DsName + ": " + feld.Feldname] = Objekt.Taxonomie.Daten[feld.Feldname];
                }
            } else {
                // sonst einen leerwert setzen
                if (fasseTaxonomienZusammen) {
                    exportObjekt["Taxonomie(n): " + feld.Feldname] = "";
                } else {
                    exportObjekt[feld.DsName + ": " + feld.Feldname] = "";
                }
            }
        }

        if (feld.DsTyp === "Datensammlung") {
            // das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
            exportObjekt[feld.DsName + ": " + feld.Feldname] = "";
            if (Objekt.Datensammlungen && Objekt.Datensammlungen.length > 0) {
                // Enthält das Objekt diese Datensammlung?
                var gesuchte_ds = _.find(Objekt.Datensammlungen, function(datensammlung) {
                    return datensammlung.Name && datensammlung.Name === feld.DsName;
                });
                if (gesuchte_ds) {
                    // ja. Wenn die Datensammlung das Feld enthält > exportieren
                    if (gesuchte_ds.Daten && typeof gesuchte_ds.Daten[feld.Feldname] !== "undefined") {
                        exportObjekt[feld.DsName + ": " + feld.Feldname] = gesuchte_ds.Daten[feld.Feldname];
                    }
                }
            }
        }

        if (feld.DsTyp === "Beziehung") {
            // das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
            exportObjekt[feld.DsName + ": " + feld.Feldname] = "";
            // wurde schon ein zusätzliches Feld geschaffen? wenn ja: hinzufügen

            if (feld.Feldname === "Beziehungspartner") {
                // noch ein Feld hinzufügen
                exportObjekt[feld.DsName + ": Beziehungspartner GUID(s)"] = "";
            }

            if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
                // suchen, ob das Objekt diese Beziehungssammlungen hat
                // suche im Objekt die Beziehungssammlung mit Name = feld.DsName
                var bs_mit_namen = _.find(Objekt.Beziehungssammlungen, function(beziezungssammlung) {
                    return beziezungssammlung.Name && beziezungssammlung.Name === feld.DsName;
                });
                if (bs_mit_namen) {
                    // durch Beziehungen loopen
                    _.each(bs_mit_namen.Beziehungen, function(beziehung) {
                        if (typeof beziehung[feld.Feldname] !== "undefined") {
                            feldwert = exports.convertToCorrectType(beziehung[feld.Feldname]);
                            // in der Beziehung gibt es das gesuchte Feld
                            // Beziehungen in der Variablen "exportBeziehungen" sammeln
                            // durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
                            var exportBeziehungen = [];
                            if (filterkriterien) {
                                _.each(filterkriterien, function(filterkriterium) {
                                    var DsTyp = filterkriterium.DsTyp,
                                        DsName = filterkriterium.DsName,
                                        Feldname = filterkriterium.Feldname,
                                        Filterwert = exports.convertToCorrectType(filterkriterium.Filterwert),
                                        Vergleichsoperator = filterkriterium.Vergleichsoperator;
                                    if (DsTyp === "Beziehung" && DsName === feld.DsName && Feldname === feld.Feldname) {
                                        // Beziehungspartner sind Objekte und müssen separat gefiltert werden
                                        if (Feldname === "Beziehungspartner") {
                                            bezPartner = exports.filtereBeziehungspartner(feldwert, Filterwert, Vergleichsoperator);
                                            if (bezPartner.length > 0) {
                                                beziehung.Beziehungspartner = bezPartner;
                                                exportBeziehungen.push(beziehung);
                                            }
                                        } else {
                                            // jetzt müssen die verschiedenen möglichen Vergleichsoperatoren berücksichtigt werden
                                            if (Vergleichsoperator === "kein" && feldwert == Filterwert) {
                                                exportBeziehungen.push(beziehung);
                                            } else if (Vergleichsoperator === "kein" && typeof feldwert === "string" && feldwert.indexOf(Filterwert) >= 0) {
                                                exportBeziehungen.push(beziehung);
                                            } else if (Vergleichsoperator === "=" && feldwert == Filterwert) {
                                                exportBeziehungen.push(beziehung);
                                            } else if (Vergleichsoperator === ">" && feldwert > Filterwert) {
                                                exportBeziehungen.push(beziehung);
                                            } else if (Vergleichsoperator === ">=" && feldwert >= Filterwert) {
                                                exportBeziehungen.push(beziehung);
                                            } else if (Vergleichsoperator === "<" && feldwert < Filterwert) {
                                                exportBeziehungen.push(beziehung);
                                            } else if (Vergleichsoperator === "<=" && feldwert <= Filterwert) {
                                                exportBeziehungen.push(beziehung);
                                            }
                                        }
                                    }
                                });
                            } else {
                                // kein Filter auf Feldern - Beziehung hinzufügen
                                // aber sicherstellen, dass sie nicht schon drin ist
                                if (!exports.containsObject(beziehung, exportBeziehungen)) {
                                    exportBeziehungen.push(beziehung);
                                }
                            }
                            // jetzt unterscheiden, ob alle Treffer in einem Feld oder pro Treffer eine Zeile exportiert wird
                            if (bez_in_zeilen) {
                                // pro Treffer eine neue Zeile erstellen
                                schonKopiert = false;
                                // durch Beziehungen loopen
                                _.each(exportBeziehungen, function(exportBeziehung) {
                                    // exportObjekt kopieren
                                    var objektKopiert = _.clone(exportObjekt);
                                    // durch die Felder der Beziehung loopen
                                    _.each(exportBeziehung, function(exBez_feldwert, exBez_feldname) {
                                        if (exBez_feldname === "Beziehungspartner") {
                                            // zuerst die Beziehungspartner in JSON hinzufügen
                                            objektKopiert[feld.DsName + ": " + exBez_feldname] = objektKopiert[feld.DsName + ": " + exBez_feldname] || [];
                                            objektKopiert[feld.DsName + ": " + exBez_feldname].push(exBez_feldwert);
                                            // Reines GUID-Feld ergänzen
                                            if (!objektKopiert[feld.DsName + ": Beziehungspartner GUID(s)"]) {
                                                objektKopiert[feld.DsName + ": Beziehungspartner GUID(s)"] = exBez_feldwert[0].GUID;
                                            } else {
                                                objektKopiert[feld.DsName + ": Beziehungspartner GUID(s)"] += ", " + exBez_feldwert[0].GUID;
                                            }
                                        } else {
                                            // Vorsicht: Werte werden kommagetrennt. Also müssen Kommas ersetzt werden
                                            if (!objektKopiert[feld.DsName + ": " + exBez_feldname]) {
                                                objektKopiert[feld.DsName + ": " + exBez_feldname] = exBez_feldwert;
                                            } else {
                                                objektKopiert[feld.DsName + ": " + exBez_feldname] += ", " + exBez_feldwert;
                                            }
                                        }
                                    });
                                    exportObjekte.push(objektKopiert);
                                    schonKopiert = true;
                                });
                            } else {
                                // jeden Treffer kommagetrennt in dasselbe Feld einfügen
                                // durch Beziehungen loopen
                                _.each(exportBeziehungen, function(exportBeziehung) {
                                    // durch die Felder der Beziehung loopen
                                    _.each(exportBeziehung, function(feldwert, feldname) {
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
                                                exportObjekt[feld.DsName + ": " + feldname] = feldwert.replace(/,/g,'\(Komma\)');
                                            } else {
                                                exportObjekt[feld.DsName + ": " + feldname] += ", " + feldwert.replace(/,/g,'\(Komma\)');
                                            }
                                        }
                                    });
                                });
                            }
                        }
                    });
                }
            }
        }
    });
    var return_objekt = {};
    return_objekt.schonKopiert = schonKopiert;
    return_objekt.exportObjekt = exportObjekt;
    return_objekt.exportObjekte = exportObjekte;
    return return_objekt;
};