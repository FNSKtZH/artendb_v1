function(doc) {
	if (doc.Gruppe && doc.Typ && doc.Typ === "Objekt" && doc["Aktuelle Taxonomie"] && doc["Aktuelle Taxonomie"].Felder && doc["Aktuelle Taxonomie"].Felder["Taxonomie ID"]) {
		emit ([doc.Gruppe, doc._id, doc["Aktuelle Taxonomie"].Felder["Taxonomie ID"]], null);
	}
}