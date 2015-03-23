// verhindern, dass bootstrap ganz nach oben scrollt

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

module.exports = function (event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
};