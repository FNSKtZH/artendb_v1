/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var gruppen = [];

    $(".exportieren_ds_objekte_waehlen_gruppe").each(function () {
        if ($(this).prop('checked')) {
            gruppen.push($(this).val());
        }
    });
    return gruppen;
};