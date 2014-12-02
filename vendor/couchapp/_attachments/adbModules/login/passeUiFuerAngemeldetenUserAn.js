/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                     = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (woher) {
    console.log('passeUiFuerAngemeldetenUserAn');
    
    $('#artAnmeldenTitel').text(localStorage.email + ' ist angemeldet');
    $('.importierenAnmeldenTitel').text('1. ' + localStorage.email + ' ist angemeldet');

    if (woher === 'art') {
        //$('#artAnmeldenCollapse').collapse('hide');
        $('#artAnmelden .in').collapse('hide');
    } else {
        $('#import' + capitaliseFirstLetter(woher) + 'AnmeldenCollapse').collapse('hide');
        $('#import' + capitaliseFirstLetter(woher) + 'DsBeschreibenCollapse').collapse('show');
    }
    $('.alert').hide();
    $('.hinweis').hide();
    $('.well.anmelden').hide();
    $('.Email').hide();
    $('.Passwort').hide();
    $('.anmeldenBtn').hide();
    $('.abmeldenBtn').show();
    $('.kontoErstellenBtn').hide();
    $('.kontoSpeichernBtn').hide();
    // in LR soll Anmelde-Accordion nicht sichtbar sein
    $('#artAnmelden').hide();
};