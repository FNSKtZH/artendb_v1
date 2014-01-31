// wählt alle Dokumente, die GIS-Layer und Betrachtungsdistanz enthalten
// sowie ihre Synonyme
function(doc) {
	if (doc.Gruppe) {
		// sicherstellen, dass GIS-Layer und Betrachtungsdistanz existieren
		if (doc.Datensammlungen && doc.Datensammlungen.length > 0) {
			// durch alle Datensammlungen loopen
			for (var i=0; i<doc.Datensammlungen.length; i++) {
				if (doc.Datensammlungen[i].Name && doc.Datensammlungen[i].Name === "ZH GIS" && doc.Datensammlungen[i].Daten && doc.Datensammlungen[i].Daten["GIS-Layer"] && doc.Datensammlungen[i].Daten["Betrachtungsdistanz (m)"]) {
					// ok, alle benötigten Felder sind vorhanden
					// erst mal das eigene Dokument senden
					// der zweite key markiert, dass dies das Original ist
					emit ([doc._id, 1]);
					if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
						// durch alle Beziehungssammlungen loopen
						for (var y=0; y<doc.Beziehungssammlungen.length; y++) {
							if (doc.Beziehungssammlungen[y].Typ && doc.Beziehungssammlungen[y].Typ === "taxonomisch" && doc.Beziehungssammlungen[y]["Art der Beziehungen"] && doc.Beziehungssammlungen[y]["Art der Beziehungen"] === "synonym" && doc.Beziehungssammlungen[y].Beziehungen && doc.Beziehungssammlungen[y].Beziehungen.length > 0) {
								// jetzt durch alle synonymen Beziehungen loopen
								for (var x=0; x<doc.Beziehungssammlungen[y].Beziehungen.length; x++) {
									if (doc.Beziehungssammlungen[y].Beziehungen[x].Beziehungspartner && doc.Beziehungssammlungen[y].Beziehungen[x].Beziehungspartner.length > 0) {
										// durch alle Beziehungspartner der synonymen Beziehungen loopen
										for (var z=0; z<doc.Beziehungssammlungen[y].Beziehungen[x].Beziehungspartner.length; z++) {
											if (doc.Beziehungssammlungen[y].Beziehungen[x].Beziehungspartner[z].GUID) {
												// veranlassen, dass mit include_docs=true auch das Dokument dieses Synonyms gesendet wird
												// der zweite key markiert, dass es ein Synonym ist
												emit ([doc._id, 0], {_id: doc.Beziehungssammlungen[y].Beziehungen[x].Beziehungspartner[z].GUID});
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}		
	}
}