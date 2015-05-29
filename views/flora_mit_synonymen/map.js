function (doc) {
  'use strict'

  var _ = require('views/lib/underscore')

  if (doc.Gruppe && doc.Gruppe === 'Flora') {
    // erst mal das eigene Dokument senden
    // der zweite key markiert, dass dies das Original ist
    emit([doc._id, 1])
    if (doc.Beziehungssammlungen) {
      // durch alle Beziehungssammlungen loopen
      _.each(doc.Beziehungssammlungen, function (bs) {
        if (bs.Typ && bs.Typ === 'taxonomisch' && bs['Art der Beziehungen'] && bs['Art der Beziehungen'] === 'synonym' && bs.Beziehungen && bs.Beziehungen.length > 0) {
          // jetzt durch alle synonymen Beziehungen loopen
          _.each(bs.Beziehungen, function (beziehung) {
            if (beziehung.Beziehungspartner && beziehung.Beziehungspartner.length > 0) {
              // durch alle Beziehungspartner der synonymen Beziehungen loopen
              _.each(beziehung.Beziehungspartner, function (bezpartner) {
                if (bezpartner.GUID) {
                  // veranlassen, dass mit include_docs=true auch das Dokument dieses Synonyms gesendet wird
                  // der zweite key markiert, dass es ein Synonym ist
                  emit([doc._id, 0], {_id: bezpartner.GUID})
                }
              })
            }
          })
        }
      })
    }
  }
}