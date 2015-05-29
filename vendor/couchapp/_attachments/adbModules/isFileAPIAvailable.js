'use strict'

var $ = require('jquery')

module.exports = function () {
  var html

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    return true
  }

  // source: File API availability - //caniuse.com/#feat=fileapi
  // source: <output> availability - //html5doctor.com/the-output-element/
  html = 'Für den Datenimport benötigen Sie mindestens einen der folgenden Browser:<br>'
  html += '(Stand März 2014)<br>'
  html += '- Google Chrome: 31 oder neuer<br>'
  html += '- Chrome auf Android: 33 oder neuer<br>'
  html += '- Mozilla Firefox: 28 oder neuer<br>'
  html += '- Firefox auf Android: 26 oder neuer<br>'
  html += '- Safari: 7.0 oder neuer<br>'
  html += '- iOs Safari: 6.0 oder neuer<br>'
  html += '- Opera: 20 oder neuer<br>'
  html += '- Internet Explorer: 10 oder neuer<br>'
  html += '- Internet Explorer mobile: bis Version 10 nicht<br>'
  html += '- Android Standardbrowser: Android 4.4 oder neuer<br>'

  $('#fileApiMeldungText').html(html)
  $('#fileApiMeldung').modal()

  return false
}
