function (doc) {
  'use strict'

  var gattung,
    artnameVollständig

  if (doc.Gruppe && doc.Gruppe === 'Macromycetes' && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
    gattung = doc.Taxonomie.Eigenschaften.Gattung || '(unbekannte Gattung)'
    artnameVollständig = doc.Taxonomie.Eigenschaften['Artname vollständig'] || '(unbekannter Artname vollständig)'
    emit([gattung, artnameVollständig, doc._id], null)
  }
}