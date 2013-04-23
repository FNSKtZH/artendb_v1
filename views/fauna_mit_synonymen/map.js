function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		//erst mal das eigene Dokument senden
		//der zweite key markiert, dass dies das Original ist
		emit ([doc._id, 1]);
		if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
			//durch alle Beziehungssammlungen loopen
			for (var i=0; i<doc.Beziehungssammlungen.length; i++) {
				if (doc.Beziehungssammlungen[i].Typ && doc.Beziehungssammlungen[i].Typ === "taxonomisch" && doc.Beziehungssammlungen[i]["Art der Beziehungen"] && doc.Beziehungssammlungen[i]["Art der Beziehungen"] === "synonym" && doc.Beziehungssammlungen[i].Beziehungen && doc.Beziehungssammlungen[i].Beziehungen.length > 0) {
					//jetzt durch alle synonymen Beziehungen loopen
					for (var x=0; x<doc.Beziehungssammlungen[i].Beziehungen.length; x++) {
						if (doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner && doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner.length > 0) {
							//durch alle Beziehungspartner der synonymen Beziehungen loopen
							for (var z=0; z<doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner.length; z++) {
								if (doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner[z].GUID) {
									//veranlassen, dass mit include_docs=true auch das Dokument dieses Synonyms gesendet wird
									//der zweite key markiert, dass es ein Synonym ist
									emit ([doc._id, 0], {_id: doc.Beziehungssammlungen[i].Beziehungen[x].Beziehungspartner[z].GUID});
								}
							}
						}
					}
				}
			}
		}
	}
}