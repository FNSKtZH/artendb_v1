// läuft von oben nach unten durch die Hierarchie der Lebensräume
// ruft sich selber wieder auf, wenn ein tieferer level existiert
// erwartet idArray: einen Array der GUID's aus der Hierarchie des Objekts

/*jslint node: true */
'use strict';

var oeffneNodeNachIdArray = function ($, idArray) {
    if (idArray.length > 1) {
        $.jstree._reference("#tree" + window.adb.Gruppe).open_node($("#" + idArray[0]), function () {
            idArray.splice(0,1);
            oeffneNodeNachIdArray($, idArray);
        }, false);
    } else if (idArray.length === 1) {
        $.jstree._reference("#tree" + window.adb.Gruppe).select_node($("#" + idArray[0]), null, true);
    }
};

module.exports = oeffneNodeNachIdArray;