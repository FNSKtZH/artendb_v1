/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                     = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (woher) {
    var praefix = 'import';

    // Bei LR muss der Anmeldungsabschnitt eingeblendet werden
    if (woher === 'art') {
        praefix = '';
        $('#artAnmelden').show();
        $('#' + woher + 'AnmeldenHinweis')
            .alert()
            .show();
    } else {
        woher = capitaliseFirstLetter(woher);
    }

    // Mitteilen, dass Anmeldung nötig ist
    $('#' + praefix + woher + 'AnmeldenHinweis')
        .alert()
        .show();
    $('#' + praefix + woher + 'AnmeldenHinweisText').html('Um Daten zu bearbeiten, müssen Sie angemeldet sein');
    $('#' + praefix + woher + 'AnmeldenCollapse').collapse('show');
    $('.anmeldenBtn').show();
    $('.abmeldenBtn').hide();
    // ausschalten, soll später bei Organisationen möglich werden
    //$('.kontoErstellenBtn').show();
    $('.kontoSpeichernBtn').hide();
    $('#email' + capitaliseFirstLetter(woher)).focus();
};