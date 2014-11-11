// wird momentan nicht benutzt

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

var queryChanges = function (options) {
    options = options || {};
    options.since = options.since || "now";
    options.feed = options.feed || "longpoll";
    $.ajax({
        type: "get",
        url: "/artendb/_changes",
        dataType: "json",
        data: options
    }).done(function (data) {
        if (data.results.length > 0) {
            $(document).trigger('longpoll-data', data);
        }
        options.since = data.last_seq;
        queryChanges(options);
    });
};

module.exports = queryChanges;