// sortiert nach den keys des Objekts
// resultat nicht garantiert!

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (object) {
    var sorted = {},
        key,
        a = [];

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = object[a[key]];
    }
    return sorted;
};