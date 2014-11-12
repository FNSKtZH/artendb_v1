// wenn DsZusammenfassend geändert wird
// DsUrsprungsDs zeigen oder verstecken

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    if ($(that).prop('checked')) {
        $("#DsUrsprungsDs_div").show();
    } else {
        $("#DsUrsprungsDs_div").hide();
    }
};