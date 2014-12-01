/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var importiereDatensammlung = require('./importiereDatensammlung');

module.exports = function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    importiereDatensammlung();
};