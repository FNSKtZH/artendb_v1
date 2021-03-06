'use strict'

// Autolinker caused error: Uncaught TypeError: textOrHtml.substring is not a function
// make sure not to update above v0.22
var Autolinker = require('autolinker')

module.exports = function (esOderBs) {
  var html = '<div class="Datensammlung beschreibungDatensammlung">'

  if (esOderBs.Beschreibung) {
    html += esOderBs.Beschreibung
  }
  // wenn weitere Infos kommen: diese können wahlweise eingeblendet werden
  if (esOderBs.Datenstand || esOderBs.Nutzungsbedingungen || esOderBs.Link || (esOderBs.zusammenfassend && esOderBs.Ursprungsdatensammlung)) {
    // wenn keine Beschreibung existiert, andere Option einblenden
    if (esOderBs.Beschreibung) {
      html += ' <a href="#" class="showNextHidden">...mehr</a>'
    } else {
      // wenn keine Beschreibung existiert, andere Option einblenden
      html += '<a href="#" class="showNextHidden">Beschreibung der Datensammlung anzeigen</a>'
    }
    html += '<div class="adb-hidden">'
    if (esOderBs.Datenstand) {
      html += '<div class="dsBeschreibungZeile">'
      html += '<div>Stand: </div>'
      html += '<div>' + esOderBs.Datenstand + '</div>'
      html += '</div>'
    }
    if (esOderBs.Nutzungsbedingungen) {
      html += '<div class="dsBeschreibungZeile">'
      html += '<div>Nutzungs-<br>bedingungen: </div>'
      html += '<div>' + esOderBs.Nutzungsbedingungen + '</div>'
      html += '</div>'
    }
    if (esOderBs.Link) {
      html += '<div class="dsBeschreibungZeile">'
      html += '<div>Link: </div>'
      html += '<div>' + Autolinker.link(esOderBs.Link ? '' + esOderBs.Link : '') + '</div>'
      html += '</div>'
    }
    if (esOderBs['importiert von']) {
      html += '<div class="dsBeschreibungZeile">'
      html += '<div>Importiert von: </div>'
      html += '<div>' + Autolinker.link(esOderBs['importiert von'] ? '' + esOderBs['importiert von'] : '') + '</div>'
      html += '</div>'
    }
    if (esOderBs.zusammenfassend && esOderBs.Ursprungsdatensammlung) {
      html += '<div class="dsBeschreibungZeile">'
      html += '<div>Zus.-fassend:</div>'
      html += '<div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen.<br>Die angezeigten Informationen stammen aus der Eigenschaftensammlung "' + esOderBs.Ursprungsdatensammlung + '"</div>'
      html += '</div>'
    } else if (esOderBs.zusammenfassend && !esOderBs.Ursprungsdatensammlung) {
      html += '<div class="dsBeschreibungZeile">'
      html += '<div>Zus.-fassend:</div>'
      html += '<div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen.<br>Bei den angezeigten Informationen ist die Ursprungs-Eigenschaftensammlung leider nicht beschrieben</div>'
      html += '</div>'
    }
    // zusätzliche Infos abschliessen
    html += '</div>'
  }
  // Beschreibung der Datensammlung abschliessen
  html += '</div>'
  return html
}
