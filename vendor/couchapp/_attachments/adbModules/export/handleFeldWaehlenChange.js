// wenn .feld_waehlen geändert wird
// 1.: kontrollieren, ob mehr als eine Beziehungssammlung angezeigt wird
//     und pro Beziehung eine Zeile ausgegeben wird. 
//     Wenn ja: reklamieren und rückgängig machen
// 2.: kontrollieren, ob mehr als 50 Felder gewählt wurden
//     wenn ja: reklamieren und rückgängig machen

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var formular = $(that).closest('form').attr('id'),
        _alt = '',
        pruefeObZuvieleExportfelderGewaehltSind         = require('./pruefeObZuvieleExportfelderGewaehltSind'),
        pruefeObZuvieleBeziehungssammlungenGewaehltSind = require('./pruefeObZuvieleBeziehungssammlungenGewaehltSind'),
        exportZuruecksetzen                             = require('./exportZuruecksetzen');

    if (formular === 'export_alt') {
        _alt = '_alt';
    }

    if ($(that).prop('checked')) {
        // wenn das Feld hinzugefügt wurde: prüfen, ob zuviele Felder gewählt sind...
        if (pruefeObZuvieleExportfelderGewaehltSind(that, _alt)) {
            return false;
        }
        // ...oder zuviele Beziehungen
        if (pruefeObZuvieleBeziehungssammlungenGewaehltSind(that, _alt)) {
            return false;
        }
    }

    // alles i.o.
    // da ein Feld verändert wurde, allfälligen Export zurücksetzen
    exportZuruecksetzen(null, _alt);
    return true;
};