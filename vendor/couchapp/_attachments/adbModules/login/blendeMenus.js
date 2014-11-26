/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    if (localStorage.admin) {
        $("#menuBtn")
            .find(".admin")
            .show();
    } else {
        $("#menuBtn")
            .find(".admin")
            .hide();
    }
};