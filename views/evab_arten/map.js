function(doc) {
	var i,
		gis_layer;

	if (doc.Typ && doc.Typ === "Objekt" && doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften["Artname vollständig"] && (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora" || doc.Gruppe === "Moose" || doc.Gruppe === "Macromycetes")) {

		// gis-layer bestimmen
		if (doc.Eigenschaftensammlungen) {
			for (i=0; i<doc.Eigenschaftensammlungen.length; i++) {
				if (doc.Eigenschaftensammlungen[i].Name && doc.Eigenschaftensammlungen[i].Name === "ZH GIS" && doc.Eigenschaftensammlungen[i].Eigenschaften && doc.Eigenschaftensammlungen[i].Eigenschaften["GIS-Layer"]) {
					gis_layer = doc.Eigenschaftensammlungen[i].Eigenschaften["GIS-Layer"];
					break;
				}
			}
		}
		if (doc.Gruppe === "Macromycetes" && !gis_layer) {
			// momentan fehlen bei Macromycetes die ZH GIS
			// diese Info wird für evab mobile benutzt
			gis_layer = "Pilze";
		}

		emit ([gis_layer, doc.Taxonomie.Eigenschaften["Artname vollständig"]], null);
	}
}