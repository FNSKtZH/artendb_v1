// erstellt die HTML für eine Beziehung
// benötigt von der art bzw. den lr die entsprechende Beziehungssammlung
// altName ist für Beziehungssammlungen von Synonymen:
// Hier kann dieselbe DS zwei mal vorkommen und sollte nicht gleich heissen,
// sonst geht nur die erste auf

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

var returnFunction = function (art, beziehungssammlung, alt_name) {
    var html,
        name,
        ersetzeUngueltigeZeichenInIdNamen = require('./ersetzeUngueltigeZeichenInIdNamen'),
        bsName = ersetzeUngueltigeZeichenInIdNamen(beziehungssammlung.Name) + alt_name,
        erstelleHtmlFuerDatensammlungBeschreibung = require('./erstelleHtmlFuerDatensammlungBeschreibung'),
        erstelleHtmlFuerFeld = require('./erstelleHtmlFuerFeld');

    // Accordion-Gruppe und -heading anfügen
    html = '<div class="panel panel-default"><div class="panel-heading panel-heading-gradient"><h4 class="panel-title">';
    // die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
    html += '<a class="Datensammlung accordion-toggle" data-toggle="collapse" data-parent="#panel_art" href="#collapse' + bsName + '">';
    // Titel für die Datensammlung einfügen
    html += beziehungssammlung.Name + " (" + beziehungssammlung.Beziehungen.length + ")";
    // header abschliessen
    html += '</a></h4></div>';
    // body beginnen
    html += '<div id="collapse' + bsName + '" class="panel-collapse collapse"><div class="panel-body">';

    // Datensammlung beschreiben
    html += erstelleHtmlFuerDatensammlungBeschreibung(beziehungssammlung);

    // die Beziehungen sortieren
    beziehungssammlung.Beziehungen = window.adb.sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);

    // jetzt für alle Beziehungen die Felder hinzufügen
    _.each(beziehungssammlung.Beziehungen, function (beziehung, index) {
        if (beziehung.Beziehungspartner && beziehung.Beziehungspartner.length > 0) {
            _.each(beziehung.Beziehungspartner, function (beziehungspartner) {
                if (beziehungspartner.Taxonomie) {
                    name = beziehungspartner.Gruppe + ": " + beziehungspartner.Taxonomie + " > " + beziehungspartner.Name;
                } else {
                    name = beziehungspartner.Gruppe + ": " + beziehungspartner.Name;
                }
                // Partner darstellen
                if (beziehungspartner.Rolle) {
                    // Feld soll mit der Rolle beschriftet werden
                    html += window.adb.generiereHtmlFürObjektlink(beziehungspartner.Rolle, name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + beziehungspartner.GUID);
                } else {
                    html += window.adb.generiereHtmlFürObjektlink("Beziehungspartner", name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + beziehungspartner.GUID);
                }
            });
        }
        // Die Felder anzeigen
        _.each(beziehung, function (feldwert, feldname) {
            if (feldname !== "Beziehungspartner") {
                html += erstelleHtmlFuerFeld(feldname, feldwert, "Beziehungssammlung", beziehungssammlung.Name.replace(/"/g, "'"));
            }
        });
        // Am Schluss eine Linie, nicht aber bei der letzten Beziehung
        if (index < (beziehungssammlung.Beziehungen.length-1)) {
            html += "<hr>";
        }
    });
    // body und Accordion-Gruppe abschliessen
    html += '</div></div></div>';
    return html;
};

module.exports = returnFunction;