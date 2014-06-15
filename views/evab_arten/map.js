function(doc) {
    'use strict';
	var gis_layer,
        es_mit_gislayer,
        _ = require("views/lib/underscore");

	if (doc.Typ && doc.Typ === "Objekt" && doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften["Artname vollständig"] && (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora" || doc.Gruppe === "Moose" || doc.Gruppe === "Macromycetes")) {

		// gis-layer bestimmen
		if (doc.Eigenschaftensammlungen) {
            es_mit_gislayer = _.find(doc.Eigenschaftensammlungen, function(es) {
                return es.Name && es.Name === "ZH GIS" && es.Eigenschaften && es.Eigenschaften["GIS-Layer"];
            });
            gis_layer = es_mit_gislayer.Eigenschaften["GIS-Layer"];
		}
		if (doc.Gruppe === "Macromycetes" && !gis_layer) {
			// momentan fehlen bei Macromycetes die ZH GIS
			// diese Info wird für evab mobile benutzt
			gis_layer = "Pilze";
		}

		emit([gis_layer, doc.Taxonomie.Eigenschaften["Artname vollständig"]], null);
	}
}