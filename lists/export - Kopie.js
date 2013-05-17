function(head, req) {
	var row, Objekt,
		rückgabeObjekt = {},
		exportObjekte = [],
		exportObjekt,
		filterkriterien = [],
		filterkriterienObjekt = {"rows": []},
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
	// specify that we're providing a JSON response
	provides('json', function() {
		//übergebene Variabeln extrahieren
		for (var i in req.query) {
			if (i === "fasseTaxonomienZusammen") {
				//true oder false wird als String übergeben > umwandeln
				fasseTaxonomienZusammen = (req.query[i] === 'true');
			}
			if (i === "filter") {
				filterkriterienObjekt = JSON.parse(req.query[i]);
				filterkriterien = filterkriterienObjekt.rows;
				//jetzt strings in Kleinschrift und Nummern in Zahlen verwandeln
				//damit das später nicht dauern wiederholt werden muss
				for (var x=0; x<filterkriterien.length; x++) {
					//die id darf nicht in Kleinschrift verwandelt werden
					if (filterkriterien[x].Feldname !== "GUID") {
						filterkriterien[x].Filterwert = convertToCorrectType(filterkriterien[x].Filterwert);
					}
				}
			}
			if (i === "felder") {
				felderObjekt = JSON.parse(req.query[i]);
				felder = felderObjekt.rows;
			}
			if (i === "gruppen") {
				gruppen = req.query[i].split(",");
			}
			if (i === "nur_ds") {
				//true oder false wird als String übergeben > umwandeln
				nur_ds = (req.query[i] == 'true');
			}
			if (i === "bez_in_zeilen") {
				//true oder false wird als String übergeben > umwandeln
				bez_in_zeilen = (req.query[i] === 'true');
			}
		}

		while (row = getRow()) {
			Objekt = row.doc;
			objektHinzufügen = false;
			objektNichtHinzufügen = false;

			//sicherstellen, dass DS und BS existieren
			if (!Objekt.Datensammlungen) {
				Objekt.Datensammlungen = [];
			}
			if (!Objekt.Beziehungssammlungen) {
				Objekt.Beziehungssammlungen = [];
			}

			//TODO: Prüfen, ob Gruppen übergeben wurden
			//ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
			//ja: objektHinzufügen = true / nein: continue mit nächstem Dokument

			//kein Filter aber nur Datensätze mit Infos aus DS/BS
			if (filterkriterien.length === 0 && !nur_ds) {
				objektHinzufügen = true;
			}

			loop_filterkriterien:
			for (var z=0; z<filterkriterien.length; z++) {
				DsTyp_z = filterkriterien[z].DsTyp;
				DsName_z = filterkriterien[z].DsName;
				Feldname_z = filterkriterien[z].Feldname;
				if (Feldname_z === "GUID") {
					//die ID darf nicht in Kleinschrift verwandelt werden
					Filterwert_z = filterkriterien[z].Filterwert;
				} else {
					Filterwert_z = convertToCorrectType(filterkriterien[z].Filterwert);
				}
				Vergleichsoperator_z = filterkriterien[z].Vergleichsoperator;
				if (DsName_z === "Objekt") {
					if (Feldname_z === "GUID") {
						feldwert = Objekt._id;
					} else {
						feldwert = Objekt[Feldname_z];
					}
					if (feldwert || feldwert === 0) {
						//Das ist eine simple Eigenschaft des Objekts - der view liefert hier als DsName Objekt
						if (Vergleichsoperator_z === "kein" && feldwert == Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === "kein" && myTypeOf(feldwert) === "string" && feldwert.indexOf(Filterwert_z) >= 0) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === "=" && feldwert == Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === ">" && feldwert > Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === ">=" && feldwert >= Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === "<" && feldwert < Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === "<=" && feldwert <= Filterwert_z) {
							objektHinzufügen = true;
						} else {
							objektNichtHinzufügen = true;
							break loop_filterkriterien;
						}
					}
				} else if (DsTyp_z === "Taxonomie" && fasseTaxonomienZusammen) {
					feldwert = convertToCorrectType(Objekt.Taxonomie.Daten[Feldname_z]);
					//das Feld ist aus Taxonomie und die werden zusammengefasst
					//daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
					if (feldwert || feldwert === 0) {
						if (Vergleichsoperator_z === "kein" && feldwert === Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === "kein" && myTypeOf(feldwert) === "string" && feldwert.indexOf(Filterwert_z) >= 0) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === "=" && feldwert == Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === ">" && feldwert > Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === ">=" && feldwert >= Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === "<" && feldwert < Filterwert_z) {
							objektHinzufügen = true;
						} else if (Vergleichsoperator_z === "<=" && feldwert <= Filterwert_z) {
							objektHinzufügen = true;
						} else {
							//Bedingung nicht erfüllt
							objektNichtHinzufügen = true;
							break loop_filterkriterien;
						}
					} else {
						//Bedingung nicht erfüllt
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				} else if (DsTyp_z === "Taxonomie") {
					feldwert = convertToCorrectType(Objekt.Taxonomie.Daten[Feldname_z]);
					//das Feld ist aus Taxonomie und die werden nicht zusammengefasst
					if (feldwert || feldwert === 0) {
						if (Objekt.Taxonomie.Name === DsName_z) {
							if (Vergleichsoperator_z === "kein" && feldwert === Filterwert_z) {
								objektHinzufügen = true;
							} else if (Vergleichsoperator_z === "kein" && myTypeOf(feldwert) === "string" && feldwert.indexOf(Filterwert_z) >= 0) {
								objektHinzufügen = true;
							} else if (Vergleichsoperator_z === "=" && feldwert == Filterwert_z) {
								objektHinzufügen = true;
							} else if (Vergleichsoperator_z === ">" && feldwert > Filterwert_z) {
								objektHinzufügen = true;
							} else if (Vergleichsoperator_z === ">=" && feldwert >= Filterwert_z) {
								objektHinzufügen = true;
							} else if (Vergleichsoperator_z === "<" && feldwert < Filterwert_z) {
								objektHinzufügen = true;
							} else if (Vergleichsoperator_z === "<=" && feldwert <= Filterwert_z) {
								objektHinzufügen = true;
							} else {
								//Bedingung nicht erfüllt
								objektNichtHinzufügen = true;
								break loop_filterkriterien;
							}
						} else {
							//Bedingung nicht erfüllt
							objektNichtHinzufügen = true;
							break loop_filterkriterien;
						}
					}
				} else if (DsTyp_z === "Beziehung") {
					//durch alle Beziehungssammlungen loopen und suchen, ob Filter trifft
					dsExistiert = false;
					loop_beziehungssammlungen:
					for (var g=0; g<Objekt.Beziehungssammlungen.length; g++) {
						if (Objekt.Beziehungssammlungen[g].Name === DsName_z) {
							dsExistiert = true;
							//durch Beziehungssammlungen der Beziehung loopen
							if (Objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
								var feldExistiert = false;
								var feldHinzugefügt = false;
								for (var h=0; h<Objekt.Beziehungssammlungen[g].Beziehungen.length; h++) {
									//durch die Felder der Beziehung loopen
									if (Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] || Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === 0) {
										feldExistiert = true;
										//Beziehungspartner sind Objekte und müssen separat gefiltert werden
										if (Feldname_z === "Beziehungspartner") {
											var bezPartner = filtereBeziehungspartner(feldwert, Filterwert_z, Vergleichsoperator_z);
											if (bezPartner.length > 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											}
										} else {
											if (Vergleichsoperator_z === "kein" && feldwert == Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "kein" && myTypeOf(feldwert) === "string" && feldwert.indexOf(Filterwert_z) >= 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "=" && feldwert == Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === ">" && feldwert > Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === ">=" && feldwert >= Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "<" && feldwert < Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "<=" && feldwert <= Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											}
										}
									}
								}
								if (feldExistiert && !feldHinzugefügt) {
									objektNichtHinzufügen = true;
									break loop_filterkriterien;
								}
							} else {
								//es gibt keine passende Beziehung, nicht hinzufügen
								objektNichtHinzufügen = true;
								break loop_filterkriterien;
							}
							break loop_beziehungssammlungen;
						}
					}
					if (!dsExistiert) {
						//es gibt keine passende Beziehung, nicht hinzufügen
						objektNichtHinzufügen = true;
					}
				} else if (DsTyp_z === "Datensammlung") {
					dsExistiert = false;
					//das ist ein Feld aus einer Datensammlung
					loop_datensammlungen:
					for (var k=0; k<Objekt.Datensammlungen.length; k++) {
						if (Objekt.Datensammlungen[k].Name === DsName_z) {
							dsExistiert = true;
							if (Objekt.Datensammlungen[k].Name === DsName_z && typeof Objekt.Datensammlungen[k].Daten !== "undefined" && typeof Objekt.Datensammlungen[k].Daten[Feldname_z] !== "undefined") {
								//wir haben das gesuchte Feld gefunden!
								feldwert = convertToCorrectType(Objekt.Datensammlungen[k].Daten[Feldname_z]);
								//in Datensammlungen gibt es keine Feldwerte vom Typ object, diesen Fall also nicht abfangen
								if (Vergleichsoperator_z == ">" && feldwert > Filterwert_z) {
									objektHinzufügen = true;
								} else if (Vergleichsoperator_z === ">=" && feldwert >= Filterwert_z) {
									objektHinzufügen = true;
								} else if (Vergleichsoperator_z === "<" && feldwert < Filterwert_z) {
									objektHinzufügen = true;
								} else if (Vergleichsoperator_z === "<=" && feldwert <= Filterwert_z) {
									objektHinzufügen = true;
								} else if (Vergleichsoperator_z === "=" && feldwert == Filterwert_z) {
									objektHinzufügen = true;
								} else if (Vergleichsoperator_z === "kein" && feldwert == Filterwert_z) {
									objektHinzufügen = true;
								} else if (Vergleichsoperator_z === "kein" && myTypeOf(feldwert) === "string" && myTypeOf(Filterwert_z) === "string" && feldwert.indexOf(Filterwert_z) >= 0) {
									objektHinzufügen = true;
								} else {
									//Feld existiert aber Kriterium ist nicht erfüllt
									objektNichtHinzufügen = true;
									break loop_filterkriterien;
								}
							} else {
								//das Feld existiert nicht, also Filterkriterium nicht erfüllt
								objektNichtHinzufügen = true;
								break loop_filterkriterien;
							}
							break loop_datensammlungen;
						}
					}
					if (!dsExistiert) {
						//es gibt keine passende Beziehung, nicht hinzufügen
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				}
			}

			if (filterkriterien.length === 0 && nur_ds) {
				//hoppla. jetzt müssen wir trotzdem durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
				//wenn ja und Feld aus DS/BS: objektHinzufügen = true;
				//wenn nein, soll der Datensatz ja nicht exportiert werden
				for (var zz=0; zz<felder.length; zz++) {
					DsTyp_z = felder[zz].DsTyp;
					DsName_z = felder[zz].DsName;
					Feldname_z = felder[zz].Feldname;
					if (DsTyp_z === "Beziehung") {
						//durch alle Beziehungssammlungen loopen
						for (var gg=0; gg<Objekt.Beziehungssammlungen.length; gg++) {
							if (Objekt.Beziehungssammlungen[gg].Name === DsName_z) {
								//durch Beziehungssammlungen der Beziehung loopen
								if (Objekt.Beziehungssammlungen[gg].Beziehungen.length > 0) {
									for (var hh=0; hh<Objekt.Beziehungssammlungen[gg].Beziehungen.length; hh++) {
										//durch die Felder der Beziehung loopen
										if (Objekt.Beziehungssammlungen[gg].Beziehungen[hh][Feldname_z]) {
											//ja, so ein Feld kommt vor > Objekt exportieren
											objektHinzufügen = true;
										}
									}
								}
							}
						}
					} else if (DsTyp_z === "Datensammlung") {
						//das ist ein Feld aus einer Datensammlung
						for (var kk=0; kk<Objekt.Datensammlungen.length; kk++) {
							if (Objekt.Datensammlungen[kk].Name === DsName_z) {
								if (Objekt.Datensammlungen[kk].Name === DsName_z && typeof Objekt.Datensammlungen[kk].Daten !== "undefined" && typeof Objekt.Datensammlungen[kk].Daten[Feldname_z] !== "undefined") {
									//ja, so ein Feld kommt vor > Objekt exportieren
									objektHinzufügen = true;
								}
							}
						}
					}
				}
			}

			if (nur_ds) {
				//hoppla. jetzt müssen wir trotzdem durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
				//wenn ja und Feld aus DS/BS und kein Filter gesetzt: objektHinzufügen = true
				//wenn ein Filter gesetzt wurde und keine Daten enthalten sind, nicht anzeigen
				var hinzufuegen = false;
				for (var zz=0; zz<felder.length; zz++) {
					DsTyp_z = felder[zz].DsTyp;
					DsName_z = felder[zz].DsName;
					Feldname_z = felder[zz].Feldname;
					if (DsTyp_z === "Beziehung") {
						//durch alle Beziehungssammlungen loopen
						for (var gg=0; gg<Objekt.Beziehungssammlungen.length; gg++) {
							if (Objekt.Beziehungssammlungen[gg].Name === DsName_z) {
								//durch Beziehungssammlungen der Beziehung loopen
								if (Objekt.Beziehungssammlungen[gg].Beziehungen.length > 0) {
									for (var hh=0; hh<Objekt.Beziehungssammlungen[gg].Beziehungen.length; hh++) {
										//durch die Felder der Beziehung loopen
										if (Objekt.Beziehungssammlungen[gg].Beziehungen[hh][Feldname_z] || Objekt.Beziehungssammlungen[gg].Beziehungen[hh][Feldname_z] === 0) {
											hinzufuegen = true;
										}
									}
								}
							}
						}
					} else if (DsTyp_z === "Datensammlung") {
						//das ist ein Feld aus einer Datensammlung
						for (var kk=0; kk<Objekt.Datensammlungen.length; kk++) {
							if (Objekt.Datensammlungen[kk].Name === DsName_z) {
								if (Objekt.Datensammlungen[kk].Name === DsName_z && typeof Objekt.Datensammlungen[kk].Daten !== "undefined" && typeof Objekt.Datensammlungen[kk].Daten[Feldname_z] !== "undefined") {
									hinzufuegen = true;
								}
							}
						}
					}
				}
				if (filterkriterien.length > 0 && !hinzufuegen) {
					//ein Filter wurde gesetzt. Es sind keine Daten aus BS oder DS enthalten > nicht hinzufügen
					objektNichtHinzufügen = true;
				}
				if (filterkriterien.length === 0 && hinzufuegen) {
					//keine Filter, es gibt Daten aus BS oder DS > hinzufuegen
					objektHinzufügen = true;
				}
			}

			//exportobjekt zurücksetzen
			exportObjekt = {};

			if (objektHinzufügen && !objektNichtHinzufügen) {
				//alle Kriterien sind erfüllt
				//Neues Objekt aufbauen, das nur die gewünschten Felder enthält
				for (var e in Objekt) {
					//durch alle Eigenschaften des Dokuments loopen
					if (typeof Objekt[e] !== "object" && e !== "_rev") {
						for (i=0; i<felder.length; i++) {
							if (felder[i].DsName === "Objekt" && felder[i].Feldname === e) {
								exportObjekt[e] = Objekt[e];
							}
							if (felder[i].DsName === "Objekt" && felder[i].Feldname === "GUID" && e === "_id") {
								exportObjekt["GUID"] = Objekt[e];
							}
						}
					}
				}
				for (var w in felder) {
					if (felder[w].DsTyp === "Taxonomie" && (fasseTaxonomienZusammen || felder[w].DsName === Objekt.Taxonomie.Name)) {
						//wenn im Objekt das zu exportierende Feld vorkommt, den Wert übernehmen
						if (typeof Objekt.Taxonomie.Daten[felder[w].Feldname] !== "undefined") {
							if (fasseTaxonomienZusammen) {
								exportObjekt["Taxonomie(n): " + felder[w].Feldname] = Objekt.Taxonomie.Daten[felder[w].Feldname];
							} else {
								exportObjekt[felder[w].DsName + ": " + felder[w].Feldname] = Objekt.Taxonomie.Daten[felder[w].Feldname];
							}
						} else {
							//sonst einen leerwert setzen
							if (fasseTaxonomienZusammen) {
								exportObjekt["Taxonomie(n): " + felder[w].Feldname] = "";
							} else {
								exportObjekt[felder[w].DsName + ": " + felder[w].Feldname] = "";
							}
						}
					}

					if (felder[w].DsTyp === "Datensammlung") {
						//das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
						exportObjekt[felder[w].DsName + ": " + felder[w].Feldname] = "";
						if (Objekt.Datensammlungen && Objekt.Datensammlungen.length > 0) {
							//suchen, ob das Objekt diese Datensammlung hat
							loop_ds:
							for (var ii in Objekt.Datensammlungen) {
								if (Objekt.Datensammlungen[ii].Name && Objekt.Datensammlungen[ii].Name === felder[w].DsName) {
									if (typeof Objekt.Datensammlungen[ii].Daten[felder[w].Feldname] !== "undefined") {
										exportObjekt[felder[w].DsName + ": " + felder[w].Feldname] = Objekt.Datensammlungen[ii].Daten[felder[w].Feldname];
									}
									break loop_ds;
								}
							}
						}
					}

					if (felder[w].DsTyp === "Beziehung") {
						//das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
						exportObjekt[felder[w].DsName + ": " + felder[w].Feldname] = "";
						//wurde schon ein zusätzliches Feld geschaffen? wenn ja: hinzufügen

						if (felder[w].Feldname === "Beziehungspartner") {
							//noch ein Feld hinzufügen
							exportObjekt[felder[w].DsName + ": Beziehungspartner GUID(s)"] = "";
						}

						if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
							//suchen, ob das Objekt diese Beziehungssammlungen hat
							loop_bs:
							for (i in Objekt.Beziehungssammlungen) {
								if (Objekt.Beziehungssammlungen[i].Name && Objekt.Beziehungssammlungen[i].Name === felder[w].DsName) {
									//durch Beziehungen loopen
									for (var aaa=0; aaa<Objekt.Beziehungssammlungen[i].Beziehungen.length; aaa++) {
										if (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][felder[w].Feldname] !== "undefined") {
											feldwert = convertToCorrectType(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][felder[w].Feldname]);
											//in der Beziehung gibt es das gesuchte Feld
											//Beziehungen in der Variablen "exportBeziehungen" sammeln
											//durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
											var exportBeziehungen = [];
											if (filterkriterien && filterkriterien.length > 0) {
												for (var l=0; l<filterkriterien.length; l++) {
													var DsTyp = filterkriterien[l].DsTyp;
													var DsName = filterkriterien[l].DsName;
													var Feldname = filterkriterien[l].Feldname;
													var Filterwert = convertToCorrectType(filterkriterien[l].Filterwert);
													var Vergleichsoperator = filterkriterien[l].Vergleichsoperator;
													if (DsTyp === "Beziehung" && DsName === felder[ww].DsName && Feldname === felder[w].Feldname) {
														//Beziehungspartner sind Objekte und müssen separat gefiltert werden
														if (Feldname === "Beziehungspartner") {
															bezPartner = filtereBeziehungspartner(feldwert, Filterwert, Vergleichsoperator);
															if (bezPartner.length > 0) {
																Objekt.Beziehungssammlungen[i].Beziehungen[aaa].Beziehungspartner = bezPartner;
																exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															}
														} else {
															//jetzt müssen die verschiedenen möglichen Vergleichsoperatoren berücksichtigt werden
															if (Vergleichsoperator === "kein" && feldwert == Filterwert) {
																exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															} else if (Vergleichsoperator === "kein" && typeof feldwert === "string" && feldwert.indexOf(Filterwert) >= 0) {
																exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															} else if (Vergleichsoperator === "=" && feldwert == Filterwert) {
																exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															} else if (Vergleichsoperator === ">" && feldwert > Filterwert) {
																exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															} else if (Vergleichsoperator === ">=" && feldwert >= Filterwert) {
																exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															} else if (Vergleichsoperator === "<" && feldwert < Filterwert) {
																exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															} else if (Vergleichsoperator === "<=" && feldwert <= Filterwert) {
																exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															}
														}
													}
												}
											} else {
												//kein Filter auf Feldern - Beziehung hinzufügen
												//aber sicherstellen, dass sie nicht schon drin ist
												if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[aaa], exportBeziehungen)) {
													exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
												}
											}
											//jetzt unterscheiden, ob alle Treffer in einem Feld oder pro Treffer eine Zeile exportiert wird
											if (bez_in_zeilen) {
												//pro Treffer eine neue Zeile erstellen
												schonKopiert = false;
												//durch Beziehungen loopen
												for (var s in exportBeziehungen) {
													//exportObjekt kopieren
													var objektKopiert = _.clone(exportObjekt);
													//durch die Felder der Beziehung loopen
													for (var y in exportBeziehungen[s]) {
														if (y === "Beziehungspartner") {
															//zuerst die Beziehungspartner in JSON hinzufügen
															if (!objektKopiert[felder[w].DsName + ": " + y]) {
																objektKopiert[felder[w].DsName + ": " + y] = [];
															}
															objektKopiert[felder[w].DsName + ": " + y].push(exportBeziehungen[s][y]);
															//Reines GUID-Feld ergänzen
															if (!objektKopiert[felder[w].DsName + ": Beziehungspartner GUID(s)"]) {
																objektKopiert[felder[w].DsName + ": Beziehungspartner GUID(s)"] = exportBeziehungen[s][y][0].GUID;
															} else {
																objektKopiert[felder[w].DsName + ": Beziehungspartner GUID(s)"] += ", " + exportBeziehungen[s][y][0].GUID;
															}
														} else {
															//Vorsicht: Werte werden kommagetrennt. Also müssen Kommas ersetzt werden
															if (!objektKopiert[felder[w].DsName + ": " + y]) {
																objektKopiert[felder[w].DsName + ": " + y] = exportBeziehungen[s][y];
															} else {
																objektKopiert[felder[w].DsName + ": " + y] += ", " + exportBeziehungen[s][y];
															}
														}
													}
													exportObjekte.push(objektKopiert);
													schonKopiert = true;
												}
											} else {
												//jeden Treffer kommagetrennt in dasselbe Feld einfügen
												//durch Beziehungen loopen
												for (var qq=0; qq<exportBeziehungen.length; qq++) {
													//durch die Felder der Beziehung loopen
													for (var yy in exportBeziehungen[qq]) {
														if (yy === "Beziehungspartner") {
															//zuerst die Beziehungspartner in JSON hinzufügen
															if (!exportObjekt[felder[w].DsName + ": " + yy]) {
																exportObjekt[felder[w].DsName + ": " + yy] = [];
															}
															exportObjekt[felder[w].DsName + ": " + yy].push(exportBeziehungen[qq][yy]);
															//Reines GUID-Feld ergänzen
															if (!exportObjekt[felder[w].DsName + ": Beziehungspartner GUID(s)"]) {
																exportObjekt[felder[w].DsName + ": Beziehungspartner GUID(s)"] = exportBeziehungen[qq][yy][0].GUID;
															} else {
																exportObjekt[felder[w].DsName + ": Beziehungspartner GUID(s)"] += ", " + exportBeziehungen[qq][yy][0].GUID;
															}
														//es gibt einen Fehler, wenn replace für einen leeren Wert ausgeführt wird, also kontrollieren
														} else if (typeof exportBeziehungen[qq][yy] === "number") {
															//Vorsicht: in Nummern können keine Kommas ersetzt werden - gäbe einen error
															if (!exportObjekt[felder[w].DsName + ": " + yy]) {
																exportObjekt[felder[w].DsName + ": " + yy] = exportBeziehungen[qq][yy];
															} else {
																exportObjekt[felder[w].DsName + ": " + yy] += ", " + exportBeziehungen[qq][yy];
															}
														} else {
															//Vorsicht: Werte werden kommagetrennt. Also müssen Kommas ersetzt werden
															if (!exportObjekt[felder[w].DsName + ": " + yy]) {
																exportObjekt[felder[w].DsName + ": " + yy] = exportBeziehungen[qq][yy].replace(/,/g,'\(Komma\)');
															} else {
																exportObjekt[felder[w].DsName + ": " + yy] += ", " + exportBeziehungen[qq][yy].replace(/,/g,'\(Komma\)');
															}
														}
													}
												}
											}
										}
									}
									break loop_bs;
								}
							}
						}
					}
				}
				//Objekt zu Exportobjekten hinzufügen - wenn nicht schon kopiert
				if (!schonKopiert) {
					exportObjekte.push(exportObjekt);
				}
			}
		}
		//leere Objekte entfernen
		var exportObjekte_ohne_leere = _.reject(exportObjekte, function(object) {
			return _.isEmpty(object);
		});
		send(JSON.stringify(exportObjekte_ohne_leere));
	});
}

