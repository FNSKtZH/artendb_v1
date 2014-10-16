// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung

'use strict';

var _ = require('underscore');

// $ wird benötigt wegen .modal
var returnFunction = function ($) {
    var datensammlung,
        anzahl_felder,
        anz_ds = window.adb.dsDatensätze.length,
        // Der Verlauf soll angezeigt werden, daher braucht es einen zähler
        anz_ds_importiert = 0,
        DsImportiert = $.Deferred(),
        $DsName = $("#DsName"),
        $DsBeschreibung = $("#DsBeschreibung"),
        nr,
        rückmeldung_intro,
        rückmeldung_links = "",
        rückmeldung,
        $DsDatenstand = $("#DsDatenstand"),
        $DsLink = $("#DsLink"),
        $DsUrsprungsDs = $("#DsUrsprungsDs"),
        $importieren_ds_import_ausfuehren_hinweis = $("#importieren_ds_import_ausfuehren_hinweis"),
        $importieren_ds_import_ausfuehren_hinweis_text = $("#importieren_ds_import_ausfuehren_hinweis_text"),
        erste_10_ids;
    // prüfen, ob ein DsName erfasst wurde. Wenn nicht: melden
    if (!$DsName.val()) {
        $("#meldung_individuell_label").html("Namen fehlt");
        $("#meldung_individuell_text").html("Bitte geben Sie der Datensammlung einen Namen");
        $("#meldung_individuell_schliessen").html("schliessen");
        $('#meldung_individuell').modal();
        $DsName.focus();
        return false;
    }

    // changes feed einrichten
    // versucht, view als Filter zu verwenden, oder besser, den expliziten Filter dsimport mit dsname als Kriterium
    // Ergebnis: bei view kamen alle changes, auch design doc. Bei dsimport kam nichts.
    /*var changes_options = {};
    changes_options.dsname = $DsName.val();
    changes_options.filter = "artendb/dsimport";
    window.adb.queryChangesStartingNow();

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('longpoll-data', function(event, data) {
        anzDsImportiert = anzDsImportiert + data.results.length;
        var prozent = Math.round(anzDsImportiert/anzDs*100);
        $("#DsImportierenProgressbar").css('width', prozent +'%').attr('aria-valuenow', prozent);
        if (anzDsImportiert >= anzDs-1 && anzDsImportiert <= anzDs) {
            // Rückmeldung in Feld anzeigen:
            $importieren_ds_import_ausfuehren_hinweis.css('display', 'block');
        }
    });*/

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.ds_hinzugefügt', function() {
        anz_ds_importiert++;
        var prozent = Math.round(anz_ds_importiert/anz_ds*100),
            rückmeldung;
        $("#DsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#DsImportierenProgressbarText").html(prozent + "%");
        $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
        rückmeldung = "Die Daten wurden importiert.<br>Die Indexe werden aktualisiert...";
        $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
        }, 2000);
        if (anz_ds_importiert === anz_ds) {
            // die Indexe aktualisieren
            $.ajax('http://localhost:5984/artendb/_design/artendb/_view/lr', {
                type: 'GET',
                dataType: "json"
            }).done(function () {
                // melden, dass views aktualisiert wurden
                $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-info").removeClass("alert-danger").addClass("alert-success");
                rückmeldung = "Die Daten wurden importiert.<br>";
                rückmeldung += "Die Indexe wurden aktualisiert.<br><br>";
                rückmeldung += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung + rückmeldung_links);
                // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                window.adb.rückmeldung_links = rückmeldung_links;
                $('html, body').animate({
                    scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
                }, 2000);
            }).fail(function () {
                console.log('keine Daten erhalten');
            });
        }
    });
    _.each(window.adb.dsDatensätze, function(ds_datensatz) {
        // Datensammlung als Objekt gründen
        datensammlung = {};
        datensammlung.Name = $DsName.val();
        if ($DsBeschreibung.val()) {
            datensammlung.Beschreibung = $DsBeschreibung.val();
        }
        if ($DsDatenstand.val()) {
            datensammlung.Datenstand = $DsDatenstand.val();
        }
        if ($DsLink.val()) {
            datensammlung.Link = $DsLink.val();
        }
        // falls die Datensammlung zusammenfassend ist
        if ($("#DsZusammenfassend").prop('checked')) {
            datensammlung.zusammenfassend = true;
        }
        if ($DsUrsprungsDs.val()) {
            datensammlung.Ursprungsdatensammlung = $DsUrsprungsDs.val();
        }
        datensammlung["importiert von"] = localStorage.Email;
        // Felder der Datensammlung als Objekt gründen
        datensammlung.Eigenschaften = {};
        // Felder anfügen, wenn sie Werte enthalten
        anzahl_felder = 0;
        _.each(ds_datensatz, function(feldwert, feldname) {
            // nicht importiert wird die ID und leere Felder
            // und keine Taxonomie ID, wenn sie nur wegen der Identifikation mitgeliefert wurde
            //if (feldname !== window.adb.DsFelderId && feldwert !== "" && feldwert !== null && (window.adb.DsId !== "guid" && feldname !== "Taxonomie ID")) {
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
                anzahl_felder += 1;
            }
        });
        // entsprechenden Index öffnen
        // sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
        if (anzahl_felder > 0) {
            // Datenbankabfrage ist langsam. Extern aufrufen,
            // sonst überholt die for-Schlaufe und Datensammlung ist bis zur saveDoc-Ausführung eine andere!
            var guid;
            if (window.adb.DsId === "guid") {
                // die in der Tabelle mitgelieferte id ist die guid
                guid = ds_datensatz[window.adb.DsFelderId];
            } else {
                var ds_datensatz_mit_richtiger_id = _.find(window.adb.ZuordbareDatensätze, function(datensatz) {
                    return datensatz.Id == ds_datensatz[window.adb.DsFelderId];
                });
                guid = ds_datensatz_mit_richtiger_id.Guid;
            }
            // kann sein, dass der guid oben nicht zugeordnet werden konnte. Dann nicht anfügen
            if (guid) {
                console.log("füge ds zu objekt");
                window.adb.fügeDatensammlungZuObjekt(guid, datensammlung);
            }
        }
    });
    // Für 10 Kontrollbeispiele die Links aufbauen
    if (window.adb.DsId === "guid") {
        erste_10_ids = _.first(window.adb.ZuordbareDatensätze, 10);
    } else {
        erste_10_ids = _.pluck(_.first(window.adb.ZuordbareDatensätze, 10), "Guid");
    }
    _.each(erste_10_ids, function(id, index) {
        nr = index + 1;
        rückmeldung_links += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
    });

    // Rückmeldung in Feld anzeigen
    $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
    rückmeldung = "Die Daten werden importiert...";
    $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
    $importieren_ds_import_ausfuehren_hinweis.css('display', 'block');
    $('html, body').animate({
        scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
    }, 2000);
    DsImportiert.resolve();
};

module.exports = returnFunction;