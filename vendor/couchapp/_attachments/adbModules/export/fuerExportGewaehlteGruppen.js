/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var gruppen = [];

    $(".exportierenDsObjekteWaehlenGruppe").each(function () {
        if ($(this).prop('checked')) {
            gruppen.push($(this).val());
        }
    });
    return gruppen;
};