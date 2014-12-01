// wenn .btn.lrBearbBtn geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var bearbeiteLrTaxonomie = require('./bearbeiteLrTaxonomie');

    if (!$(this).hasClass('disabled')) {
        bearbeiteLrTaxonomie();
    }
};