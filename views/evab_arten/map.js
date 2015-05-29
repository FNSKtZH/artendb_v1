// stellt alle Objekte zur Verfügung, die in evab gebraucht werden
function (doc) {
  'use strict'

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && (doc.Gruppe === 'Fauna' || doc.Gruppe === 'Flora' || doc.Gruppe === 'Moose')) {
    emit(doc._id, null)
  }
}