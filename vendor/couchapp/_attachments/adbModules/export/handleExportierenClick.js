// wenn exportieren geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

module.exports = function () {
    var zeigeFormular = require('../zeigeFormular');

    zeigeFormular("export");
    delete window.adb.exportieren_objekte;
};