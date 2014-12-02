/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var $elementToShow;

    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    $elementToShow = $(this).parent().next();

    if ($elementToShow.is(':visible')) {
        $elementToShow.hide(400);
        $(this).text('...mehr');
    } else {
        $elementToShow.show(400);
        $(this).text('...weniger');
    }
};