function (head, req) {
    'use strict';

    start({
        "headers": {
            "Accept-Charset": "utf-8",
            "Content-Type": "json; charset=utf-8;"
        }
    });

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

    // übergebene Variablen extrahieren
    ü_var = adb.holeÜbergebeneVariablen(req.query);

    while (row = getRow()) {
        objekt = row.doc;

        // Prüfen, ob Gruppen übergeben wurden: ist nicht nötig, weil pro Gruppe eine list aufgerufen wird, die dann den view der Gruppe benutzt

        // prüfen, ob die Kriterien erfüllt sind
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
    }
    send(JSON.stringify(export_objekte));
}