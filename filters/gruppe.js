function (doc, req) {
    'use strict'
    // Zweck: DB nach Gruppe filtern
    var gruppe = req.query.gruppe
    // need to pass Lebensräume as lr, otherwise curl on windows errors
    if (gruppe === 'lr') gruppe = 'Lebensräume'
    if (doc.Gruppe && gruppe && doc.Gruppe === gruppe) return true
    return false
}
