// wenn importDsImportAusfuehrenCollapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $               = require('jquery'),
    pruefeAnmeldung = require('../login/pruefeAnmeldung');

module.exports = function (that) {
    if (!pruefeAnmeldung('ds')) {
        $(that).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $('#importDsImportAusfuehrenCollapse').offset().top
    }, 2000);
};