function (doc) {
  'use strict'

  var isGuid = new RegExp('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i')
  var idIsGuid = isGuid.test(doc._id)

  if (doc.Gruppe && idIsGuid) {
    emit(doc._id)
  }
}
