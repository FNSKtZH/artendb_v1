/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (bsName, guidArray, verzoegerungsFaktor) {
    var entferneBeziehungssammlungAusObjekt = require('./entferneBeziehungssammlungAusObjekt');

    // alle docs holen
    setTimeout(function () {
        var $db = $.couch.db('artendb');
        $db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guidArray)) + '&include_docs=true', {
            success: function (data) {
                var objekt;
                _.each(data.rows, function (dataRow) {
                    objekt = dataRow.doc;
                    entferneBeziehungssammlungAusObjekt(bsName, objekt);
                });
            }
        });
    }, verzoegerungsFaktor * 40);
};