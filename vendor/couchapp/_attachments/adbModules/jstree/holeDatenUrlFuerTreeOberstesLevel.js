/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function () {
    var gruppe,
        url;
    // wie sicherstellen, dass nicht dieselben nodes mehrmals angehängt werden?
    switch (window.adb.Gruppe) {
    case "Fauna":
        gruppe = "fauna";
        break;
    case "Flora":
        gruppe = "flora";
        break;
    case "Moose":
        gruppe = "moose";
        break;
    case "Macromycetes":
        gruppe = "macromycetes";
        break;
    case "Lebensräume":
        gruppe = "lr";
        break;
    }
    if (window.adb.Gruppe === "Lebensräume") {
        url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_lr/baum_lr?startkey=[1]&endkey=[1,{},{},{},{},{}]&group_level=6";
    } else {
        url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_" + gruppe + "/baum_" + gruppe + "?group_level=1";
    }
    return url;
};