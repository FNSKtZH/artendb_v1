'use strict';

var _ = require('underscore');

// $ wird benötigt wegen $.alert
var returnFunction = function ($, that) {
    var ds_name        = that.value,
        wählbar        = false,
        $DsAnzDs       = $("#DsAnzDs"),
        $DsAnzDs_label = $("#DsAnzDs_label"),
        $DsName        = $("#DsName"),
        $importieren_ds_ds_beschreiben_error = $("#importieren_ds_ds_beschreiben_error");
    // allfälligen Alert schliessen
    $importieren_ds_ds_beschreiben_error
        .alert()
        .hide();
    // wählbar setzen
    // wählen kann man nur, was man selber importiert hat - oder admin ist
    if ($("#"+that.id+" option:selected").attr("waehlbar") === "true") {
        wählbar = true;
    } else if (Boolean(localStorage.admin)) {
        wählbar = true;
    }
    if (wählbar) {
        // zuerst alle Felder leeren
        $('#importieren_ds_ds_beschreiben_collapse textarea, #importieren_ds_ds_beschreiben_collapse input').each(function() {
            $(this).val('');
        });
        $DsAnzDs.html("");
        $DsAnzDs_label.html("");
        if (ds_name) {
            _.each(window.adb.ds_von_objekten.rows, function(ds_von_objekten_row) {
                if (ds_von_objekten_row.key[1] === ds_name) {
                    $DsName.val(ds_name);
                    _.each(ds_von_objekten_row.key[4], function(feldwert, feldname) {
                        if (feldname === "Ursprungsdatensammlung") {
                            $("#DsUrsprungsDs").val(feldwert);
                        } else if (feldname !== "importiert von") {
                            $("#Ds" + feldname).val(feldwert);
                        }
                    });
                    if (ds_von_objekten_row.key[2] === true) {
                        $("#DsZusammenfassend").prop('checked', true);
                        // Feld für Ursprungs-DS anzeigen
                        $("#DsUrsprungsDs_div").show();
                    } else {
                        // sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere DS gewählt wird
                        $("#DsZusammenfassend").prop('checked', false);
                        // und Feld für Ursprungs-DS verstecken
                        $("#DsUrsprungsDs_div").hide();
                    }
                    // wenn die ds/bs kein "importiert von" hat ist der Wert null
                    // verhindern, dass null angezeigt wird
                    if (ds_von_objekten_row.key[3]) {
                        $("#DsImportiertVon").val(ds_von_objekten_row.key[3]);
                    } else {
                        $("#DsImportiertVon").val("");
                    }
                    $DsAnzDs_label.html("Anzahl Arten/Lebensräume");
                    $DsAnzDs.html(ds_von_objekten_row.value);
                    // dafür sorgen, dass textareas genug gross sind
                    $('#importieren_ds')
                        .find('textarea')
                        .each(function() {
                            window.adb.fitTextareaToContent(this, document.documentElement.clientHeight);
                        });
                    $DsName.focus();
                }
                // löschen-Schaltfläche einblenden
                $("#DsLoeschen").show();
            });
        } else {
            // löschen-Schaltfläche ausblenden
            $("#DsLoeschen").hide();
        }
    } else {
        // melden, dass diese BS nicht bearbeitet werden kann
        $("#importieren_ds_ds_beschreiben_error_text")
            .html("Sie können nur Datensammlungen verändern, die Sie selber importiert haben.<br>Ausnahme: Zusammenfassende Datensammlungen.");
        $importieren_ds_ds_beschreiben_error
            .alert()
            .show();
        $('html, body').animate({
            scrollTop: $("#DsWaehlen").offset().top
        }, 2000);
    }
};

module.exports = returnFunction;