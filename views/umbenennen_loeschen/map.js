function (doc) {
    'use strict';
    var do_emit = false;
    if (doc.Taxonomie && doc.Taxonomie.Daten) do_emit = true;
    if (doc.Datensammlungen) do_emit = true;
    if (do_emit) emit(doc._id);
}