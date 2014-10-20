/**
 * Benutzt view evab_arten
 * produziert die API für ALT gemäss Vorgaben der EBP
 */

'use strict';

function(head, req) {

    var row,
        Objekt,
        exportObjekte = [],
        exportObjekt,
        dsTaxonomie = {},
        floraStatusCodiert,
        _ = require("lists/lib/underscore"),
        _a = require("lists/lib/artendb_listfunctions");

    // specify that we're providing a JSON response
    provides('json', function() {

        while (row = getRow()) {
            Objekt = row.doc;

            // exportobjekt gründen bzw. zurücksetzen
            exportObjekt = {};

            // dsTaxonomie bereitstellen
            if (Objekt.Taxonomie && Objekt.Taxonomie.Eigenschaften) {
                dsTaxonomie = Objekt.Taxonomie.Eigenschaften;
            }

            // bei allen Gruppen gleiche Eigenschaften setzen
            exportObjekt.idArt = "{" + Objekt._id + "}";
            if (dsTaxonomie["Taxonomie ID"]) {
                exportObjekt.nummer = dsTaxonomie["Taxonomie ID"];
            }
            if (dsTaxonomie.Artname) {
                exportObjekt.wissenschArtname = dsTaxonomie.Artname.substring(0, 255);    // klasse darf max. 255 Zeichen lang sein
            }
            // Name Deutsch existiert bei Moosen nicht, das macht aber nichts
            if (dsTaxonomie["Name Deutsch"]) {
                exportObjekt.deutscherArtname = dsTaxonomie["Name Deutsch"].substring(0, 255);    // klasse darf max. 255 Zeichen lang sein
            }

            // gruppen-abhängige Eigenschaften setzen
            switch(Objekt.Gruppe) {

            case "Fauna":
                // Status ist bei Fauna immer A
                exportObjekt.status = "A";

                // Datensammlung "ZH GIS" holen
                var ds_zh_gis = _.find(Objekt.Eigenschaftensammlungen, function(ds) {
                    return ds.Name === "ZH GIS";
                }) || {};
                
                if (ds_zh_gis && ds_zh_gis.Eigenschaften && ds_zh_gis.Eigenschaften["GIS-Layer"]) {
                    exportObjekt.klasse = ds_zh_gis.Eigenschaften["GIS-Layer"].substring(0, 50);    // klasse darf max. 50 Zeichen lang sein
                }
                break;

            case "Flora":
                // Felder aktualisieren, wo Daten vorhanden
                if (dsTaxonomie.Status) {
                    // Status codieren
                    floraStatusCodiert = _a.codiereFloraStatus(dsTaxonomie.Status);
                    exportObjekt.status = floraStatusCodiert;
                }
                // GIS-Layer ist bei Flora immer Flora
                exportObjekt.klasse = "Flora";
                break;

            case "Moose":
                // Status ist bei Moose immer A
                exportObjekt.status = "A";
                // GIS-Layer ist bei Moose immer Moose
                exportObjekt.klasse = "Moose";
                break;

            default:
                // zum nächsten row
                continue;
            }
            
            // Objekt zu Exportobjekten hinzufügen
            exportObjekte.push(exportObjekt);
        }

        send(JSON.stringify(exportObjekte));
    });
}