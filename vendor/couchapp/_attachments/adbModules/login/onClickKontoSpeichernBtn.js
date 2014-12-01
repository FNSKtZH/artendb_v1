// wenn .kontoSpeichernBtn geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $               = require('jquery'),
    validiereSignup = require('./validiereSignup'),
    erstelleKonto   = require('./erstelleKonto');

module.exports = function () {
    var bsDs = this.id.substring(this.id.length - 2);

    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    if (bsDs === 'rt') {
        bsDs = 'art';
    }
    if (validiereSignup(bsDs)) {
        erstelleKonto(bsDs);
        // Anmeldefenster zurücksetzen
        $('.signup').hide();
        $('.anmeldenBtn').hide();
        $('.abmeldenBtn').show();
        $('.kontoErstellenBtn').hide();
        $('.kontoSpeichernBtn').hide();
    }
};