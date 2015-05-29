function (doc) {
  'use strict'

  var _ = require("views/lib/underscore"),
    gisLayer,
    dsMitGislayer

  if (doc.Typ && doc.Typ === "Objekt") {
    if (doc.Eigenschaftensammlungen) {
      dsMitGislayer = _.find(doc.Eigenschaftensammlungen, function (es) {
        return es.Name && es.Name === "ZH GIS" && es.Eigenschaften && es.Eigenschaften["GIS-Layer"]
      })
      gisLayer = dsMitGislayer.Eigenschaften["GIS-Layer"]
      emit(gisLayer, null)
    }
    if (doc.Gruppe === "Macromycetes" && !gisLayer) {
      // momentan fehlen bei Macromycetes die ZH GIS
      // diese Info wird für evab mobile benutzt
      gisLayer = "Pilze"
      emit(gisLayer, null)
    }
  }
}