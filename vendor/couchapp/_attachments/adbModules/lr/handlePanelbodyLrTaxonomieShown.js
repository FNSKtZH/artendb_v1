// wenn .Lebensräume.Taxonomie geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var bearbeiteLrTaxonomie = require('./bearbeiteLrTaxonomie');

    if (localStorage.lrBearb === "true") {
        bearbeiteLrTaxonomie();
    }
};