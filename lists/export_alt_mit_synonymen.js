/**
 * Benutzt view alt_arten_mit_synonymen
 * produziert die API für ALT gemäss Vorgaben der EBP
 */

 function (head, req) {
    'use strict';

    start({
        "headers": {
            "Accept-Charset": "utf-8",
            "Content-Type": "json; charset=utf-8;",
            "Accept-Encoding": "gzip,deflate"
        }
    });

    var row,
        objekt,
        exportObjekte = [],
        üVar = {
            felder: [],
            bez_in_zeilen: true
        },
        filterkriterien_objekt = {"filterkriterien": []},
        felder_objekt,
        objekt_hinzufügen,
        exportObjekt,
        beziehungssammlungen_aus_synonymen,
        datensammlungen_aus_synonymen,
        ergänzeDsBsVonSynonym_return,
        _   = require("lists/lib/underscore"),
        adb = require("lists/lib/artendb_listfunctions");

    // übergebene Variablen extrahieren
    üVar = adb.holeÜbergebeneVariablen(req.query);
    // Wichtige überschreiben:
    üVar.nur_objekte_mit_eigenschaften = false;
    üVar.filterkriterien = [];
    üVar.fasseTaxonomienZusammen = true;

    // arrays für sammlungen aus synonymen gründen
    beziehungssammlungen_aus_synonymen = [];
    datensammlungen_aus_synonymen = [];

    while (row = getRow ()) {
        objekt = row.doc;

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
            exportObjekte = adb.ergänzeExportobjekteUmExportobjekt(objekt, üVar.felder, üVar.bez_in_zeilen, üVar.fasseTaxonomienZusammen, üVar.filterkriterien, exportObjekte, "alt");
            
            // arrays für sammlungen aus synonymen zurücksetzen
            beziehungssammlungen_aus_synonymen = [];
            datensammlungen_aus_synonymen = [];
        }
    }

    send(JSON.stringify(exportObjekte));
}