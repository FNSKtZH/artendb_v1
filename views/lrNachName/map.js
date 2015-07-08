function (doc) {
    'use strict'

    if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Lebensräume' && doc.Taxonomie && doc.Taxonomie.Name && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Einheit) {
      var label = doc.Taxonomie.Eigenschaften.Label || null
        emit([doc.Taxonomie.Name, doc.Taxonomie.Eigenschaften.Label, doc.Taxonomie.Eigenschaften.Einheit])
    }
}