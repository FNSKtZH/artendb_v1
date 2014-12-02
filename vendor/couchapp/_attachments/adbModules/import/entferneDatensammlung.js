// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensaetze) und die Liste der zu aktualisierenden Datensätze (window.adb.zuordbareDatensaetze)
// holt sich selber den in den Feldern erfassten Namen der Datensammlung

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                       = require('underscore'),
    $                       = require('jquery'),
    entferneDatensammlung_2 = require('./entferneDatensammlung_2');

module.exports = function () {
    var guidArray                                 = [],
        guidArray2                                = [],
        guid,
        dsEntfernt                                = $.Deferred(),
        a,
        batch,
        batchGroesse,
        anzVorkommenVonDs                         = window.adb.zuordbareDatensaetze.length,
        anzVorkommenVonDsEntfernt                 = 0,
        rueckmeldung,
        $importDsImportAusfuehrenHinweisText = $('#importDsImportAusfuehrenHinweisText'),
        $importDsImportAusfuehrenHinweis     = $('#importDsImportAusfuehrenHinweis');

    // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
    $(document).bind('adb.dsEntfernt', function () {
        anzVorkommenVonDsEntfernt++;
        var prozent = Math.round((anzVorkommenVonDs - anzVorkommenVonDsEntfernt) / anzVorkommenVonDs * 100),
            $db     = $.couch.db('artendb');

        $('#dsImportProgressbar')
            .css('width', prozent + '%')
            .attr('aria-valuenow', prozent);
        $('#dsImportProgressbarText')
            .html(prozent + '%');
        $importDsImportAusfuehrenHinweis
            .removeClass('alert-success')
            .removeClass('alert-danger')
            .addClass('alert-info');
        rueckmeldung = 'Eigenschaftensammlungen werden entfernt...<br>Die Indexe werden neu aufgebaut...';
        $importDsImportAusfuehrenHinweisText
            .html(rueckmeldung);
        $('html, body').animate({
            scrollTop: $importDsImportAusfuehrenHinweisText.offset().top
        }, 2000);
        if (anzVorkommenVonDsEntfernt === anzVorkommenVonDs) {
            // die Indexe aktualisieren
            $db.view('artendb/lr', {
                success: function () {
                    // melden, dass Indexe aktualisiert wurden
                    $importDsImportAusfuehrenHinweis
                        .removeClass('alert-info')
                        .removeClass('alert-danger')
                        .addClass('alert-success');
                    rueckmeldung  = 'Die Eigenschaftensammlungen wurden entfernt.<br>';
                    rueckmeldung += 'Die Indexe wurden aktualisiert.';
                    if (window.adb.rueckmeldungLinks) {
                        rueckmeldung += '<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>';
                        rueckmeldung += window.adb.rueckmeldungLinks;
                        delete window.adb.rueckmeldungLinks;
                    }
                    $importDsImportAusfuehrenHinweisText
                        .html(rueckmeldung);
                    $('html, body').animate({
                        scrollTop: $importDsImportAusfuehrenHinweisText.offset().top
                    }, 2000);
                }
            });
        }
    });

    _.each(window.adb.dsDatensaetze, function (datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.dsId === 'guid') {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = datensatz.GUID;
        } else {
            // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
            // und die guid auslesen
            guid = _.find(window.adb.zuordbareDatensaetze, function (datensatz) {
                return datensatz.Id == datensatz[window.adb.DsFelderId];
            }).Guid;
        }
        // Einen Array der id's erstellen
        guidArray.push(guid);
    });
    // alle docs gleichzeitig holen
    // aber batchweise
    batch        = 150;
    batchGroesse = 150;
    for (a = 0; a < batch; a++) {
        if (a < guidArray.length) {
            guidArray2.push(guidArray[a]);
            if (a === (batch - 1)) {
                entferneDatensammlung_2($('#dsName').val(), guidArray2, (a - batchGroesse));
                guidArray2 = [];
                batch     += batchGroesse;
            }
        } else {
            entferneDatensammlung_2($('#dsName').val(), guidArray2, (a - batchGroesse));
            break;
        }
    }
    return dsEntfernt.promise();
};