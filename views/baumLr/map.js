function (doc) {
  'use strict'

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Lebensräume' && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Parent && doc.Taxonomie.Eigenschaften.Parent.GUID && doc.Taxonomie.Eigenschaften.Einheit) {
    if (doc.Taxonomie.Eigenschaften.Label) {
      // zuvorderst die Länge der Hierarchie, damit die höchste Hierarchie abgefragt werden kann
      // label und Einheit als key[1] und key[2] einfügen, damit richtig sortiert wird
      emit([doc.Taxonomie.Eigenschaften.Hierarchie.length, doc.Taxonomie.Eigenschaften.Parent.GUID, doc.Taxonomie.Eigenschaften.Label, doc.Taxonomie.Eigenschaften.Einheit, doc.Taxonomie.Eigenschaften.Label + ': ' + doc.Taxonomie.Eigenschaften.Einheit, doc._id], null)
    } else {
      emit([doc.Taxonomie.Eigenschaften.Hierarchie.length, doc.Taxonomie.Eigenschaften.Parent.GUID, '', doc.Taxonomie.Eigenschaften.Einheit, doc.Taxonomie.Eigenschaften.Einheit, doc._id], null)
    }
  }
}