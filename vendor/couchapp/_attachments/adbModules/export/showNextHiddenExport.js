/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var $elementToShow = $(that)
        .parent()
        .next();
    if ($elementToShow.is(':visible')) {
        $elementToShow.hide(400);
        $(that).text("...mehr");
    } else {
        $elementToShow.show(400);
        $(that).text("...weniger");
    }
};