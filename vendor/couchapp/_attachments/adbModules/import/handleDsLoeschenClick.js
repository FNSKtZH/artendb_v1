// wenn DsLöschen geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var entferneDatensammlungAusAllenObjekten = require('./entferneDatensammlungAusAllenObjekten');

    // Rückmeldung anzeigen
    $("#importieren_ds_ds_beschreiben_hinweis")
        .alert()
        .show()
        .html("Bitte warten: Die Datensammlung wird entfernt...");
    entferneDatensammlungAusAllenObjekten($("#DsName").val());
};