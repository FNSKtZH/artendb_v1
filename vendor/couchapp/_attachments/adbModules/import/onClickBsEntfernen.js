/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var entferneBeziehungssammlung = require('./entferneBeziehungssammlung');

module.exports = function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    entferneBeziehungssammlung();
};