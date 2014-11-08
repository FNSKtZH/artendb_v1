/*jslint node: true, browser: true, nomen: true, todo: true */


'use strict';

var returnFunction = function ($, level, filter, gruppe, id) {
    var startkey,
        // flag, um mitzuliefern, ob die id angezeigt werden soll
        id2 = false,
        endkey = [],
        a,
        url;

    if (filter) {
        // bei lr gibt es keinen filter und das erzeugt einen fehler
        startkey = filter.slice();
        endkey = filter.slice();
    }

    switch (gruppe) {
    case "fauna":
        if (level > 4) {
            return null;
        }
        for (a = 5; a >= level; a--) {
            endkey.push({});
        }
        // im untersten level einen level mehr anzeigen, damit id vorhanden ist
        if (level === 4) {
            // das ist die Art-Ebene
            // hier soll die id angezeigt werden
            // dazu muss der nächste level abgerufen werden
            // damit die list den zu hohen level korrigieren kann, id mitgeben
            id2 = true;
            level++;
        }
        break;
    case "flora":
        if (level > 3) {
            return null;
        }
        for (a = 4; a >= level; a--) {
            endkey.push({});
        }
        // im untersten level einen level mehr anzeigen, damit id vorhanden ist
        if (level === 3) {
            id2 = true;
            level++;
        }
        break;
    case "moose":
        if (level > 4) {
            return null;
        }
        for (a = 5; a >= level; a--) {
            endkey.push({});
        }
        // im untersten level einen level mehr anzeigen, damit id vorhanden ist
        if (level === 4) {
            id2 = true;
            level++;
        }
        break;
    case "macromycetes":
        if (level > 2) {
            return null;
        }
        for (a = 3; a >= level; a--) {
            endkey.push({});
        }
        // im untersten level einen level mehr anzeigen, damit id vorhanden ist
        if (level === 2) {
            id2 = true;
            level++;
        }
        break;
    }
    if (gruppe === "lr") {
        url = $(location).attr("protocol") + '//' + $(location).attr("host") + '/artendb/_design/artendb/_list/baum_lr/baum_lr?startkey=[' + level + ', "' + id + '"]&endkey=[' + level + ', "' + id + '",{},{},{},{}]&group_level=6';
    } else {
        url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_" + gruppe + "/baum_" + gruppe + "?startkey=" + JSON.stringify(startkey) + "&endkey=" + JSON.stringify(endkey) + "&group_level=" + level;
    }
    if (id2) {
        url = url + "&id=true";
    }
    return url;
};

module.exports = returnFunction;