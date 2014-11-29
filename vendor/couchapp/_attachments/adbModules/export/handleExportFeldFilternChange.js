// wenn exportFeldFiltern geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung Filter enthält.
// Wenn ja: reklamieren und rückgängig machen

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (that) {
    var $that               = $(that),
        bez_ds_filtered     = [],
        exportZuruecksetzen = require('./exportZuruecksetzen');

    // die Checkboxen sollen drei Werte annehmen können:
    if (that.type === "checkbox") {
        if (that.readOnly) {
            // so ist es zu Beginn
            // dann soll er auf chedked wechseln
            that.readOnly = that.indeterminate = false;
            $that.prop('checked', true);
        } else if (!$that.prop('checked')) {
            that.readOnly = that.indeterminate = false;
            $that.prop('checked', false);
        } else {
            $that.prop('checked', false);
            that.indeterminate = that.readOnly = true;
        }
    }

    $("#exportierenObjekteWaehlenDsCollapse")
        .find(".exportFeldFiltern")
        .each(function () {
            if ((this.value || this.value === 0) && $(this).attr('dstyp') === "Beziehung") {
                bez_ds_filtered.push($(this).attr('eigenschaft'));
            }
        });
    // eindeutige Liste der dsTypen erstellen
    bez_ds_filtered = _.union(bez_ds_filtered);
    if (bez_ds_filtered && bez_ds_filtered.length > 1) {
        $('#meldungZuvieleBs').modal();
        $(that).val("");
    } else {
        exportZuruecksetzen();
    }
};