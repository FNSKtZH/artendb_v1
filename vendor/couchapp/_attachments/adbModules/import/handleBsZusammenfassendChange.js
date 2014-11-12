// wenn BsZusammenfassend geändert wird
// BsUrsprungsBs_div zeigen oder verstecken

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    if ($(that).prop('checked')) {
        $("#BsUrsprungsBs_div").show();
    } else {
        $("#BsUrsprungsBs_div").hide();
    }
};