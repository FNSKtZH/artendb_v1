// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung

/*jslint node: true */
'use strict';

var _ = require('underscore');

// $ wird benötigt wegen .alert
var returnFunction = function ($) {
    var anzahl_felder,
        anzahl_beziehungssammlungen = window.adb.bsDatensätze.length,
        anz_bs_importiert = 0,
        erste_10_ids,
        nr,
        rückmeldung,
        rückmeldung_intro,
        rückmeldung_links = "",
        bs_importiert = $.Deferred(),
        $BsName = $("#BsName"),
        $BsBeschreibung = $("#BsBeschreibung"),
        $BsDatenstand = $("#BsDatenstand"),
        $BsLink = $("#BsLink"),
        $BsUrsprungsBs = $("#BsUrsprungsBs"),
        $importieren_bs_import_ausfuehren_hinweis = $("#importieren_bs_import_ausfuehren_hinweis"),
        $importieren_bs_import_ausfuehren_hinweis_text = $("#importieren_bs_import_ausfuehren_hinweis_text");
    // prüfen, ob ein BsName erfasst wurde. Wenn nicht: melden
    if (!$BsName.val()) {
        $("#meldung_individuell_label").html("Namen fehlt");
        $("#meldung_individuell_text").html("Bitte geben Sie der Beziehungssammlung einen Namen");
        $("#meldung_individuell_schliessen").html("schliessen");
        $('#meldung_individuell').modal();
        $BsName.focus();
        return false;
    }

    // Rückmeldung in Feld anzeigen:
    rückmeldung = "Die Daten werden importiert...";
    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
    $importieren_bs_import_ausfuehren_hinweis
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info");
    $importieren_bs_import_ausfuehren_hinweis.alert().show();
    $('html, body').animate({
        scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
    }, 2000);

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.bs_hinzugefügt', function() {
        anz_bs_importiert++;
        var prozent = Math.round(anz_bs_importiert/anzahl_beziehungssammlungen*100);
        $("#BsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#BsImportierenProgressbarText").html(prozent + "%");
        $importieren_bs_import_ausfuehren_hinweis
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        rückmeldung = "Die Daten werden importiert...<br>Die Indexe werden aktualisiert...";
        $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
        }, 2000);
        if (anz_bs_importiert === anzahl_beziehungssammlungen) {
            // Indices aktualisieren
            $.ajax('http://localhost:5984/artendb/_design/artendb/_view/lr', {
                type: 'GET',
                dataType: "json"
            }).done(function () {
                // melden, dass Indexe aktualisiert wurden
                $importieren_bs_import_ausfuehren_hinweis
                    .removeClass("alert-info")
                    .removeClass("alert-danger")
                    .addClass("alert-success")
                    .show();
                rückmeldung = "Die Daten wurden importiert.<br>";
                rückmeldung += "Die Indexe wurden neu aufgebaut.<br><br>";
                rückmeldung += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung + rückmeldung_links);
                // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                window.adb.rückmeldung_links = rückmeldung_links;
                $('html, body').animate({
                    scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
                }, 2000);
            }).fail(function () {
                console.log('keine Daten erhalten');
            });
        }
    });

    // zuerst: Veranlassen, dass die Beziehungspartner in window.adb.bsDatensätze in einen Array der richtigen Form umgewandelt werden
    $.when(window.adb.bereiteBeziehungspartnerFürImportVor())
        .then(function() {
            setTimeout(function() {
                anzahl_beziehungssammlungen = 0;
                var beziehungssammlung,
                    beziehungssammlung_vorlage = {};
                beziehungssammlung_vorlage.Name = $BsName.val();
                if ($BsBeschreibung.val()) {
                    beziehungssammlung_vorlage.Beschreibung = $BsBeschreibung.val();
                }
                if ($BsDatenstand.val()) {
                    beziehungssammlung_vorlage.Datenstand = $BsDatenstand.val();
                }
                if ($BsLink.val()) {
                    beziehungssammlung_vorlage.Link = $BsLink.val();
                }
                // falls die Datensammlung zusammenfassend ist
                if ($("#BsZusammenfassend").prop('checked')) {
                    beziehungssammlung_vorlage.zusammenfassend = true;
                }
                if ($BsUrsprungsBs.val()) {
                    beziehungssammlung_vorlage.Ursprungsdatensammlung = $BsUrsprungsBs.val();
                }
                beziehungssammlung_vorlage["importiert von"] = localStorage.Email;
                beziehungssammlung_vorlage.Beziehungen = [];
                // zunächst den Array von Objekten in ein Objekt mit Eigenschaften = ObjektGuid und darin Array mit allen übrigen Daten verwandeln
                var bs_datensätze_objekt = _.groupBy(window.adb.bsDatensätze, function (objekt) {
                    // id in guid umwandeln
                    var guid;
                    if (window.adb.BsId === "guid") {
                        // die in der Tabelle mitgelieferte id ist die guid
                        guid = objekt[window.adb.BsFelderId];
                    } else {
                        for (var q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
                            // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                            if (window.adb.ZuordbareDatensätze[q].Id == objekt[window.adb.BsFelderId]) {
                                // und die guid auslesen
                                guid = window.adb.ZuordbareDatensätze[q].Guid;
                                break;
                            }
                        }
                    }
                    objekt.GUID = guid;
                    return objekt.GUID;
                });
                // jetzt durch die GUID's loopen und die jeweiligen Beziehungen anhängen
                $.each(bs_datensätze_objekt, function (importdaten_objekt_id, importdaten_felder_array) {
                    var beziehungen = [];
                    anzahl_beziehungssammlungen += 1;
                    // Beziehungssammlung als Objekt gründen, indem die Vorlage kopiert wird
                    beziehungssammlung = $.extend(true, {}, beziehungssammlung_vorlage);
                    _.each(importdaten_felder_array, function (importdaten_feld) {
                        // durch die Felder der Beziehungen loopen
                        anzahl_felder = 0;
                        // Felder der Beziehungssammlung als Objekt gründen
                        var beziehung = {};
                        _.each(importdaten_feld, function (feldwert, feldname) {
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
                                    _.each(feldwert, function (beziehungspartner_feld) {
                                        beziehung[feldname].push(window.adb.bezPartner_objekt[beziehungspartner_feld]);
                                    });
                                } else {
                                    // Normalfall
                                    beziehung[feldname] = feldwert;
                                }
                                anzahl_felder++;
                            }
                        });
                        if (anzahl_felder > 0) {
                            beziehungen.push(beziehung);
                        }
                    });
                    // entsprechenden Index öffnen
                    // sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
                    if (beziehungen.length > 0) {
                        // Datenbankabfrage ist langsam. Extern aufrufen, 
                        // sonst überholt die for-Schlaufe und Beziehungssammlung ist bis zur saveDoc-Ausführung eine andere!
                        window.adb.fügeBeziehungenZuObjekt(importdaten_objekt_id, beziehungssammlung, beziehungen);
                    }
                });

                // Für 10 Kontrollbeispiele die Links aufbauen
                if (window.adb.BsId === "guid") {
                    erste_10_ids = _.first(window.adb.ZuordbareDatensätze, 10);
                } else {
                    erste_10_ids = _.pluck(_.first(window.adb.ZuordbareDatensätze, 10), "Guid");
                }
                _.each(erste_10_ids, function (id, index) {
                    nr = index +1;
                    rückmeldung_links += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
                });
                bs_importiert.resolve();
            }, 1000);
        });
    return bs_importiert.promise();
};

module.exports = returnFunction;