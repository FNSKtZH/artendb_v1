// wenn importBsDatenUploadenCollapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $               = require('jquery'),
    pruefeAnmeldung = require('../login/pruefeAnmeldung');

module.exports = function (that) {
    if (!pruefeAnmeldung('bs')) {
        $(that).collapse('hide');
    } else {
        $('#bsFile').fileupload();
    }
    $('html, body').animate({
        scrollTop: $('#importBsDatenUploadenCollapse').offset().top
    }, 2000);
};