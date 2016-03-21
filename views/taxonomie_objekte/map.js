
function (doc) {
  'use strict'

  if (doc.Typ && doc.Typ === 'Taxonomie-Objekt') {
    emit(doc._id)
  }
}
