// wenn .Lebensräume.Taxonomie geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var bearbeiteLrTaxonomie = require('./bearbeiteLrTaxonomie');

module.exports = function () {
    if (localStorage.lrBearb === 'true') {
        bearbeiteLrTaxonomie();
    }
};