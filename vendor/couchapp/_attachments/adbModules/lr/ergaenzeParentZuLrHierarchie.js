// Baut den Hierarchiepfad für einen Lebensraum auf
// das erste Element - der Lebensraum selbst - wird mit der Variable "Hierarchie" übergeben
// ruft sich selbst rekursiv auf, bis das oberste Hierarchieelement erreicht ist

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _                                 = require('underscore'),
    erstelleHierarchieobjektAusObjekt = require('../erstelleHierarchieobjektAusObjekt');

var ergaenzeParentZuLrHierarchie = function (objektArray, parentGUID, hierarchie) {
    var parentObjekt,
        hierarchieErgaenzt;

    _.each(objektArray, function (object) {
        if (object._id === parentGUID) {
            parentObjekt = erstelleHierarchieobjektAusObjekt(object);
            hierarchie.push(parentObjekt);
            if (object.Taxonomie.Eigenschaften.Parent.GUID !== object._id) {
                // die Hierarchie ist noch nicht zu Ende - weitermachen
                //console.log('hierarchie: ', hierarchie);
                hierarchieErgaenzt = ergaenzeParentZuLrHierarchie(objektArray, object.Taxonomie.Eigenschaften.Parent.GUID, hierarchie);
                //console.log('hierarchieErgaenzt: ', hierarchieErgaenzt);
                return hierarchie;
            }
            // jetzt ist die Hierarchie vollständig
            // sie ist aber verkehrt - umkehren
            return hierarchie.reverse();
        }
    });
};

module.exports = ergaenzeParentZuLrHierarchie;