// Wenn DsImportiertVon geändert wird
// kontrollieren, dass es die email der angemeldeten Person ist

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var $importieren_ds_ds_beschreiben_hinweis2 = $("#importieren_ds_ds_beschreiben_hinweis2");

    $("#DsImportiertVon").val(localStorage.Email);
    $importieren_ds_ds_beschreiben_hinweis2
        .alert()
        .show()
        .html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
    setTimeout(function () {
        $importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .hide();
    }, 10000);
};