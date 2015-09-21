function (doc) {
  if (doc.Typ && doc.Typ === 'Objekt') {
    if (doc.Beziehungssammlungen) {
      doc.Beziehungssammlungen.forEach(function (rc) {
        // add bsZusammenfassend
        const bsZusammenfassend = !!rc.zusammenfassend
        var felder = {}
        Object.keys(rc).forEach(function (key) {
          if (key !== 'Typ' && key !== 'Name' && key !== 'Eigenschaften') {
            felder[key] = rc[key]
          }
        })
        emit([rc.Name, bsZusammenfassend, rc['importiert von'], felder], null)
      })
    }
  }
}
