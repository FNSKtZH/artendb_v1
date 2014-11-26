// wenn DsLöschen geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                     = require('jquery'),
    entferneDatensammlungAusAllenObjekten = require('./entferneDatensammlungAusAllenObjekten');

module.exports = function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    // Rückmeldung anzeigen
    $("#importieren_ds_ds_beschreiben_hinweis")
        .alert()
        .show()
        .html("Bitte warten: Die Datensammlung wird entfernt...");
    entferneDatensammlungAusAllenObjekten($("#DsName").val());
};