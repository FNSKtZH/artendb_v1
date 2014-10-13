// baut im Formular "export" die Liste aller Eigenschaften auf
// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
// bekommt den Namen der Gruppe

'use strict';

var _ = require('underscore');

// braucht $ wegen .alert
var returnFunction = function ($) {
    var export_gruppen = [],
        gruppen = [],
        $exportieren_objekte_waehlen_gruppen_hinweis_text   = $("#exportieren_objekte_waehlen_gruppen_hinweis_text"),
        $exportieren_nur_objekte_mit_eigenschaften_checkbox = $("#exportieren_nur_objekte_mit_eigenschaften_checkbox"),
        $exportieren_nur_objekte_mit_eigenschaften          = $("#exportieren_nur_objekte_mit_eigenschaften"),
        $exportieren_exportieren_collapse                   = $("#exportieren_exportieren_collapse"),
        $exportieren_felder_waehlen_collapse                = $("#exportieren_felder_waehlen_collapse"),
        $exportieren_objekte_waehlen_ds_collapse            = $("#exportieren_objekte_waehlen_ds_collapse");

    // falls noch offen: folgende Bereiche schliessen
    if ($exportieren_exportieren_collapse.is(':visible')) {
        $exportieren_exportieren_collapse.collapse('hide');
    }
    if ($exportieren_felder_waehlen_collapse.is(':visible')) {
        $exportieren_felder_waehlen_collapse.collapse('hide');
    }
    if ($exportieren_objekte_waehlen_ds_collapse.is(':visible')) {
        $exportieren_objekte_waehlen_ds_collapse.collapse('hide');
    }

    // Beschäftigung melden
    $exportieren_objekte_waehlen_gruppen_hinweis_text
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show()
        .html("Eigenschaften werden ermittelt...");
    // scrollen, damit Hinweis sicher ganz sichtbar ist
    $('html, body').animate({
        scrollTop: $exportieren_objekte_waehlen_gruppen_hinweis_text.offset().top
    }, 2000);
    // gewählte Gruppen ermitteln
    // globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
    // globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
    var export_felder_arrays = [];
    $(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
        if ($(this).prop('checked')) {
            export_gruppen.push($(this).val());
        }
    });
    /*if (export_gruppen.length > 1) {
        // wenn mehrere Gruppen gewählt werden
        // Option exportieren_nur_objekte_mit_eigenschaften ausblenden
        // und false setzen
        // sonst kommen nur die DS einer Gruppe
        $exportieren_nur_objekte_mit_eigenschaften_checkbox.addClass("adb-hidden");
        $exportieren_nur_objekte_mit_eigenschaften.prop('checked', false);
    } else {
        if ($exportieren_nur_objekte_mit_eigenschaften_checkbox.hasClass("adb-hidden")) {
            $exportieren_nur_objekte_mit_eigenschaften_checkbox.removeClass("adb-hidden")
            $exportieren_nur_objekte_mit_eigenschaften.prop('checked', true);
        }
    }*/
    if (export_gruppen.length > 0) {
        // gruppen einzeln abfragen
        gruppen = export_gruppen;
        _.each(gruppen, function(gruppe) {
            // Felder abfragen
            $.ajax('http://localhost:5984/artendb/_design/artendb/_view/felder', {
                type: 'GET',
                dataType: "json",
                data: {
                    group_level: 5,
                    startkey: '["' + gruppe + '"]',
                    endkey: '["' + gruppe + '",{},{},{},{}]'
                }
            }).done(function (data) {
                export_felder_arrays = _.union(export_felder_arrays, data.rows);
                //console.log("Die Gruppe " + gruppe + " hat soviele Felder = " + data.rows.length);
                // eine Gruppe aus export_gruppen entfernen
                export_gruppen.splice(0,1);
                if (export_gruppen.length === 0) {
                    // alle Gruppen sind verarbeitet
                    require('./erstelleListeFuerFeldwahl2') ($, export_felder_arrays);
                }
            }).fail(function () {
                console.log('keine Daten erhalten');
            });
        });
    } else {
        // letzte Rückmeldung anpassen
        $exportieren_objekte_waehlen_gruppen_hinweis_text.html("bitte eine Gruppe wählen")
            .removeClass("alert-info")
            .removeClass("alert-success")
            .addClass("alert-danger");
        // Felder entfernen
        $("#exportieren_felder_waehlen_felderliste")
            .html("");
        $("#exportieren_objekte_waehlen_ds_felderliste")
            .html("");
    }
    // Tabelle ausblenden, falls sie eingeblendet war
    $("#exportieren_exportieren_tabelle")
        .hide();
};

module.exports = returnFunction;