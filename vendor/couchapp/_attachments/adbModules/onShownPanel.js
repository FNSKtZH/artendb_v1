// wenn .panel geöffnet wird
// Höhe der textareas an Textgrösse anpassen

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                    = require('jquery'),
    fitTextareaToContent = require('./fitTextareaToContent');

module.exports = function () {
    var that = this;

    $(that).find('textarea').each(function () {
        fitTextareaToContent(this);
    });
};