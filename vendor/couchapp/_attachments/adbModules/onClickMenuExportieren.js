// wenn exportieren geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var zeigeFormular = require('./zeigeFormular');

module.exports = function () {
    zeigeFormular('export');
    delete window.adb.exportierenObjekte;
};