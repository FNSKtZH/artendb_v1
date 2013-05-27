function(doc) {
	var i, artengruppe;
	if (doc.Typ && doc.Typ === "Objekt" && doc.Datensammlungen) {
		ds_loop:
		for (i=0; i<doc.Datensammlungen.length; i++) {
			if (doc.Datensammlungen[i].Name === "ZH Artengruppen" && doc.Datensammlungen[i].Daten && doc.Datensammlungen[i].Daten["GIS-Layer"]) {
				artengruppe = doc.Datensammlungen[i].Daten["GIS-Layer"];
				emit (artengruppe, null);
				break ds_loop;
			}
		}
	}
}