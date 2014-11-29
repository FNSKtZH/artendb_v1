/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                    = require('underscore'),
    $                    = require('jquery'),
    fitTextareaToContent = require('../fitTextareaToContent');

module.exports = function () {
    var dsName         = this.value,
        waehlbar       = false,
        $dsAnzDs       = $("#dsAnzDs"),
        $dsAnzDsLabel  = $("#dsAnzDsLabel"),
        $dsName        = $("#dsName"),
        $importierenDsDsBeschreibenError = $("#importierenDsDsBeschreibenError");

    // allfälligen Alert schliessen
    $importierenDsDsBeschreibenError
        .alert()
        .hide();
    // waehlbar setzen
    // wählen kann man nur, was man selber importiert hat - oder admin ist
    waehlbar = $("#" + this.id + " option:selected").attr("waehlbar") === "true" ? true : Boolean(localStorage.admin);
    if (waehlbar) {
        // zuerst alle Felder leeren
        $('#importierenDsDsBeschreibenCollapse').find('textarea').each(function () {
            $(this).val('');
        });
        $('#importierenDsDsBeschreibenCollapse').find('input').each(function () {
            $(this).val('');
        });
        $dsAnzDs.html("");
        $dsAnzDsLabel.html("");
        if (dsName) {
            _.each(window.adb.dsVonObjekten.rows, function (dsVonObjektenRow) {
                if (dsVonObjektenRow.key[1] === dsName) {
                    $dsName.val(dsName);
                    _.each(dsVonObjektenRow.key[4], function (feldwert, feldname) {
                        if (feldname === "Ursprungsdatensammlung") {
                            $("#dsUrsprungsDs").val(feldwert);
                        } else if (feldname !== "importiert von") {
                            $("#ds" + feldname).val(feldwert);
                        }
                    });
                    if (dsVonObjektenRow.key[2] === true) {
                        $("#dsZusammenfassend").prop('checked', true);
                        // Feld für Ursprungs-DS anzeigen
                        $("#dsUrsprungsDsDiv").show();
                    } else {
                        // sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere DS gewählt wird
                        $("#dsZusammenfassend").prop('checked', false);
                        // und Feld für Ursprungs-DS verstecken
                        $("#dsUrsprungsDsDiv").hide();
                    }
                    // wenn die ds/bs kein "importiert von" hat ist der Wert null
                    // verhindern, dass null angezeigt wird
                    if (dsVonObjektenRow.key[3]) {
                        $("#dsImportiertVon").val(dsVonObjektenRow.key[3]);
                    } else {
                        $("#dsImportiertVon").val("");
                    }
                    $dsAnzDsLabel.html("Anzahl Arten/Lebensräume");
                    $dsAnzDs.html(dsVonObjektenRow.value);
                    // dafür sorgen, dass textareas genug gross sind
                    $('#importierenDs')
                        .find('textarea')
                        .each(function () {
                            fitTextareaToContent(this, document.documentElement.clientHeight);
                        });
                    $dsName.focus();
                }
                // löschen-Schaltfläche einblenden
                $("#dsLoeschen").show();
            });
        } else {
            // löschen-Schaltfläche ausblenden
            $("#dsLoeschen").hide();
        }
    } else {
        // melden, dass diese BS nicht bearbeitet werden kann
        $("#importierenDsDsBeschreibenErrorText")
            .html("Sie können nur Datensammlungen verändern, die Sie selber importiert haben.<br>Ausnahme: Zusammenfassende Datensammlungen.");
        $importierenDsDsBeschreibenError
            .alert()
            .show();
        $('html, body').animate({
            scrollTop: $("#dsWaehlen").offset().top
        }, 2000);
    }
};