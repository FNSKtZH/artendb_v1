function (doc) {
  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Flora') {
    emit(doc.Taxonomien[0].Eigenschaften['Taxonomie ID'], null)
  }
}
