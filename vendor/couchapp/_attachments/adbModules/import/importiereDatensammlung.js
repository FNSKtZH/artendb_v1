// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensaetze) und die Liste der zu aktualisierenden Datensätze (window.adb.zuordbareDatensaetze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                          = require('underscore'),
    $                          = require('jquery'),
    fuegeDatensammlungZuObjekt = require('./fuegeDatensammlungZuObjekt');

// $ wird benötigt wegen .modal
module.exports = function () {
    var datensammlung,
        anzahlFelder,
        anzDs             = window.adb.dsDatensaetze.length,
        // Der Verlauf soll angezeigt werden, daher braucht es einen zähler
        anzDsImportiert   = 0,
        dsImportiert      = $.Deferred(),
        $dsName           = $("#dsName"),
        $dsBeschreibung   = $("#dsBeschreibung"),
        nr,
        rueckmeldungLinks = "",
        rueckmeldung,
        $dsDatenstand     = $("#dsDatenstand"),
        $dsLink           = $("#dsLink"),
        $dsUrsprungsDs    = $("#dsUrsprungsDs"),
        $importierenDsImportAusfuehrenHinweis     = $("#importierenDsImportAusfuehrenHinweis"),
        $importierenDsImportAusfuehrenHinweisText = $("#importierenDsImportAusfuehrenHinweisText"),
        erste10Ids,
        dsDatensatzMitRichtigerId;

    // prüfen, ob ein DsName erfasst wurde. Wenn nicht: melden
    if (!$dsName.val()) {
        $("#meldungIndividuellLabel").html("Namen fehlt");
        $("#meldungIndividuellText").html("Bitte geben Sie der Datensammlung einen Namen");
        $("#meldungIndividuellSchliessen").html("schliessen");
        $('#meldungIndividuell').modal();
        $dsName.focus();
        return false;
    }

    // changes feed einrichten
    // versucht, view als Filter zu verwenden, oder besser, den expliziten Filter dsimport mit dsname als Kriterium
    // Ergebnis: bei view kamen alle changes, auch design doc. Bei dsimport kam nichts.
    /*var changes_options = {};
    changes_options.dsname = $dsName.val();
    changes_options.filter = "artendb/dsimport";
    window.adb.queryChangesStartingNow();

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('longpoll-data', function (event, data) {
        anzDsImportiert = anzDsImportiert + data.results.length;
        var prozent = Math.round(anzDsImportiert/anzDs*100);
        $("#dsImportierenProgressbar").css('width', prozent +'%').attr('aria-valuenow', prozent);
        if (anzDsImportiert >= anzDs-1 && anzDsImportiert <= anzDs) {
            // Rückmeldung in Feld anzeigen:
            $importierenDsImportAusfuehrenHinweis.css('display', 'block');
        }
    });*/

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.ds_hinzugefügt', function () {
        anzDsImportiert++;
        var prozent = Math.round(anzDsImportiert / anzDs * 100),
            $db = $.couch.db('artendb');

        $("#dsImportierenProgressbar")
            .css('width', prozent + '%')
            .attr('aria-valuenow', prozent);
        $("#dsImportierenProgressbarText").html(prozent + "%");
        $importierenDsImportAusfuehrenHinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
        rueckmeldung = "Die Daten wurden importiert.<br>Die Indexe werden aktualisiert...";
        $importierenDsImportAusfuehrenHinweisText.html(rueckmeldung);
        $('html, body').animate({
            scrollTop: $importierenDsImportAusfuehrenHinweis.offset().top
        }, 2000);
        if (anzDsImportiert === anzDs) {
            // die Indexe aktualisieren
            $db.view('artendb/lr', {
                success: function () {
                    // melden, dass views aktualisiert wurden
                    $importierenDsImportAusfuehrenHinweis.removeClass("alert-info").removeClass("alert-danger").addClass("alert-success");
                    rueckmeldung = "Die Daten wurden importiert.<br>";
                    rueckmeldung += "Die Indexe wurden aktualisiert.<br><br>";
                    rueckmeldung += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                    $importierenDsImportAusfuehrenHinweisText.html(rueckmeldung + rueckmeldungLinks);
                    // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                    window.adb.rueckmeldungLinks = rueckmeldungLinks;
                    $('html, body').animate({
                        scrollTop: $importierenDsImportAusfuehrenHinweis.offset().top
                    }, 2000);
                },
                error: function () {
                    console.log('importiereDatensammlung: keine Daten erhalten');
                }
            });
        }
    });
    _.each(window.adb.dsDatensaetze, function (dsDatensatz) {
        // Datensammlung als Objekt gründen
        datensammlung = {};
        datensammlung.Name = $dsName.val();
        if ($dsBeschreibung.val()) {
            datensammlung.Beschreibung = $dsBeschreibung.val();
        }
        if ($dsDatenstand.val()) {
            datensammlung.Datenstand = $dsDatenstand.val();
        }
        if ($dsLink.val()) {
            datensammlung.Link = $dsLink.val();
        }
        // falls die Datensammlung zusammenfassend ist
        if ($("#dsZusammenfassend").prop('checked')) {
            datensammlung.zusammenfassend = true;
        }
        if ($dsUrsprungsDs.val()) {
            datensammlung.Ursprungsdatensammlung = $dsUrsprungsDs.val();
        }
        datensammlung["importiert von"] = localStorage.Email;
        // Felder der Datensammlung als Objekt gründen
        datensammlung.Eigenschaften = {};
        // Felder anfügen, wenn sie Werte enthalten
        anzahlFelder = 0;
        _.each(dsDatensatz, function (feldwert, feldname) {
            // nicht importiert wird die ID und leere Felder
            // und keine Taxonomie ID, wenn sie nur wegen der Identifikation mitgeliefert wurde
            //if (feldname !== window.adb.DsFelderId && feldwert !== "" && feldwert !== null && (window.adb.dsId !== "guid" && feldname !== "Taxonomie ID")) {
            if (feldname !== window.adb.DsFelderId && feldwert !== "" && feldwert !== null) {
                if (feldwert === -1) {
                    // Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
                    datensammlung.Eigenschaften[feldname] = true;
                } else if (feldwert == "true") {
                    // true/false nicht als string importieren
                    datensammlung.Eigenschaften[feldname] = true;
                } else if (feldwert == "false") {
                    datensammlung.Eigenschaften[feldname] = false;
                } else if (feldwert == parseInt(feldwert, 10)) {
                    // Ganzzahlen als Zahlen importieren
                    datensammlung.Eigenschaften[feldname] = parseInt(feldwert, 10);
                } else if (feldwert == parseFloat(feldwert)) {
                    // Bruchzahlen als Zahlen importieren
                    datensammlung.Eigenschaften[feldname] = parseFloat(feldwert);
                } else {
                    // Normalfall
                    datensammlung.Eigenschaften[feldname] = feldwert;
                }
                anzahlFelder += 1;
            }
        });
        // entsprechenden Index öffnen
        // sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
        if (anzahlFelder > 0) {
            // Datenbankabfrage ist langsam. Extern aufrufen,
            // sonst überholt die for-Schlaufe und Datensammlung ist bis zur saveDoc-Ausführung eine andere!
            var guid;
            if (window.adb.dsId === "guid") {
                // die in der Tabelle mitgelieferte id ist die guid
                guid = dsDatensatz[window.adb.DsFelderId];
            } else {
                dsDatensatzMitRichtigerId = _.find(window.adb.zuordbareDatensaetze, function (datensatz) {
                    return datensatz.Id == dsDatensatz[window.adb.DsFelderId];
                });
                guid = dsDatensatzMitRichtigerId.Guid;
            }
            // kann sein, dass der guid oben nicht zugeordnet werden konnte. Dann nicht anfügen
            if (guid) {
                console.log("füge ds zu objekt");
                fuegeDatensammlungZuObjekt(guid, datensammlung);
            }
        }
    });
    // Für 10 Kontrollbeispiele die Links aufbauen
    if (window.adb.dsId === "guid") {
        erste10Ids = _.first(window.adb.zuordbareDatensaetze, 10);
    } else {
        erste10Ids = _.pluck(_.first(window.adb.zuordbareDatensaetze, 10), "Guid");
    }
    _.each(erste10Ids, function (id, index) {
        nr = index + 1;
        rueckmeldungLinks += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
    });

    // Rückmeldung in Feld anzeigen
    $importierenDsImportAusfuehrenHinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
    rueckmeldung = "Die Daten werden importiert...";
    $importierenDsImportAusfuehrenHinweisText.html(rueckmeldung);
    $importierenDsImportAusfuehrenHinweis.css('display', 'block');
    $('html, body').animate({
        scrollTop: $importierenDsImportAusfuehrenHinweis.offset().top
    }, 2000);
    dsImportiert.resolve();
};