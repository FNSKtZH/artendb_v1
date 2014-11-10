// prüft die URL. wenn eine id übergeben wurde, wird das entprechende Objekt angezeigt

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $   = require('jquery'),
    Uri = require('Uri');

var returnFunction = function () {
    // parameter der uri holen
    var uri                            = new Uri($(location).attr('href')),
        id                             = uri.getQueryParamValue('id'),
        exportieren                    = uri.getQueryParamValue('exportieren'),
        exportieren_fuer_alt           = uri.getQueryParamValue('exportieren_fuer_artenlistentool'),
        importieren_datensammlung      = uri.getQueryParamValue('importieren_datensammlung'),
        importieren_beziehungssammlung = uri.getQueryParamValue('importieren_beziehungssammlung'),
        // wenn browser history nicht unterstützt, erstellt history.js eine hash
        // dann muss die id durch die id in der hash ersetzt werden
        hash                           = uri.anchor(),
        uri2,
        $db                            = $.couch.db('artendb'),
        zeigeFormular                  = require('./adbModules/zeigeFormular'),
        erstelleListeFuerFeldwahl      = require('./adbModules/export/erstelleListeFuerFeldwahl'),
        oeffneBaumZuId                 = require('./adbModules/jstree/oeffneBaumZuId');

    if (hash) {
        uri2 = new Uri(hash);
        id = uri2.getQueryParamValue('id');
    }

    // Menu ist ausgeblendet
    // Grund: exportierren_fuer_artenlistentool
    // Menu einblenden, wenn exportierren_fuer_artenlistentool nicht aufgerufen wird
    if (!exportieren_fuer_alt) {
        $('.menu').show();
    }

    // wenn ein Objekt geöffnet wird
    if (id) {
        // Gruppe ermitteln
        $db.openDoc(id, {
            success: function (objekt) {
                var erstelleBaum = require('./adbModules/jstree/erstelleBaum');
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
    if (exportieren_fuer_alt) {
        // wurde auch später ausgelöst, daher nur, wenn noch nicht sichtbar
        if (!$('#export_alt').is(':visible')) {
            zeigeFormular('export_alt');
            window.adb.fasseTaxonomienZusammen = true;  // bewirkt, dass alle Taxonomiefelder gemeinsam angeboten werden
            erstelleListeFuerFeldwahl(['Fauna', 'Flora'], 'export_alt');
        }
    }
    if (importieren_datensammlung) {
        zeigeFormular('importieren_ds');
    }
    if (importieren_beziehungssammlung) {
        zeigeFormular('importieren_bs');
    }

    // dafür sorgen, dass die passenden Menus angezeigt werden
    window.adb.blendeMenus();
};

module.exports = returnFunction;