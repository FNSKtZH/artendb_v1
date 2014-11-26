// wenn importieren_ds_import_ausfuehren_collapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var pruefeAnmeldung = require('../login/pruefeAnmeldung');

    if (!pruefeAnmeldung("ds")) {
        $(that).collapse('hide');
    }
    $('html, body').animate({
        scrollTop: $("#importieren_ds_import_ausfuehren_collapse").offset().top
    }, 2000);
};