function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften_mit_Synonymen.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row, Objekt, total_rows,
		rückgabeObjekt = {},
		exportObjekte = [],
		exportObjekt,
		filterkriterienObjekt = {"rows": []},
		felder = [],
		feldwert,
		gruppen,
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
		beziehungssammlungen, datensammlungen,
		beziehungssammlungen_aus_synonymen, datensammlungen_aus_synonymen,
		Beziehungssammlung,
		Beziehung,
		dsExistiertSchon,
		dsExistiert;
	var _ = require("lists/lib/underscore");

	//Standardfelder aufbauen
	felder = [
		{
			DsTyp: "Datensammlung",
			DsName: "Artengruppen",
			Feldname: "GIS-Layer",
			FeldnameOutput: "GISLayer"
		},
		{
			DsTyp: "Taxonomie",
			DsName: "Taxonomie(n)",
			Feldname: "Taxonomie ID",
			FeldnameOutput: "Ref"
		},
		{
			DsTyp: "Taxonomie",
			DsName: "Taxonomie(n)",
			Feldname: "Artname",
			FeldnameOutput: "NameLat"
		},
		{
			DsTyp: "Taxonomie",
			DsName: "Taxonomie(n)",
			Feldname: "Name Deutsch",
			FeldnameOutput: "NameDeu"
		},
		{
			DsTyp: "Datensammlung",
			DsName: "ZH Artwert (1995)",
			Feldname: "Artwert",
			FeldnameOutput: "Artwert"
		},
		{
			DsTyp: "Datensammlung",
			DsName: "ZH Artwert (1995)",
			Feldname: "Artwert Zusatz",
			FeldnameOutput: "AwZusatz"
		},
		{
			DsTyp: "Taxonomie",
			DsName: "ZH Artengruppen",
			Feldname: "Betrachtungsdistanz (m)",
			FeldnameOutput: "Distanz"
		}
	]
	
	//übergebene Variabeln extrahieren
	for (var i in req.query) {

		//für alt keine Filter nötig, daher alles damit zusammenhängende gelöscht

		if (i === "felder") {
			felderObjekt = JSON.parse(req.query[i]);
			//mitgelieferte Felder anhängen
			for (var x=0; felderObjekt.rows.length; x++) {
				felder.push(felderObjekt.rows[x]);
			}
		}

		if (i === "gruppen") {
			gruppen = req.query[i].split(",");
		}

		//nur_ds ist immer false und wird daher nicht benötigt

		//bez sind nie in Zeilen
		bez_in_zeilen = false;
		/*if (i === "bez_in_zeilen") {
			//true oder false wird als String übergeben > umwandeln
			bez_in_zeilen = (req.query[i] === 'true');
		}*/
	}

	//arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	objekt_loop:
	while (row = getRow()) {
		Objekt = row.doc;

		//Prüfen, ob Gruppen übergeben wurden
		if (gruppen && gruppen.length > 0) {
			//ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
			if (Objekt.Gruppe.indexOf(gruppen) > -1) {
				//diese Gruppe wollen wir
				objektHinzufügen = true;
			} else {
				//Gruppen werden gefiltert und Filter ist nicht erfüllt > weiter mit nächstem Objekt
				continue objekt_loop;
			}
		}

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
		} else if (row.key[1] === 1) {
			//wir sind jetzt im Originalobjekt
			//sicherstellen, dass DS und BS existieren
			if (!Objekt.Datensammlungen) {
				Objekt.Datensammlungen = [];
			}
			if (!Objekt.Beziehungssammlungen) {
				Objekt.Beziehungssammlungen = [];
			}
			//allfällige DS und BS aus Synonymen anhängen
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
						//den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						bsNamen.push(bs_aus_syn_name2);
					}
				}
			}

			//exportobjekt gründen bzw. zurücksetzen
			exportObjekt = {};

			//Neues Objekt aufbauen, das nur die gewünschten Felder enthält
			for (var e in Objekt) {
				//durch alle Eigenschaften des Dokuments loopen
				if (typeof Objekt[e] !== "object" && e !== "_rev") {
					for (i=0; i<felder.length; i++) {
						if (felder[i].DsName === "Objekt" && felder[i].Feldname === e) {
							if (felder[i].FeldnameOutput) {
								//Standardfelder umbenennen
								exportObjekt[felder[i].FeldnameOutput] = Objekt[e];
							} else {
								exportObjekt[e] = Objekt[e];
							}
						}
						if (felder[i].DsName === "Objekt" && felder[i].Feldname === "GUID" && e === "_id") {
							exportObjekt["GUID"] = Objekt[e];
						}
					}
				}
			}
			for (var w in felder) {
				if (felder[w].DsTyp === "Taxonomie") {
					//wenn im Objekt das zu exportierende Feld vorkommt, den Wert übernehmen
					if (typeof Objekt.Taxonomie.Daten[felder[w].Feldname] !== "undefined") {
						if (felder[w].FeldnameOutput) {
							//Standardfelder umbenennen
							exportObjekt[felder[w].FeldnameOutput] = Objekt.Taxonomie.Daten[felder[w].Feldname];
						} else {
							exportObjekt["Taxonomie(n): " + felder[w].Feldname] = Objekt.Taxonomie.Daten[felder[w].Feldname];
						}
					} else {
						//sonst einen leerwert setzen
						if (felder[w].FeldnameOutput) {
							//Standardfelder umbenennen
							exportObjekt[felder[w].FeldnameOutput] = "";
						} else {
							exportObjekt["Taxonomie(n): " + felder[w].Feldname] = "";
						}
					}
				}

				if (felder[w].DsTyp === "Datensammlung") {
					//das leere feld setzen. Wird überschrieben, falls danach ein Wert gefunden wird
					if (felder[w].FeldnameOutput) {
						//Standardfelder umbenennen
						exportObjekt[felder[w].FeldnameOutput] = "";
					} else {
						exportObjekt[felder[w].DsName + ": " + felder[w].Feldname] = "";
					}
					if (Objekt.Datensammlungen && Objekt.Datensammlungen.length > 0) {
						//suchen, ob das Objekt diese Datensammlung hat
						loop_ds:
						for (var ii in Objekt.Datensammlungen) {
							if (Objekt.Datensammlungen[ii].Name && Objekt.Datensammlungen[ii].Name === felder[w].DsName) {
								if (typeof Objekt.Datensammlungen[ii].Daten[felder[w].Feldname] !== "undefined") {
									if (felder[w].FeldnameOutput) {
										//Standardfelder umbenennen
										exportObjekt[felder[w].FeldnameOutput] = Objekt.Datensammlungen[ii].Daten[felder[w].Feldname];
									} else {
										exportObjekt[felder[w].DsName + ": " + felder[w].Feldname] = Objekt.Datensammlungen[ii].Daten[felder[w].Feldname];
									}
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
										//Beziehung hinzufügen, aber sicherstellen, dass sie nicht schon drin ist
										if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[aaa], exportBeziehungen)) {
											exportBeziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
										}
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
			//arrays für sammlungen aus synonymen zurücksetzen
			beziehungssammlungen_aus_synonymen = [];
			datensammlungen_aus_synonymen = [];
		}
	}
	//leere Objekte entfernen
	var exportObjekte_ohne_leere = _.reject(exportObjekte, function(object) {
		return _.isEmpty(object);
	});
	send(erstelleExportString(exportObjekte_ohne_leere));
}

function erstelleExportString(exportobjekte) {
	var stringTitelzeile = "";
	var stringZeilen = "";
	//titelzeile erstellen
	//durch Spalten loopen
	for (var a in exportobjekte[1]) {
		if (stringTitelzeile !== "") {
			stringTitelzeile += ',';
		}
		stringTitelzeile += '"' + a + '"';
	}
	//Datenzeilen erstellen
	for (var i in exportobjekte) {
		if (stringZeilen !== "") {
			stringZeilen += '\n';
		}
		var stringZeile = "";
		//durch die Felder loopen
		for (var x in exportobjekte[i]) {
		//for (var x = 0; x < exportobjekte[i].length; x++) {
			if (stringZeile !== "") {
				stringZeile += ',';
			}
			//null-Werte als leere Werte
			if (exportobjekte[i][x] === null) {
				stringZeile += "";
			} else if (typeof exportobjekte[i][x] === "number") {
				//Zahlen ohne Anführungs- und Schlusszeichen exportieren
				stringZeile += exportobjekte[i][x];
			} else if (typeof exportobjekte[i][x] === "object") {
				//Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
				stringZeile += '"' + JSON.stringify(exportobjekte[i][x]).replace(/"/g, "'") + '"';
			} else {
				stringZeile += '"' + exportobjekte[i][x] + '"';
			}
		}
		stringZeilen += stringZeile;
	}
	return stringTitelzeile + "\n" + stringZeilen;
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