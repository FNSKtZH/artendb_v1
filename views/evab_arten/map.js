function(doc) {
	var i,
		gis_layer;

	if (doc.Typ && doc.Typ === "Objekt" && doc.Gruppe && doc.Taxonomie && doc.Taxonomie.Daten && doc.Taxonomie.Daten["Artname vollständig"] && (doc.Gruppe === "Fauna" || doc.Gruppe === "Flora" || doc.Gruppe === "Moose" || doc.Gruppe === "Macromycetes")) {

		// gis-layer bestimmen
		if (doc.Datensammlungen) {
			ds_loop:
			for (i=0; i<doc.Datensammlungen.length; i++) {
				if (doc.Datensammlungen[i].Name && doc.Datensammlungen[i].Name === "ZH GIS" && doc.Datensammlungen[i].Daten && doc.Datensammlungen[i].Daten["GIS-Layer"]) {
					gis_layer = doc.Datensammlungen[i].Daten["GIS-Layer"];
					break ds_loop;
				}
			}
		}
		if (doc.Gruppe === "Macromycetes" && !gis_layer) {
			// momentan fehlen bei Macromycetes die ZH GIS
			// diese Info wird für evab mobile benutzt
			gis_layer = "Pilze";
		}

		emit ([gis_layer, doc.Taxonomie.Daten["Artname vollständig"]], null);
	}
}