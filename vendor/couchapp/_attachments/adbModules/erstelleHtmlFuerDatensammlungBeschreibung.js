/*jslint node: true */
'use strict';

var Autolinker = require('autolinker');

var returnFunction = function (es_oder_bs) {
    var html = '<div class="Datensammlung BeschreibungDatensammlung">';
    if (es_oder_bs.Beschreibung) {
        html += es_oder_bs.Beschreibung;
    }
    // wenn weitere Infos kommen: diese können wahlweise eingeblendet werden
    if (es_oder_bs.Datenstand || es_oder_bs.Link || (es_oder_bs.zusammenfassend && es_oder_bs.Ursprungsdatensammlung)) {
        // wenn keine Beschreibung existiert, andere Option einblenden
        if (es_oder_bs.Beschreibung) {
            html += ' <a href="#" class="show_next_hidden">...mehr</a>';
        } else {
            // wenn keine Beschreibung existiert, andere Option einblenden
            html += '<a href="#" class="show_next_hidden">Beschreibung der Datensammlung anzeigen</a>';
        }
        html += '<div class="adb-hidden">';
        if (es_oder_bs.Datenstand) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Stand: </div>';
            html += '<div>' + es_oder_bs.Datenstand + '</div>';
            html += '</div>';
        }
        if (es_oder_bs.Link) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Link: </div>';
            html += '<div>' + Autolinker.link(es_oder_bs.Link) + '</div>';
            html += '</div>';
        }
        if (es_oder_bs["importiert von"]) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Importiert von: </div>';
            html += '<div>' + Autolinker.link(es_oder_bs["importiert von"]) + '</div>';
            html += '</div>';
        }
        if (es_oder_bs.zusammenfassend && es_oder_bs.Ursprungsdatensammlung) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Zus.-fassend:</div>';
            html += '<div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen.<br>Die angezeigten Informationen stammen aus der Eigenschaftensammlung "' + es_oder_bs.Ursprungsdatensammlung + '"</div>';
            html += '</div>';
        } else if (es_oder_bs.zusammenfassend && !es_oder_bs.Ursprungsdatensammlung) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Zus.-fassend:</div>';
            html += '<div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen.<br>Bei den angezeigten Informationen ist die Ursprungs-Eigenschaftensammlung leider nicht beschrieben</div>';
            html += '</div>';
        }
        // zusätzliche Infos abschliessen
        html += '</div>';
    }
    // Beschreibung der Datensammlung abschliessen
    html += '</div>';
    return html;
};

module.exports = returnFunction;