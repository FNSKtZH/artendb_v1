function (doc, req) {
    'use strict';
    var field = req.query.field,
        value = req.query.value,
        message;
    doc[field] = {};
    for (i in value) {
        doc[field][i] = value[i];
    }
    message = 'set ' + field +' to ' + JSON.stringify(doc[field]);
    return [doc, message];
}