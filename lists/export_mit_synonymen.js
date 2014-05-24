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
		filterkriterien = [],
		filterkriterien_objekt = {"filterkriterien": []},
		felder = [],
		gruppen,
		nur_objekte_mit_eigenschaften,
		bez_in_zeilen,
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

		// arrays für sammlungen aus synonymen gründen
		beziehungssammlungen_aus_synonymen = [];
		datensammlungen_aus_synonymen = [];

		while (row = getRow()) {
			objekt = row.doc;

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

				// arrays für sammlungen aus synonymen zurücksetzen
				beziehungssammlungen_aus_synonymen = [];
				datensammlungen_aus_synonymen = [];
			}
		}
		send(JSON.stringify(export_objekte));
	});
}