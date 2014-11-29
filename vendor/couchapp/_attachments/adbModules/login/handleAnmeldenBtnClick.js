// wenn .anmeldenBtn geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var meldeUserAn = require('./meldeUserAn'),
        bsDs;

    // es muss mitgegeben werden, woher die Anmeldung kam, damit die email aus dem richtigen Feld geholt werden kann
    bsDs = that.id.substring(that.id.length - 2);
    if (bsDs === "rt") {
        bsDs = "art";
    }
    meldeUserAn(bsDs);
};