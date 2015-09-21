function (doc) {
  if (doc.Typ && doc.Typ === 'Objekt') {
    if (doc.Eigenschaftensammlungen) {
      doc.Eigenschaftensammlungen.forEach(function (es) {
        emit(es.Name, doc._id)
      })
    }
  }
}
