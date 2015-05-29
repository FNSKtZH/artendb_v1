function (doc) {
    'use strict'

    var klasse,
        ordnung,
        familie,
        artnameVollständig

    if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
        klasse = doc.Taxonomie.Eigenschaften.Klasse || "(unbekannte Klasse)"
        ordnung = doc.Taxonomie.Eigenschaften.Ordnung || "(unbekannte Ordnung)"
        familie = doc.Taxonomie.Eigenschaften.Familie || "(unbekannte Familie)"
        artnameVollständig = doc.Taxonomie.Eigenschaften["Artname vollständig"] || "(unbekannter Artname vollständig)"
        emit([klasse, ordnung, familie, artnameVollständig, doc._id], null)
    }
}