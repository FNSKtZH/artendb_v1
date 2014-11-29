// wenn .kontoSpeichernBtn geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var bsDs = that.id.substring(that.id.length - 2),
        validiereSignup = require('./validiereSignup'),
        erstelleKonto   = require('./erstelleKonto');

    if (bsDs === "rt") {
        bsDs = "art";
    }
    if (validiereSignup(bsDs)) {
        erstelleKonto(bsDs);
        // Anmeldefenster zurücksetzen
        $(".signup").hide();
        $(".anmeldenBtn").hide();
        $(".abmeldenBtn").show();
        $(".kontoErstellenBtn").hide();
        $(".kontoSpeichernBtn").hide();
    }
};