'use strict'

function (doc) {
  var doEmit = false

  if (doc.Taxonomie && doc.Taxonomie.Daten) { doEmit = true }
  if (doc.Datensammlungen) { doEmit = true }
  if (doEmit) { emit(doc._id) }
}
