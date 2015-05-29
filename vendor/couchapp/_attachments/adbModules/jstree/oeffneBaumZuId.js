'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  oeffneNodeNachIdArray = require('./oeffneNodeNachIdArray')

module.exports = function (id) {
  // Hierarchie der id holen
  var $db = $.couch.db('artendb')

  $db.openDoc(id, {
    success: function (objekt) {
      var $filterKlasse = $('[filter="' + objekt.Taxonomie.Eigenschaften.Klasse + '"]'),
        $artAnmelden = $('#artAnmelden'),
        idArray = []

      switch (objekt.Gruppe) {
        case 'Fauna':
          // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
          // oberste Ebene aufbauen nicht nötig, die gibt es schon
          $.jstree._reference('#treeFauna').open_node($filterKlasse, function () {
            $.jstree._reference('#treeFauna').open_node($('[filter="' + objekt.Taxonomie.Eigenschaften.Klasse + ',' + objekt.Taxonomie.Eigenschaften.Ordnung + '"]'), function () {
              $.jstree._reference('#treeFauna').open_node($('[filter="' + objekt.Taxonomie.Eigenschaften.Klasse + ',' + objekt.Taxonomie.Eigenschaften.Ordnung + ',' + objekt.Taxonomie.Eigenschaften.Familie + '"]'), function () {
                $.jstree._reference('#treeFauna').select_node($('#' + objekt._id), null, false)
              }, true)
            }, true)
          }, true)
          // Anmeldung verstecken, wenn nicht Lebensräume
          $artAnmelden.hide()
          break
        case 'Flora':
          // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
          // oberste Ebene aufbauen nicht nötig, die gibt es schon
          $.jstree._reference('#treeFlora').open_node($('[filter="' + objekt.Taxonomie.Eigenschaften.Familie + '"]'), function () {
            $.jstree._reference('#treeFlora').open_node($('[filter="' + objekt.Taxonomie.Eigenschaften.Familie + ',' + objekt.Taxonomie.Eigenschaften.Gattung + '"]'), function () {
              $.jstree._reference('#treeFlora').select_node($('#' + objekt._id), null, false)
            }, true)
          }, true)
          // Anmeldung verstecken, wenn nicht Lebensräume
          $artAnmelden.hide()
          break
        case 'Moose':
          // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
          // oberste Ebene aufbauen nicht nötig, die gibt es schon
          $.jstree._reference('#treeMoose').open_node($filterKlasse, function () {
            $.jstree._reference('#treeMoose').open_node($('[filter="' + objekt.Taxonomie.Eigenschaften.Klasse + ',' + objekt.Taxonomie.Eigenschaften.Familie + '"]'), function () {
              $.jstree._reference('#treeMoose').open_node($('[filter="' + objekt.Taxonomie.Eigenschaften.Klasse + ',' + objekt.Taxonomie.Eigenschaften.Familie + ',' + objekt.Taxonomie.Eigenschaften.Gattung + '"]'), function () {
                $.jstree._reference('#treeMoose').select_node($('#' + objekt._id), null, false)
              }, true)
            }, true)
          }, true)
          // Anmeldung verstecken, wenn nicht Lebensräume
          $artAnmelden.hide()
          break
        case 'Macromycetes':
          // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
          // oberste Ebene aufbauen nicht nötig, die gibt es schon
          $.jstree._reference('#treeMacromycetes').open_node($('[filter="' + objekt.Taxonomie.Eigenschaften.Gattung + '"]'), function () {
            $.jstree._reference('#treeMacromycetes').select_node($('#' + objekt._id), null, false)
          }, true)
          // Anmeldung verstecken, wenn nicht Lebensräume
          $artAnmelden.hide()
          break
        case 'Lebensräume':
          _.each(objekt.Taxonomie.Eigenschaften.Hierarchie, function (hierarchie) {
            idArray.push(hierarchie.GUID)
          })
          oeffneNodeNachIdArray(idArray)
          break
      }
    },
    error: function () {
      console.log('oeffneBaumZuId: keine Daten erhalten')
    }
  })
}
