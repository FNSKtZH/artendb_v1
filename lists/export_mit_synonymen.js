function(head, req) {

	// TODO: ist das nötig?
	start({
		"headers": {
			"Accept-Charset": "utf-8",
			"Content-Type": "json; charset=utf-8;"
		}
	});

	var row,
        objekt,
		export_objekte = [],
        ü_var = {
            fasseTaxonomienZusammen: false,
            filterkriterien: [],
            felder: [],
            nur_objekte_mit_eigenschaften: true,
            bez_in_zeilen: true
        },
		filterkriterien_objekt = {"filterkriterien": []},
		felder_objekt,
		objekt_hinzufügen,
		beziehungssammlungen_aus_synonymen,
        datensammlungen_aus_synonymen,
        ergänzeDsBsVonSynonym_return,
        _ = require("lists/lib/underscore"),
        adb = require("lists/lib/artendb_listfunctions");

	// specify that we're providing a JSON response
	provides('json', function() {
		// übergebene Variablen extrahieren
        _.each(req.query, function(value, key) {
            switch (key) {
            case "fasseTaxonomienZusammen":
                // true oder false wird als String übergeben > umwandeln
                ü_var.fasseTaxonomienZusammen = (value === 'true');
                break;
            case "filter":
                filterkriterien_objekt = JSON.parse(value);
                ü_var.filterkriterien = filterkriterien_objekt.filterkriterien || [];
                // jetzt strings in Kleinschrift und Nummern in Zahlen verwandeln
                // damit das später nicht dauern wiederholt werden muss
                ü_var.filterkriterien = adb.bereiteFilterkriterienVor(ü_var.filterkriterien);
                break;
            case "felder":
                felder_objekt = JSON.parse(value);
                ü_var.felder = felder_objekt.felder || [];
                break;
            case "gruppen":
                ü_var.gruppen = value.split(",");
                break
            case "nur_objekte_mit_eigenschaften":
                // true oder false wird als String übergeben > umwandeln
                ü_var.nur_objekte_mit_eigenschaften = (value == 'true');
                break;
            case "bez_in_zeilen":
                // true oder false wird als String übergeben > umwandeln
                ü_var.bez_in_zeilen = (value === 'true');
                break;
            }
        });

		// arrays für sammlungen aus synonymen gründen
		beziehungssammlungen_aus_synonymen = [];
		datensammlungen_aus_synonymen = [];

		while (row = getRow()) {
			objekt = row.doc;

            // Prüfen, ob Gruppen übergeben wurden
            if (ü_var.gruppen && ü_var.gruppen.length > 0) {
                // ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
                if (objekt.Gruppe.indexOf(ü_var.gruppen) > -1) {
                    // o.k., weiter unten prüfen
                } else {
                    // Gruppen werden gefiltert und Filter ist nicht erfüllt > weiter mit nächstem objekt
                    continue;
                }
            }

			if (row.key[1] === 0) {
                // das ist ein Synonym
                // wir erstellen je eine Liste aller in Synonymen enthaltenen Daten- und Beziehungssammlungen inkl. der darin enthaltenen Daten
                // nämlich: datensammlungen_aus_synonymen und beziehungssammlungen_aus_synonymen
                // später können diese, wenn nicht im Originalobjekt enthalten, angefügt werden
                ergänzeDsBsVonSynonym_return = adb.ergänzeDsBsVonSynonym(objekt, datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen);
                datensammlungen_aus_synonymen = ergänzeDsBsVonSynonym_return[0];
                beziehungssammlungen_aus_synonymen = ergänzeDsBsVonSynonym_return[1];
			} else if (row.key[1] === 1) {
				// wir sind jetzt im Originalobjekt

				// sicherstellen, dass DS und BS existieren
				objekt.Datensammlungen = objekt.Datensammlungen || [];
				objekt.Beziehungssammlungen = objekt.Beziehungssammlungen || [];

				// allfällige DS und BS aus Synonymen anhängen
				// zuerst DS
				// eine Liste der im objekt enthaltenen DsNamen erstellen
				var dsNamen = [];
                _.each(objekt.Datensammlungen, function(datensammlung) {
                    if (datensammlung.Name) {
                        dsNamen.push(datensammlung.Name);
                    }
                });
				// nicht enthaltene Datensammlungen ergänzen
				var ds_aus_syn_name2;
                _.each(datensammlungen_aus_synonymen, function(datensammlung) {
                    ds_aus_syn_name2 = datensammlung.Name;
                    if (dsNamen.length === 0 || ds_aus_syn_name2.indexOf(dsNamen) === -1) {
                        objekt.Datensammlungen.push(datensammlung);
                        // den Namen zu den dsNamen hinzufügen, damit diese DS sicher nicht nochmals gepusht wird
                        // auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
                        dsNamen.push(ds_aus_syn_name2);
                    }
                });
				// jetzt BS aus Synonymen anhängen
				// eine Liste der im objekt enthaltenen BsNamen erstellen
				var bsNamen = [];
                _.each(objekt.Beziehungssammlungen, function(beziehungssammlung) {
                    if (beziehungssammlung.Name) {
                        bsNamen.push(beziehungssammlung.Name);
                    }
                });
				// nicht enthaltene Beziehungssammlungen ergänzen
				var bs_aus_syn_name2;
                _.each(beziehungssammlungen_aus_synonymen, function(beziehungssammlung) {
                    bs_aus_syn_name2 = beziehungssammlung.Name;
                    if (bsNamen.length === 0 || bs_aus_syn_name2.indexOf(bsNamen) === -1) {
                        objekt.Beziehungssammlungen.push(beziehungssammlung);
                        // den Namen zu den bsNamen hinzufügen, damit diese BS sicher nicht nochmals gepusht wird,
                        // auch nicht, wenn sie von einem anderen Synonym nochmals gebracht wird
                        bsNamen.push(bs_aus_syn_name2);
                    }
                });

                objekt_hinzufügen = adb.prüfeObObjektKriterienErfüllt(objekt, ü_var.felder, ü_var.filterkriterien, ü_var.fasseTaxonomienZusammen, ü_var.nur_objekte_mit_eigenschaften);

                if (ü_var.nur_objekte_mit_eigenschaften && objekt_hinzufügen && ü_var.filterkriterien.length === 0) {
                    // der Benutzer will nur Objekte mit Informationen aus den gewählten Daten- und Beziehungssammlungen erhalten
                    // also müssen wir bei hinzuzufügenden Objekten durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
                    // wenn ja und Feld aus DS/BS: objekt_hinzufügen = true
                    // wenn ein Filter gesetzt wurde, wird eh nur angezeigt, wo daten sind - also ignorieren
                    objekt_hinzufügen = adb.beurteileObInformationenEnthaltenSind(objekt, ü_var.felder, ü_var.filterkriterien);
                }

				if (objekt_hinzufügen) {
					// alle Kriterien sind erfüllt
                    // jetzt das Exportobjekt aufbauen
                    export_objekte = adb.ergänzeExportobjekteUmExportobjekt(objekt, ü_var.felder, ü_var.bez_in_zeilen, ü_var.fasseTaxonomienZusammen, ü_var.filterkriterien, export_objekte);
				}

				// arrays für sammlungen aus synonymen zurücksetzen
				beziehungssammlungen_aus_synonymen = [];
				datensammlungen_aus_synonymen = [];
			}
		}
		send(JSON.stringify(export_objekte));
	});
}