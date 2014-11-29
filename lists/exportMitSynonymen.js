function (head, req) {
    'use strict';
    
    start({
        'headers': {
            'Accept-Charset': 'utf-8',
            'Content-Type':   'json; charset=utf-8;'
        }
    });

    var beurteileObInformationenEnthaltenSind     = require('lists/lib/beurteileObInformationenEnthaltenSind'),
        pruefeObObjektKriterienErfuellt           = require('lists/lib/pruefeObObjektKriterienErfuellt'),
        ergaenzeObjektUmInformationenVonSynonymen = require('lists/lib/ergaenzeObjektUmInformationenVonSynonymen'),
        holeUebergebeneVariablen                  = require('lists/lib/holeUebergebeneVariablen'),
        ergaenzeDsBsVonSynonym                    = require('lists/lib/ergaenzeDsBsVonSynonym'),
        ergaenzeExportobjekteUmExportobjekt       = require('lists/lib/ergaenzeExportobjekteUmExportobjekt'),
        row,
        objekt,
        exportObjekte = [],
        ueVar = {
            fasseTaxonomienZusammen:    false,
            filterkriterien:            [],
            felder:                     [],
            nurObjekteMitEigenschaften: true,
            bezInZeilen:                true
        },
        objektHinzufuegen,
        beziehungssammlungenAusSynonymen,
        datensammlungenAusSynonymen,
        ergänzeDsBsVonSynonymReturn;

    // übergebene Variablen extrahieren
    ueVar = holeUebergebeneVariablen(req.query);

    // arrays für sammlungen aus synonymen gründen
    beziehungssammlungenAusSynonymen = [];
    datensammlungenAusSynonymen      = [];

    while (row = getRow()) {
        objekt = row.doc;

        // Prüfen, ob Gruppen übergeben wurden ist nicht nötig, weil pro Gruppe eine list aufgerufen wird, die dann den view der Gruppe benutzt

        if (row.key[1] === 0) {
            // das ist ein Synonym
            // wir erstellen je eine Liste aller in Synonymen enthaltenen Eigenschaften- und Beziehungssammlungen inkl. der darin enthaltenen Daten
            // nämlich: datensammlungenAusSynonymen und beziehungssammlungenAusSynonymen
            // später können diese, wenn nicht im Originalobjekt enthalten, angefügt werden
            ergänzeDsBsVonSynonymReturn      = ergaenzeDsBsVonSynonym(objekt, datensammlungenAusSynonymen, beziehungssammlungenAusSynonymen);
            datensammlungenAusSynonymen      = ergänzeDsBsVonSynonymReturn[0];
            beziehungssammlungenAusSynonymen = ergänzeDsBsVonSynonymReturn[1];
        } else if (row.key[1] === 1) {
            // wir sind jetzt im Originalobjekt

            // sicherstellen, dass DS und BS existieren
            objekt.Eigenschaftensammlungen = objekt.Eigenschaftensammlungen || [];
            objekt.Beziehungssammlungen    = objekt.Beziehungssammlungen    || [];

            // allfällige DS und BS aus Synonymen anhängen
            objekt = ergaenzeObjektUmInformationenVonSynonymen(objekt, datensammlungenAusSynonymen, beziehungssammlungenAusSynonymen);

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

            // arrays für sammlungen aus synonymen zurücksetzen
            beziehungssammlungenAusSynonymen = [];
            datensammlungenAusSynonymen      = [];
        }
    }

    send(JSON.stringify(exportObjekte));
}