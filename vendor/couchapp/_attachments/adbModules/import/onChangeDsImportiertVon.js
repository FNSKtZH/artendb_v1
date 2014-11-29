// Wenn dsImportiertVon geändert wird
// kontrollieren, dass es die email der angemeldeten Person ist

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var $importierenDsDsBeschreibenHinweis2 = $('#importierenDsDsBeschreibenHinweis2');

    $('#dsImportiertVon').val(localStorage.Email);
    $importierenDsDsBeschreibenHinweis2
        .alert()
        .show()
        .html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
    setTimeout(function () {
        $importierenDsDsBeschreibenHinweis2
            .alert()
            .hide();
    }, 10000);
};