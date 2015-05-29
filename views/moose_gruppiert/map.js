'use strict'

function (doc) {
  if (doc.Gruppe && doc.Gruppe === 'Moose') {
    emit([doc._id, doc._rev])
  }
}
