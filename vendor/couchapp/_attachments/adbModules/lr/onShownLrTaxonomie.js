// wenn .Lebensräume.Taxonomie geöffnet wird

'use strict'

var bearbeiteLrTaxonomie = require('./bearbeiteLrTaxonomie')

module.exports = function () {
  if (localStorage.lrBearb === 'true') {
    bearbeiteLrTaxonomie()
  }
}
