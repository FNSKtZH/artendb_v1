// sortiert nach den keys des Objekts
// resultat nicht garantiert!

'use strict'

module.exports = function (object) {
  var sorted = {},
    key,
    a = []

  for (key in object) {
    if (object.hasOwnProperty(key)) {
      a.push(key)
    }
  }

  a.sort()

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = object[a[key]]
  }
  return sorted
}
