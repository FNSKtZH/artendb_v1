// wenn Fenstergrösse verändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var setzeTreehoehe       = require('./jstree/setzeTreehoehe'),
        fitTextareaToContent = require('./fitTextareaToContent');

    setzeTreehoehe();

    // Höhe der Textareas korrigieren
    $('#forms').find('textarea').each(function () {
        fitTextareaToContent(this.id);
    });
};