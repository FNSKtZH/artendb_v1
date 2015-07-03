function (doc) {
  'use strict'

  var validator = require('views/lib/validator')

  // var isGuid = new RegExp('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i')
  // var idIsGuid = isGuid.test(doc._id)
  var idIsGuid3 = validator.isUUID(doc._id, 3)
  var idIsGuid4 = validator.isUUID(doc._id, 4)
  var idIsGuid5 = validator.isUUID(doc._id, 5)
  var isCorrect = idIsGuid3 && idIsGuid4 && idIsGuid5

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe) {
    emit(isCorrect, {v3: idIsGuid3, v4: idIsGuid4, v5: idIsGuid5})
  }
}
