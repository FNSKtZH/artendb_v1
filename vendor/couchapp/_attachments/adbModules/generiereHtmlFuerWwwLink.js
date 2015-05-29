// generiert den html-Inhalt für einzelne Links in Flora

'use strict'

module.exports = function (feldname, feldwert, dsTyp, dsName) {
  var html

  html = '<div class="form-group"><label class="control-label" for="'
  html += feldname
  html += '">'
  html += feldname
  html += ':</label>'
  // jetzt Link beginnen, damit das Feld klickbar wird
  html += '<p><a href="'
  html += feldwert
  html += '"><input class="controls form-control input-sm" dsTyp="' + dsTyp + '" dsName="' + dsName + '" id="'
  html += feldname
  html += '" name="'
  html += feldname
  html += '" type="text" value="'
  html += feldwert
  html += '" readonly="readonly" style="cursor:pointer;">'
  // Link abschliessen
  html += '</a></p>'
  html += '</div>'

  return html
}
