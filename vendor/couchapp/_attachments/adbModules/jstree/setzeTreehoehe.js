// begrenzt die maximale Höhe des Baums auf die Seitenhöhe, wenn nötig

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var windowHeight = $(window).height();

    if ($(window).width() > 1000 && !$('body').hasClass('force-mobile')) {
        $('.baum').css('max-height', windowHeight - 161);
    } else {
        // Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
        $('.baum').css('max-height', windowHeight - 252);
    }
};