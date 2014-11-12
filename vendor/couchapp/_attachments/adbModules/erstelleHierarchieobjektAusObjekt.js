/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

module.exports = function (objekt) {
    var hierarchieobjekt = {},
    erstelleLrLabelNameAusObjekt = require('./lr/erstelleLrLabelNameAusObjekt');

    hierarchieobjekt.Name = erstelleLrLabelNameAusObjekt(objekt);
    hierarchieobjekt.GUID = objekt._id;

    return hierarchieobjekt;
};