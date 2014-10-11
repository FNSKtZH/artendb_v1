// wenn export_feld_filtern geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung Filter enthält.
// Wenn ja: reklamieren und rückgängig machen

'use strict';

// braucht $ wegen .modal
var returnFunction = function ($, that) {
	var $that = $(that);
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

	var bez_ds_filtered = [];
	$("#exportieren_objekte_waehlen_ds_collapse")
        .find(".export_feld_filtern")
        .each(function() {
            if ((that.value || that.value === 0) && $(that).attr('dstyp') === "Beziehung") {
                bez_ds_filtered.push($(that).attr('eigenschaft'));
            }
        });
	// eindeutige Liste der dsTypen erstellen
	bez_ds_filtered = _.union(bez_ds_filtered);
	if (bez_ds_filtered && bez_ds_filtered.length > 1) {
		$('#meldung_zuviele_bs').modal();
		$(that).val("");
	} else {
		window.adb.exportZurücksetzen();
	}
};

module.exports = returnFunction;