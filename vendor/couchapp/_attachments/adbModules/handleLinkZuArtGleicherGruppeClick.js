// wenn .LinkZuArtGleicherGruppe geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (id) {
    $(".suchen").val("");
    $("#tree" + window.adb.gruppe)
        .jstree("clear_search")
        .jstree("deselect_all")
        .jstree("close_all", -1)
        .jstree("select_node", "#" + id);
};