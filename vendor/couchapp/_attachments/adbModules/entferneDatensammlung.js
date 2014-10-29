// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Datensammlung

/*jslint node: true, browser: true, nomen: true */


'use strict';

var _ = require('underscore'),
    $ = require('jquery');

var returnFunction = function ($) {
    var guid_array = [],
        guid_array_2 = [],
        guid,
        ds_entfernt = $.Deferred(),
        a,
        batch,
        batch_grösse,
        anz_vorkommen_von_ds = window.adb.ZuordbareDatensätze.length,
        anz_vorkommen_von_ds_entfernt = 0,
        rückmeldung,
        $importieren_ds_import_ausfuehren_hinweis_text = $("#importieren_ds_import_ausfuehren_hinweis_text"),
        $importieren_ds_import_ausfuehren_hinweis = $("#importieren_ds_import_ausfuehren_hinweis");

    // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
    $(document).bind('adb.ds_entfernt', function () {
        anz_vorkommen_von_ds_entfernt++;
        var prozent = Math.round((anz_vorkommen_von_ds - anz_vorkommen_von_ds_entfernt) / anz_vorkommen_von_ds * 100),
            $db = $.couch.db("artendb");
        $("#DsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#DsImportierenProgressbarText")
            .html(prozent + "%");
        $importieren_ds_import_ausfuehren_hinweis
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info");
        rückmeldung = "Eigenschaftensammlungen werden entfernt...<br>Die Indexe werden neu aufgebaut...";
        $importieren_ds_import_ausfuehren_hinweis_text
            .html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_ds_import_ausfuehren_hinweis_text.offset().top
        }, 2000);
        if (anz_vorkommen_von_ds_entfernt === anz_vorkommen_von_ds) {
            // die Indexe aktualisieren
            $db.view('artendb/lr', {
                success: function () {
                    // melden, dass Indexe aktualisiert wurden
                    $importieren_ds_import_ausfuehren_hinweis
                        .removeClass("alert-info")
                        .removeClass("alert-danger")
                        .addClass("alert-success");
                    rückmeldung = "Die Eigenschaftensammlungen wurden entfernt.<br>";
                    rückmeldung += "Die Indexe wurden aktualisiert.";
                    if (window.adb.rückmeldung_links) {
                        rückmeldung += "<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                        rückmeldung += window.adb.rückmeldung_links;
                        delete window.adb.rückmeldung_links;
                    }
                    $importieren_ds_import_ausfuehren_hinweis_text
                        .html(rückmeldung);
                    $('html, body').animate({
                        scrollTop: $importieren_ds_import_ausfuehren_hinweis_text.offset().top
                    }, 2000);
                }
            });
        }
    });

    _.each(window.adb.dsDatensätze, function (datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.DsId === "guid") {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = datensatz.GUID;
        } else {
            // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
            // und die guid auslesen
            guid = _.find(window.adb.ZuordbareDatensätze, function (datensatz) {
                return datensatz.Id == datensatz[window.adb.DsFelderId];
            }).Guid;
        }
        // Einen Array der id's erstellen
        guid_array.push(guid);
    });
    // alle docs gleichzeitig holen
    // aber batchweise
    batch = 150;
    batch_grösse = 150;
    for (a=0; a<batch; a++) {
        if (a < guid_array.length) {
            guid_array_2.push(guid_array[a]);
            if (a === (batch-1)) {
                window.adb.entferneDatensammlung_2($("#DsName").val(), guid_array_2, (a - batch_grösse));
                guid_array_2 = [];
                batch += batch_grösse;
            }
        } else {
            window.adb.entferneDatensammlung_2($("#DsName").val(), guid_array_2, (a - batch_grösse));
            break;
        }
    }
    return ds_entfernt.promise();
};

module.exports = returnFunction;