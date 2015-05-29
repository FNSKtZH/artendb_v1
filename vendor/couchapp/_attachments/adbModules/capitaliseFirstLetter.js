/**
 * übernimmt einen string
 * der erste Buchstabe wird mit einem Grossbuchstaben ersetzt
 */

'use strict'

module.exports = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
