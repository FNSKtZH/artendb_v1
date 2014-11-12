// wenn .btn.lr_bearb_bearb geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var bearbeiteLrTaxonomie = require('./bearbeiteLrTaxonomie');

    if (!$(that).hasClass('disabled')) {
        bearbeiteLrTaxonomie();
    }
};