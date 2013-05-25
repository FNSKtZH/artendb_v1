function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row, doc, art, i, j, k;

	// specify that we're providing a JSON response
	provides('json', function() {

		while (row = getRow()) {
			doc = row.doc;
			art = {};
			art._id = doc._id;
			art.Typ = "Arteigenschaft";
			art["Taxonomie ID"] = doc.Taxonomie.Daten["Taxonomie ID"];
			art.Artname = doc.Taxonomie.Daten["Artname vollständig"];
			ds_loop:
			for (i=0; i<doc.Datensammlungen.length; i++) {
				if (doc.Datensammlungen[i].Name === "ZH Artengruppen") {
					art.ArtGruppe = doc.Datensammlungen[i].Daten["GIS-Layer"].replace('ue', 'ü');
					break ds_loop;
				}
			}
			//Hinweis Verwandschaft
			if (doc.Gruppe === "Flora" && doc.Beziehungssammlungen) {
				bs_loop:
				for (j=0; j<doc.Beziehungssammlungen.length; j++) {
					if (doc.Beziehungssammlungen[j].Name === "SISF Index 2 (2005): offizielle Art") {
						if (doc.Beziehungssammlungen[j].Beziehungen && doc.Beziehungssammlungen[j].Beziehungen[0] && doc.Beziehungssammlungen[j].Beziehungen[0].Beziehungspartner && doc.Beziehungssammlungen[j].Beziehungen[0].Beziehungspartner[0] && doc.Beziehungssammlungen[j].Beziehungen[0].Beziehungspartner[0].Name) {
							art.HinweisVerwandschaft = "Achtung: Synonym von " + doc.Beziehungssammlungen[j].Beziehungen[0].Beziehungspartner[0].Name;
						}
						break bs_loop;
					}
				}
			}
			if (doc.Gruppe === "Moose") {
				bs_loop_2:
				for (k=0; k<doc.Beziehungssammlungen.length; k++) {
					if (doc.Beziehungssammlungen[k].Name === "NISM (2010): akzeptierte Referenz") {
						if (doc.Beziehungssammlungen[k].Beziehungen && doc.Beziehungssammlungen[k].Beziehungen[0] && doc.Beziehungssammlungen[k].Beziehungen[0].Beziehungspartner && doc.Beziehungssammlungen[k].Beziehungen[0].Beziehungspartner[0] && doc.Beziehungssammlungen[k].Beziehungen[0].Beziehungspartner[0].Name) {
							art.HinweisVerwandschaft = "Achtung: Synonym von " + doc.Beziehungssammlungen[j].Beziehungen[0].Beziehungspartner[0].Name;
						}
						break bs_loop_2;
					}
				}
			}
		}
		send(JSON.stringify(exportObjekte));
	});
}