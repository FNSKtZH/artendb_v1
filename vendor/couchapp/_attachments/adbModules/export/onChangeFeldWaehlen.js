// wenn .feldWaehlen geändert wird
// 1.: kontrollieren, ob mehr als eine Beziehungssammlung angezeigt wird
//     und pro Beziehung eine Zeile ausgegeben wird. 
//     Wenn ja: reklamieren und rückgängig machen
// 2.: kontrollieren, ob mehr als 30 Felder gewählt wurden
//     wenn ja: reklamieren und rückgängig machen

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                                               = require('jquery'),
    pruefeObZuvieleExportfelderGewaehltSind         = require('./pruefeObZuvieleExportfelderGewaehltSind'),
    pruefeObZuvieleBeziehungssammlungenGewaehltSind = require('./pruefeObZuvieleBeziehungssammlungenGewaehltSind'),
    exportZuruecksetzen                             = require('./exportZuruecksetzen');

module.exports = function () {
    var that = this;

    if ($(that).prop('checked')) {
        // wenn das Feld hinzugefügt wurde: prüfen, ob zuviele Felder gewählt sind...
        if (pruefeObZuvieleExportfelderGewaehltSind(that)) {
            return false;
        }
        // ...oder zuviele Beziehungen
        if (pruefeObZuvieleBeziehungssammlungenGewaehltSind(that)) {
            return false;
        }
    }

    // alles i.o.
    // da ein Feld verändert wurde, allfälligen Export zurücksetzen
    exportZuruecksetzen(that);
    return true;
};