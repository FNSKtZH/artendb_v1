/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var filtereFuerExport = require('./filtereFuerExport');

module.exports = function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    filtereFuerExport('direkt');
};