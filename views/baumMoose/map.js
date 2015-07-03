function (doc) {
  'use strict'

  var klasse,
    familie,
    gattung,
    artnameVollständig

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Moose' && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
    klasse = doc.Taxonomie.Eigenschaften.Klasse || '(unbekannte Klasse)'
    familie = doc.Taxonomie.Eigenschaften.Familie || '(unbekannte Familie)'
    gattung = doc.Taxonomie.Eigenschaften.Gattung || '(unbekannte Gattung)'
    artnameVollständig = doc.Taxonomie.Eigenschaften['Artname vollständig'] || '(unbekannter Artname vollständig)'
    emit([klasse, familie, gattung, artnameVollständig, doc._id], null)
  }
}