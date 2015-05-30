function (head, req) {
  'use strict'

  start({
    'headers': {
      'Content-Type': 'json; charset=utf-8;',
      'Content-disposition': 'attachment;filename=Arten.json',
      'Accept-Charset': 'utf-8'
    }
  })

  var _ = require ('lists/lib/underscore'),
    row,
    doc,
    exportJson = {},
    art,
    eigenschaftensammlungZhGis,
    beziehungssammlungOffizielleArt,
    beziehungssammlungAkzeptierteReferenz,
    k

  exportJson.docs = []

  while (row = getRow()) {
    doc = row.doc
    art = {}
    art._id = doc._id
    art.Typ = 'Arteigenschaft'

    eigenschaftensammlungZhGis = _.find(doc.Eigenschaftensammlungen, function (eigenschaftensammlung) {
      return eigenschaftensammlung.Name === 'ZH GIS'
    })
    if (eigenschaftensammlungZhGis) {
      art.ArtGruppe = eigenschaftensammlungZhGis.Eigenschaften['GIS-Layer'].replace('ae', 'ä').replace('oe', 'ö').replace('ue', 'ü')
    }

    art['Taxonomie ID'] = doc.Taxonomie.Eigenschaften['Taxonomie ID']
    art.Artname = doc.Taxonomie.Eigenschaften['Artname vollständig']

    // Hinweis Verwandschaft
    if (doc.Gruppe === 'Flora' && doc.Beziehungssammlungen) {
      beziehungssammlungOffizielleArt = _.find(doc.Beziehungssammlungen, function (beziehungssammlung) {
        return beziehungssammlung.Name === 'SISF Index 2 (2005): offizielle Art'
      })
      if (beziehungssammlungOffizielleArt) {
        if (beziehungssammlungOffizielleArt.Beziehungen && beziehungssammlungOffizielleArt.Beziehungen[0] && beziehungssammlungOffizielleArt.Beziehungen[0].Beziehungspartner && beziehungssammlungOffizielleArt.Beziehungen[0].Beziehungspartner[0] && beziehungssammlungOffizielleArt.Beziehungen[0].Beziehungspartner[0].Name) {
          art.HinweisVerwandschaft = 'Achtung: Synonym von ' + beziehungssammlungOffizielleArt.Beziehungen[0].Beziehungspartner[0].Name
        }
      }
    }
    if (doc.Gruppe === 'Moose') {
      beziehungssammlungAkzeptierteReferenz = _.find(doc.Beziehungssammlungen, function (beziehungssammlung) {
        return beziehungssammlung.Name === 'NISM (2010): akzeptierte Referenz'
      })
      if (beziehungssammlungAkzeptierteReferenz) {
        if (beziehungssammlungAkzeptierteReferenz.Beziehungen && beziehungssammlungAkzeptierteReferenz.Beziehungen[0] && beziehungssammlungAkzeptierteReferenz.Beziehungen[0].Beziehungspartner && beziehungssammlungAkzeptierteReferenz.Beziehungen[0].Beziehungspartner[0] && beziehungssammlungAkzeptierteReferenz.Beziehungen[0].Beziehungspartner[0].Name) {
          art.HinweisVerwandschaft = 'Achtung: Synonym von ' + beziehungssammlungAkzeptierteReferenz.Beziehungen[0].Beziehungspartner[0].Name
        }
      }
    }
    if (doc.Gruppe === 'Macromycetes') {
      // bei Pilzen fehlt momentan in arteigenschaften.ch der GIS-Layer
      art.ArtGruppe = 'Pilze'
    }
    exportJson.docs.push(art)
  }
  send(JSON.stringify(exportJson))
}