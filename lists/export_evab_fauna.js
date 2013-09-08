function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften_fuer_EvAB.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row, Objekt,
		exportObjekte = [],
		exportObjekt,
		dsTaxonomie;
	var _ = require("lists/lib/underscore");

	while (row = getRow()) {
		Objekt = row.doc;

		//exportobjekt gründen bzw. zurücksetzen
		exportObjekt = {};

		//Felder hinzufügen
		//zunächst leere
		exportObjekt.Nummer = "";
		exportObjekt.DeutscherArtname = "";
		exportObjekt.Gattung = "";
		exportObjekt.Untergattung = "";
		exportObjekt.Art = "";
		exportObjekt.Unterart = "";
		exportObjekt.GISLayer = "";
		//jetzt Leerwerte mit echten ersetzen, wo vorhanden
		if (Objekt.Taxonomie && Objekt.Taxonomie.Daten) {
			dsTaxonomie = Objekt.Taxonomie.Daten;
			if (dsTaxonomie["Taxonomie ID"]) {
				exportObjekt.Nummer = dsTaxonomie["Taxonomie ID"];
			}
			if (dsTaxonomie["Name Deutsch"]) {
				exportObjekt.DeutscherArtname = dsTaxonomie["Name Deutsch"];
			}
			if (dsTaxonomie.Gattung) {
				exportObjekt.Gattung = dsTaxonomie.Gattung;
			}
			if (dsTaxonomie.Untergattung) {
				exportObjekt.Untergattung = dsTaxonomie.Untergattung;
			}
			if (dsTaxonomie.Art) {
				exportObjekt.Art = dsTaxonomie.Art;
			}
			if (dsTaxonomie.Unterart) {
				exportObjekt.Unterart = dsTaxonomie.Unterart;
			}
		}
		//Datensammlung "ZH GIS" holen
		var ds_zh_gis = _.find(Objekt.Datensammlungen, function(ds) {
			return ds.Name === "ZH GIS";
		}) || {};
		
		if (ds_zh_gis && ds_zh_gis.Daten && ds_zh_gis.Daten["GIS-Layer"]) {
			exportObjekt.GISLayer = ds_zh_gis.Daten["GIS-Layer"];
		}

		exportObjekt.idArt = "{" + Objekt._id + "}";
		
		//Objekt zu Exportobjekten hinzufügen
		exportObjekte.push(exportObjekt);
	}
	//leere Objekte entfernen
	var exportObjekte_ohne_leere = _.reject(exportObjekte, function(object) {
		return _.isEmpty(object);
	});

	send(erstelleExportString(exportObjekte_ohne_leere));
}

function erstelleExportString(exportobjekte) {
	var stringTitelzeile = "";
	var stringZeilen = "";
	//titelzeile erstellen
	//durch Spalten loopen
	for (var a in exportobjekte[1]) {
		if (stringTitelzeile !== "") {
			stringTitelzeile += ',';
		}
		stringTitelzeile += '"' + a + '"';
	}
	//Datenzeilen erstellen
	for (var i in exportobjekte) {
		if (stringZeilen !== "") {
			stringZeilen += '\n';
		}
		var stringZeile = "";
		//durch die Felder loopen
		for (var x in exportobjekte[i]) {
			if (stringZeile !== "") {
				stringZeile += ',';
			}
			//null-Werte als leere Werte
			if (exportobjekte[i][x] === null) {
				stringZeile += "";
			} else if (typeof exportobjekte[i][x] === "number") {
				//Zahlen ohne Anführungs- und Schlusszeichen exportieren
				stringZeile += exportobjekte[i][x];
			} else if (typeof exportobjekte[i][x] === "object") {
				//Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
				stringZeile += '"' + JSON.stringify(exportobjekte[i][x]).replace(/"/g, "'") + '"';
			} else {
				stringZeile += '"' + exportobjekte[i][x] + '"';
			}
		}
		stringZeilen += stringZeile;
	}
	return stringTitelzeile + "\n" + stringZeilen;
}