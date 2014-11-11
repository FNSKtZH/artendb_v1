/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    if (localStorage.admin) {
        $("#menu_btn")
            .find(".admin")
            .show();
    } else {
        $("#menu_btn")
            .find(".admin")
            .hide();
    }
};