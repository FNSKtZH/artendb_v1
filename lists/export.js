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
        ueVar = {
            fasseTaxonomienZusammen: false,
            filterkriterien: [],
            felder: [],
            nurObjekteMitEigenschaften: true,
            bezInZeilen: true
        },
        exportObjekte = [],
        objektHinzufuegen,
        beurteileObInformationenEnthaltenSind = require('lists/lib/beurteileObInformationenEnthaltenSind'),
        pruefeObObjektKriterienErfuellt       = require('lists/lib/pruefeObObjektKriterienErfuellt'),
        holeUebergebeneVariablen              = require('lists/lib/holeUebergebeneVariablen'),
        ergaenzeExportobjekteUmExportobjekt   = require('lists/lib/ergaenzeExportobjekteUmExportobjekt');

    // übergebene Variablen extrahieren
    ueVar = holeUebergebeneVariablen(req.query);

    while (row = getRow()) {
        objekt = row.doc;

        // Prüfen, ob Gruppen übergeben wurden: ist nicht nötig, weil pro Gruppe eine list aufgerufen wird, die dann den view der Gruppe benutzt

        // prüfen, ob die Kriterien erfüllt sind
        objektHinzufuegen = pruefeObObjektKriterienErfuellt(objekt, ueVar.felder, ueVar.filterkriterien, ueVar.fasseTaxonomienZusammen, ueVar.nurObjekteMitEigenschaften);

        if (ueVar.nurObjekteMitEigenschaften && objektHinzufuegen && ueVar.filterkriterien.length === 0) {
            // der Benutzer will nur Objekte mit Informationen aus den gewählten Eigenschaften- und Beziehungssammlungen erhalten
            // also müssen wir bei hinzuzufügenden Objekten durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
            // wenn ja und Feld aus DS/BS: objektHinzufuegen = true
            // wenn ein Filter gesetzt wurde, wird eh nur angezeigt, wo daten sind - also ignorieren
            objektHinzufuegen = beurteileObInformationenEnthaltenSind(objekt, ueVar.felder);
        }

        if (objektHinzufuegen) {
            // alle Kriterien sind erfüllt
            // jetzt das Exportobjekt aufbauen
            exportObjekte = ergaenzeExportobjekteUmExportobjekt(objekt, ueVar.felder, ueVar.bezInZeilen, ueVar.fasseTaxonomienZusammen, ueVar.filterkriterien, exportObjekte, null);
        }
    }
    send(JSON.stringify(exportObjekte));
}