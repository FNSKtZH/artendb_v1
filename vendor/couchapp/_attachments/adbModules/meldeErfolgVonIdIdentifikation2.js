/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/


'use strict';

// braucht $ wegen .alert
var returnFunction = function ($, mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs) {
    var $importieren_dbs_ids_identifizieren_hinweis_text = $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_hinweis_text");
    $importieren_dbs_ids_identifizieren_hinweis_text.alert();
    // rückmelden: Falls mehrfache ID's, nur das rückmelden und abbrechen
    if (mehrfach_vorkommende_ids.length && dbs !== "Bs") {
        $importieren_dbs_ids_identifizieren_hinweis_text
            .html("Die folgenden ID's kommen mehrfach vor: " + mehrfach_vorkommende_ids + "<br>Bitte entfernen oder korrigieren Sie die entsprechenden Zeilen")
            .removeClass("alert-info")
            .removeClass("alert-success")
            .addClass("alert-danger");
    } else if (window.adb.ZuordbareDatensätze.length < ids_von_datensätzen.length) {
        // rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
        if (window.adb.ZuordbareDatensätze.length > 0) {
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
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase() + "Datensätze"].length + " Beziehungen von " + ids_von_datensätzen.length + " Arten:<br>Beziehungen von " + ids_von_datensätzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs + "FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: Beziehungen von " + ids_von_nicht_importierbaren_datensätzen.length + " Arten mit den folgenden Werten im Feld \"" + window.adb[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + ids_von_nicht_importierbaren_datensätzen);
        } else {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + ids_von_datensätzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs + "FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: " + ids_von_nicht_importierbaren_datensätzen.length + " Datensätze mit den folgenden Werten im Feld \"" + window.adb[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + ids_von_nicht_importierbaren_datensätzen);
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
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + ids_von_datensätzen.length + " Arten:<br>Beziehungen von " + ids_von_datensätzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs + "FelderId"] + "\"<br>Beziehungen von " + window.adb.ZuordbareDatensätze.length + " Arten können zugeordnet und importiert werden");
        } else {
            $importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase() + "Datensätze"].length + " Datensätze:<br>" + ids_von_datensätzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs + "FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden");
        }
        $("#" + dbs + "Importieren").show();
        $("#" + dbs + "Entfernen").show();
    }
    $importieren_dbs_ids_identifizieren_hinweis_text.show();
    $('html, body').animate({
        scrollTop: $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_collapse").offset().top
    }, 2000);
};

module.exports = returnFunction;