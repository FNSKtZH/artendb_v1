/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

module.exports = function (label, einheit) {
    if (label && einheit) { return label + ": " + einheit; }
    if (einheit)          { return                einheit; }

    // aha, ein neues Objekt, noch ohne Label und Einheit
    return "unbenannte Einheit";
};