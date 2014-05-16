function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften.csv",
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
		schonKopiert = false,
		objektHinzufügen,
        _ = require("lists/lib/underscore"),
        _adb = require("lists/lib/artendb_listfunctions");

	// specify that we're providing a JSON response
	provides('json', function() {
		// übergebene Variabeln extrahieren
		for (var i in req.query) {
			if (i === "fasseTaxonomienZusammen") {
				// true oder false wird als String übergeben > umwandeln
				fasseTaxonomienZusammen = (req.query[i] === 'true');
			}
			if (i === "filter") {
				filterkriterienObjekt = JSON.parse(req.query[i]);
				// mit jQuery.parseJSON versuchen, weil JSON.parse in der FNS in IE9 einen Fehler produziert
				// filterkriterienObjekt = jQuery.parseJSON(req.query[i]);
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
				// felderObjekt = jQuery.parseJSON(req.query[i]);
				felder = felderObjekt.felder;
			}
			if (i === "gruppen") {
				gruppen = req.query[i].split(",");
			}
			if (i === "nur_ds") {
				// true oder false wird als String übergeben > umwandeln
				nur_ds = (req.query[i] == 'true');
			}
			if (i === "bez_in_zeilen") {
				// true oder false wird als String übergeben > umwandeln
				bez_in_zeilen = (req.query[i] === 'true');
			}
		}

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

			// Prüfen, ob Gruppen übergeben wurden
			if (gruppen && gruppen.length > 0) {
				// ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
				if (Objekt.Gruppe.indexOf(gruppen) > -1) {
					// diese Gruppe wollen wir
					//objektHinzufügen = true;
				} else {
					// Gruppen werden gefiltert und Filter ist nicht erfüllt > weiter mit nächstem Objekt
					continue;
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
		}
		send(_adb.erstelleExportString(exportObjekte));
	});
}