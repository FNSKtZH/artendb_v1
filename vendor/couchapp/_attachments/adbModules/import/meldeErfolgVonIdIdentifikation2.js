/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (mehrfachVorkommendeIds, idsVonDatensaetzen, idsVonNichtImportierbarenDatensaetzen, dbs) {
    var $importieren_dbs_ids_identifizieren_hinweis_text = $("#importieren" + dbs + "IdsIdentifizierenHinweisText");
    $importieren_dbs_ids_identifizieren_hinweis_text.alert();
    // rückmelden: Falls mehrfache ID's, nur das rückmelden und abbrechen
    if (mehrfachVorkommendeIds.length && dbs !== "Bs") {
        $importieren_dbs_ids_identifizieren_hinweis_text
            .html("Die folgenden ID's kommen mehrfach vor: " + mehrfachVorkommendeIds + "<br>Bitte entfernen oder korrigieren Sie die entsprechenden Zeilen")
            .removeClass("alert-info")
            .removeClass("alert-success")
            .addClass("alert-danger");
    } else if (window.adb.zuordbareDatensaetze.length < idsVonDatensaetzen.length) {
        // rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
        if (window.adb.zuordbareDatensaetze.length > 0) {
            // ein Teil der Datensätze kann importiert werden. Als Hinweis melden
            $importieren_dbs_ids_identifizieren_hinweis_text
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-info");
        } else {
            // keine Datensätze können importier werden. Als Misserfolg melden
            $importieren_dbs_ids_identifizieren_hinweis_text
                .removeClass("alert-info")
                .removeClass("alert-success")
                .addClass("alert-danger");
        }
        if (dbs === "Bs") {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase() + "Datensaetze"].length + " Beziehungen von " + idsVonDatensaetzen.length + " Arten:<br>Beziehungen von " + idsVonDatensaetzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs + "FelderId"] + "\"<br>" + window.adb.zuordbareDatensaetze.length + " können zugeordnet und importiert werden<br>ACHTUNG: Beziehungen von " + idsVonNichtImportierbarenDatensaetzen.length + " Arten mit den folgenden Werten im Feld \"" + window.adb[dbs + "FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + idsVonNichtImportierbarenDatensaetzen);
        } else {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase() + "Datensaetze"].length + " Datensätze:<br>" + idsVonDatensaetzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs + "FelderId"] + "\"<br>" + window.adb.zuordbareDatensaetze.length + " können zugeordnet und importiert werden<br>ACHTUNG: " + idsVonNichtImportierbarenDatensaetzen.length + " Datensätze mit den folgenden Werten im Feld \"" + window.adb[dbs + "FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + idsVonNichtImportierbarenDatensaetzen);
        }
        $("#" + dbs + "Importieren").show();
        $("#" + dbs + "Entfernen").show();
    } else {
        // rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
        $importieren_dbs_ids_identifizieren_hinweis_text
            .removeClass("alert-info")
            .removeClass("alert-danger")
            .addClass("alert-success");
        if (dbs === "Bs") {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase() + "Datensaetze"].length + " Beziehungen von " + idsVonDatensaetzen.length + " Arten:<br>Beziehungen von " + idsVonDatensaetzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs + "FelderId"] + "\"<br>Beziehungen von " + window.adb.zuordbareDatensaetze.length + " Arten können zugeordnet und importiert werden");
        } else {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase() + "Datensaetze"].length + " Datensätze:<br>" + idsVonDatensaetzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs + "FelderId"] + "\"<br>" + window.adb.zuordbareDatensaetze.length + " können zugeordnet und importiert werden");
        }
        $("#" + dbs + "Importieren").show();
        $("#" + dbs + "Entfernen").show();
    }
    $importieren_dbs_ids_identifizieren_hinweis_text.show();
    $('html, body').animate({
        scrollTop: $("#importieren" + dbs + "IdsIdentifizierenCollapse").offset().top
    }, 2000);
};