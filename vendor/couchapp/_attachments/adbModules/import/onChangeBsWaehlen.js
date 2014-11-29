// Wenn BsWählen geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                    = require('underscore'),
    $                    = require('jquery'),
    fitTextareaToContent = require('../fitTextareaToContent');

module.exports = function () {
    var that          = this,
        bsName        = that.value,
        waehlbar      = false,
        $bsAnzDs      = $("#bsAnzDs"),
        $bsAnzDsLabel = $("#bsAnzDsLabel"),
        $bsName       = $("#bsName"),
        $importierenBsDsBeschreibenHinweis2 = $("#importierenBsDsBeschreibenHinweis2");

    // allfälligen Alert schliessen
    $importierenBsDsBeschreibenHinweis2
        .alert()
        .hide();
    // waehlbar setzen
    // wählen kann man nur, was man selber importiert hat - oder admin ist
    waehlbar = $("#" + that.id + " option:selected").attr("waehlbar") === "true" ? true : Boolean(localStorage.admin);
    if (waehlbar) {
        // zuerst alle Felder leeren
        $('#importierenBsDsBeschreibenCollapse textarea, #importierenBsDsBeschreibenCollapse input').each(function () {
            $(this).val('');
        });
        $bsAnzDs.html("");
        $bsAnzDsLabel.html("");
        if (bsName) {
            _.each(window.adb.bsVonObjekten.rows, function (bsRow) {
                if (bsRow.key[1] === bsName) {
                    $bsName.val(bsName);
                    _.each(bsRow, function (feldwert, feldname) {
                        if (feldname === "Ursprungsdatensammlung") {
                            $("#bsUrsprungsBs").val(feldwert);
                        } else if (feldname !== "importiert von") {
                            $("#bs" + feldname).val(feldwert);
                        }
                    });
                    if (bsRow.key[2] === true) {
                        $("#bsZusammenfassend").prop('checked', true);
                        $("#bsUrsprungsBsDiv").show();
                    } else {
                        // sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere BS gewählt wird
                        $("#bsZusammenfassend").prop('checked', false);
                        $("#bsUrsprungsBsDiv").hide();
                    }
                    // wenn die ds/bs kein "importiert von" hat ist der Wert null
                    // verhindern, dass null angezeigt wird
                    if (bsRow.key[3]) {
                        $("#bsImportiertVon").val(bsRow.key[3]);
                    } else {
                        $("#bsImportiertVon").val("");
                    }
                    $bsAnzDsLabel.html("Anzahl Arten/Lebensräume");
                    $bsAnzDs.html(bsRow.value);
                    // dafür sorgen, dass textareas genug gross sind
                    $('#importierenBs').find('textarea').each(function () {
                        fitTextareaToContent(this, document.documentElement.clientHeight);
                    });
                    $bsName.focus();
                }
                // löschen-Schaltfläche einblenden
                $("#bsLoeschen").show();
            });
        } else {
            // löschen-Schaltfläche ausblenden
            $("#bsLoeschen").hide();
        }
    } else {
        // melden, dass diese BS nicht bearbeitet werden kann
        $("#importierenBsDsBeschreibenHinweis2Text")
            .html("Sie können nur Beziehungssammlungen verändern, die Sie selber importiert haben.<br>Ausnahme: Zusammenfassende Beziehungssammlungen.");
        $importierenBsDsBeschreibenHinweis2
            .alert()
            .removeClass("alert-success")
            .removeClass("alert-info")
            .addClass("alert-danger")
            .show();
        $('html, body').animate({
            scrollTop: $("#bsWaehlen").offset().top
        }, 2000);
    }
};