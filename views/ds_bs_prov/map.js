function (doc) {
  'use strict'

  if (doc.Typ && doc.Typ === 'Objekt') {
    if (doc.Beziehungssammlungen) {
      doc.Beziehungssammlungen.forEach(function (s) {
        emit(['rC', s.Name, s.Beschreibung, s.Link, s.zusammenfassend, s.Datenstand, s.Nutzungsbedingungen, s['Art der Beziehungen']], 1)
      })
    }
    if (doc.Eigenschaftensammlungen) {
      doc.Eigenschaftensammlungen.forEach(function (s) {
        emit(['pC', s.Name, s.Beschreibung, s.Link, s.zusammenfassend, s.Datenstand, s.Nutzungsbedingungen, null], 1)
      })
    }
  }
}