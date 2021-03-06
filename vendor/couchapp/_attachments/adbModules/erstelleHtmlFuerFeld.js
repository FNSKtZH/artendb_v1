// übernimmt Feldname und Feldwert
// generiert daraus und retourniert html für die Darstellung im passenden Feld

'use strict'

var generiereHtmlFuerWwwLink = require('./generiereHtmlFuerWwwLink'),
  generiereHtmlFuerTextinput = require('./generiereHtmlFuerTextinput'),
  generiereHtmlFuerTextarea = require('./generiereHtmlFuerTextarea'),
  generiereHtmlFuerBoolean = require('./generiereHtmlFuerBoolean')

module.exports = function (feldname, feldwert, dsTyp, dsName) {
  var html = ''

  if ((typeof feldwert === 'string' && feldwert.slice(0, 7) === 'http://') || (typeof feldwert === 'string' && feldwert.slice(0, 8) === 'https://') || (typeof feldwert === 'string' && feldwert.slice(0, 2) === '//')) {
    // www-Links als Link darstellen
    html += generiereHtmlFuerWwwLink(feldname, feldwert, dsTyp, dsName)
  } else if (typeof feldwert === 'string' && feldwert.length < 45) {
    html += generiereHtmlFuerTextinput(feldname, feldwert, 'text', dsTyp, dsName)
  } else if (typeof feldwert === 'string' && feldwert.length >= 45) {
    html += generiereHtmlFuerTextarea(feldname, feldwert, dsTyp)
  } else if (typeof feldwert === 'number') {
    html += generiereHtmlFuerTextinput(feldname, feldwert, 'number', dsTyp, dsName)
  } else if (typeof feldwert === 'boolean') {
    html += generiereHtmlFuerBoolean(feldname, feldwert, dsTyp, dsName)
  } else {
    html += generiereHtmlFuerTextinput(feldname, feldwert, 'text', dsTyp, dsName)
  }
  return html
}
