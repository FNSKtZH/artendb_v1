function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften_mit_Synonymen.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row,
        Objekt,
		exportObjekte = [],
		exportObjekt,
		filterkriterien = [],
		filterkriterienObjekt = {"filterkriterien": []},
		felder = [],
		gruppen,
		nur_ds,
		bez_in_zeilen,
		felderObjekt,
		schonKopiert,
		objektHinzufügen,
		beziehungssammlungen_aus_synonymen,
        datensammlungen_aus_synonymen,
	    _ = require("lists/lib/underscore"),
        _adb = require("lists/lib/artendb_listfunctions");

	// übergebene Variabeln extrahieren
	for (var i in req.query) {
		if (i === "fasseTaxonomienZusammen") {
			// true oder false wird als String übergeben > umwandeln
			fasseTaxonomienZusammen = (req.query[i] === 'true');
		}
		if (i === "filter") {
			filterkriterienObjekt = JSON.parse(req.query[i]);
			filterkriterien = filterkriterienObjekt.filterkriterien;
			// jetzt strings in Kleinschrift und Nummern in Zahlen verwandeln
			// damit das später nicht dauern wiederholt werden muss
			for (var x=0; x<filterkriterien.length; x++) {
				// die id darf nicht in Kleinschrift verwandelt werden
				if (filterkriterien[x].Feldname !== "GUID") {
					// true wurde offenbar irgendwie umgewandelt
					// jedenfalls musste man als Kriterium 1 statt true erfassen, um die Resultate zu erhalten
					// leider kann true oder false nicht wie gewollt von _adb.convertToCorrectType zurückgegeben werden
					if (filterkriterien[x].Filterwert === "true") {
						filterkriterien[x].Filterwert = true;
					} else if (filterkriterien[x].Filterwert === "false") {
						filterkriterien[x].Filterwert = false;
					} else {
						filterkriterien[x].Filterwert = _adb.convertToCorrectType(filterkriterien[x].Filterwert);
					}
				}
			}
		}
		if (i === "felder") {
			felderObjekt = JSON.parse(req.query[i]);
			felder = felderObjekt.felder;
		}
		if (i === "gruppen") {
			gruppen = req.query[i].split(",");
		}
		if (i === "nur_ds") {
			// true oder false wird als String übergeben > umwandeln
			nur_ds = (req.query[i] === 'true');
		}
		if (i === "bez_in_zeilen") {
			// true oder false wird als String übergeben > umwandeln
			bez_in_zeilen = (req.query[i] === 'true');
		}
	}

	// arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	while (row = getRow()) {
		Objekt = row.doc;

		// Prüfen, ob Gruppen übergeben wurden
		if (gruppen && gruppen.length > 0) {
			// ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
			if (Objekt.Gruppe.indexOf(gruppen) > -1) {
				// diese Gruppe wollen wir
				objektHinzufügen = true;
			} else {
				// Gruppen werden gefiltert und Filter ist nicht erfüllt > weiter mit nächstem Objekt
				continue;
			}
		}

		// row.key[1] ist 0, wenn es sich um ein Synonym handelt, dessen Informationen geholt werden sollen
		if (row.key[1] === 0) {
			if (Objekt.Datensammlungen && Objekt.Datensammlungen.length > 0) {
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
							// sicherstellen, dass diese ds nicht nochmals gepuscht wird
							ds_aus_syn_namen.push(ds_aus_syn_name);
						}
					}
				}
			}
			if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
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
							// sicherstellen, dass diese bs nicht nochmals gepuscht wird
							bs_aus_syn_namen.push(bs_aus_syn_name);
						}
					}
				}
			}
			// das war ein Synonym. Hier aufhören
		} else if (row.key[1] === 1) {
			// wir sind jetzt im Originalobjekt
			// sicherstellen, dass DS und BS existieren
			if (!Objekt.Datensammlungen) {
				Objekt.Datensammlungen = [];
			}
			if (!Objekt.Beziehungssammlungen) {
				Objekt.Beziehungssammlungen = [];
			}
			// allfällige DS und BS aus Synonymen anhängen
			// zuerst DS
			// eine Liste der im Objekt enthaltenen DsNamen erstellen
			var dsNamen = [];
			if (Objekt.Datensammlungen.length > 0) {
				for (i=0; i<Objekt.Datensammlungen.length; i++) {
					if (Objekt.Datensammlungen[i].Name) {
						dsNamen.push(Objekt.Datensammlungen[i].Name);
					}
				}
			}
			// nicht enthaltene Datensammlungen ergänzen
			var ds_aus_syn_name2;
			if (datensammlungen_aus_synonymen.length > 0) {
				for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
					ds_aus_syn_name2 = datensammlungen_aus_synonymen[i].Name;
					if (dsNamen.length === 0 || ds_aus_syn_name2.indexOf(dsNamen) === -1) {
						Objekt.Datensammlungen.push(datensammlungen_aus_synonymen[i]);
						// den Namen zu den dsNamen hinzufügen, damit diese DS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						dsNamen.push(ds_aus_syn_name2);
					}
				}
			}
			// jetzt BS aus Synonymen anhängen
			// eine Liste der im Objekt enthaltenen BsNamen erstellen
			var bsNamen = [];
			if (Objekt.Beziehungssammlungen.length > 0) {
				for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
					if (Objekt.Beziehungssammlungen[i].Name) {
						bsNamen.push(Objekt.Beziehungssammlungen[i].Name);
					}
				}
			}
			// nicht enthaltene Beziehungssammlungen ergänzen
			var bs_aus_syn_name2;
			if (beziehungssammlungen_aus_synonymen.length > 0) {
				for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
					bs_aus_syn_name2 = beziehungssammlungen_aus_synonymen[i].Name;
					if (bsNamen.length === 0 || bs_aus_syn_name2.indexOf(bsNamen) === -1) {
						Objekt.Beziehungssammlungen.push(beziehungssammlungen_aus_synonymen[i]);
						// den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird
						// auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						bsNamen.push(bs_aus_syn_name2);
					}
				}
			}

            var obj_erfüllt_kriterien_returnvalue = _adb.prüfeObObjektKriterienErfüllt(Objekt, felder, filterkriterien, fasseTaxonomienZusammen, nur_ds);
            objektHinzufügen = obj_erfüllt_kriterien_returnvalue.objektHinzufügen;
            objektNichtHinzufügen = obj_erfüllt_kriterien_returnvalue.objektNichtHinzufügen;

            if (nur_ds) {
                // der Benutzer will nur Objekte mit Informationen aus den gewählten Daten- und Beziehungssammlungen erhalten
                // also müssen wir durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
                // wenn ja und Feld aus DS/BS und kein Filter gesetzt: objektHinzufügen = true
                // wenn ein Filter gesetzt wurde und keine Daten enthalten sind, nicht anzeigen
                var inf_enthalten_return_object = _adb.beurteileObInformationenEnthaltenSind(Objekt, felder, filterkriterien);
                objektHinzufügen = inf_enthalten_return_object.objektHinzufügen;
                objektNichtHinzufügen = inf_enthalten_return_object.objektNichtHinzufügen;
            }

			if (objektHinzufügen && !objektNichtHinzufügen) {
				// alle Kriterien sind erfüllt
                var return_objekt = _adb.erstelleExportobjekt(Objekt, felder, bez_in_zeilen, fasseTaxonomienZusammen, filterkriterien, exportObjekte);
                schonKopiert = return_objekt.schonKopiert;
                exportObjekt = return_objekt.exportObjekt;
                exportObjekte = return_objekt.exportObjekte;

				// Objekt zu Exportobjekten hinzufügen - wenn nicht schon kopiert
				if (!schonKopiert) {
					exportObjekte.push(exportObjekt);
				}
			}
			// arrays für sammlungen aus synonymen zurücksetzen
			beziehungssammlungen_aus_synonymen = [];
			datensammlungen_aus_synonymen = [];
		}
	}
	send(_adb.erstelleExportString(exportObjekte));
}