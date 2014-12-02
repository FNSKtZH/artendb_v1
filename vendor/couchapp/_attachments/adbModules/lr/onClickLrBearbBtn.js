// wenn .btn.lrBearbBtn geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                    = require('jquery'),
    bearbeiteLrTaxonomie = require('./bearbeiteLrTaxonomie');

module.exports = function () {
    if (!$(this).hasClass('disabled')) {
        bearbeiteLrTaxonomie();
    }
};