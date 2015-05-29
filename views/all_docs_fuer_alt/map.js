// wählt alle Dokumente, die GIS-Layer und Betrachtungsdistanz enthalten
// sowie ihre Synonyme
function (doc) {
  'use strict'

  var _ = require("views/lib/underscore")

  if (doc.Gruppe) {
    if (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora") {
      // sicherstellen, dass GIS-Layer und Betrachtungsdistanz existieren
      if (doc.Eigenschaftensammlungen && doc.Eigenschaftensammlungen.length > 0) {
        // durch alle Eigenschaftensammlungen loopen
        _.each(doc.Eigenschaftensammlungen, function (datensammlung) {
          if (datensammlung.Name && datensammlung.Name === "ZH GIS" && datensammlung.Eigenschaften && datensammlung.Eigenschaften["GIS-Layer"] && datensammlung.Eigenschaften["Betrachtungsdistanz (m)"]) {
            // ok, alle benötigten Felder sind vorhanden
            emit(doc._id)
          }
        })
      }
    }
  }
}