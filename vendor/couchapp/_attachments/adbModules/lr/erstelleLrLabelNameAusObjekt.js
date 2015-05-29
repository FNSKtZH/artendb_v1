'use strict'

var erstelleLrLabelName = require('./erstelleLrLabelName')

module.exports = function (objekt) {
  var label = objekt.Taxonomie.Eigenschaften.Label || '',
    einheit = objekt.Taxonomie.Eigenschaften.Einheit || ''

  return erstelleLrLabelName(label, einheit)
}
