'use strict'

var $ = require('jquery'),
  _ = require('underscore')

module.exports = function () {
  var $db = $.couch.db('artendb')

  $('#adminPilzeZhgisErgaenzenRueckmeldung').html('Daten werden analysiert...')
  $db.view('artendb/macromycetes?include_docs=true', {
    success: function (data) {
      var dsZhGis = {},
        ergaenzt = 0,
        fehler = 0,
        zhGisSchonDa = 0

      dsZhGis.Name = 'ZH GIS'
      dsZhGis.Beschreibung = 'GIS-Layer und Betrachtungsdistanzen für das Artenlistentool, Artengruppen für EvAB, im Kanton Zürich. Eigenschaften aller Arten'
      dsZhGis.Datenstand = 'dauernd nachgeführt'
      dsZhGis.Link = 'http://www.naturschutz.zh.ch'
      dsZhGis['importiert von'] = 'alex@gabriel-software.ch'
      dsZhGis.Eigenschaften = {}
      dsZhGis.Eigenschaften['GIS-Layer'] = 'Pilze'
      _.each(data.rows, function (row) {
        var pilz = row.doc,
          zhgisInDs

        if (!pilz.Eigenschaftensammlungen) {
          pilz.Eigenschaftensammlungen = []
        }
        zhgisInDs = _.find(pilz.Eigenschaftensammlungen, function (ds) {
          return ds.Name === 'ZH GIS'
        })
        // nur ergänzen, wenn ZH GIS noch nicht existiert
        if (!zhgisInDs) {
          pilz.Eigenschaftensammlungen.push(dsZhGis)
          pilz.Eigenschaftensammlungen = _.sortBy(pilz.Eigenschaftensammlungen, function (ds) {
            return ds.Name
          })
          $db.saveDoc(pilz, {
            success: function () {
              ergaenzt++
              $('#adminPilzeZhgisErgaenzenRueckmeldung').html('Total: ' + data.rows.length + '. Ergänzt: ' + ergaenzt + ', Fehler: ' + fehler + ", 'ZH GIS' schon enthalten: " + zhGisSchonDa)
            },
            error: function () {
              fehler++
              $('#adminPilzeZhgisErgaenzenRueckmeldung').html('Total: ' + data.rows.length + '. Ergänzt: ' + ergaenzt + ', Fehler: ' + fehler + ", 'ZH GIS' schon enthalten: " + zhGisSchonDa)
            }
          })
        } else {
          zhGisSchonDa++
          $('#adminPilzeZhgisErgaenzenRueckmeldung').html('Total: ' + data.rows.length + '. Ergänzt: ' + ergaenzt + ', Fehler: ' + fehler + ", 'ZH GIS' schon enthalten: " + zhGisSchonDa)
        }
      })
    }
  })
}
