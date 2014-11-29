// übernimmt eine Array mit Objekten
// und den div, in dem die Tabelle eingefügt werden soll
// plus einen div, in dem die Liste der Felder angzeigt wird (falls dieser div mitgeliefert wird)
// baut damit eine Tabelle auf und fügt sie in den übergebenen div ein
// formular: wenn Aufruf von exportAlt kommt, werden nur die ersten 10 Datensätze angezeigt

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

module.exports = function (datensaetze, felderDiv, tabellenDiv, formular) {
    var html = "",
        Feldname = "",
        htmlDsFelderDiv = "",
        erste10Ds,
        $tabellenDiv = $("#" + tabellenDiv);

    if (!formular || formular !== 'exportAlt') {
        if (datensaetze.length > 10) {
            html += "Vorschau der ersten 10 von " + datensaetze.length + " Datensätzen:";
        } else if (datensaetze.length > 1) {
            html += "Vorschau der " + datensaetze.length + " Datensätze:";
        } else {
            html += "Vorschau des einzigen Datensatzes:";
        }
    } else if (formular && formular === 'exportAlt') {
        html += "Vorschau der ersten 10 Datensätze:";
    }

    // Tabelle initiieren
    html += '<div class="table-responsive"><table class="table table-bordered table-striped table-condensed table-hover">';
    // Titelzeile aufbauen
    // Zeile anlegen
    // gleichzeitig Feldliste für Formular anlegen
    if (felderDiv) {
        if (felderDiv === "DsFelder_div") {
            Feldname = "DsFelder";
        } else if (felderDiv === "BsFelder_div") {
            Feldname = "BsFelder";
        }
    }
    htmlDsFelderDiv += '<label class="control-label" for="' + Feldname + '">Feld mit eindeutiger ID<br>in den Importdaten</label>';
    htmlDsFelderDiv += '<select multiple class="controls form-control input-sm" id="' + Feldname + '" style="height:' + ((Object.keys(datensaetze[0]).length * 19) + 9)  + 'px">';
    html += "<thead><tr>";

    // Tabellenzeilen aufbauen
    // nur die ersten 10 Datensätze anzeigen
    erste10Ds = _.first(datensaetze, 10);

    if (formular === 'exportAlt') {
        // die obligatorischen Felder müssen immer enthalten sein
        // sonst fehlen in der Tabelle oder Titelzeile Zellen
        _.each(erste10Ds, function (ds) {
            /*jslint white: true */
            if (!ds.ref)      { ds.ref      = ''; }
            if (!ds.gisLayer) { ds.gisLayer = ''; }
            if (!ds.distance) { ds.distance = ''; }
            if (!ds.nameLat)  { ds.nameLat  = ''; }
            if (!ds.nameDeu)  { ds.nameDeu  = ''; }
            if (!ds.artwert)  { ds.artwert  = ''; }
        });
    }

    // durch die Felder des ersten Datensatzes zirkeln
    _.each(erste10Ds[0], function (feldwert, feldname) {
        // Spalte anlegen
        html += "<th>" + feldname + "</th>";
        // Option für Feldliste anfügen
        htmlDsFelderDiv += '<option value="' + feldname + '">' + feldname + '</option>';
    });
    // Titelzeile abschliessen
    html += "</tr></thead><tbody>";
    // Feldliste abschliessen
    htmlDsFelderDiv += '</select>';
    if (felderDiv) {
        // nur, wenn ein felderDiv übergeben wurde
        $("#" + felderDiv).html(htmlDsFelderDiv);
    }

    // Tabellenzeilen aufbauen
    _.each(erste10Ds, function (datensatz) {
        // Zeile anlegen
        html += "<tr>";
        // durch die Felder zirkeln
        _.each(datensatz, function (feldwert, feldname) {
            // Spalte anlegen
            html += "<td>";
            if (feldwert === null) {
                // Null-Werte als leer anzeigen
                html += "";
            } else if (typeof feldwert === "object") {
                html += JSON.stringify(feldwert);
            } else if (feldwert || feldwert === 0) {
                html += feldwert;
            } else if (feldwert === false) {
                // dafür sogen, dass false auch angezeigt wird
                // ohne diese Zeile bleibt das Feld sonst leer
                html += feldwert;
            } else {
                // nullwerte als leerwerte (nicht) anzeigen
                html += "";
            }
            // Spalte abschliessen
            html += "</td>";
        });
        // Zeile abschliessen
        html += "</tr>";
    });

    // Tabelle abschliessen
    html += '</tbody></table></div>';
    // html in div einfügen
    $tabellenDiv
        .html(html)
        .css("margin-top", "20px")
        // sichtbar stellen
        .show();

    // fenster scrollen
    if (!formular) {
        $('html, body').animate({
            scrollTop: $tabellenDiv.offset().top
        }, 2000);
    }
};