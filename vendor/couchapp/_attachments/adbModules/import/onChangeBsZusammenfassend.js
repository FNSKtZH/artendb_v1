// wenn bsZusammenfassend geändert wird
// bsUrsprungsBsDiv zeigen oder verstecken

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    if ($(this).prop('checked')) {
        $('#bsUrsprungsBsDiv').show();
    } else {
        $('#bsUrsprungsBsDiv').hide();
    }
};