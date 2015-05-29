// wenn exportieren geklickt wird

'use strict'

var zeigeFormular = require('./zeigeFormular')

module.exports = function () {
  zeigeFormular('export')
  delete window.adb.exportierenObjekte
}
