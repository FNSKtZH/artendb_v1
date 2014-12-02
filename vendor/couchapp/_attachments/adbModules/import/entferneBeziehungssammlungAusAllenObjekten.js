// übernimmt den Namen einer Beziehungssammlung
// öffnet alle Dokumente, die diese Beziehungssammlung enthalten und löscht die Beziehungssammlung

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                     = require('jquery'),
    _                                     = require('underscore'),
    entferneBeziehungssammlungAusDokument = require('./entferneBeziehungssammlungAusDokument');

module.exports = function (bsName) {
    var bsEntfernt                             = $.Deferred(),
        anzVorkommenVonBsEntfernt              = 0,
        anzVorkommenVonBs,
        $importBsDsBeschreibenHinweis     = $('#importBsDsBeschreibenHinweis'),
        $importBsDsBeschreibenHinweisText = $('#importBsDsBeschreibenHinweisText'),
        $db                                    = $.couch.db('artendb'),
        rueckmeldung;

    $db.view('artendb/bs_guid?startkey=["' + bsName + '"]&endkey=["' + bsName + '",{}]', {
        success: function (data) {
            anzVorkommenVonBs = data.rows.length;
            // listener einrichten, der meldet, wenn ein Datensatz entfernt wurde
            $(document).bind('adb.bsEntfernt', function () {
                anzVorkommenVonBsEntfernt++;
                $importBsDsBeschreibenHinweis
                    .removeClass('alert-success')
                    .removeClass('alert-danger')
                    .addClass('alert-info');
                rueckmeldung = 'Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...';
                $importBsDsBeschreibenHinweisText.html(rueckmeldung);
                $('html, body').animate({
                    scrollTop: $importBsDsBeschreibenHinweisText.offset().top
                }, 2000);
                if (anzVorkommenVonBsEntfernt === anzVorkommenVonBs) {
                    // die Indexe aktualisieren
                    $db.view('artendb/lr', {
                        success: function () {
                            // melden, dass Indexe aktualisiert wurden
                            $importBsDsBeschreibenHinweis
                                .removeClass('alert-info')
                                .removeClass('alert-danger')
                                .addClass('alert-success');
                            rueckmeldung  = 'Die Beziehungssammlungen wurden entfernt.<br>';
                            rueckmeldung += 'Die Indexe wurden aktualisiert.';
                            $importBsDsBeschreibenHinweisText.html(rueckmeldung);
                            $('html, body').animate({
                                scrollTop: $importBsDsBeschreibenHinweisText.offset().top
                            }, 2000);
                        }
                    });
                }
            });

            _.each(data.rows, function (dataRow) {
                // guid und DsName übergeben
                entferneBeziehungssammlungAusDokument(dataRow.key[1], bsName);
            });
            bsEntfernt.resolve();
        }
    });
    return bsEntfernt.promise();
};