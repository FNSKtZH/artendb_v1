/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                   = require('jquery'),
    blendeMenus         = require('./blendeMenus'),
    schuetzeLrTaxonomie = require('../lr/schuetzeLrTaxonomie');

module.exports = function () {
    delete localStorage.Email;
    $('.artAnmeldenTitel').text('Anmelden');
    $('.importierenAnmeldenTitel').text('1. Anmelden');
    $('.alert').hide();
    $('.hinweis').hide();
    $('.well.anmelden').show();
    $('.Email').show();
    $('.Passwort').show();
    $('.anmeldenBtn').show();
    $('.abmeldenBtn').hide();
    // ausschalten, soll später bei Organisation möglich werden
    // $('.kontoErstellenBtn').show();
    $('.kontoSpeichernBtn').hide();
    $('#artAnmelden').hide();
    schuetzeLrTaxonomie();
    // falls dieser User admin war: vergessen
    delete localStorage.admin;
    // für diesen Nutzer passende Menus anzeigen
    blendeMenus();
};