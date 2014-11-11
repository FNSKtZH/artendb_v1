// prüft die URL. wenn eine id übergeben wurde, wird das entprechende Objekt angezeigt

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $   = require('jquery'),
    Uri = require('Uri');

module.exports = function () {
    // parameter der uri holen
    var uri                           = new Uri($(location).attr('href')),
        id                            = uri.getQueryParamValue('id'),
        exportieren                   = uri.getQueryParamValue('exportieren'),
        exportierenFuerAlt            = uri.getQueryParamValue('exportieren_fuer_artenlistentool'),
        importierenDatensammlung      = uri.getQueryParamValue('importieren_datensammlung'),
        importierenBeziehungssammlung = uri.getQueryParamValue('importieren_beziehungssammlung'),
        // wenn browser history nicht unterstützt, erstellt history.js eine hash
        // dann muss die id durch die id in der hash ersetzt werden
        hash                          = uri.anchor(),
        uri2,
        $db                           = $.couch.db('artendb'),
        zeigeFormular                 = require('./zeigeFormular'),
        erstelleListeFuerFeldwahl     = require('./export/erstelleListeFuerFeldwahl'),
        oeffneBaumZuId                = require('./jstree/oeffneBaumZuId'),
        erstelleBaum                  = require('./jstree/erstelleBaum'),
        blendeMenus                   = require('./login/blendeMenus');

    if (hash) {
        uri2 = new Uri(hash);
        id = uri2.getQueryParamValue('id');
    }

    // Menu ist ausgeblendet
    // Grund: exportierren_fuer_artenlistentool
    // Menu einblenden, wenn exportierren_fuer_artenlistentool nicht aufgerufen wird
    if (!exportierenFuerAlt) {
        $('.menu').show();
    }

    // wenn ein Objekt geöffnet wird
    if (id) {
        // Gruppe ermitteln
        $db.openDoc(id, {
            success: function (objekt) {
                // window.adb.Gruppe setzen. Nötig, um im Menu die richtigen Felder einzublenden
                window.adb.Gruppe = objekt.Gruppe;
                $(".baum.jstree").jstree("deselect_all");
                // den richtigen Button aktivieren
                $('[gruppe="' + objekt.Gruppe + '"]').button('toggle');
                $("#Gruppe_label").html("Gruppe:");
                // tree aufbauen, danach Datensatz initiieren
                $.when(erstelleBaum()).then(function () {
                    oeffneBaumZuId(id);
                });
            }
        });
    }

    // andere Seite mit eigener URL:
    if (exportieren) {
        zeigeFormular('export');
    }
    if (exportierenFuerAlt) {
        // wurde auch später ausgelöst, daher nur, wenn noch nicht sichtbar
        if (!$('#export_alt').is(':visible')) {
            zeigeFormular('export_alt');
            window.adb.fasseTaxonomienZusammen = true;  // bewirkt, dass alle Taxonomiefelder gemeinsam angeboten werden
            erstelleListeFuerFeldwahl(['Fauna', 'Flora'], 'export_alt');
        }
    }
    if (importierenDatensammlung) {
        zeigeFormular('importieren_ds');
    }
    if (importierenBeziehungssammlung) {
        zeigeFormular('importieren_bs');
    }

    // dafür sorgen, dass die passenden Menus angezeigt werden
    blendeMenus();
};