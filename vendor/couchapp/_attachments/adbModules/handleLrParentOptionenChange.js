// wenn #lr_parent_waehlen_optionen [name="parent_optionen"] geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

var returnFunction = function (that) {
    // prüfen, ob oberster Node gewählt wurde
    var parent_name                        = $(that).val(),
        parent_id                          = that.id,
        parent                             = {},
        object                             = {},
        $db                                = $.couch.db("artendb"),
        erstelleBaum                       = require('./jstree/erstelleBaum'),
        oeffneBaumZuId                     = require('./jstree/oeffneBaumZuId'),
        aktualisiereHierarchieEinesNeuenLr = require('./aktualisiereHierarchieEinesNeuenLr');

    // zuerst eine id holen
    object._id = $.couch.newUUID(1);
    object.Gruppe = "Lebensräume";
    object.Typ = "Objekt";
    object.Taxonomie = {};
    object.Taxonomie.Name = "neue Taxonomie";    // wenn nicht Wurzel, setzen. Passiert in aktualisiereHierarchieEinesNeuenLr
    object.Taxonomie.Eigenschaften = {};
    object.Taxonomie.Eigenschaften.Taxonomie = "neue Taxonomie";    // wenn nicht Wurzel, setzen. Passiert in aktualisiereHierarchieEinesNeuenLr
    // wenn keine Wurzel: Label anzeigen
    if (parent_id !== "0") {
        object.Taxonomie.Eigenschaften.Label = "";
    }
    object.Taxonomie.Eigenschaften.Einheit = "unbeschriebener Lebensraum";
    if (parent_id === "0") {
        object.Taxonomie.Eigenschaften.Einheit = "neue Taxonomie";
    }
    /*Einheit-Nr FNS wird nicht mehr benötigt, bzw. unabhängig führen
    object.Taxonomie.Eigenschaften["Einheit-Nr FNS"] = "";
    if (parent_id === "0") {
        object.Taxonomie.Eigenschaften["Einheit-Nrn FNS von"] = "";
        object.Taxonomie.Eigenschaften["Einheit-Nrn FNS bis"] = "";
    }*/
    object.Taxonomie.Eigenschaften.Beschreibung = "";
    object.Eigenschaftensammlungen = [];
    object.Beziehungssammlungen = [];
    // jetzt den parent erstellen
    // geht nicht vorher, weil die id bekannt sein muss
    if (parent_id === "0") {
        // das ist die Wurzel der Taxonomie
        parent.Name = "neue Taxonomie";
        parent.GUID = object._id;
        // bei der Wurzel ist Hierarchie gleich parent
        object.Taxonomie.Eigenschaften.Hierarchie = [];
        object.Taxonomie.Eigenschaften.Hierarchie.push(parent);
    } else {
        parent.Name = parent_name;
        parent.GUID = parent_id;
    }
    object.Taxonomie.Eigenschaften.Parent = parent;
    // in die DB schreiben
    $db.saveDoc(object, {
        success: function (resp) {
            object._rev = resp.rev;
            if (parent_id !== "0") {
                // die Hierarchie aufbauen und setzen
                // bei der Wurzel ist sie schon gesetzt
                aktualisiereHierarchieEinesNeuenLr(null, object, true);
            } else {
                $.when(erstelleBaum()).then(function () {
                    oeffneBaumZuId(object._id);
                    $('#lr_parent_waehlen').modal('hide');
                });
            }
        },
        error: function () {
            console.log('handleLrParentOptionenChange: Datensatz nicht gespeichert');
        }
    });
};

module.exports = returnFunction;