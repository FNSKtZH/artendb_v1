/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore');

module.exports = function (hierarchieArray) {
    if (!_.isArray(hierarchieArray)) {
        return "";
    }
    // Namen kommagetrennt anzeigen
    var hierarchieString = "";
    _.each(hierarchieArray, function (hierarchieObjekt, index) {
        if (index > 0) {
            hierarchieString += "\n";
        }
        hierarchieString += hierarchieObjekt.Name;
    });
    return hierarchieString;
};