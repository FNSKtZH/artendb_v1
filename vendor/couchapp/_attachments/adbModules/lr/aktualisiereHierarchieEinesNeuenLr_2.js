/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                 = require('jquery'),
    _                                 = require('underscore'),
    oeffneBaumZuId                    = require('../jstree/oeffneBaumZuId'),
    erstelleBaum                      = require('../jstree/erstelleBaum'),
    initiiereArt                      = require('../initiiereArt'),
    ergaenzeParentZuLrHierarchie      = require('./ergaenzeParentZuLrHierarchie'),
    erstelleHierarchieobjektAusObjekt = require('../erstelleHierarchieobjektAusObjekt');

module.exports = function (LR, object) {
    var objectArray,
        parentObject,
        hierarchie = [],
        $db        = $.couch.db('artendb');

    objectArray = _.map(LR.rows, function (row) {
        return row.doc;
    });

    object.Taxonomie               = object.Taxonomie               || {};
    object.Taxonomie.Eigenschaften = object.Taxonomie.Eigenschaften || {};

    parentObject = _.find(objectArray, function (obj) {
        return obj._id === object.Taxonomie.Eigenschaften.Parent.GUID;
    });
    // object.Name setzen
    object.Taxonomie.Name = parentObject.Taxonomie.Name;
    // object.Taxonomie.Eigenschaften.Taxonomie setzen
    object.Taxonomie.Eigenschaften.Taxonomie = parentObject.Taxonomie.Eigenschaften.Taxonomie;
    // als Start sich selben zur Hierarchie hinzufügen
    hierarchie.push(erstelleHierarchieobjektAusObjekt(object));
    object.Taxonomie.Eigenschaften.Hierarchie = ergaenzeParentZuLrHierarchie(objectArray, object.Taxonomie.Eigenschaften.Parent.GUID, hierarchie);
    // save ohne open: _rev wurde zuvor übernommen
    $db.saveDoc(object, {
        success: function () {
            $.when(erstelleBaum()).then(function () {
                oeffneBaumZuId(object._id);
                $('#lrParentWaehlen').modal('hide');
            });
        },
        error: function () {
            $("#meldungIndividuellLabel").html("Fehler");
            $("#meldungIndividuellText").html("Die Hierarchie des Lebensraums konnte nicht erstellt werden");
            $("#meldungIndividuellSchliessen").html("schliessen");
            $('#meldungIndividuell').modal();
            initiiereArt(object._id);
        }
    });
};