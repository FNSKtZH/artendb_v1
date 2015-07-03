function (doc) {
    'use strict'

    if (doc.Typ && doc.Typ === 'DsMetadata' && doc.Name) {
        emit(doc.Name)
    }
}