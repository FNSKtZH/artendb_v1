function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften.csv",
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
		nur_objekte_mit_eigenschaften,
		bez_in_zeilen,
		felder_objekt,
		objekt_hinzufügen,
        _ = require("lists/lib/underscore"),
        adb = require("lists/lib/artendb_listfunctions");

	// specify that we're providing a JSON response
	provides('json', function() {
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
            if (key === "nur_objekte_mit_eigenschaften") {
                // true oder false wird als String übergeben > umwandeln
                nur_objekte_mit_eigenschaften = (value == 'true');
            }
            if (key === "bez_in_zeilen") {
                // true oder false wird als String übergeben > umwandeln
                bez_in_zeilen = (value === 'true');
            }
        });

		while (row = getRow()) {
			objekt = row.doc;
			objekt_hinzufügen = false;
			objekt_nicht_hinzufügen = false;

			// sicherstellen, dass DS und BS existieren
			if (!objekt.Datensammlungen) {
				objekt.Datensammlungen = [];
			}
			if (!objekt.Beziehungssammlungen) {
				objekt.Beziehungssammlungen = [];
			}

			// Prüfen, ob Gruppen übergeben wurden
            // ist hier nötig, weil nicht pro gewählte Gruppe eine list aufgerufen werden kann
			if (gruppen && gruppen.length > 0) {
				// ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
				if (objekt.Gruppe.indexOf(gruppen) > -1) {
					// diese Gruppe wollen wir
					//objekt_hinzufügen = true;
				} else {
					// Gruppen werden gefiltert und Filter ist nicht erfüllt > weiter mit nächstem objekt
					continue;
				}
			}

            objekt_hinzufügen = adb.prüfeObObjektKriterienErfüllt(objekt, felder, filterkriterien, fasseTaxonomienZusammen, nur_objekte_mit_eigenschaften);

            if (nur_objekte_mit_eigenschaften && objekt_hinzufügen && filterkriterien.length === 0) {
                // der Benutzer will nur Objekte mit Informationen aus den gewählten Daten- und Beziehungssammlungen erhalten
                // also müssen wir bei hinzuzufügenden Objekten durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
                // wenn ja und Feld aus DS/BS: objekt_hinzufügen = true
                // wenn ein Filter gesetzt wurde, wird eh nur angezeigt, wo daten sind - also ignorieren
                objekt_hinzufügen = adb.beurteileObInformationenEnthaltenSind(objekt, felder, filterkriterien);
            }

			if (objekt_hinzufügen) {
				// alle Kriterien sind erfüllt
                // jetzt das Exportobjekt aufbauen
                export_objekte = adb.ergänzeExportobjekteUmExportobjekt(objekt, felder, bez_in_zeilen, fasseTaxonomienZusammen, filterkriterien, export_objekte);
			}
		}
		send(adb.erstelleExportString(export_objekte));
	});
}