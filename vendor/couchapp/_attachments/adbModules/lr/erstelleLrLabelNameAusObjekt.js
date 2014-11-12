/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

module.exports = function (objekt) {
    var label   = objekt.Taxonomie.Eigenschaften.Label   || "",
        einheit = objekt.Taxonomie.Eigenschaften.Einheit || "",
        erstelleLrLabelName = require('./erstelleLrLabelName');

    return erstelleLrLabelName(label, einheit);
};