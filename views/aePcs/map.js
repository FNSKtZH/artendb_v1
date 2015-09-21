function (doc) {
  if (doc.Typ && doc.Typ === 'Objekt') {
    if (doc.Eigenschaftensammlungen) {
      doc.Eigenschaftensammlungen.forEach(function (pc) {
        // add pcZusammenfassend
        var pcZusammenfassend = !!pc.zusammenfassend
        var felder = {}
        Object.keys(pc).forEach(function (key) {
          if (key !== 'Typ' && key !== 'Name' && key !== 'Eigenschaften') {
            felder[key] = pc[key]
          }
        })
        emit([pc.Name, pcZusammenfassend, pc['importiert von'], felder], null)
      })
    }
  }
}
