function(head, req) {
	var row,
        objekt,
        ü_var = {
            fasseTaxonomienZusammen: false,
            filterkriterien: [],
            felder: [],
            nur_objekte_mit_eigenschaften: true,
            bez_in_zeilen: true
        },
		export_objekte = [],
		filterkriterien_objekt = {"filterkriterien": []},
		felder_objekt,
		objekt_hinzufügen,
        _ = require("lists/lib/underscore"),
        adb = require("lists/lib/artendb_listfunctions");

	// specify that we're providing a JSON response
	provides('json', function() {
		// übergebene Variablen extrahieren
        ü_var = adb.holeÜbergebeneVariablen(req.query);

		while (row = getRow()) {
			objekt = row.doc;// Prüfen, ob Gruppen übergeben wurden

            /* ist nicht nötig, weil pro Gruppe eine list aufgerufen wird, die dann den view der Gruppe benutzt
            if (ü_var.gruppen && ü_var.gruppen.length > 0) {
                // ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
                if (objekt.Gruppe.indexOf(ü_var.gruppen) > -1) {
                    // diese Gruppe wollen wir
                    objekt_hinzufügen = true;
                } else {
                    // Gruppen werden gefiltert und Filter ist nicht erfüllt > weiter mit nächstem objekt
                    continue;
                }
            }*/

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
		}
		send(JSON.stringify(export_objekte));
	});
}