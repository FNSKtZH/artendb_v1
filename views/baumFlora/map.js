function (doc) {
  'use strict'

  var familie,
    gattung,
    artnameVollständig

  if (doc.Gruppe && doc.Gruppe === 'Flora' && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
    familie = doc.Taxonomie.Eigenschaften.Familie || '(unbekannte Familie)'
    gattung = doc.Taxonomie.Eigenschaften.Gattung || '(unbekannte Gattung)'
    artnameVollständig = doc.Taxonomie.Eigenschaften['Artname vollständig'] || '(unbekannter Artname vollständig)'
    emit([familie, gattung, artnameVollständig, doc._id], null)
  }
}