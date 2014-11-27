// wenn BsLoeschen geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                          = require('jquery'),
    entferneBeziehungssammlungAusAllenObjekten = require('./entferneBeziehungssammlungAusAllenObjekten');

module.exports = function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    // Rückmeldung anzeigen
    $("#importieren_bs_ds_beschreiben_hinweis")
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show();
    $("#importieren_bs_ds_beschreiben_hinweis_text").html("Bitte warten: Die Beziehungssammlung wird entfernt...");
    entferneBeziehungssammlungAusAllenObjekten($("#BsName").val());
};