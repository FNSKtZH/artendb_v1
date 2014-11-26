// wenn importieren_bs_daten_uploaden_collapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var pruefeAnmeldung = require('../login/pruefeAnmeldung');

    if (!pruefeAnmeldung("bs")) {
        $(that).collapse('hide');
    } else {
        $('#BsFile').fileupload();
    }
    $('html, body').animate({
        scrollTop: $("#importieren_bs_daten_uploaden_collapse").offset().top
    }, 2000);
};