// Wenn BsWählen geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                    = require('underscore'),
    $                    = require('jquery'),
    fitTextareaToContent = require('../fitTextareaToContent');

module.exports = function () {
    var that           = this,
        bsName         = that.value,
        waehlbar       = false,
        $BsAnzDs       = $("#BsAnzDs"),
        $BsAnzDs_label = $("#BsAnzDs_label"),
        $BsName        = $("#BsName"),
        $importieren_bs_ds_beschreiben_hinweis2 = $("#importieren_bs_ds_beschreiben_hinweis2");
    // allfälligen Alert schliessen
    $importieren_bs_ds_beschreiben_hinweis2
        .alert()
        .hide();
    // waehlbar setzen
    // wählen kann man nur, was man selber importiert hat - oder admin ist
    waehlbar = $("#" + that.id + " option:selected").attr("waehlbar") === "true" ? true : Boolean(localStorage.admin);
    if (waehlbar) {
        // zuerst alle Felder leeren
        $('#importieren_bs_ds_beschreiben_collapse textarea, #importieren_bs_ds_beschreiben_collapse input').each(function () {
            $(this).val('');
        });
        $BsAnzDs.html("");
        $BsAnzDs_label.html("");
        if (bsName) {
            _.each(window.adb.bsVonObjekten.rows, function (bsRow) {
                if (bsRow.key[1] === bsName) {
                    $BsName.val(bsName);
                    _.each(bsRow, function (feldwert, feldname) {
                        if (feldname === "Ursprungsdatensammlung") {
                            $("#BsUrsprungsBs").val(feldwert);
                        } else if (feldname !== "importiert von") {
                            $("#Bs" + feldname).val(feldwert);
                        }
                    });
                    if (bsRow.key[2] === true) {
                        $("#BsZusammenfassend").prop('checked', true);
                        $("#BsUrsprungsBs_div").show();
                    } else {
                        // sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere BS gewählt wird
                        $("#BsZusammenfassend").prop('checked', false);
                        $("#BsUrsprungsBs_div").hide();
                    }
                    // wenn die ds/bs kein "importiert von" hat ist der Wert null
                    // verhindern, dass null angezeigt wird
                    if (bsRow.key[3]) {
                        $("#BsImportiertVon").val(bsRow.key[3]);
                    } else {
                        $("#BsImportiertVon").val("");
                    }
                    $BsAnzDs_label.html("Anzahl Arten/Lebensräume");
                    $BsAnzDs.html(bsRow.value);
                    // dafür sorgen, dass textareas genug gross sind
                    $('#importierenBs').find('textarea').each(function () {
                        fitTextareaToContent(this, document.documentElement.clientHeight);
                    });
                    $BsName.focus();
                }
                // löschen-Schaltfläche einblenden
                $("#BsLoeschen").show();
            });
        } else {
            // löschen-Schaltfläche ausblenden
            $("#BsLoeschen").hide();
        }
    } else {
        // melden, dass diese BS nicht bearbeitet werden kann
        $("#importieren_bs_ds_beschreiben_hinweis2_text")
            .html("Sie können nur Beziehungssammlungen verändern, die Sie selber importiert haben.<br>Ausnahme: Zusammenfassende Beziehungssammlungen.");
        $importieren_bs_ds_beschreiben_hinweis2
            .alert()
            .removeClass("alert-success")
            .removeClass("alert-info")
            .addClass("alert-danger")
            .show();
        $('html, body').animate({
            scrollTop: $("#BsWaehlen").offset().top
        }, 2000);
    }
};