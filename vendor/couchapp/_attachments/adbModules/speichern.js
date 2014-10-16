// schreibt Änderungen in Feldern in die Datenbank
// wird vorläufig nur für LR Taxonomie verwendet

'use strict';

var Uri = require('jsuri');

// braucht $ wegen .collapse
var returnFunction = function ($, feldwert, feldname, ds_name, ds_typ) {
    // zuerst die id des Objekts holen
    var uri = new Uri($(location).attr('href')),
        id = uri.getQueryParamValue('id'),
        // wenn browser history nicht unterstützt, erstellt history.js eine hash
        // dann muss die id durch die id in der hash ersetzt werden
        hash = uri.anchor(),
        uri2;
    if (hash) {
        uri2 = new Uri(hash);
        id = uri2.getQueryParamValue('id');
    }
    // sicherstellen, dass boolean, float und integer nicht in Text verwandelt werden
    feldwert = window.adb.convertToCorrectType(feldwert);

    $.ajax('http://localhost:5984/artendb/' + id, {
        type: 'GET',
        dataType: "json"
    }).done(function (object) {
        // prüfen, ob Einheit eines LR verändert wurde. Wenn ja: Name der Taxonomie anpassen
        if (feldname === "Einheit" && object.Taxonomie.Eigenschaften.Einheit === object.Taxonomie.Eigenschaften.Taxonomie) {
            // das ist die Wurzel der Taxonomie
            // somit ändert auch der Taxonomiename
            // diesen mitgeben
            // Einheit ändert und Taxonomiename muss auch angepasst werden
            object.Taxonomie.Name = feldwert;
            object.Taxonomie.Eigenschaften.Taxonomie = feldwert;
            // TODO: prüfen, ob die Änderung zulässig ist (Taxonomiename eindeutig) --- VOR DEM SPEICHERN
            // TODO: allfällige Beziehungen anpassen
        }
        // den übergebenen Wert im übergebenen Feldnamen speichern
        object.Taxonomie.Eigenschaften[feldname] = feldwert;
        $.ajax('http://localhost:5984/artendb/' + object._id, {
            type: 'PUT',
            dataType: "json",
            data: JSON.stringify(object)
        }).done(function (data) {
            var initiiereArt = require('./initiiereArt'),
                ersetzeUngueltigeZeichenInIdNamen = require('./ersetzeUngueltigeZeichenInIdNamen');
            object._rev = data.rev;
            // prüfen, ob Label oder Name eines LR verändert wurde. Wenn ja: Hierarchie aktualisieren
            if (feldname === "Label" || feldname === "Einheit") {
                if (feldname === "Einheit" && object.Taxonomie.Eigenschaften.Einheit === object.Taxonomie.Eigenschaften.Taxonomie) {
                    // das ist die Wurzel der Taxonomie
                    // somit ändert auch der Taxonomiename
                    // diesen mitgeben
                    // Einheit ändert und Taxonomiename muss auch angepasst werden
                    window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, feldwert);
                    // Feld Taxonomie und Beschriftung des Accordions aktualisiern
                    // dazu neu initiieren, weil sonst das Accordion nicht verändert wird
                    initiiereArt ($, id);
                    // Taxonomie anzeigen
                    $('#' + ersetzeUngueltigeZeichenInIdNamen(feldwert)).collapse('show');
                } else {
                    window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, false);
                }
                // node umbenennen
                var neuer_nodetext;
                if (feldname === "Label") {
                    // object hat noch den alten Wert für Label, neuen verwenden
                    neuer_nodetext = window.adb.erstelleLrLabelName(feldwert, object.Taxonomie.Eigenschaften.Einheit);
                } else {
                    // object hat noch den alten Wert für Einheit, neuen verwenden
                    neuer_nodetext = window.adb.erstelleLrLabelName(object.Taxonomie.Eigenschaften.Label, feldwert);
                }
                $("#tree" + window.adb.Gruppe).jstree("rename_node", "#" + object._id, neuer_nodetext);
            }
        }).fail(function () {
            meldeFehler (feldname);
        });
    }).fail(function () {
        meldeFehler (feldname);
    });
};

function meldeFehler (feldname) {
    $("#meldung_individuell_label").html("Fehler");
    $("#meldung_individuell_text").html("Die letzte Änderung im Feld " + feldname + " wurde nicht gespeichert");
    $("#meldung_individuell_schliessen").html("schliessen");
    $('#meldung_individuell').modal();
}

module.exports = returnFunction;