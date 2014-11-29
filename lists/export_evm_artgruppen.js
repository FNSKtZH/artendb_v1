function (head, req) {
    'use strict';

    start({
        'headers': {
            'Content-Type':        'json; charset=utf-8',
            'Content-disposition': 'attachment;filename=artgruppen.json',
            'Accept-Charset':      'utf-8'
        }
    });

    var _           = require('lists/lib/underscore'),
        row,
        doc,
        exportJson  = {},
        artgruppe,
        idVorlage   = '00005A48-816B-4A30-842F-3B1A5DAAA000',
        unbekannt   = {'Typ': 'ArtGruppe', 'ArtGruppe': 'Unbekannt', '_id' : '00005A48-816B-4A30-842F-3B1unbekannt', 'AnzArten': 1};

    exportJson.docs = [];

    while (row = getRow()) {
        doc                 = row.doc;
        artgruppe           = {};
        artgruppe.Typ       = 'ArtGruppe';
        artgruppe.ArtGruppe = row.key.replace('ue', 'ü').replace('ae', 'ä').replace('oe', 'ö');
        // id zusammensetzen aus der GUID der idVorlage und dem Namen der artgruppe
        artgruppe._id       = idVorlage.substring(0, idVorlage.length - artgruppe.ArtGruppe.length) + artgruppe.ArtGruppe;
        artgruppe.AnzArten  = row.value;

        exportJson.docs.push(artgruppe);
    }
    // jetzt noch die Artgruppe unbekannt anfügen
    exportJson.docs.push(unbekannt);
    // sortieren, damit unbekannt ans richtige Ort kommt
    exportJson.docs = _.sortBy(exportJson.docs, function (ag) {
        return ag.ArtGruppe;
    });

    // Daten schicken
    send(JSON.stringify(exportJson));
}