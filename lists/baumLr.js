function (head, req) {
    'use strict';

    start({
        "headers": {
            "Accept-Charset": "utf-8",
            "Content-Type": "json; charset=utf-8;"
        }
    });

    var row,
        objekt,
        objektArray = [];

    while(row = getRow()) {
        objekt = {};
        objekt.data = row.key[4];
        objekt.attr = {};
        objekt.attr.level = row.key[0];
        objekt.attr.gruppe = "lr";
        objekt.attr.id = row.key[5];
        objekt.state = "closed";
        objektArray.push(objekt);
    }

    send(JSON.stringify(objektArray));
}