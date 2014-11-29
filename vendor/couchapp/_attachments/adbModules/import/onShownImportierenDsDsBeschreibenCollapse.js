// wenn importierenDsDsBeschreibenCollapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var bereiteImportierenDsBeschreibenVor = require('./bereiteImportierenDsBeschreibenVor');

    // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
    bereiteImportierenDsBeschreibenVor("ds");
    $("#DsImportiertVon").val(localStorage.Email);
};