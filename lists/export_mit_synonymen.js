'use strict';
function(head, req) {

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

    // übergebene Variablen extrahieren
    ü_var = adb.holeÜbergebeneVariablen(req.query);

    // arrays für sammlungen aus synonymen gründen
    beziehungssammlungen_aus_synonymen = [];
    datensammlungen_aus_synonymen = [];

    while (row = getRow()) {
        objekt = row.doc;

        // Prüfen, ob Gruppen übergeben wurden ist nicht nötig, weil pro Gruppe eine list aufgerufen wird, die dann den view der Gruppe benutzt

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

            objekt_hinzufügen = adb.prüfeObObjektKriterienErfüllt(objekt, ü_var.felder, ü_var.filterkriterien, ü_var.fasseTaxonomienZusammen, ü_var.nur_objekte_mit_eigenschaften);

            if (ü_var.nur_objekte_mit_eigenschaften && objekt_hinzufügen && ü_var.filterkriterien.length === 0) {
                // der Benutzer will nur Objekte mit Informationen aus den gewählten Eigenschaften- und Beziehungssammlungen erhalten
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
}