function filtereBeziehungspartner(beziehungspartner, Filterwert, Vergleichsoperator) {
	//Wenn Feldname = Beziehungspartner, durch die Partner loopen und nur hinzufügen, wessen Name die Bedingung erfüllt
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
}

function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
}

function convertToCorrectType(feldWert) {
	var type = myTypeOf(feldWert);
	if (type === "boolean") {
		return Boolean(feldWert);
	} else if (type === "float") {
		return parseFloat(feldWert);
	} else if (type === "integer") {
		return parseInt(feldWert, 10);
	} else if (type === "string") {
		//string jetzt kleinschreiben, damit das nicht später erfolgen muss
		return feldWert.toLowerCase();
	} else {
		//object nicht umwandeln. Man muss beim Vergleichen unterscheiden können, ob es ein Object war
		return feldWert;
	}
}

//Hilfsfunktion, die typeof ersetzt und ergänzt
//typeof gibt bei input-Feldern immer String zurück!
function myTypeOf(Wert) {
	if (typeof Wert === "boolean") {
		return "boolean";
	} else if (parseInt(Wert, 10) && parseFloat(Wert) && parseInt(Wert, 10) !== parseFloat(Wert) && parseInt(Wert, 10) == Wert) {
		//es ist eine Float
		return "float";
	//verhindern, dass führende Nullen abgeschnitten werden
	} else if ((parseInt(Wert, 10) == Wert && Wert.toString().length === Math.ceil(parseInt(Wert, 10)/10)) || Wert == "0") {
		//es ist eine Integer
		return "integer";
	} else if (typeof Wert === "object") {
		//es ist ein Objekt
		return "object";
	} else if (typeof Wert === "string") {
		//als String behandeln
		return "string";
	} else if (typeof Wert === "undefined") {
		return "undefined";
	} else if (typeof Wert === "function") {
		return "function";
	}
}