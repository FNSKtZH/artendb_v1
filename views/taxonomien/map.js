function (doc) {
  'use strict'

  if (doc.Typ && doc.Typ === 'Taxonomie') {
    emit(doc._id)
  }
}
