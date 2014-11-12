// aktualisiert die Hierarchie eines Arrays von Objekten (in dieser Form: Lebensräumen, siehe wie der Name der parent-objekte erstellt wird)
// der Array kann das Resultat einer Abfrage aus der DB sein (object[i] = dara.rows[i].doc)
// oder aus dem Import einer Taxonomie stammen
// diese Funktion wird benötigt, wenn eine neue Taxonomie importiert wird
// Momentan nicht verwendet

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (objectArray) {
    var hierarchie,
        parent,
        $db = $.couch.db('artendb'),
        ergaenzeParentZuLrHierarchie      = require('./ergaenzeParentZuLrHierarchie'),
        erstelleHierarchieobjektAusObjekt = require('../erstelleHierarchieobjektAusObjekt');

    _.each(objectArray, function (object) {
        hierarchie = [];
        parent = object.Taxonomie.Eigenschaften.Parent;
        // als Start sich selben zur Hierarchie hinzufügen
        hierarchie.push(erstelleHierarchieobjektAusObjekt(object));
        if (parent) {
            object.Taxonomie.Eigenschaften.Hierarchie = ergaenzeParentZuLrHierarchie(objectArray, object._id, hierarchie);
            $db.saveDoc(object);
        }
    });
};