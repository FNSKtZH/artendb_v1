/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var erstelleLrLabelNameAusObjekt = require('./lr/erstelleLrLabelNameAusObjekt');

module.exports = function (objekt) {
    var hierarchieobjekt = {};

    hierarchieobjekt.Name = erstelleLrLabelNameAusObjekt(objekt);
    hierarchieobjekt.GUID = objekt._id;

    return hierarchieobjekt;
};