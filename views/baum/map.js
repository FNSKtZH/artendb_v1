function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit ([doc.Gruppe, doc["Aktuelle Taxonomie"].Felder.Klasse, doc["Aktuelle Taxonomie"].Felder.Ordnung, doc["Aktuelle Taxonomie"].Felder.Familie, doc["Aktuelle Taxonomie"].Felder.Gattung, doc["Aktuelle Taxonomie"].Felder.Artname_vollständig], doc._id);
	}
	if (doc.Gruppe && doc.Gruppe === "Flora") {
		emit ([doc.Gruppe, doc["Aktuelle Taxonomie"].Felder.Familie, doc["Aktuelle Taxonomie"].Felder.Gattung, doc["Aktuelle Taxonomie"].Felder.Artname_vollständig], doc._id);
	}
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit ([doc.Gruppe, doc["Aktuelle Taxonomie"].Felder.Klasse, doc["Aktuelle Taxonomie"].Felder.Familie, doc["Aktuelle Taxonomie"].Felder.Gattung, doc["Aktuelle Taxonomie"].Felder.Artname_vollständig], doc._id);
	}
}