// wenn #lrParentWaehlenOptionen [name="parentOptionen"] geändert wird
// d.h. User will einen neuen LR beschreiben und wählt den hierarchisch übergeordneten
// bzw. ob eine neue Taxonomie begonnen werden soll

'use strict'

var $ = require('jquery'),
  erstelleBaum = require('../jstree/erstelleBaum'),
  oeffneBaumZuId = require('../jstree/oeffneBaumZuId')

module.exports = function () {
  // prüfen, ob oberster Node gewählt wurde
  var that = this,
    parentName = $(that).val(),
    parentId = that.id,
    parent = {},
    own = {},
    object = {},
    $db = $.couch.db('artendb')

  // zuerst für den neuen LR eine id holen
  object._id = $.couch.newUUID(1)
  object.Gruppe = 'Lebensräume'
  object.Typ = 'Objekt'
  object.Taxonomie = {}
  object.Taxonomie.Eigenschaften = {}
  if (parentId === '0') {
    // das ist die Wurzel der Taxonomie
    object.Taxonomie.Name = 'neue Taxonomie'
    object.Taxonomie.Eigenschaften.Taxonomie = 'neue Taxonomie'
    object.Taxonomie.Eigenschaften.Einheit = 'neue Taxonomie'
    object.Taxonomie.Eigenschaften.Beschreibung = ''
    // objekt für parent und Hierarchie erstellen
    parent.Name = 'neue Taxonomie'
    parent.GUID = object._id
    // bei der Wurzel ist Hierarchie gleich eigenem Objekt gleich parent
    object.Taxonomie.Eigenschaften.Hierarchie = []
    object.Taxonomie.Eigenschaften.Hierarchie.push(parent)
  } else {
    object.Taxonomie.Name = $(that).data('hierarchie')[0].Name
    // wenn keine Wurzel: Label anzeigen
    object.Taxonomie.Eigenschaften.Label = ''
    object.Taxonomie.Eigenschaften.Taxonomie = $(that).data('hierarchie')[0].Name
    object.Taxonomie.Eigenschaften.Einheit = 'unbeschriebener Lebensraum'
    object.Taxonomie.Eigenschaften.Beschreibung = ''
    // parent aufbauen
    parent.Name = parentName
    parent.GUID = parentId
    // Hierarchie: Diejenige des parents übernehmen...
    object.Taxonomie.Eigenschaften.Hierarchie = $(that).data('hierarchie')
    // ...und um die eigene ergänzen
    own.Name = 'unbeschriebener Lebensraum'
    own.GUID = object._id
    object.Taxonomie.Eigenschaften.Hierarchie.push(own)
  }
  object.Eigenschaftensammlungen = []
  object.Beziehungssammlungen = []
  object.Taxonomie.Eigenschaften.Parent = parent
  // in die DB schreiben
  $db.saveDoc(object, {
    success: function (resp) {
      object._rev = resp.rev
      $.when(erstelleBaum()).then(function () {
        oeffneBaumZuId(object._id)
        $('#lrParentWaehlen').modal('hide')
      })
    },
    error: function () {
      console.log('onChangeParentOptionen: Datensatz nicht gespeichert')
    }
  })
}
