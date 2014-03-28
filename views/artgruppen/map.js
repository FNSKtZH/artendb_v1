function(doc) {

	var i,
		gis_layer;

	if (doc.Typ && doc.Typ === "Objekt" && doc.Datensammlungen) {
		ds_loop:
		for (i=0; i<doc.Datensammlungen.length; i++) {
			if (doc.Datensammlungen[i].Name === "ZH GIS" && doc.Datensammlungen[i].Daten && doc.Datensammlungen[i].Daten["GIS-Layer"]) {
				gis_layer = doc.Datensammlungen[i].Daten["GIS-Layer"];
				emit (gis_layer, null);
				break ds_loop;
			}
		}
	}
}