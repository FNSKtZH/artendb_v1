function(doc) {
	// dieser View wird benutzt, wenn ein Objekt aktualisiert wird, um die entsprechenden Informationen (Name und ev. Taxonomie) allen Beziehungen weiterzuleiten
	if (doc.Beziehungssammlungen) {
		for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
			if (doc.Beziehungssammlungen[i].Beziehungen && doc.Beziehungssammlungen[i].Beziehungen.length>0) {
				for (var x=0; x<doc.Beziehungssammlungen[i].Beziehungen.length; x++) {
					if (doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner && doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner.length>0) {
						for (var z=0; z<doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner.length; z++) {
							if (doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner[z].GUID) {
								emit ([doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner[z].GUID, doc._id], null);
							}
						}
					}
				}
			}
		}
	}
}