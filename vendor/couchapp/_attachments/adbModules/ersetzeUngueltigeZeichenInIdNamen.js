module.exports = function (idname) {
    'use strict';
    return idname.replace(/\s+/g, " ").replace(/ /g, '').replace(/,/g, '').replace(/\./g, '').replace(/:/g, '').replace(/-/g, '').replace(/\//g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\&/g, '');
};