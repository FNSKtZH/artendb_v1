function (doc) {
  'use strict'

  var _ = require('views/lib/underscore'),
    felder,
    dsZusammenfassend,
    bsZusammenfassend,
    x,
    y

  if (doc.Typ && doc.Typ === 'Objekt') {
    if (doc.Eigenschaftensammlungen) {
      _.each(doc.Eigenschaftensammlungen, function (es) {
        // dsZusammenfassend ergänzen
        dsZusammenfassend = !!es.zusammenfassend
        felder = {}
        for (x in es) {
          if (x !== 'Typ' && x !== 'Name' && x !== 'Eigenschaften' ) {
            felder[x] = es[x]
          }
        }
        emit(['Datensammlung', es.Name, dsZusammenfassend, es['importiert von'], felder], doc._id)
      })
    }

    if (doc.Beziehungssammlungen) {
      _.each(doc.Beziehungssammlungen, function (bs) {
        // bsZusammenfassend ergänzen
        bsZusammenfassend = !!bs.zusammenfassend
        felder = {}
        for (y in bs) {
          if (y !== 'Typ' && y !== 'Name' && y !== 'Beziehungen') {
            felder[y] = bs[y]
          }
        }
        emit(['Beziehungssammlung', bs.Name, bsZusammenfassend, bs['importiert von'], felder], doc._id)
      })
    }
  }
}