// übernimmt Feldname und Feldwert
// generiert daraus und retourniert html für die Darstellung im passenden Feld

'use strict';

var returnFunction = function (feldname, feldwert, ds_typ, ds_name) {
    var html_datensammlung = "";
    if ((typeof feldwert === "string" && feldwert.slice(0, 7) === "http://") || (typeof feldwert === "string" && feldwert.slice(0, 8) === "https://") || (typeof feldwert === "string" && feldwert.slice(0, 2) === "//")) {
        // www-Links als Link darstellen
        html_datensammlung += window.adb.generiereHtmlFürWwwLink(feldname, feldwert, ds_typ, ds_name);
    } else if (typeof feldwert === "string" && feldwert.length < 45) {
        html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "text", ds_typ, ds_name);
    } else if (typeof feldwert === "string" && feldwert.length >= 45) {
        html_datensammlung += window.adb.generiereHtmlFürTextarea(feldname, feldwert, ds_typ);
    } else if (typeof feldwert === "number") {
        html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "number", ds_typ, ds_name);
    } else if (typeof feldwert === "boolean") {
        html_datensammlung += window.adb.generiereHtmlFürBoolean(feldname, feldwert, ds_typ, ds_name);
    } else {
        html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "text", ds_typ, ds_name);
    }
    return html_datensammlung;
};

module.exports = returnFunction;