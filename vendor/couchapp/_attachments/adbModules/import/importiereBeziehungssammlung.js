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
        anzahlBeziehungssammlungen                = window.adb.bsDatensaetze.length,
        anzBsImportiert                           = 0,
        erste10Ids,
        nr,
        rueckmeldung,
        rueckmeldungLinks                         = "",
        bsImportiert                              = $.Deferred(),
        $BsName                                   = $("#bsName"),
        $BsBeschreibung                           = $("#bsBeschreibung"),
        $BsDatenstand                             = $("#bsDatenstand"),
        $BsLink                                   = $("#bsLink"),
        $bsUrsprungsBs                            = $("#bsUrsprungsBs"),
        $importierenBsImportAusfuehrenHinweis     = $("#importierenBsImportAusfuehrenHinweis"),
        $importierenBsImportAusfuehrenHinweisText = $("#importierenBsImportAusfuehrenHinweisText");

    // prüfen, ob ein BsName erfasst wurde. Wenn nicht: melden
    if (!$BsName.val()) {
        $("#meldungIndividuellLabel").html("Namen fehlt");
        $("#meldungIndividuellText").html("Bitte geben Sie der Beziehungssammlung einen Namen");
        $("#meldungIndividuellSchliessen").html("schliessen");
        $('#meldungIndividuell').modal();
        $BsName.focus();
        return false;
    }

    // Rückmeldung in Feld anzeigen:
    rueckmeldung = "Die Daten werden importiert...";
    $importierenBsImportAusfuehrenHinweisText.html(rueckmeldung);
    $importierenBsImportAusfuehrenHinweis
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info");
    $importierenBsImportAusfuehrenHinweis.alert().show();
    $('html, body').animate({
        scrollTop: $importierenBsImportAusfuehrenHinweis.offset().top
    }, 2000);

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.bs_hinzugefügt', function () {
        anzBsImportiert++;
        var prozent = Math.round(anzBsImportiert / anzahlBeziehungssammlungen * 100),
            $db = $.couch.db('artendb');

        $("#bsImportierenProgressbar")
            .css('width', prozent + '%')
            .attr('aria-valuenow', prozent);
        $("#bsImportierenProgressbarText").html(prozent + "%");
        $importierenBsImportAusfuehrenHinweis
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        rueckmeldung = "Die Daten werden importiert...<br>Die Indexe werden aktualisiert...";
        $importierenBsImportAusfuehrenHinweisText.html(rueckmeldung);
        $('html, body').animate({
            scrollTop: $importierenBsImportAusfuehrenHinweis.offset().top
        }, 2000);
        if (anzBsImportiert === anzahlBeziehungssammlungen) {
            // Indices aktualisieren
            $db.view('artendb/lr', {
                success: function () {
                    // melden, dass Indexe aktualisiert wurden
                    $importierenBsImportAusfuehrenHinweis
                        .removeClass("alert-info")
                        .removeClass("alert-danger")
                        .addClass("alert-success")
                        .show();
                    rueckmeldung = "Die Daten wurden importiert.<br>";
                    rueckmeldung += "Die Indexe wurden neu aufgebaut.<br><br>";
                    rueckmeldung += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                    $importierenBsImportAusfuehrenHinweisText.html(rueckmeldung + rueckmeldungLinks);
                    // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                    window.adb.rueckmeldungLinks = rueckmeldungLinks;
                    $('html, body').animate({
                        scrollTop: $importierenBsImportAusfuehrenHinweis.offset().top
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
            bsVorlage.Name = $BsName.val();
            if ($BsBeschreibung.val()) {
                bsVorlage.Beschreibung = $BsBeschreibung.val();
            }
            if ($BsDatenstand.val()) {
                bsVorlage.Datenstand = $BsDatenstand.val();
            }
            if ($BsLink.val()) {
                bsVorlage.Link = $BsLink.val();
            }
            // falls die Datensammlung zusammenfassend ist
            if ($("#bsZusammenfassend").prop('checked')) {
                bsVorlage.zusammenfassend = true;
            }
            if ($bsUrsprungsBs.val()) {
                bsVorlage.Ursprungsdatensammlung = $bsUrsprungsBs.val();
            }
            bsVorlage["importiert von"] = localStorage.Email;
            bsVorlage.Beziehungen = [];
            // zunächst den Array von Objekten in ein Objekt mit Eigenschaften = ObjektGuid und darin Array mit allen übrigen Daten verwandeln
            bsDatensaetzeObjekt = _.groupBy(window.adb.bsDatensaetze, function (objekt) {
                // id in guid umwandeln
                var guid,
                    q;
                if (window.adb.BsId === "guid") {
                    // die in der Tabelle mitgelieferte id ist die guid
                    guid = objekt[window.adb.BsFelderId];
                } else {
                    for (q = 0; q < window.adb.zuordbareDatensaetze.length; q++) {
                        // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                        if (window.adb.zuordbareDatensaetze[q].Id == objekt[window.adb.BsFelderId]) {
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
                        if (feldname !== "GUID" && feldwert !== "" && feldwert !== null) {
                            if (feldwert === -1) {
                                // Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
                                beziehung[feldname] = true;
                            } else if (feldwert == "true") {
                                // true/false nicht als string importieren
                                beziehung[feldname] = true;
                            } else if (feldwert == "false") {
                                beziehung[feldname] = false;
                            } else if (feldwert == parseInt(feldwert, 10)) {
                                // Ganzzahlen als Zahlen importieren
                                beziehung[feldname] = parseInt(feldwert, 10);
                            } else if (feldwert == parseFloat(feldwert)) {
                                // Bruchzahlen als Zahlen importieren
                                beziehung[feldname] = parseFloat(feldwert);
                            } else if (feldname == "Beziehungspartner") {
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
            if (window.adb.BsId === "guid") {
                erste10Ids = _.first(window.adb.zuordbareDatensaetze, 10);
            } else {
                erste10Ids = _.pluck(_.first(window.adb.zuordbareDatensaetze, 10), "Guid");
            }
            _.each(erste10Ids, function (id, index) {
                nr = index++;
                rueckmeldungLinks += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
            });
            bsImportiert.resolve();
        }, 1000);
    });
    return bsImportiert.promise();
};