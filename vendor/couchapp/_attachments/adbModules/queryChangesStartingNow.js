// wird momentan nicht benutzt

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $            = require('jquery'),
    queryChanges = require('./queryChanges');

module.exports = function (options) {
    var filter,
        dsname;

    options       = options || {};
    options.since = 'now';
    if (options.filter) {
        // der Filter bremst die Abfrage - das ist schlecht, weil dann bereits DS aktualisiert wurden!
        // daher für die Erstabfrage entfernen
        filter = options.filter;
        dsname = options.dsname;
        delete options.view;
        delete options.dsname;
    }
    $.ajax({
        type:     'get',
        url:      '/artendb/_changes',
        dataType: 'json',
        data:     options
    }).done(function (data) {
        $(document).trigger('longpoll-data', data, data.last_seq);
        options.feed  = 'longpoll';
        options.since = data.last_seq;
        if (filter) {
            options.filter = filter;
            options.dsname = dsname;
        }
        $.ajax({
            type:     'get',
            url:      '/artendb/_changes',
            dataType: 'json',
            data:     options
        }).done(function (data2) {
            if (data2.results.length > 0) {
                $(document).trigger('longpoll-data2', data2);
            }
            options.since = data2.last_seq;
            // dafür sorgen, dass weiter beobachtet wird
            queryChanges(options);
        });
    });
};