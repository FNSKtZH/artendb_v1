// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!

'use strict'

module.exports = function (wert) {
  if (typeof wert === 'boolean') { return 'boolean' }
  if (parseInt(wert, 10) && parseFloat(wert) && parseInt(wert, 10) !== parseFloat(wert) && parseInt(wert, 10) == wert) { return 'float' }
  // verhindern, dass führende Nullen abgeschnitten werden
  if ((parseInt(wert, 10) == wert && wert.toString().length === Math.ceil(parseInt(wert, 10) / 10)) || wert == '0') { return 'integer' }
  if (typeof wert === 'object') { return 'object' }
  if (typeof wert === 'string') { return 'string' }
  if (wert === undefined) { return 'undefined' }
  if (typeof wert === 'function') { return 'function' }
}
