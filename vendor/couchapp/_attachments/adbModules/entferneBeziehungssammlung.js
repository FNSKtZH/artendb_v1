// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensaetze) und die Liste der zu aktualisierenden Datensätze (window.adb.zuordbareDatensaetze)
// holt sich selber den in den Feldern erfassten Namen der Beziehungssammlung

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

module.exports = function () {
    var guidArray = [],
        guidArray2 = [],
        guid,
        bsName = $("#BsName").val(),
        bsEntfernt = $.Deferred(),
        q,
        a,
        batch = 150,
        batchGroesse = 150,
        anzVorkommenVonBsEntfernt = 0,
        anzVorkommenVonBs = window.adb.zuordbareDatensaetze.length,
        rueckmeldung,
        $db = $.couch.db('artendb'),
        $importieren_bs_import_ausfuehren_hinweis = $("#importieren_bs_import_ausfuehren_hinweis"),
        $importieren_bs_import_ausfuehren_hinweis_text = $("#importieren_bs_import_ausfuehren_hinweis_text");

    // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
    $(document).bind('adb.bsEntfernt', function () {
        anzVorkommenVonBsEntfernt++;
        var prozent = Math.round((anzVorkommenVonBs - anzVorkommenVonBsEntfernt) / anzVorkommenVonBs * 100);
        $("#BsImportierenProgressbar")
            .css('width', prozent + '%')
            .attr('aria-valuenow', prozent);
        $("#BsImportierenProgressbarText")
            .html(prozent + "%");

        if (anzVorkommenVonBsEntfernt === anzVorkommenVonBs) {
            // die Indexe aktualisieren
            $db.view('artendb/lr', {
                success: function () {
                    // melden, dass Indexe aktualisiert wurden
                    $importieren_bs_import_ausfuehren_hinweis
                        .removeClass("alert-info")
                        .removeClass("alert-danger")
                        .addClass("alert-success");
                    rueckmeldung = "Die Beziehungssammlungen wurden entfernt.<br>";
                    rueckmeldung += "Die Indexe wurden aktualisiert.";
                    if (window.adb.rueckmeldungLinks) {
                        rueckmeldung += "<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                        rueckmeldung += window.adb.rueckmeldungLinks;
                        delete window.adb.rueckmeldungLinks;
                    }
                    $importieren_bs_import_ausfuehren_hinweis_text.html(rueckmeldung);
                    $('html, body').animate({
                        scrollTop: $importieren_bs_import_ausfuehren_hinweis_text.offset().top
                    }, 2000);
                },
                error: function () {
                    console.log('entferneBeziehungssammlung: keine Daten erhalten');
                }
            });
        }
    });

    // rückmelden, dass es passiert
    $importieren_bs_import_ausfuehren_hinweis
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info");
    rueckmeldung = "Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...";
    $importieren_bs_import_ausfuehren_hinweis_text
        .html(rueckmeldung);
    $('html, body').animate({
        scrollTop: $importieren_bs_import_ausfuehren_hinweis_text.offset().top
    }, 2000);

    _.each(window.adb.bsDatensaetze, function (bs_datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.BsId === "guid") {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = bs_datensatz.GUID;
        } else {
            for (q = 0; q < window.adb.zuordbareDatensaetze.length; q++) {
                // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                if (window.adb.zuordbareDatensaetze[q].Id == bs_datensatz[window.adb.BsFelderId]) {
                    // und die guid auslesen
                    guid = window.adb.zuordbareDatensaetze[q].Guid;
                    break;
                }
            }
        }
        // Einen Array der id's erstellen
        guidArray.push(guid);
    });

    // guidArray auf die eindeutigen guids reduzieren
    guidArray = _.union(guidArray);

    // alle docs gleichzeitig holen
    // aber batchweise
    for (a = 0; a < batch; a++) {
        if (a < guidArray.length) {
            guidArray2.push(guidArray[a]);
            if (a === (batch - 1)) {
                window.adb.entferneBeziehungssammlung_2(bsName, guidArray2, (a - batchGroesse));
                guidArray2 = [];
                batch += batchGroesse;
            }
        } else {
            window.adb.entferneBeziehungssammlung_2(bsName, guidArray2, (a - batchGroesse));
            bsEntfernt.resolve();
            break;
        }
        // RückmeldungsLinks in Feld anzeigen:
        $importieren_bs_import_ausfuehren_hinweis
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .css('display', 'block');
        $importieren_bs_import_ausfuehren_hinweis_text
            .html("Die Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...");
    }
    return bsEntfernt.promise();
};