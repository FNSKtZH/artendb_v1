function (doc) {
  'use strict'

  var _ = require('views/lib/underscore'),
    value = {},
    artnameVollständig,
    artnameVollständigWorte

  if (doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften['Artname vollständig']) {

    artnameVollständig = doc.Taxonomie.Eigenschaften['Artname vollständig']

    // value.Name: dieser Name wird als Suchresultat angezeigt
    value.Name = artnameVollständig

    // mit dieser id wird der Datensatz geholt
    value.id = doc._id

    // nach den in tokens enthaltenen Begriffen wird gesucht
    value.tokens = []

    // Artnamen vollständig auftrennen
    artnameVollständigWorte = artnameVollständig.split(' ')
    _.each(artnameVollständigWorte, function (wort) {
      // Klammern entfernen. Sonst findet die Suche nach 'Erd' keine Erdkröte (nur die Suche nach '(Erd')
      value.tokens.push(wort.replace('\(', '', 'g').replace('\)', '', 'g'))
    })

    // Idee: GUID und Taxonomie Id als token ergänzen
    // funktioniert nicht, daher ausgeschaltet
    /*value.tokens.push(doc._id)
    if (doc.Taxonomie.Eigenschaften['Taxonomie ID']) {
      value.tokens.push(doc.Taxonomie.Eigenschaften['Taxonomie ID'])
    }*/
    
    emit([doc.Gruppe, artnameVollständig], value)
  }
}