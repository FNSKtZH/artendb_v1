function(head, req) {
	var row, Objekt, total_rows,
		rückgabeObjekt = {},
		exportObjekte = [],
		exportObjekt,
		filterkriterien = [],
		filterkriterienObjekt = {"rows": []},
		felder = [],
		feldwert,
		gruppen,
		nur_ds,
		felderObjekt,
		objektHinzufügen,
		DsName_z,
		Feldname_z,
		Filterwert_z,
		Vergleichsoperator_z,
		Datensammlung,
		beziehungssammlungen, datensammlungen,
		beziehungssammlungen_aus_synonymen, datensammlungen_aus_synonymen,
		Beziehungssammlung,
		Beziehung,
		dsExistiertSchon,
		dsExistiert;
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
					if (filterkriterien[x].Feldname !== "_id") {
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
				nur_ds = (req.query[i] === 'true');
			}
		}

		//arrays für sammlungen aus synonymen gründen
		beziehungssammlungen_aus_synonymen = [];
		datensammlungen_aus_synonymen = [];

		while (row = getRow()) {
			//row = getRow();
			Objekt = row.doc;
			//send('row.key[0] = '+row.key[0]+'   /   ');
			//send('row.key[1] = '+row.key[1]+'   /   ');

			//row.key[1] ist 0, wenn es sich um ein Synonym handelt, dessen Informationen geholt werden sollen
			if (row.key[1] === 0) {
				if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
					var ds_aus_syn_namen = [];
					if (datensammlungen_aus_synonymen.length > 0) {
						for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
							if (datensammlungen_aus_synonymen[i].Name) {
								ds_aus_syn_namen.push(datensammlungen_aus_synonymen[i].Name);
							}
						}
					}
					var ds_aus_syn_name;
					if (Objekt.Datensammlungen.length > 0) {
						for (i=0; i<Objekt.Datensammlungen.length; i++) {
							ds_aus_syn_name = Objekt.Datensammlungen[i].Name;
							if (ds_aus_syn_namen.length === 0 || ds_aus_syn_name.indexOf(ds_aus_syn_namen) === -1) {
								datensammlungen_aus_synonymen.push(Objekt.Datensammlungen[i]);
								//sicherstellen, dass diese ds nicht nochmals gepuscht wird
								ds_aus_syn_namen.push(ds_aus_syn_name);
							}
						}
					}

					var bs_aus_syn_namen = [];
					if (beziehungssammlungen_aus_synonymen.length > 0) {
						for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
							if (beziehungssammlungen_aus_synonymen[i].Name) {
								bs_aus_syn_namen.push(beziehungssammlungen_aus_synonymen[i].Name);
							}
						}
					}
					var bs_aus_syn_name;
					if (Objekt.Beziehungssammlungen.length > 0) {
						for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
							bs_aus_syn_name = Objekt.Beziehungssammlungen[i].Name;
							if (bs_aus_syn_namen.length === 0 || bs_aus_syn_name.indexOf(bs_aus_syn_namen) === -1) {
								beziehungssammlungen_aus_synonymen.push(Objekt.Beziehungssammlungen[i]);
								//sicherstellen, dass diese bs nicht nochmals gepuscht wird
								bs_aus_syn_namen.push(bs_aus_syn_name);
							}
						}
					}
				}
				//das war ein Synonym. Hier aufhören
				//send('datensammlungen_aus_synonymen = ' + JSON.stringify(datensammlungen_aus_synonymen) + '   /   ');
				//send('beziehungssammlungen_aus_synonymen = ' + JSON.stringify(beziehungssammlungen_aus_synonymen) + '   /   ');
			} else if (row.key[1] === 1) {
				//send('Objekt._id = '+Objekt._id+'   /   ');
				//send('datensammlungen_aus_synonymen = ' + JSON.stringify(datensammlungen_aus_synonymen) + '   /   ');
				//send('datensammlungen des Objekts = ' + JSON.stringify(Objekt.Datensammlungen) + '   /   ');
				//send('beziehungssammlungen_aus_synonymen = ' + JSON.stringify(beziehungssammlungen_aus_synonymen) + '   /   ');
				//send('beziehungssammlungen des Objekts = ' + JSON.stringify(Objekt.Beziehungssammlungen) + '   /   ');
				//wir sind jetzt im Originalobjekt
				//sicherstellen, dass DS und BS existieren
				if (!Objekt.Datensammlungen) {
					Objekt.Datensammlungen = [];
				}
				if (!Objekt.Beziehungssammlungen) {
					Objekt.Beziehungssammlungen = [];
				}
				//allfällige DS und BS aus Synonymen anhängen
				//TODO: FUNKTIONIERT NICHT, DS UND BS AUS SYNONYMEN WERDEN NICHT ANGEHÄNGT!
				//zuerst DS
				//eine Liste der im Objekt enthaltenen DsNamen erstellen
				var dsNamen = [];
				if (Objekt.Datensammlungen.length > 0) {
					for (i=0; i<Objekt.Datensammlungen.length; i++) {
						if (Objekt.Datensammlungen[i].Name) {
							dsNamen.push(Objekt.Datensammlungen[i].Name);
						}
					}
				}
				//nicht enthaltene Datensammlungen ergänzen
				var ds_aus_syn_name2;
				if (datensammlungen_aus_synonymen.length > 0) {
					for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
						ds_aus_syn_name2 = datensammlungen_aus_synonymen[i].Name;
						if (dsNamen.length === 0 || ds_aus_syn_name2.indexOf(dsNamen) === -1) {
							Objekt.Datensammlungen.push(datensammlungen_aus_synonymen[i]);
							//send('ds aus Synonym gepusht: '+JSON.stringify(datensammlungen_aus_synonymen[i])+'   /   ');
							//den Namen zu den dsNamen hinzufügen, damit diese DS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
							dsNamen.push(ds_aus_syn_name2);
						}
					}
				}
				//jetzt BS aus Synonymen anhängen
				//eine Liste der im Objekt enthaltenen BsNamen erstellen
				var bsNamen = [];
				if (Objekt.Beziehungssammlungen.length > 0) {
					for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
						if (Objekt.Beziehungssammlungen[i].Name) {
							bsNamen.push(Objekt.Beziehungssammlungen[i].Name);
						}
					}
				}
				//nicht enthaltene Beziehungssammlungen ergänzen
				var bs_aus_syn_name2;
				if (beziehungssammlungen_aus_synonymen.length > 0) {
					for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
						bs_aus_syn_name2 = beziehungssammlungen_aus_synonymen[i].Name;
						if (bsNamen.length === 0 || bs_aus_syn_name2.indexOf(bsNamen) === -1) {
							Objekt.Beziehungssammlungen.push(beziehungssammlungen_aus_synonymen[i]);
							//send('bs aus Synonym gepusht: '+JSON.stringify(beziehungssammlungen_aus_synonymen[i])+'   /   ');
							//den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
							bsNamen.push(bs_aus_syn_name2);
						}
					}
				}

				//send('datensammlungen des Objekts, inkl. Synonyme = ' + JSON.stringify(Objekt.Datensammlungen) + '   /   ');
				//send('beziehungssammlungen des Objekts, inkl. Synonyme = ' + JSON.stringify(Objekt.Beziehungssammlungen) + '   /   ');

				//wird true gesetzt, wenn in einem Feld ein Filterkriterium gesetzt und dieses erfüllt ist
				objektHinzufügen = false;
				//wird true gesetzt, wenn in einem Feld ein Filterkriterium gesetzt und dieses nicht erfüllt ist
				objektNichtHinzufügen = false;

				//kein Filter aber nur Datensätze mit Infos aus DS/BS
				if (filterkriterien.length === 0 && !nur_ds) {
					objektHinzufügen = true;
				}

				loop_filterkriterien:
				for (var z=0; z<filterkriterien.length; z++) {
					DsTyp_z = filterkriterien[z].DsTyp;
					DsName_z = filterkriterien[z].DsName;
					Feldname_z = filterkriterien[z].Feldname;
					if (Feldname_z !== "_id") {
						Filterwert_z = convertToCorrectType(filterkriterien[z].Filterwert);
					} else {
						//die ID darf nicht in Kleinschrift verwandelt werden
						Filterwert_z = filterkriterien[z].Filterwert;
					}
					Vergleichsoperator_z = filterkriterien[z].Vergleichsoperator;
					//send('Vergleichsoperator_z = ' + Vergleichsoperator_z + '   /   ');
					//Filterkriterien prüfen
					if (DsName_z === "Objekt") {
						feldwert = Objekt[Feldname_z];
						if (feldwert || feldwert === 0) {
							//Das ist eine simple Eigenschaft des Objekts - der view liefert hier als DsName Objekt
							if (Vergleichsoperator_z === "kein" && feldwert == Filterwert_z) {
								objektHinzufügen = true;
								//send('Objekt wegen = zugefuegt   /   ');
							} else if (Vergleichsoperator_z === "kein" && myTypeOf(feldwert) === "string" && feldwert.indexOf(Filterwert_z) >= 0) {
								objektHinzufügen = true;
								//send('Objekt wegen = zugefuegt   /   ');
							} else if (Vergleichsoperator_z === "=" && feldwert == Filterwert_z) {
								objektHinzufügen = true;
								//send('Objekt wegen = zugefuegt   /   ');
							} else if (Vergleichsoperator_z === ">" && feldwert > Filterwert_z) {
								objektHinzufügen = true;
								//send('Objekt wegen > zugefuegt   /   ');
							} else if (Vergleichsoperator_z === ">=" && feldwert >= Filterwert_z) {
								objektHinzufügen = true;
								//send('Objekt wegen >= zugefuegt   /   ');
							} else if (Vergleichsoperator_z === "<" && feldwert < Filterwert_z) {
								objektHinzufügen = true;
								//send('Objekt wegen < zugefuegt   /   ');
							} else if (Vergleichsoperator_z === "<=" && feldwert <= Filterwert_z) {
								objektHinzufügen = true;
								//send('Objekt wegen <= zugefuegt   /   ');
							} else {
								objektNichtHinzufügen = true;
								//send('Objekt wegen ' + Vergleichsoperator_z + ' NICHT zugefuegt   /   ');
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
											feldwert = convertToCorrectType(Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z]);
											//Feld kann string oder object sein. Object muss stringified werden
											if (Vergleichsoperator_z === "kein" && feldwert == Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "kein" && myTypeOf(feldwert) === "string" && feldwert.indexOf(Filterwert_z) >= 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "kein" && typeof feldwert === "object" && JSON.stringify(feldwert).toLowerCase().indexOf(Filterwert_z) >= 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "=" && feldwert == Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "=" && typeof feldwert === "object" && JSON.stringify(feldwert).toLowerCase().indexOf(Filterwert_z) >= 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === ">" && feldwert > Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === ">" && typeof feldwert === "object" && JSON.stringify(feldwert).toLowerCase().indexOf(Filterwert_z) >= 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === ">=" && feldwert >= Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === ">=" && typeof feldwert === "object" && JSON.stringify(feldwert).toLowerCase().indexOf(Filterwert_z) >= 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "<" && feldwert < Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "<" && typeof feldwert === "object" && JSON.stringify(feldwert).toLowerCase().indexOf(Filterwert_z) >= 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "<=" && feldwert <= Filterwert_z) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
											} else if (Vergleichsoperator_z === "<=" && typeof feldwert === "object" && JSON.stringify(feldwert).toLowerCase().indexOf(Filterwert_z) >= 0) {
												objektHinzufügen = true;
												feldHinzugefügt = true;
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
									//send('feldwert = ' + feldwert + '   /   ');
									//send('myTypeOf(feldwert) = ' + myTypeOf(feldwert) + '   /   ');
									//send('Filterwert_z = ' + Filterwert_z + '   /   ');
									//send('myTypeOf(Filterwert_z) = ' + myTypeOf(Filterwert_z) + '   /   ');
									//in Datensammlungen gibt es keine Feldwerte vom Typ object, diesen Fall also nicht abfangen
									if (Vergleichsoperator_z === ">" && feldwert > Filterwert_z) {
										objektHinzufügen = true;
										//send('Objekt wegen > zugefuegt   /   ');
									} else if (Vergleichsoperator_z === ">=" && feldwert >= Filterwert_z) {
										objektHinzufügen = true;
										//send('Objekt wegen >= zugefuegt   /   ');
									} else if (Vergleichsoperator_z === "<" && feldwert < Filterwert_z) {
										objektHinzufügen = true;
										//send('Objekt wegen < zugefuegt   /   ');
									} else if (Vergleichsoperator_z === "<=" && feldwert <= Filterwert_z) {
										objektHinzufügen = true;
										//send('Objekt wegen <= zugefuegt   /   ');
									} else if (Vergleichsoperator_z === "=" && feldwert == Filterwert_z) {
										//send (feldwert + ' == ' + Filterwert_z + '   /   ');
										objektHinzufügen = true;
										//send('Objekt wegen = zugefuegt   /   ');
									} else if (Vergleichsoperator_z === "kein" && feldwert == Filterwert_z) {
										objektHinzufügen = true;
										//send('Objekt wegen kein == zugefuegt   /   ');
									} else if (Vergleichsoperator_z === "kein" && myTypeOf(feldwert) === "string" && myTypeOf(Filterwert_z) === "string" && feldwert.indexOf(Filterwert_z) >= 0) {
										objektHinzufügen = true;
										//send('Objekt wegen kein indexOf zugefuegt   /   ');
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

				//exportobjekt gründen bzw. zurücksetzen
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
							}
						}
					}
					if (Objekt.Taxonomie && Objekt.Taxonomie.Daten) {
						for (var a in Objekt.Taxonomie.Daten) {
							for (var w in felder) {
								if (felder[w].DsTyp === "Taxonomie" && (fasseTaxonomienZusammen || felder[w].DsName === Objekt.Taxonomie.Name)) {
									if (felder[w].Feldname === a) {
										if (typeof exportObjekt.Taxonomie === "undefined") {
											exportObjekt.Taxonomie = {};
											exportObjekt.Taxonomie.Name = felder[w].DsName;
										}
										if (typeof exportObjekt.Taxonomie.Daten === "undefined") {
											exportObjekt.Taxonomie.Daten = {};
										}
										exportObjekt.Taxonomie.Daten[a] = Objekt.Taxonomie.Daten[a];
									}
								}
							}
						}
					}
					if (Objekt.Datensammlungen) {
						for (var ii=0; ii<Objekt.Datensammlungen.length; ii++) {
							if (Objekt.Datensammlungen[ii].Daten) {
								for (var aa in Objekt.Datensammlungen[ii].Daten) {
									for (var u=0; u<felder.length; u++) {
										if (felder[u].DsTyp === "Datensammlung" && felder[u].DsName === Objekt.Datensammlungen[ii].Name) {
											if (felder[u].Feldname === aa) {
												if (typeof exportObjekt.Datensammlungen === "undefined") {
													Datensammlung = {};
													Datensammlung.Name = felder[u].DsName;
													Datensammlung.Daten = {};
													Datensammlung.Daten[aa] = Objekt.Datensammlungen[ii].Daten[aa];
													exportObjekt.Datensammlungen = [];
													exportObjekt.Datensammlungen.push(Datensammlung);
												} else {
													dsExistiertSchon = false;
													//durch alle Datensammlungen loopen und die richtige suchen
													for (var b=0; b<exportObjekt.Datensammlungen.length; b++) {
														if (exportObjekt.Datensammlungen[b].Name === felder[u].DsName) {
															dsExistiertSchon = true;
															if (typeof exportObjekt.Datensammlungen[b] === "undefined") {
																exportObjekt.Datensammlungen[b].Daten = {};
															}
															exportObjekt.Datensammlungen[b].Daten[aa] = Objekt.Datensammlungen[ii].Daten[aa];
														}
													}
													if (!dsExistiertSchon) {
														Datensammlung = {};
														Datensammlung.Name = felder[u].DsName;
														Datensammlung.Daten = {};
														Datensammlung.Daten[aa] = Objekt.Datensammlungen[ii].Daten[aa];
														exportObjekt.Datensammlungen.push(Datensammlung);
													}

												}
											}
										}
									}
								}
							}
						}
					}
					if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
						for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
							//durch Beziehungssammlungen loopen
							for (var ww=0; ww<felder.length; ww++) {
								if (felder[ww].DsTyp === "Beziehung" && felder[ww].DsName === Objekt.Beziehungssammlungen[i].Name) {
									for (var aaa=0; aaa<Objekt.Beziehungssammlungen[i].Beziehungen.length; aaa++) {
										//durch Beziehungen loopen
										if (Objekt.Beziehungssammlungen[i].Beziehungen[aaa][felder[ww].Feldname] || Objekt.Beziehungssammlungen[i].Beziehungen[aaa][felder[ww].Feldname] === 0) {
											feldwert = convertToCorrectType(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][felder[ww].Feldname]);
											//in der Beziehung gibt es das gesuchte Feld
											if (!exportObjekt.Beziehungssammlungen) {
												//im Exportobjekt Beziehungssammlungen anlegen, falls noch nicht vorhanden
												exportObjekt.Beziehungssammlungen = [];
											}
											dsExistiertSchon = false;
											for (var t=0; t<exportObjekt.Beziehungssammlungen.length; t++) {
												//im Exportobjekt die Beziehungssammlung suchen
												if (exportObjekt.Beziehungssammlungen[t].Name === felder[ww].DsName) {
													dsExistiertSchon = true;
													if (!exportObjekt.Beziehungssammlungen[t].Beziehungen) {
														exportObjekt.Beziehungssammlungen[t].Beziehungen = [];
													}
													//durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
													if (filterkriterien && filterkriterien.length > 0) {
														for (var l=0; l<filterkriterien.length; l++) {
															var DsTyp = filterkriterien[l].DsTyp;
															var DsName = filterkriterien[l].DsName;
															var Feldname = filterkriterien[l].Feldname;
															var Filterwert = convertToCorrectType(filterkriterien[l].Filterwert);
															var Vergleichsoperator = filterkriterien[l].Vergleichsoperator;
															if (DsTyp === "Beziehung" && DsName === felder[ww].DsName && Feldname === felder[ww].Feldname) {
																//Beziehungspartner sind Objekte und müssen separat gefiltert werden
																if (Feldname === "Beziehungspartner") {
																	var bezPartner = filtereBeziehungspartner(feldwert, Filterwert, Vergleichsoperator);
																	if (bezPartner.length > 0) {
																		Objekt.Beziehungssammlungen[i].Beziehungen[aaa].Beziehungspartner = bezPartner;
																		exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																	}
																} else {
																	//jetzt müssen die verschiedenen möglichen Vergleichsoperatoren berücksichtigt werden
																	if (Vergleichsoperator === "kein" && feldwert == Filterwert) {
																		exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																	} else if (Vergleichsoperator === "kein" && typeof feldwert === "string" && feldwert.indexOf(Filterwert) >= 0) {
																		exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																	} else if (Vergleichsoperator === "=" && feldwert == Filterwert) {
																		exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																	} else if (Vergleichsoperator === ">" && feldwert > Filterwert) {
																		exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																	} else if (Vergleichsoperator === ">=" && feldwert >= Filterwert) {
																		exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																	} else if (Vergleichsoperator === "<" && feldwert < Filterwert) {
																		exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																	} else if (Vergleichsoperator === "<=" && feldwert <= Filterwert) {
																		exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																	}
																}
															}
														}
													} else {
														//kein Filter auf Feldern - Beziehung hinzufügen
														//aber sicherstellen, dass sie nicht schon drin ist
														if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[aaa], exportObjekt.Beziehungssammlungen[t].Beziehungen)) {
															exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
														}
													}
												}
											}
											if (!dsExistiertSchon) {
												Beziehungssammlung = {};
												Beziehungssammlung.Name = felder[ww].DsName;
												Beziehungssammlung.Beziehungen = [];
												if (filterkriterien && filterkriterien.length > 0) {
													//durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
													for (var ll=0; ll<filterkriterien.length; ll++) {
														Feldname2 = filterkriterien[ll].Feldname;
														Filterwert2 = filterkriterien[ll].Filterwert;
														if (filterkriterien[ll].DsTyp === "Beziehung" && filterkriterien[ll].DsName === felder[ww].DsName && Feldname2 === felder[ww].Feldname) {
															if ((typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "number" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === parseInt(Filterwert2, 10)) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "object" && JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2]).toLowerCase().indexOf(Filterwert2) >= 0) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "string" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2].toLowerCase().indexOf(Filterwert2) >= 0)) {
																//Wenn Feldname2 = Beziehungspartner, durch die Partner loopen und nur hinzufügen, wer die Bedingung erfüllt
																if (Feldname2 === "Beziehungspartner") {
																	var bezPartner2 = [];
																	var beziehung2 = Objekt.Beziehungssammlungen[i].Beziehungen[aaa];
																	for (var mm=0; mm<Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2].length; mm++) {
																		if (JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2][mm]).toLowerCase().indexOf(Filterwert2) >= 0) {
																			bezPartner2.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2][mm]);
																		}
																	}
																	beziehung2.Beziehungspartner = bezPartner2;
																	Beziehungssammlung.Beziehungen.push(beziehung2);
																} else {
																	Beziehungssammlung.Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																}
															}
														}
													}
												} else {
													//kein Filter auf Feldern - alle hinzufügen
													if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[aaa], Beziehungssammlung.Beziehungen)) {
														Beziehungssammlung.Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
													}
												}
												exportObjekt.Beziehungssammlungen.push(Beziehungssammlung);
											}
										}
									}
								}
							}
						}
					}
					//Objekt zu Exportobjekten hinzufügen
					exportObjekte.push(exportObjekt);
				}
				//arrays für sammlungen aus synonymen zurücksetzen
				beziehungssammlungen_aus_synonymen = [];
				datensammlungen_aus_synonymen = [];
			}
		}
		send(JSON.stringify(exportObjekte));
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