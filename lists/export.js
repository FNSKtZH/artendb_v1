function(head, req) {
	var row, Objekt,
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
		// übergebene Variablen extrahieren
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
                        // leider kann true oder false nicht wie gewollt von _adb.convertToCorrectType zurückgegeben werden
                        if (filterkriterium.Filterwert === "true") {
                            filterkriterium.Filterwert = true;
                        } else if (filterkriterium.Filterwert === "false") {
                            filterkriterium.Filterwert = false;
                        } else {
                            filterkriterium.Filterwert = _adb.convertToCorrectType(filterkriterium.Filterwert);
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
		send(JSON.stringify(exportObjekte));
	});
}