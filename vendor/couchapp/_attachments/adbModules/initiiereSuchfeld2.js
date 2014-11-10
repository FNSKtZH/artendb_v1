/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

module.exports = function (suchObjekte) {

    suchObjekte = _.map(suchObjekte.rows, function (objekt) {
        return objekt.value;
    });

    $('#suchfeld' + window.adb.Gruppe).typeahead({
        name: window.adb.Gruppe,
        valueKey: 'Name',
        local: suchObjekte,
        limit: 20
    }).on('typeahead:selected', function (e, datum) {
        var oeffneBaumZuId = require('./jstree/oeffneBaumZuId');
        oeffneBaumZuId(datum.id);
    });
    $("#suchfeld" + window.adb.Gruppe).focus();
};