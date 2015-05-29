'use strict'

module.exports = function (feldWert) {
  var myTypeOf = require('lists/lib/myTypeOf'),
    type = myTypeOf(feldWert)

  if (type === 'boolean') { return Boolean(feldWert) }
  if (type === 'float') { return parseFloat(feldWert) }
  if (type === 'integer') { return parseInt(feldWert, 10) }
  if (type === 'string') { return feldWert.toLowerCase() } // string jetzt kleinschreiben, damit das nicht später erfolgen muss
  // object nicht umwandeln. Man muss beim Vergleichen unterscheiden können, ob es ein Object war
  return feldWert
}
