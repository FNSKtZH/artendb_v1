// wenn importieren_bs_ds_beschreiben_collapse geöffnet wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var bereiteImportierenBsBeschreibenVor = require('./bereiteImportierenBsBeschreibenVor');

    // mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
    bereiteImportierenBsBeschreibenVor("bs");
    $("#BsImportiertVon").val(localStorage.Email);
};