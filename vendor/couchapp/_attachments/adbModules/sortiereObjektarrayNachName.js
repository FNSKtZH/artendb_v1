// Beziehungssammlungen bzw. Datensammlungen nach Name sortieren

'use strict'

module.exports = function (objektarray) {
  objektarray.sort(function (a, b) {
    var aName = a.Name,
      bName = b.Name
    if (aName && bName) {
      return (aName.toLowerCase() === bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1
    }
    return (aName === bName) ? 0 : (aName > bName) ? 1 : -1
  })
  return objektarray
}
