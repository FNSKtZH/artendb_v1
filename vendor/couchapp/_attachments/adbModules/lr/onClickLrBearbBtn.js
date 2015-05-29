// wenn .btn.lrBearbBtn geklickt wird

'use strict'

var $ = require('jquery'),
  bearbeiteLrTaxonomie = require('./bearbeiteLrTaxonomie')

module.exports = function () {
  if (!$(this).hasClass('disabled')) {
    bearbeiteLrTaxonomie()
  }
}
