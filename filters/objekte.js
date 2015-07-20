function (doc, req) {
    'use strict'

    if (doc.Typ && doc.Typ === 'Objekt') return true
    return false
}
