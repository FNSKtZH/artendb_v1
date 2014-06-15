function(doc) {
    'use strict';
	var gis_layer,
        ds_mit_gislayer,
        _ = require("views/lib/underscore");
	if (doc.Typ && doc.Typ === "Objekt") {
		if (doc.Eigenschaftensammlungen) {
            ds_mit_gislayer = _.find(doc.Eigenschaftensammlungen, function(es) {
                return es.Name && es.Name === "ZH GIS" && es.Eigenschaften && es.Eigenschaften["GIS-Layer"];
            });
            gis_layer = ds_mit_gislayer.Eigenschaften["GIS-Layer"];
            emit(gis_layer, null);
		}
		if (doc.Gruppe === "Macromycetes" && !gis_layer) {
			// momentan fehlen bei Macromycetes die ZH GIS
			// diese Info wird für evab mobile benutzt
			gis_layer = "Pilze";
			emit(gis_layer, null);
		}
	}
}