// wenn importierenDsImportAusfuehrenCollapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $               = require('jquery'),
    pruefeAnmeldung = require('../login/pruefeAnmeldung');

module.exports = function (that) {
    if (!pruefeAnmeldung("ds")) {
        $(that).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importierenDsImportAusfuehrenCollapse").offset().top
    }, 2000);
};