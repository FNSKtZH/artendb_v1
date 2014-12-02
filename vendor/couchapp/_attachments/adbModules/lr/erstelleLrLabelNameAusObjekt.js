/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var erstelleLrLabelName = require('./erstelleLrLabelName');

module.exports = function (objekt) {
    var label   = objekt.Taxonomie.Eigenschaften.Label   || '',
        einheit = objekt.Taxonomie.Eigenschaften.Einheit || '';

    return erstelleLrLabelName(label, einheit);
};