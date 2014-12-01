/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var importiereBeziehungssammlung = require('./importiereBeziehungssammlung');

module.exports = function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    importiereBeziehungssammlung();
};