// wenn importierenBsImportAusfuehrenCollapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $               = require('jquery'),
    pruefeAnmeldung = require('../login/pruefeAnmeldung');

module.exports = function (that) {
    if (!pruefeAnmeldung('bs')) {
        $(that).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $('#importierenBsImportAusfuehrenCollapse').offset().top
    }, 2000);
};