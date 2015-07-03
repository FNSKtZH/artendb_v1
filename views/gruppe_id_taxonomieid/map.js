function (doc) {
  'use strict'

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften['Taxonomie ID']) {
    emit([doc.Gruppe, doc._id, doc.Taxonomie.Eigenschaften['Taxonomie ID']], null)
  }
}