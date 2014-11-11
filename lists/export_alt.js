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
        exportObjekt,
        holeUebergebeneVariablen            = require('lists/lib/holeUebergebeneVariablen'),
        ergaenzeExportobjekteUmExportobjekt = require('lists/lib/ergaenzeExportobjekteUmExportobjekt');

    // übergebene Variablen extrahieren
    üVar = holeUebergebeneVariablen(req.query);
    // Wichtige überschreiben:
    üVar.nur_objekte_mit_eigenschaften = false;
    üVar.filterkriterien = [];
    üVar.fasseTaxonomienZusammen = true;

    while (row = getRow ()) {
        objekt = row.doc;

        // für das alt sollen alle Daten aus den gewünschten Artgruppen gewählt werden, also keinen Filter übernehmen

        // Exportobjekte um das Objekt ergänzen
        // der letzte Parameter "alt" teilt mit, dass der Export für das Artenlistentool erstellt wird und die Pflichtfelder benötigt
        exportObjekte = ergaenzeExportobjekteUmExportobjekt(objekt, üVar.felder, üVar.bez_in_zeilen, üVar.fasseTaxonomienZusammen, üVar.filterkriterien, exportObjekte, "alt");
    }

    send(JSON.stringify(exportObjekte));
}