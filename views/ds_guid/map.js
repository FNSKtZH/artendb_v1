function (doc) {
  'use strict'

  var _ = require('views/lib/underscore')

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Eigenschaftensammlungen) {
    _.each(doc.Eigenschaftensammlungen, function (es) {
      emit([es.Name, doc._id], 1)
    })
  }
}