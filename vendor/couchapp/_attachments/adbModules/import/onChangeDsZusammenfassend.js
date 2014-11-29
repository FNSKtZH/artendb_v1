// wenn dsZusammenfassend geändert wird
// DsUrsprungsDs zeigen oder verstecken

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    if ($(this).prop('checked')) {
        $('#dsUrsprungsDsDiv').show();
    } else {
        $('#dsUrsprungsDsDiv').hide();
    }
};