function(head, req) {
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
		exportObjekt,
		beziehungssammlungen_aus_synonymen,
        datensammlungen_aus_synonymen,
        ergänzeDsBsVonSynonym_return,
        _ = require("lists/lib/underscore"),
        adb = require("lists/lib/artendb_listfunctions");

    // übergebene Variablen extrahieren
    ü_var = adb.holeÜbergebeneVariablen(req.query);

	// gruppen ist vorgegeben
	gruppen = ["Fauna", "Flora"];

	// arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	while (row = getRow()) {
		objekt = row.doc;

		if (gruppen.indexOf(objekt.Gruppe) === -1) {
			// diese Gruppe wollen wir nicht > weiter mit nächstem Objekt
			continue;
		}

		if (row.key[1] === 0) {
            // das ist ein Synonym
            // wir erstellen je eine Liste aller in Synonymen enthaltenen Eigenschaften- und Beziehungssammlungen inkl. der darin enthaltenen Daten
            // nämlich: datensammlungen_aus_synonymen und beziehungssammlungen_aus_synonymen
            // später können diese, wenn nicht im Originalobjekt enthalten, angefügt werden
            ergänzeDsBsVonSynonym_return = adb.ergänzeDsBsVonSynonym(objekt, datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen);
            datensammlungen_aus_synonymen = ergänzeDsBsVonSynonym_return[0];
            beziehungssammlungen_aus_synonymen = ergänzeDsBsVonSynonym_return[1];
		} else if (row.key[1] === 1) {
			// wir sind jetzt im Originalobjekt
			// sicherstellen, dass DS und BS existieren
            objekt.Eigenschaftensammlungen = objekt.Eigenschaftensammlungen || [];
            objekt.Beziehungssammlungen = objekt.Beziehungssammlungen || [];

			// allfällige DS und BS aus Synonymen anhängen
            objekt = adb.ergänzeObjektUmInformationenVonSynonymen(objekt, datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen);

            // für das alt sollen alle Daten aus den gewünschten Artgruppen gewählt werden, also keinen Filter übernehmen

            // Exportobjekte um das Objekt ergänzen
            // der letzte Parameter "alt" teilt mit, dass der Export für das Artenlistentool erstellt wird und die Pflichtfelder benötigt
            export_objekte = adb.ergänzeExportobjekteUmExportobjekt(objekt, ü_var.felder, ü_var.bez_in_zeilen, ü_var.fasseTaxonomienZusammen, ü_var.filterkriterien, export_objekte, "alt");
			// arrays für sammlungen aus synonymen zurücksetzen
			beziehungssammlungen_aus_synonymen = [];
			datensammlungen_aus_synonymen = [];
		}
	}

    send(JSON.stringify(export_objekte));
}