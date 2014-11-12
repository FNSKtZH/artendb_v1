// scrollt das übergebene Element nach oben
// minus die übergebene Anzahl Pixel

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that, minus) {
    minus = minus || 0;
    $('html, body').animate({
        scrollTop: $(that).parent().offset().top - minus
    }, 2000);
};