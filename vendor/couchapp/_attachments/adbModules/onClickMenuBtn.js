// wenn menuBtn geklickt wird
// Menu: Links zu Google Bilder und Wikipedia nur aktiv setzen, wenn Art oder Lebensraum angezeigt wird

'use strict'

var $ = require('jquery')

module.exports = function () {
  if (window.localStorage.art_id) {
    $('#GoogleBilderLink_li').removeClass('disabled')
    $('#WikipediaLink_li').removeClass('disabled')
  } else {
    $('#GoogleBilderLink_li').addClass('disabled')
    $('#WikipediaLink_li').addClass('disabled')
  }
}
