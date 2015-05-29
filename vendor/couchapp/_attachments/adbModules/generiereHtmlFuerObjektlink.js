// generiert den html-Inhalt für einzelne Links in Flora

'use strict'

module.exports = function (feldname, feldwert, url) {
  var html

  html = '<div class="form-group"><label class="control-label">'
  html += feldname
  html += ':'
  html += '</label>'
  html += '<p class="form-control-static feldtext controls"><a href="'
  html += url
  html += '" target="_blank">'
  html += feldwert
  html += '</a></p></div>'

  return html
}
