/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $            = require('jquery'),
    oeffneGruppe = require('../oeffneGruppe');

module.exports = function () {
    oeffneGruppe($(this).attr("Gruppe"));
};