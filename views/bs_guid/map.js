function (doc) {
  'use strict'

  var _ = require('views/lib/underscore')

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Beziehungssammlungen) {
    _.each(doc.Beziehungssammlungen, function (bs) {
      emit([bs.Name, doc._id], 1)
    })
  }
}