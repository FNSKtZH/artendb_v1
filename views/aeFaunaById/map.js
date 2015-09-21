function (doc) {
  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Fauna') {
    emit(doc.Taxonomien[0].Eigenschaften['Taxonomie ID'], null)
  }
}
