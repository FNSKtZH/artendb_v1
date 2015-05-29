// löscht Datensätze in Massen
// nimmt einen Array von Objekten entgegen
// baut daraus einen neuen array auf, in dem die Objekte nur noch die benötigten Informationen haben
// aktualisiert die Objekte mit einer einzigen Operation

'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function (objectArray) {
  var objekteMitObjekte,
    objekte = [],
    newObjekt

  _.each(objectArray, function (objekt) {
    newObjekt = {}
    newObjekt._id = objekt._id
    newObjekt._rev = objekt._rev
    newObjekt._deleted = true
    objekte.push(newObjekt)
  })
  objekteMitObjekte = {}
  objekteMitObjekte.docs = objekte
  $.ajax({
    cache: false,
    type: 'POST',
    url: '../../_bulk_docs',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(objekteMitObjekte)
  }).fail(function () {
    console.log('löscheMassenMitObjektArray: Daten wurde nicht gelöscht')
  })
}
