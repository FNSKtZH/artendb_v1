/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (bsName, objekt) {
    var $db = $.couch.db('artendb'),
        i;

    if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
        for (i = 0; i < objekt.Beziehungssammlungen.length; i++) {
            if (objekt.Beziehungssammlungen[i].Name === bsName) {
                objekt.Beziehungssammlungen.splice(i, 1);
                $db.saveDoc(objekt);
                // mitteilen, dass eine bs entfernt wurde
                $(document).trigger('adb.bsEntfernt');
                break;
            }
        }
    }
};