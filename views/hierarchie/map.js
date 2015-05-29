function (doc) {
  'use strict'

  var _ = require('views/lib/underscore')

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Hierarchie && doc.Taxonomie.Eigenschaften.Hierarchie.length > 0) {
    _.each(doc.Taxonomie.Eigenschaften.Hierarchie, function (objekt) {
      if (objekt.GUID) {
        emit(objekt.GUID, doc._id)
      }
    })
  }
}