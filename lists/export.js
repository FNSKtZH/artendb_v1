function(head, req) {
	var row, Objekt,
		rückgabeObjekt = {},
		exportObjekte = [],
		exportObjekt,
		filterkriterien = [],
		filterkriterienObjekt = {"filterkriterien": []},
		felder = [],
		feldwert,
		gruppen,
		nur_ds,
		bez_in_zeilen,
		felderObjekt,
		schonKopiert,
		objektKopiert,
		objektHinzufügen,
		DsName_z,
		Feldname_z,
		Filterwert_z,
		Vergleichsoperator_z,
		Datensammlung,
		Beziehungssammlungen,
		Beziehungssammlung,
		Beziehung,
		dsExistiertSchon,
		dsExistiert;
	var _ = require("lists/lib/underscore");
	var _a = require("lists/lib/artendb_listfunctions");
	// specify that we're providing a JSON response
	provides('json', function() {
		// übergebene Variabeln extrahieren
        _.each(req.query, function(value, key) {
            if (key === "fasseTaxonomienZusammen") {
                // true oder false wird als String übergeben > umwandeln
                fasseTaxonomienZusammen = (value === 'true');
            }
            if (key === "filter") {
                filterkriterienObjekt = JSON.parse(value);
                filterkriterien = filterkriterienObjekt.filterkriterien;
                // jetzt strings in Kleinschrift und Nummern in Zahlen verwandeln
                // damit das später nicht dauern wiederholt werden muss
                _.each(filterkriterien, function(filterkriterium) {
                    // die id darf nicht in Kleinschrift verwandelt werden
                    if (filterkriterium.Feldname !== "GUID") {
                        // true wurde offenbar irgendwie umgewandelt
                        // jedenfalls musste man als Kriterium 1 statt true erfassen, um die Resultate zu erhalten
                        // leider kann true oder false nicht wie gewollt von _a.convertToCorrectType zurückgegeben werden
                        if (filterkriterium.Filterwert === "true") {
                            filterkriterium.Filterwert = true;
                        } else if (filterkriterium.Filterwert === "false") {
                            filterkriterium.Filterwert = false;
                        } else {
                            filterkriterium.Filterwert = _a.convertToCorrectType(filterkriterium.Filterwert);
                        }
                    }
                });
            }
            if (key === "felder") {
                felderObjekt = JSON.parse(value);
                felder = felderObjekt.felder;
            }
            if (key === "gruppen") {
                gruppen = value.split(",");
            }
            if (key === "nur_ds") {
                // true oder false wird als String übergeben > umwandeln
                nur_ds = (value == 'true');
            }
            if (key === "bez_in_zeilen") {
                // true oder false wird als String übergeben > umwandeln
                bez_in_zeilen = (value === 'true');
            }
        });

		while (row = getRow()) {
			Objekt = row.doc;
			objektHinzufügen = false;
			objektNichtHinzufügen = false;

			// sicherstellen, dass DS und BS existieren
			if (!Objekt.Datensammlungen) {
				Objekt.Datensammlungen = [];
			}
			if (!Objekt.Beziehungssammlungen) {
				Objekt.Beziehungssammlungen = [];
			}

			// TODO: Prüfen, ob Gruppen übergeben wurden
			// ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
			// ja: objektHinzufügen = true / nein: continue mit nächstem Dokument

			// kein Filter aber nur Datensätze mit Infos aus DS/BS
			if (filterkriterien.length === 0 && !nur_ds) {
				objektHinzufügen = true;
			}

			loop_filterkriterien:
			for (var z=0; z<filterkriterien.length; z++) {
				DsTyp_z = filterkriterien[z].DsTyp;
				DsName_z = filterkriterien[z].DsName;
				Feldname_z = filterkriterien[z].Feldname;
				if (Feldname_z === "GUID") {
					// die ID darf nicht in Kleinschrift verwandelt werden
					Filterwert_z = filterkriterien[z].Filterwert;
				} else {
					Filterwert_z = _a.convertToCorrectType(filterkriterien[z].Filterwert);
				}
				Vergleichsoperator_z = filterkriterien[z].Vergleichsoperator;
				if (DsName_z === "Objekt") {
					if (Feldname_z === "GUID") {
						feldwert = Objekt._id;
					} else {
						feldwert = Objekt[Feldname_z];
					}
					if (feldwert || feldwert === 0) {
						if (_a.beurteileFilterkriterien(feldwert, Filterwert_z, Vergleichsoperator_z)) {
							objektHinzufügen = true;
						} else {
							objektNichtHinzufügen = true;
							break;
						}
					}
				} else if (DsTyp_z === "Taxonomie" && fasseTaxonomienZusammen) {
					feldwert = _a.convertToCorrectType(Objekt.Taxonomie.Daten[Feldname_z]);
					// das Feld ist aus Taxonomie und die werden zusammengefasst
					// daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
					if (feldwert || feldwert === 0) {
						if (_a.beurteileFilterkriterien(feldwert, Filterwert_z, Vergleichsoperator_z)) {
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
				} else if (DsTyp_z === "Taxonomie") {
					feldwert = _a.convertToCorrectType(Objekt.Taxonomie.Daten[Feldname_z]);
					// das Feld ist aus Taxonomie und die werden nicht zusammengefasst
					if (feldwert || feldwert === 0) {
						if (Objekt.Taxonomie.Name === DsName_z) {
							if (_a.beurteileFilterkriterien(feldwert, Filterwert_z, Vergleichsoperator_z)) {
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
				} else if (DsTyp_z === "Beziehung") {
					// durch alle Beziehungssammlungen loopen und suchen, ob Filter trifft
					dsExistiert = false;
					loop_beziehungssammlungen:
					for (var g=0; g<Objekt.Beziehungssammlungen.length; g++) {
						if (Objekt.Beziehungssammlungen[g].Name === DsName_z) {
							dsExistiert = true;
							// durch Beziehungssammlungen der Beziehung loopen
							if (Objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
								var feldExistiert = false;
								var feldHinzugefügt = false;
                                _.each(Objekt.Beziehungssammlungen[g].Beziehungen, function(beziehung) {
                                    // durch die Felder der Beziehung loopen
                                    if (beziehung[Feldname_z] || beziehung[Feldname_z] === 0) {
                                        feldExistiert = true;
                                        // Beziehungspartner sind Objekte und müssen separat gefiltert werden
                                        if (Feldname_z === "Beziehungspartner") {
                                            var bezPartner = _a.filtereBeziehungspartner(feldwert, Filterwert_z, Vergleichsoperator_z);
                                            if (bezPartner.length > 0) {
                                                objektHinzufügen = true;
                                                feldHinzugefügt = true;
                                            }
                                        } else {
                                            if (_a.beurteileFilterkriterien(feldwert, Filterwert_z, Vergleichsoperator_z)) {
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
							break loop_beziehungssammlungen;
						}
					}
					if (!dsExistiert) {
						// es gibt keine passende Beziehung, nicht hinzufügen
						objektNichtHinzufügen = true;
					}
				} else if (DsTyp_z === "Datensammlung") {
					dsExistiert = false;
					// das ist ein Feld aus einer Datensammlung
					loop_datensammlungen:
					for (var k=0; k<Objekt.Datensammlungen.length; k++) {
						if (Objekt.Datensammlungen[k].Name === DsName_z) {
							dsExistiert = true;
							if (Objekt.Datensammlungen[k].Name === DsName_z && typeof Objekt.Datensammlungen[k].Daten !== "undefined" && typeof Objekt.Datensammlungen[k].Daten[Feldname_z] !== "undefined") {
								// wir haben das gesuchte Feld gefunden!
								feldwert = _a.convertToCorrectType(Objekt.Datensammlungen[k].Daten[Feldname_z]);
								// in Datensammlungen gibt es keine Feldwerte vom Typ object, diesen Fall also nicht abfangen
								if (_a.beurteileFilterkriterien(feldwert, Filterwert_z, Vergleichsoperator_z)) {
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
							break loop_datensammlungen;
						}
					}
					if (!dsExistiert) {
						// es gibt keine passende Beziehung, nicht hinzufügen
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				}
			}

			if (filterkriterien.length === 0 && nur_ds) {
				// hoppla. jetzt müssen wir trotzdem durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
				// wenn ja und Feld aus DS/BS: objektHinzufügen = true;
				// wenn nein, soll der Datensatz ja nicht exportiert werden
                _.each(felder, function(feld) {
                    DsTyp_z = feld.DsTyp;
                    DsName_z = feld.DsName;
                    Feldname_z = feld.Feldname;
                    if (DsTyp_z === "Beziehung") {
                        // Beziehungssammlungen mit Namen = DsName_z suchen
                        var bs_mit_name = _.find(Objekt.Beziehungssammlungen, function(beziehungssammlung) {
                            return beziehungssammlung.Name === DsName_z;
                        });
                        // Beziehung mit dem gesuchten Feld Feldname_z suchen
                        if (bs_mit_name && bs_mit_name.Beziehungen && bs_mit_name.Beziehungen.length > 0) {
                            var bez_mit_feldname = _.find(bs_mit_name.Beziehungen, function(beziehung) {
                                return !!beziehung[Feldname_z];
                            });
                            objektHinzufügen = !!bez_mit_feldname;
                        }
                    } else if (DsTyp_z === "Datensammlung") {
                        // das ist ein Feld aus einer Datensammlung
                        // suchen, ob im Objekt die gesuchte Datensammlung vorkommt und eine solches Feld mit Daten enthält
                        var ds_mit_feld = _.find(Objekt.Datensammlungen, function(datensammlung) {
                            return datensammlung.Name === DsName_z && typeof datensammlung.Daten !== "undefined" && typeof datensammlung.Daten[Feldname_z] !== "undefined";
                        });
                        // wenn das Feld vorkommt, exportieren
                        objektHinzufügen = !!ds_mit_feld;
                    }
                });
			}

			if (nur_ds) {
				// hoppla. jetzt müssen wir trotzdem durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
				// wenn ja und Feld aus DS/BS und kein Filter gesetzt: objektHinzufügen = true
				// wenn ein Filter gesetzt wurde und keine Daten enthalten sind, nicht anzeigen
				var hinzufügen = false;
                _.each(felder, function(feld) {
                    DsTyp_z = feld.DsTyp;
                    DsName_z = feld.DsName;
                    Feldname_z = feld.Feldname;
                    if (DsTyp_z === "Beziehung") {
                        // durch alle Beziehungssammlungen loopen
                        // suche Beziehungssammlung mit DsName_z
                        var bs_mit_name = _.find(Objekt.Beziehungssammlungen, function(beziehungssammlung) {
                            return beziehungssammlung.Name === DsName_z;
                        });
                        if (bs_mit_name && bs_mit_name.Beziehungen && bs_mit_name.Beziehungen.length > 0) {
                            // suche Feld Feldname_z
                            var bez_mit_feldname = _.find(bs_mit_name.Beziehungen, function(beziehung) {
                                return beziehung[Feldname_z] || beziehung[Feldname_z] === 0;
                            });
                            hinzufügen = !!bez_mit_feldname;
                        }
                    } else if (DsTyp_z === "Datensammlung") {
                        // das ist ein Feld aus einer Datensammlung
                        // suche Datensammlung mit Name = DsName_z
                        var ds_mit_name = _.find(Objekt.Datensammlungen, function(datensammlung) {
                            return datensammlung.Name === DsName_z;
                        });
                        // suche Feld mit Feldname_z und Daten
                        if (ds_mit_name && typeof ds_mit_name.Daten !== "undefined" && typeof ds_mit_name.Daten[Feldname_z] !== "undefined") {
                            // ja, alles da > exportieren
                            hinzufügen = true;
                        }
                    }
                });
				if (filterkriterien.length > 0 && !hinzufügen) {
					// ein Filter wurde gesetzt. Es sind keine Daten aus BS oder DS enthalten > nicht hinzufügen
					objektNichtHinzufügen = true;
				}
				if (filterkriterien.length === 0 && hinzufügen) {
					// keine Filter, es gibt Daten aus BS oder DS > hinzufügen
					objektHinzufügen = true;
				}
			}

			// exportobjekt zurücksetzen
			exportObjekt = {};

			if (objektHinzufügen && !objektNichtHinzufügen) {
				// alle Kriterien sind erfüllt
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
                                        feldwert = _a.convertToCorrectType(beziehung[feld.Feldname]);
                                        // in der Beziehung gibt es das gesuchte Feld
                                        // Beziehungen in der Variablen "exportBeziehungen" sammeln
                                        // durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
                                        var exportBeziehungen = [];
                                        if (filterkriterien && filterkriterien.length > 0) {
                                            _.each(filterkriterien, function(filterkriterium) {
                                                var DsTyp = filterkriterium.DsTyp,
                                                    DsName = filterkriterium.DsName,
                                                    Feldname = filterkriterium.Feldname,
                                                    Filterwert = _a.convertToCorrectType(filterkriterium.Filterwert),
                                                    Vergleichsoperator = filterkriterium.Vergleichsoperator;
                                                if (DsTyp === "Beziehung" && DsName === feld.DsName && Feldname === feld.Feldname) {
                                                    // Beziehungspartner sind Objekte und müssen separat gefiltert werden
                                                    if (Feldname === "Beziehungspartner") {
                                                        bezPartner = _a.filtereBeziehungspartner(feldwert, Filterwert, Vergleichsoperator);
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
                                            if (!_a.containsObject(beziehung, exportBeziehungen)) {
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
                                                        if (!objektKopiert[feld.DsName + ": " + exBez_feldname]) {
                                                            objektKopiert[feld.DsName + ": " + exBez_feldname] = [];
                                                        }
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
				// Objekt zu Exportobjekten hinzufügen - wenn nicht schon kopiert
				if (!schonKopiert) {
					exportObjekte.push(exportObjekt);
				}
			}
		}
		// leere Objekte entfernen
		var exportObjekte_ohne_leere = _.reject(exportObjekte, function(object) {
			return _.isEmpty(object);
		});
		send(JSON.stringify(exportObjekte_ohne_leere));
	});
}