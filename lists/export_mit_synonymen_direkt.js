function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften_mit_Synonymen.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row,
        objekt,
		export_objekte = [],
		filterkriterien = [],
		filterkriterien_objekt = {"filterkriterien": []},
		felder = [],
		gruppen,
		nur_ds,
		bez_in_zeilen,
		felder_objekt,
		objekt_hinzufügen,
		beziehungssammlungen_aus_synonymen,
        datensammlungen_aus_synonymen,
	    _ = require("lists/lib/underscore"),
        adb = require("lists/lib/artendb_listfunctions");

	// übergebene Variablen extrahieren
    _.each(req.query, function(value, key) {
        if (key === "fasseTaxonomienZusammen") {
            // true oder false wird als String übergeben > umwandeln
            fasseTaxonomienZusammen = (value === 'true');
        }
        if (key === "filter") {
            filterkriterien_objekt = JSON.parse(value);
            filterkriterien = filterkriterien_objekt.filterkriterien;
            // jetzt strings in Kleinschrift und Nummern in Zahlen verwandeln
            // damit das später nicht dauern wiederholt werden muss
            filterkriterien = adb.bereiteFilterkriterienVor(filterkriterien);
        }
        if (key === "felder") {
            felder_objekt = JSON.parse(value);
            felder = felder_objekt.felder;
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

	// arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	while (row = getRow()) {
		objekt = row.doc;

		// Prüfen, ob Gruppen übergeben wurden
		if (gruppen && gruppen.length > 0) {
			// ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
			if (objekt.Gruppe.indexOf(gruppen) > -1) {
				// diese Gruppe wollen wir
				objekt_hinzufügen = true;
			} else {
				// Gruppen werden gefiltert und Filter ist nicht erfüllt > weiter mit nächstem objekt
				continue;
			}
		}

		// row.key[1] ist 0, wenn es sich um ein Synonym handelt, dessen Informationen geholt werden sollen
		if (row.key[1] === 0) {
			if (objekt.Datensammlungen && objekt.Datensammlungen.length > 0) {
				var ds_aus_syn_namen = [];
				if (datensammlungen_aus_synonymen.length > 0) {
					for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
						if (datensammlungen_aus_synonymen[i].Name) {
							ds_aus_syn_namen.push(datensammlungen_aus_synonymen[i].Name);
						}
					}
				}
				var ds_aus_syn_name;
				if (objekt.Datensammlungen.length > 0) {
					for (i=0; i<objekt.Datensammlungen.length; i++) {
						ds_aus_syn_name = objekt.Datensammlungen[i].Name;
						if (ds_aus_syn_namen.length === 0 || ds_aus_syn_name.indexOf(ds_aus_syn_namen) === -1) {
							datensammlungen_aus_synonymen.push(objekt.Datensammlungen[i]);
							// sicherstellen, dass diese ds nicht nochmals gepuscht wird
							ds_aus_syn_namen.push(ds_aus_syn_name);
						}
					}
				}
			}
			if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
				var bs_aus_syn_namen = [];
				if (beziehungssammlungen_aus_synonymen.length > 0) {
					for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
						if (beziehungssammlungen_aus_synonymen[i].Name) {
							bs_aus_syn_namen.push(beziehungssammlungen_aus_synonymen[i].Name);
						}
					}
				}
				var bs_aus_syn_name;
				if (objekt.Beziehungssammlungen.length > 0) {
					for (i=0; i<objekt.Beziehungssammlungen.length; i++) {
						bs_aus_syn_name = objekt.Beziehungssammlungen[i].Name;
						if (bs_aus_syn_namen.length === 0 || bs_aus_syn_name.indexOf(bs_aus_syn_namen) === -1) {
							beziehungssammlungen_aus_synonymen.push(objekt.Beziehungssammlungen[i]);
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
			if (!objekt.Datensammlungen) {
				objekt.Datensammlungen = [];
			}
			if (!objekt.Beziehungssammlungen) {
				objekt.Beziehungssammlungen = [];
			}
			// allfällige DS und BS aus Synonymen anhängen
			// zuerst DS
			// eine Liste der im objekt enthaltenen DsNamen erstellen
			var dsNamen = [];
			if (objekt.Datensammlungen.length > 0) {
				for (i=0; i<objekt.Datensammlungen.length; i++) {
					if (objekt.Datensammlungen[i].Name) {
						dsNamen.push(objekt.Datensammlungen[i].Name);
					}
				}
			}
			// nicht enthaltene Datensammlungen ergänzen
			var ds_aus_syn_name2;
			if (datensammlungen_aus_synonymen.length > 0) {
				for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
					ds_aus_syn_name2 = datensammlungen_aus_synonymen[i].Name;
					if (dsNamen.length === 0 || ds_aus_syn_name2.indexOf(dsNamen) === -1) {
						objekt.Datensammlungen.push(datensammlungen_aus_synonymen[i]);
						// den Namen zu den dsNamen hinzufügen, damit diese DS sicher nicht nochmals gepusht wird, auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						dsNamen.push(ds_aus_syn_name2);
					}
				}
			}
			// jetzt BS aus Synonymen anhängen
			// eine Liste der im objekt enthaltenen BsNamen erstellen
			var bsNamen = [];
			if (objekt.Beziehungssammlungen.length > 0) {
				for (i=0; i<objekt.Beziehungssammlungen.length; i++) {
					if (objekt.Beziehungssammlungen[i].Name) {
						bsNamen.push(objekt.Beziehungssammlungen[i].Name);
					}
				}
			}
			// nicht enthaltene Beziehungssammlungen ergänzen
			var bs_aus_syn_name2;
			if (beziehungssammlungen_aus_synonymen.length > 0) {
				for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
					bs_aus_syn_name2 = beziehungssammlungen_aus_synonymen[i].Name;
					if (bsNamen.length === 0 || bs_aus_syn_name2.indexOf(bsNamen) === -1) {
						objekt.Beziehungssammlungen.push(beziehungssammlungen_aus_synonymen[i]);
						// den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird
						// auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
						bsNamen.push(bs_aus_syn_name2);
					}
				}
			}

            //noinspection JSUnusedAssignment
            var obj_kriterien_erfüllt_returnvalue = adb.prüfeObObjektKriterienErfüllt(objekt, felder, filterkriterien, fasseTaxonomienZusammen, nur_ds);
            objekt_hinzufügen = obj_kriterien_erfüllt_returnvalue.objektHinzufügen;
            objekt_nicht_hinzufügen = obj_kriterien_erfüllt_returnvalue.objekt_nicht_hinzufügen;

            if (nur_ds) {
                // der Benutzer will nur Objekte mit Informationen aus den gewählten Daten- und Beziehungssammlungen erhalten
                // also müssen wir durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
                // wenn ja und Feld aus DS/BS und kein Filter gesetzt: objekt_hinzufügen = true
                // wenn ein Filter gesetzt wurde und keine Daten enthalten sind, nicht anzeigen
                var inf_enthalten_return_object = adb.beurteileObInformationenEnthaltenSind(objekt, felder, filterkriterien);
                objekt_hinzufügen = inf_enthalten_return_object.objektHinzufügen;
                objekt_nicht_hinzufügen = inf_enthalten_return_object.objekt_nicht_hinzufügen;
            }

			if (objekt_hinzufügen && !objekt_nicht_hinzufügen) {
				// alle Kriterien sind erfüllt
                // jetzt das Exportobjekt aufbauen
                export_objekte = adb.ergänzeExportobjekteUmExportobjekt(objekt, felder, bez_in_zeilen, fasseTaxonomienZusammen, filterkriterien, export_objekte);
			}

			// arrays für sammlungen aus synonymen zurücksetzen
			beziehungssammlungen_aus_synonymen = [];
			datensammlungen_aus_synonymen = [];
		}
	}
	send(adb.erstelleExportString(export_objekte));
}