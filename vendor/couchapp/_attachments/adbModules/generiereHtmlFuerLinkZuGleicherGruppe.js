// generiert den html-Inhalt für einzelne Links in Flora

'use strict'

module.exports = function (feldName, id, artname) {
  var html

  html = '<div class="form-group"><label class="control-label">'
  html += feldName
  html += ':</label><p class="form-control-static controls feldtext"><a href="#" class="linkZuArtGleicherGruppe" ArtId="'
  html += id
  html += '">'
  html += artname
  html += '</a></p></div>'

  return html
}
