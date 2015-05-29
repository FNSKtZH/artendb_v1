'use strict'

var _ = require('underscore'),
  $ = require('jquery'),
  erstelleHierarchieFuerFeldAusHierarchieobjekteArray = require('../erstelleHierarchieFuerFeldAusHierarchieobjekteArray'),
  ergaenzeParentZuLrHierarchie = require('./ergaenzeParentZuLrHierarchie'),
  erstelleHierarchieobjektAusObjekt = require('../erstelleHierarchieobjektAusObjekt')

var aktualisiereHierarchieEinesLrInklusiveSeinerChildren2 = function (lr, objekt, aktualisiereHierarchiefeld, einheitIstTaxonomiename) {
  var hierarchie = [],
    parent = objekt.Taxonomie.Eigenschaften.Parent,
    objectArray,
    $db = $.couch.db('artendb')

  objectArray = _.map(lr.rows, function (row) {
    return row.doc
  })

  objekt.Taxonomie = objekt.Taxonomie || {}
  objekt.Taxonomie.Eigenschaften = objekt.Taxonomie.Eigenschaften || {}

  // als Start sich selber zur Hierarchie hinzufügen
  hierarchie.push(erstelleHierarchieobjektAusObjekt(objekt))

  if (parent.GUID !== objekt._id) {
    objekt.Taxonomie.Eigenschaften.Hierarchie = ergaenzeParentZuLrHierarchie(objectArray, objekt.Taxonomie.Eigenschaften.Parent.GUID, hierarchie)
  } else {
    // aha, das ist die Wurzel des Baums
    objekt.Taxonomie.Eigenschaften.Hierarchie = hierarchie
  }
  if (aktualisiereHierarchiefeld) {
    $('#Hierarchie').val(erstelleHierarchieFuerFeldAusHierarchieobjekteArray(objekt.Taxonomie.Eigenschaften.Hierarchie))
  }
  // jetzt den parent aktualisieren
  if (objekt.Taxonomie.Eigenschaften.Hierarchie && objekt.Taxonomie.Eigenschaften.Hierarchie.length > 1) {
    // es gibt höhere Ebenen
    // das vorletzte Hierarchieobjekt wählen. das ist length -2, weil length bei 1 beginnt, die Objekte aber von 0 an nummeriert werden
    objekt.Taxonomie.Eigenschaften.Parent = objekt.Taxonomie.Eigenschaften.Hierarchie[objekt.Taxonomie.Eigenschaften.Hierarchie.length - 2]
  } else if (objekt.Taxonomie.Eigenschaften.Hierarchie && objekt.Taxonomie.Eigenschaften.Hierarchie.length === 1) {
    // das ist die oberste Ebene
    objekt.Taxonomie.Eigenschaften.Parent = objekt.Taxonomie.Eigenschaften.Hierarchie[0]
  }
  if (einheitIstTaxonomiename) {
    // Einheit ändert und Taxonomiename muss auch angepasst werden
    objekt.Taxonomie.Name = einheitIstTaxonomiename
    objekt.Taxonomie.Eigenschaften.Taxonomie = einheitIstTaxonomiename
  }
  // db aktualisieren
  $db.saveDoc(objekt, {
    success: function () {
      var doc
      // kontrollieren, ob das Objekt children hat. Wenn ja, diese aktualisieren
      _.each(lr.rows, function (lrRow) {
        doc = lrRow.doc
        if (doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Parent && doc.Taxonomie.Eigenschaften.Parent.GUID && doc.Taxonomie.Eigenschaften.Parent.GUID === objekt._id && doc._id !== objekt._id) {
          // das ist ein child
          // auch aktualisieren
          // lr mitgeben, damit die Abfrage nicht wiederholt werden muss
          aktualisiereHierarchieEinesLrInklusiveSeinerChildren2(lr, doc, false, einheitIstTaxonomiename)
        }
      })
    },
    error: function () {
      console.log('Datensatz nicht gespeichert')
    }
  })
}

module.exports = aktualisiereHierarchieEinesLrInklusiveSeinerChildren2
