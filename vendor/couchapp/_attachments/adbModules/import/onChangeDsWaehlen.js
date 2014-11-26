/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

module.exports = function () {
    var dsName         = this.value,
        waehlbar       = false,
        $DsAnzDs       = $("#DsAnzDs"),
        $DsAnzDsLabel  = $("#DsAnzDsLabel"),
        $DsName        = $("#DsName"),
        $importieren_ds_ds_beschreiben_error = $("#importieren_ds_ds_beschreiben_error"),
        fitTextareaToContent                 = require('../fitTextareaToContent');

    // allfälligen Alert schliessen
    $importieren_ds_ds_beschreiben_error
        .alert()
        .hide();
    // waehlbar setzen
    // wählen kann man nur, was man selber importiert hat - oder admin ist
    waehlbar = $("#" + this.id + " option:selected").attr("waehlbar") === "true" ? true : Boolean(localStorage.admin);
    if (waehlbar) {
        // zuerst alle Felder leeren
        $('#importieren_ds_ds_beschreiben_collapse textarea, #importieren_ds_ds_beschreiben_collapse input').each(function () {
            $(this).val('');
        });
        $DsAnzDs.html("");
        $DsAnzDsLabel.html("");
        if (dsName) {
            _.each(window.adb.dsVonObjekten.rows, function (dsVonObjektenRow) {
                if (dsVonObjektenRow.key[1] === dsName) {
                    $DsName.val(dsName);
                    _.each(dsVonObjektenRow.key[4], function (feldwert, feldname) {
                        if (feldname === "Ursprungsdatensammlung") {
                            $("#DsUrsprungsDs").val(feldwert);
                        } else if (feldname !== "importiert von") {
                            $("#Ds" + feldname).val(feldwert);
                        }
                    });
                    if (dsVonObjektenRow.key[2] === true) {
                        $("#DsZusammenfassend").prop('checked', true);
                        // Feld für Ursprungs-DS anzeigen
                        $("#DsUrsprungsDsDiv").show();
                    } else {
                        // sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere DS gewählt wird
                        $("#DsZusammenfassend").prop('checked', false);
                        // und Feld für Ursprungs-DS verstecken
                        $("#DsUrsprungsDsDiv").hide();
                    }
                    // wenn die ds/bs kein "importiert von" hat ist der Wert null
                    // verhindern, dass null angezeigt wird
                    if (dsVonObjektenRow.key[3]) {
                        $("#DsImportiertVon").val(dsVonObjektenRow.key[3]);
                    } else {
                        $("#DsImportiertVon").val("");
                    }
                    $DsAnzDsLabel.html("Anzahl Arten/Lebensräume");
                    $DsAnzDs.html(dsVonObjektenRow.value);
                    // dafür sorgen, dass textareas genug gross sind
                    $('#importieren_ds')
                        .find('textarea')
                        .each(function () {
                            fitTextareaToContent(this, document.documentElement.clientHeight);
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