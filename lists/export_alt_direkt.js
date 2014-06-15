'use strict';
function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften_mit_Synonymen_fuer_Artenlistentool.csv",
			"Accept-Charset": "utf-8"
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
		exportObjekt,
		beziehungssammlungen_aus_synonymen,
        datensammlungen_aus_synonymen,
        ergänzeDsBsVonSynonym_return,
        _ = require("lists/lib/underscore"),
        adb = require("lists/lib/artendb_listfunctions");

    // übergebene Variablen extrahieren
    ü_var = adb.holeÜbergebeneVariablen(req.query);

	// gruppen ist vom verwendeten view vorgegeben
	//gruppen = ["Fauna", "Flora"];

	// arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	while (row = getRow()) {
		objekt = row.doc;

		/*if (gruppen.indexOf(objekt.Gruppe) === -1) {
			// diese Gruppe wollen wir nicht > weiter mit nächstem Objekt
			continue;
		}*/

        // sicherstellen, dass DS und BS existieren
        objekt.Eigenschaftensammlungen = objekt.Eigenschaftensammlungen || [];
        objekt.Beziehungssammlungen = objekt.Beziehungssammlungen || [];

        // für das alt sollen alle Daten aus den gewünschten Artgruppen gewählt werden, also keinen Filter übernehmen

        // Exportobjekte um das Objekt ergänzen
        // der letzte Parameter "alt" teilt mit, dass der Export für das Artenlistentool erstellt wird und die Pflichtfelder benötigt
        export_objekte = adb.ergänzeExportobjekteUmExportobjekt(objekt, ü_var.felder, ü_var.bez_in_zeilen, ü_var.fasseTaxonomienZusammen, ü_var.filterkriterien, export_objekte, "alt");
        // arrays für sammlungen aus synonymen zurücksetzen
        beziehungssammlungen_aus_synonymen = [];
        datensammlungen_aus_synonymen = [];
	}

	send(adb.erstelleExportString(export_objekte));
}