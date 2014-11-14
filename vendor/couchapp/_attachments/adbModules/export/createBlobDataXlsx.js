/**
 *
 * Bekommt: Export-Objekte
 * Retourniert: data für den Blob
 * Quelle: https://github.com/SheetJS/js-xlsx
 *
 **/

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, continue: true*/
'use strict';

var XLSX = require('XLSX'),
    _    = require('underscore');

function datenum(v, date1904) {
    if (date1904) {
        v += 1462;
    }
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheetFromArrayOfArrays(data) {
    var ws = {},
        range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0 }},
        R,
        C,
        cell,
        cell_ref;

    for (R = 0; R !== data.length; ++R) {
        for (C = 0; C !== data[R].length; ++C) {
            if (range.s.r > R) { range.s.r = R; }
            if (range.s.c > C) { range.s.c = C; }
            if (range.e.r < R) { range.e.r = R; }
            if (range.e.c < C) { range.e.c = C; }
            cell = {v: data[R][C] };
            if (cell.v === null) {
                continue;
            }
            cell_ref = XLSX.utils.encode_cell({c: C, r: R});

            if (typeof cell.v === 'number') {
                cell.t = 'n';
            } else if (typeof cell.v === 'boolean') {
                cell.t = 'b';
            } else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            } else {
                cell.t = 's';
            }

            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) {
        ws['!ref'] = XLSX.utils.encode_range(range);
    }
    return ws;
}

var wsName = "arteigenschaften";

function Workbook() {
    if (!(this instanceof Workbook)) {
        return new Workbook();
    }
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s) {
    var buf  = new ArrayBuffer(s.length),
        view = new Uint8Array(buf),
        i;

    for (i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

function buildDataFromObject(data) {
    var dataArray = [];

    // die Feldnamen zuerst:
    dataArray.push(_.keys(data[0]));
    // dann die Daten
    _.each(data, function (object) {
        dataArray.push(_.map(object, function (val) {
            return val;
        }));
    });

    //console.log('dataArray: ', dataArray);

    return dataArray;
}

module.exports = function (data) {
    var wb = new Workbook(),
        dataArray = buildDataFromObject(data),
        ws = sheetFromArrayOfArrays(dataArray),
        wbout;

    /* add worksheet to workbook */
    wb.SheetNames.push(wsName);
    wb.Sheets[wsName] = ws;
    wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});

    return s2ab(wbout);
};