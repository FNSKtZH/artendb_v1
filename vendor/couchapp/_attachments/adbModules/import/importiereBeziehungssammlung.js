// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensaetze) und die Liste der zu aktualisierenden Datensätze (window.adb.zuordbareDatensaetze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                                     = require('underscore'),
    $                                     = require('jquery'),
    fuegeBeziehungenZuObjekt              = require('./fuegeBeziehungenZuObjekt'),
    bereiteBeziehungspartnerFuerImportVor = require('./bereiteBeziehungspartnerFuerImportVor');

// $ wird benötigt wegen .alert
module.exports = function () {
    var anzahlFelder,
        anzahlBeziehungssammlungen,
        anzBsImportiert                      = 0,
        erste10Ids,
        nr,
        rueckmeldung,
        rueckmeldungLinks                    = '',
        bsImportiert                         = $.Deferred(),
        $bsName                              = $('#bsName'),
        $bsBeschreibung                      = $('#bsBeschreibung'),
        $bsDatenstand                        = $('#bsDatenstand'),
        $bsNutzungsbedingungen               = $('#bsNutzungsbedingungen'),
        $bsLink                              = $('#bsLink'),
        $bsUrsprungsBs                       = $('#bsUrsprungsBs'),
        $importBsImportAusfuehrenHinweis     = $('#importBsImportAusfuehrenHinweis'),
        $importBsImportAusfuehrenHinweisText = $('#importBsImportAusfuehrenHinweisText');

    // prüfen, ob ein BsName erfasst wurde. Wenn nicht: melden
    if (!$bsName.val()) {
        $('#meldungIndividuellLabel').html('Namen fehlt');
        $('#meldungIndividuellText').html('Bitte geben Sie der Beziehungssammlung einen Namen');
        $('#meldungIndividuellSchliessen').html('schliessen');
        $('#meldungIndividuell').modal();
        $bsName.focus();
        return false;
    }

    anzahlBeziehungssammlungen = window.adb.bsDatensaetze ? window.adb.bsDatensaetze.length : 0;

    // Rückmeldung in Feld anzeigen:
    rueckmeldung = 'Die Daten werden importiert...';
    $importBsImportAusfuehrenHinweisText.html(rueckmeldung);
    $importBsImportAusfuehrenHinweis
        .removeClass('alert-success')
        .removeClass('alert-danger')
        .addClass('alert-info');
    $importBsImportAusfuehrenHinweis.alert().show();
    $('html, body').animate({
        scrollTop: $importBsImportAusfuehrenHinweis.offset().top
    }, 2000);

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.bsHinzugefuegt', function () {
        anzBsImportiert++;
        var prozent = Math.round(anzBsImportiert / anzahlBeziehungssammlungen * 100),
            $db     = $.couch.db('artendb');

        $('#bsImportProgressbar')
            .css('width', prozent + '%')
            .attr('aria-valuenow', prozent);
        $('#bsImportProgressbarText').html(prozent + '%');
        $importBsImportAusfuehrenHinweis
            .removeClass('alert-success')
            .removeClass('alert-danger')
            .addClass('alert-info')
            .show();
        rueckmeldung = 'Die Daten werden importiert...<br>Die Indexe werden aktualisiert...';
        $importBsImportAusfuehrenHinweisText.html(rueckmeldung);
        $('html, body').animate({
            scrollTop: $importBsImportAusfuehrenHinweis.offset().top
        }, 2000);
        if (anzBsImportiert === anzahlBeziehungssammlungen) {
            // Indices aktualisieren
            $db.view('artendb/lr', {
                success: function () {
                    // melden, dass Indexe aktualisiert wurden
                    $importBsImportAusfuehrenHinweis
                        .removeClass('alert-info')
                        .removeClass('alert-danger')
                        .addClass('alert-success')
                        .show();
                    rueckmeldung  = 'Die Daten wurden importiert.<br>';
                    rueckmeldung += 'Die Indexe wurden neu aufgebaut.<br><br>';
                    rueckmeldung += 'Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>';
                    $importBsImportAusfuehrenHinweisText.html(rueckmeldung + rueckmeldungLinks);
                    // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                    window.adb.rueckmeldungLinks = rueckmeldungLinks;
                    $('html, body').animate({
                        scrollTop: $importBsImportAusfuehrenHinweis.offset().top
                    }, 2000);
                },
                error: function () {
                    console.log('importiereBeziehungssammlung: keine Daten erhalten');
                }
            });
        }
    });

    // zuerst: Veranlassen, dass die Beziehungspartner in window.adb.bsDatensaetze in einen Array der richtigen Form umgewandelt werden
    $.when(bereiteBeziehungspartnerFuerImportVor()).then(function () {
        setTimeout(function () {
            var beziehungssammlung,
                bsVorlage = {},
                bsDatensaetzeObjekt;

            anzahlBeziehungssammlungen = 0;
            bsVorlage.Name = $bsName.val();
            if ($bsBeschreibung.val()) {
                bsVorlage.Beschreibung = $bsBeschreibung.val();
            }
            if ($bsDatenstand.val()) {
                bsVorlage.Datenstand = $bsDatenstand.val();
            }
            if ($bsNutzungsbedingungen.val()) {
                bsVorlage.Nutzungsbedingungen = $bsNutzungsbedingungen.val();
            }
            if ($bsLink.val()) {
                bsVorlage.Link = $bsLink.val();
            }
            // falls die Datensammlung zusammenfassend ist
            if ($('#bsZusammenfassend').prop('checked')) {
                bsVorlage.zusammenfassend = true;
            }
            if ($bsUrsprungsBs.val()) {
                bsVorlage.Ursprungsdatensammlung = $bsUrsprungsBs.val();
            }
            bsVorlage['importiert von'] = localStorage.email;
            bsVorlage.Beziehungen = [];
            // zunächst den Array von Objekten in ein Objekt mit Eigenschaften = ObjektGuid und darin Array mit allen übrigen Daten verwandeln
            bsDatensaetzeObjekt = _.groupBy(window.adb.bsDatensaetze, function (objekt) {
                // id in guid umwandeln
                var guid,
                    q;

                if (window.adb.bsId === 'guid') {
                    // die in der Tabelle mitgelieferte id ist die guid
                    guid = objekt[window.adb.bsFelderId];
                } else {
                    for (q = 0; q < window.adb.zuordbareDatensaetze.length; q++) {
                        // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                        if (window.adb.zuordbareDatensaetze[q].Id == objekt[window.adb.bsFelderId]) {
                            // und die guid auslesen
                            guid = window.adb.zuordbareDatensaetze[q].Guid;
                            break;
                        }
                    }
                }
                objekt.GUID = guid;
                return objekt.GUID;
            });
            // jetzt durch die GUID's loopen und die jeweiligen Beziehungen anhängen
            $.each(bsDatensaetzeObjekt, function (importdatenObjektId, importdatenFelderArray) {
                var beziehungen = [];
                anzahlBeziehungssammlungen += 1;
                // Beziehungssammlung als Objekt gründen, indem die Vorlage kopiert wird
                beziehungssammlung = $.extend(true, {}, bsVorlage);
                _.each(importdatenFelderArray, function (importdatenFeld) {
                    // durch die Felder der Beziehungen loopen
                    anzahlFelder = 0;
                    // Felder der Beziehungssammlung als Objekt gründen
                    var beziehung = {};

                    _.each(importdatenFeld, function (feldwert, feldname) {
                        // durch die Felder der Beziehung loopen
                        // nicht importiert wird die GUID und leere Felder
                        if (feldname !== 'GUID' && feldwert !== '' && feldwert !== null) {
                            if (feldwert === -1) {
                                // Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
                                beziehung[feldname] = true;
                            } else if (feldwert == 'true') {
                                // true/false nicht als string importieren
                                beziehung[feldname] = true;
                            } else if (feldwert == 'false') {
                                beziehung[feldname] = false;
                            } else if (feldwert == parseInt(feldwert, 10)) {
                                // Ganzzahlen als Zahlen importieren
                                beziehung[feldname] = parseInt(feldwert, 10);
                            } else if (feldwert == parseFloat(feldwert)) {
                                // Bruchzahlen als Zahlen importieren
                                beziehung[feldname] = parseFloat(feldwert);
                            } else if (feldname == 'Beziehungspartner') {
                                beziehung[feldname] = [];
                                // durch Beziehungspartner loopen und GUIDS mit Objekten ersetzen
                                _.each(feldwert, function (beziehungspartnerFeld) {
                                    beziehung[feldname].push(window.adb.bezPartnerObjekt[beziehungspartnerFeld]);
                                });
                            } else {
                                // Normalfall
                                beziehung[feldname] = feldwert;
                            }
                            anzahlFelder++;
                        }
                    });
                    if (anzahlFelder > 0) {
                        beziehungen.push(beziehung);
                    }
                });
                // entsprechenden Index öffnen
                // sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
                if (beziehungen.length > 0) {
                    // Datenbankabfrage ist langsam. Extern aufrufen, 
                    // sonst überholt die for-Schlaufe und Beziehungssammlung ist bis zur saveDoc-Ausführung eine andere!
                    fuegeBeziehungenZuObjekt(importdatenObjektId, beziehungssammlung, beziehungen);
                }
            });

            // Für 10 Kontrollbeispiele die Links aufbauen
            if (window.adb.bsId === 'guid') {
                erste10Ids = _.first(window.adb.zuordbareDatensaetze, 10);
            } else {
                erste10Ids = _.pluck(_.first(window.adb.zuordbareDatensaetze, 10), 'Guid');
            }
            _.each(erste10Ids, function (id, index) {
                nr = index++;
                rueckmeldungLinks += '<a href="' + $(location).attr('protocol') + '//' + $(location).attr('host') + $(location).attr('pathname') + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
            });
            bsImportiert.resolve();
        }, 1000);
    });
    return bsImportiert.promise();
};