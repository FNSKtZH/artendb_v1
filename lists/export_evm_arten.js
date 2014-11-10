function (head, req) {
    'use strict';

    start({
        "headers": {
            "Content-Type": "json; charset=utf-8;",
            "Content-disposition": "attachment;filename=Arten.json",
            "Accept-Charset": "utf-8"
        }
    });

    var row,
        doc,
        export_json = {},
        art,
        eigenschaftensammlung_zh_gis,
        beziehungssammlung_offizielle_art,
        beziehungssammlung_akzeptierte_referenz,
        _ = require ("lists/lib/underscore"),
        k;

    export_json.docs = [];

    while (row = getRow()) {
        doc = row.doc;
        art = {};
        art._id = doc._id;
        art.Typ = "Arteigenschaft";

        eigenschaftensammlung_zh_gis = _.find(doc.Eigenschaftensammlungen, function (eigenschaftensammlung) {
            return eigenschaftensammlung.Name === "ZH GIS";
        });
        if (eigenschaftensammlung_zh_gis) {
            art.ArtGruppe = eigenschaftensammlung_zh_gis.Eigenschaften["GIS-Layer"].replace('ae', 'ä').replace('oe', 'ö').replace('ue', 'ü');
        }

        art["Taxonomie ID"] = doc.Taxonomie.Eigenschaften["Taxonomie ID"];
        art.Artname = doc.Taxonomie.Eigenschaften["Artname vollständig"];

        // Hinweis Verwandschaft
        if (doc.Gruppe === "Flora" && doc.Beziehungssammlungen) {
            beziehungssammlung_offizielle_art = _.find(doc.Beziehungssammlungen, function (beziehungssammlung) {
                return beziehungssammlung.Name === "SISF Index 2 (2005): offizielle Art";
            });
            if (beziehungssammlung_offizielle_art) {
                if (beziehungssammlung_offizielle_art.Beziehungen && beziehungssammlung_offizielle_art.Beziehungen[0] && beziehungssammlung_offizielle_art.Beziehungen[0].Beziehungspartner && beziehungssammlung_offizielle_art.Beziehungen[0].Beziehungspartner[0] && beziehungssammlung_offizielle_art.Beziehungen[0].Beziehungspartner[0].Name) {
                    art.HinweisVerwandschaft = "Achtung: Synonym von " + beziehungssammlung_offizielle_art.Beziehungen[0].Beziehungspartner[0].Name;
                }
            }
        }
        if (doc.Gruppe === "Moose") {
            beziehungssammlung_akzeptierte_referenz = _.find(doc.Beziehungssammlungen, function (beziehungssammlung) {
                return beziehungssammlung.Name === "NISM (2010): akzeptierte Referenz";
            });
            if (beziehungssammlung_akzeptierte_referenz) {
                if (beziehungssammlung_akzeptierte_referenz.Beziehungen && beziehungssammlung_akzeptierte_referenz.Beziehungen[0] && beziehungssammlung_akzeptierte_referenz.Beziehungen[0].Beziehungspartner && beziehungssammlung_akzeptierte_referenz.Beziehungen[0].Beziehungspartner[0] && beziehungssammlung_akzeptierte_referenz.Beziehungen[0].Beziehungspartner[0].Name) {
                    art.HinweisVerwandschaft = "Achtung: Synonym von " + beziehungssammlung_akzeptierte_referenz.Beziehungen[0].Beziehungspartner[0].Name;
                }
            }
        }
        if (doc.Gruppe === "Macromycetes") {
            // bei Pilzen fehlt momentan in arteigenschaften.ch der GIS-Layer
            art.ArtGruppe = "Pilze";
        }
        export_json.docs.push(art);
    }
    send(JSON.stringify(export_json));
}