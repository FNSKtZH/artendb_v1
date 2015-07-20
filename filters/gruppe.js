function (doc, req) {
    'use strict'
    // Zweck: DB nach Gruppe filtern
    var gruppe = req.query.gruppe
    if (doc.Gruppe && gruppe && doc.Gruppe === gruppe) return true
    return false
}
