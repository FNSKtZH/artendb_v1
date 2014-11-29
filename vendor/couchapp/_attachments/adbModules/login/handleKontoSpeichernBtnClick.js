// wenn .konto_speichern_btn geklickt wird

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
        $(".anmelden_btn").hide();
        $(".abmelden_btn").show();
        $(".kontoErstellenBtn").hide();
        $(".konto_speichern_btn").hide();
    }
};