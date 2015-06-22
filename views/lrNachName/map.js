function (doc) {
    'use strict'

    if (doc.Gruppe && doc.Gruppe === "Lebensräume" && doc.Taxonomie && doc.Taxonomie.Name && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Label && doc.Taxonomie.Eigenschaften.Einheit) {
        emit([doc.Taxonomie.Name, doc.Taxonomie.Eigenschaften.Label, doc.Taxonomie.Eigenschaften.Einheit])
    }
}