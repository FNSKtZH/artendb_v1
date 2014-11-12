// Wenn BsImportiertVon geändert wird
// Kontrollieren, dass es die email der angemeldeten Person ist

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    $("#BsImportiertVon").val(localStorage.Email);
    $("#importieren_bs_ds_beschreiben_hinweis2")
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show();
    $("#importieren_bs_ds_beschreiben_hinweis_text2").html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
    setTimeout(function () {
        $("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .hide();
    }, 10000);
};