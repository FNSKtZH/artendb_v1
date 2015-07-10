function (doc) {
  'use strict'

  if (doc.Gruppe && doc.Taxonomie && doc.Taxonomien && doc.Taxonomien[0] && !doc.Taxonomien[0].Gruppe) {
    emit(doc._id, null)
  }
}