function (doc) {
  if (doc.Typ && doc.Typ === 'Objekt') {
    if (doc.Beziehungssammlungen) {
      doc.Beziehungssammlungen.forEach(function (rc) {
        emit(rc.Name, doc._id)
      })
    }
  }
}
