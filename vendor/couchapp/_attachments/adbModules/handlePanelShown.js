// wenn .panel geöffnet wird
// Höhe der textareas an Textgrösse anpassen

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var fitTextareaToContent = require('./fitTextareaToContent');

    $(that).find('textarea').each(function () {
        fitTextareaToContent(this.id);
    });
};