/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $   = require('jquery'),
    Uri = require('Uri');

var returnFunction = function (gewaehlteFelderObjekt) {
    // Alle Felder abfragen
    var queryParam,
        url,
        list,
        view,
        $exportieren_alt_exportieren_url = $('#exportieren_alt_exportieren_url'),
        $db = $.couch.db("artendb"),
        uri = new Uri($(location).attr('href')),
        baueTabelleFuerExportAuf = require('./baueTabelleFuerExportAuf');

    if ($("#exportieren_alt_synonym_infos").prop('checked')) {
        // list
        queryParam = "export_alt_mit_synonymen";
        list = 'artendb/export_alt_mit_synonymen';
        // view
        queryParam += "/alt_arten_mit_synonymen";
        view = 'alt_arten_mit_synonymen';
    } else {
        // list
        queryParam = "export_alt";
        list = 'artendb/export_alt';
        // view
        queryParam += "/alt_arten";
        view = 'alt_arten';
    }

    // include docs
    queryParam += "?include_docs=true";
    view += '?include_docs=true';

    // Beziehungen in Zeilen oder in Spalte
    if ($("#export_bez_in_zeilen").prop('checked')) {
        queryParam += "&bez_in_zeilen=true";
        view += "&bez_in_zeilen=true";
    } else {
        queryParam += "&bez_in_zeilen=false";
        view += "&bez_in_zeilen=false";
    }

    // Felder
    queryParam += "&felder=" + JSON.stringify(gewaehlteFelderObjekt);
    view += "&felder=" + JSON.stringify(gewaehlteFelderObjekt);

    // URL aus bestehender Verbindung zusammensetzen
    url = uri.protocol() + '://' + uri.host() + ':' + uri.port() + '/artendb/_design/artendb/_list/' + queryParam;

    // url anzeigen und markieren
    $exportieren_alt_exportieren_url
        .val(url);
    // ..aber erst verzögert markieren, sonst springt das Fenster
    setTimeout(function () {
        $exportieren_alt_exportieren_url
            .focus()
            .select();
    }, 2000);

    // Vorschautabelle generieren
    // limit number of data
    view += '&limit=11';
    $db.list(list, view, {
        success: function (data) {
            // alle Objekte in data window.adb.exportieren_objekte übergeben
            window.adb.exportieren_objekte = data;
            baueTabelleFuerExportAuf('_alt');
        },
        error: function () {
            console.log('übergebeFilterFürExportFürAlt: error in $db.list');
        }
    });
};

module.exports = returnFunction;