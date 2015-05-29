// wenn .btn.lrBearbSchuetzen geklickt wird

'use strict'

var $ = require('jquery'),
  schuetzeLrTaxonomie = require('./schuetzeLrTaxonomie')

module.exports = function () {
  if (!$(this).hasClass('disabled')) {
    schuetzeLrTaxonomie()
    // Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
    delete window.localStorage.lrBearb
  }
}
