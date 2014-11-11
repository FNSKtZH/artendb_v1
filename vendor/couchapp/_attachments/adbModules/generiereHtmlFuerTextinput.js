// generiert den html-Inhalt für Textinputs

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

module.exports = function (feldname, feldwert, inputTyp, dsTyp, dsName) {
    var html;

    html = '<div class="form-group"><label class="control-label" for="';
    html += feldname;
    html += '">';
    html += feldname;
    html += ':</label><input class="controls form-control input-sm" id="';
    html += feldname;
    html += '" name="';
    html += feldname;
    html += '" type="';
    html += inputTyp;
    html += '" value="';
    html += feldwert;
    html += '" readonly="readonly" dsTyp="' + dsTyp + '" dsName="' + dsName + '"></div>';

    return html;
};