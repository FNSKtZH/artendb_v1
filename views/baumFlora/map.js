function (doc) {
    'use strict';
    var familie,
        gattung,
        artname_vollständig;
    if (doc.Gruppe && doc.Gruppe === "Flora" && doc.Taxonomie && doc.Taxonomie.Eigenschaften) {
        familie = doc.Taxonomie.Eigenschaften.Familie || "(unbekannte Familie)";
        gattung = doc.Taxonomie.Eigenschaften.Gattung || "(unbekannte Gattung)";
        artname_vollständig = doc.Taxonomie.Eigenschaften["Artname vollständig"] || "(unbekannter Artname vollständig)";
        emit([familie, gattung, artname_vollständig, doc._id], null);
    }
}