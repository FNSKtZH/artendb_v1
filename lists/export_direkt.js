function (head, req) {
    'use strict';

    var row,
        objekt,
        exportObjekte = [],
        ueVar = {
            fasseTaxonomienZusammen: false,
            filterkriterien: [],
            felder: [],
            nur_objekte_mit_eigenschaften: true,
            bez_in_zeilen: true
        },
        objektHinzufuegen,
        erstelleExportString                  = require('lists/lib/erstelleExportString'),
        createBlobDataXlsx                    = require('lists/lib/createBlobDataXlsx'),
        beurteileObInformationenEnthaltenSind = require('lists/lib/beurteileObInformationenEnthaltenSind'),
        pruefeObObjektKriterienErfuellt       = require('lists/lib/pruefeObObjektKriterienErfuellt'),
        holeUebergebeneVariablen              = require('lists/lib/holeUebergebeneVariablen'),
        ergaenzeExportobjekteUmExportobjekt   = require('lists/lib/ergaenzeExportobjekteUmExportobjekt');

    start({
        "headers": {
            "Content-Type": "text/csv; charset=utf-8;",
            "Content-disposition": "attachment;filename=arteigenschaften.csv",
            "Accept-Charset": "utf-8"
        }
    });

    // übergebene Variablen extrahieren
    ueVar = holeUebergebeneVariablen(req.query);

    /* Versuch, xlsx zum Laufen zu bringen
    if (ueVar.format === 'csv') {
        start({
            "headers": {
                "Content-Type": "text/csv; charset=utf-8;",
                "Content-disposition": "attachment;filename=arteigenschaften.csv",
                "Accept-Charset": "utf-8"
            }
        });
    } else {
        start({
            "headers": {
                "Content-Type": "application/octet-stream; charset=utf-8;",
                "Content-disposition": "attachment;filename=arteigenschaften.xlsx",
                "Accept-Charset": "utf-8"
            }
        });
    }*/

    while (row = getRow()) {
        objekt = row.doc;
        objektHinzufuegen = false;

        // Prüfen, ob Gruppen übergeben wurden
        if (ueVar.gruppen && ueVar.gruppen.length > 0) {
            // ja: Prüfen, ob das Dokument einer der Gruppen angehört / nein: weiter
            if (ueVar.gruppen.indexOf(objekt.Gruppe) === -1) {
                // diese Gruppe wollen wir nicht > weiter mit nächstem objekt
                continue;
            }
        }

        // sicherstellen, dass DS und BS existieren
        //objekt.Eigenschaftensammlungen = objekt.Eigenschaftensammlungen || [];
        //objekt.Beziehungssammlungen = objekt.Beziehungssammlungen || [];

        objektHinzufuegen = pruefeObObjektKriterienErfuellt(objekt, ueVar.felder, ueVar.filterkriterien, ueVar.fasseTaxonomienZusammen, ueVar.nur_objekte_mit_eigenschaften);

        if (ueVar.nur_objekte_mit_eigenschaften && objektHinzufuegen && ueVar.filterkriterien.length === 0) {
            // der Benutzer will nur Objekte mit Informationen aus den gewählten Eigenschaften- und Beziehungssammlungen erhalten
            // also müssen wir bei hinzuzufügenden Objekten durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
            // wenn ja und Feld aus DS/BS: objektHinzufuegen = true
            // wenn ein Filter gesetzt wurde, wird eh nur angezeigt, wo daten sind - also ignorieren
            objektHinzufuegen = beurteileObInformationenEnthaltenSind(objekt, ueVar.felder, ueVar.filterkriterien);
        }

        if (objektHinzufuegen) {
            // alle Kriterien sind erfüllt
            // jetzt das Exportobjekt aufbauen
            exportObjekte = ergaenzeExportobjekteUmExportobjekt(objekt, ueVar.felder, ueVar.bez_in_zeilen, ueVar.fasseTaxonomienZusammen, ueVar.filterkriterien, exportObjekte, null);
        }
    }

    send(erstelleExportString(exportObjekte));

    /*if (ueVar.format === 'csv') {
        send(erstelleExportString(exportObjekte));
    } else {
        send(createBlobDataXlsx(exportObjekte));
    }*/
}