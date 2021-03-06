function (doc) {
  'use strict'

  var _ = require('views/lib/underscore'),
    value = {},
    einheitWorte

  value.id = doc._id
  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Lebensräume' && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Taxonomie && doc.Taxonomie.Eigenschaften.Einheit) {
    value.tokens = []
    if (doc.Taxonomie.Eigenschaften.Einheit) {
      einheitWorte = doc.Taxonomie.Eigenschaften.Einheit.split(' ')
      value.tokens = _.union(value.tokens, einheitWorte)
      /*_.each(einheitWorte, function (wort) {
        value.tokens.push(wort)
      })*/
    }
    if (doc.Taxonomie.Eigenschaften.Label) {
      value.tokens.push(doc.Taxonomie.Eigenschaften.Label)
    }
    if (doc.Taxonomie.Eigenschaften.Label) {
      value.Name = doc.Taxonomie.Eigenschaften.Taxonomie + ' > ' + doc.Taxonomie.Eigenschaften.Label + ': ' + doc.Taxonomie.Eigenschaften.Einheit
      // Taxonomie, label und Einheit als keys einfügen, damit richtig sortiert wird
      emit([doc.Gruppe, doc.Taxonomie.Eigenschaften.Taxonomie, doc.Taxonomie.Eigenschaften.Label, doc.Taxonomie.Eigenschaften.Einheit], value)
    } else {
      value.Name = doc.Taxonomie.Eigenschaften.Taxonomie + ' > ' + doc.Taxonomie.Eigenschaften.Einheit
      emit([doc.Gruppe, doc.Taxonomie.Eigenschaften.Taxonomie, '', doc.Taxonomie.Eigenschaften.Einheit], value)
    }
  }
}