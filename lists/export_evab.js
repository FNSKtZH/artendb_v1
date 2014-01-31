function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Eigenschaften_fuer_EvAB.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row, Objekt,
		exportObjekte = [],
		exportObjekt,
		dsTaxonomie;
	var _ = require("lists/lib/underscore");
	var _a = require("lists/lib/artendb_listfunctions");

	objekt_loop:
	while (row = getRow()) {
		Objekt = row.doc;

		// exportobjekt gründen bzw. zurücksetzen
		exportObjekt = {};

		// Gruppe setzen
		exportObjekt.Gruppe = Objekt.Gruppe;

		// zunächst leere Felder anfügen, damit jeder Datensatz jedes Feld hat
		exportObjekt.Nummer = null;
		exportObjekt.DeutscherArtname = null;
		exportObjekt.Gattung = null;
		exportObjekt.Untergattung = null;
		exportObjekt.Artname = null;
		exportObjekt.Unterart = null;
		exportObjekt.GISLayer = null;
		exportObjekt.Status = null;

		switch(exportObjekt.Gruppe) {
		case "Fauna":
			// Felder aktualisieren, wo Daten vorhanden
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
					exportObjekt.Artname = dsTaxonomie.Art;
				}
				if (dsTaxonomie.Unterart) {
					exportObjekt.Unterart = dsTaxonomie.Unterart;
				}
			}
			// Datensammlung "ZH GIS" holen
			var ds_zh_gis = _.find(Objekt.Datensammlungen, function(ds) {
				return ds.Name === "ZH GIS";
			}) || {};
			
			if (ds_zh_gis && ds_zh_gis.Daten && ds_zh_gis.Daten["GIS-Layer"]) {
				exportObjekt.GISLayer = ds_zh_gis.Daten["GIS-Layer"];
			}
			break;
		case "Flora":
			// Felder aktualisieren, wo Daten vorhanden
			if (Objekt.Taxonomie && Objekt.Taxonomie.Daten) {
				dsTaxonomie = Objekt.Taxonomie.Daten;
				if (dsTaxonomie["Taxonomie ID"]) {
					exportObjekt.Nummer = dsTaxonomie["Taxonomie ID"];
				}
				if (dsTaxonomie["Name Deutsch"]) {
					exportObjekt.DeutscherArtname = dsTaxonomie["Name Deutsch"];
				}
				if (dsTaxonomie.Artname) {
					exportObjekt.Artname = dsTaxonomie.Artname;
				}
				if (dsTaxonomie.Status) {
					exportObjekt.Status = dsTaxonomie.Status;
				}
				exportObjekt.GISLayer = "Flora";
			}
			break;
		case "Moose":
			// Felder aktualisieren, wo Daten vorhanden
			if (Objekt.Taxonomie && Objekt.Taxonomie.Daten) {
				dsTaxonomie = Objekt.Taxonomie.Daten;
				if (dsTaxonomie["Taxonomie ID"]) {
					exportObjekt.Nummer = dsTaxonomie["Taxonomie ID"];
				}
				if (dsTaxonomie.Artname) {
					exportObjekt.Artname = dsTaxonomie.Artname;
				}
				exportObjekt.Status = "A";
				exportObjekt.GISLayer = "Moose";
			}
			break;
		default:
			// zum nächsten row
			continue objekt_loop;
		}

		exportObjekt.idArt = "{" + Objekt._id + "}";
		
		// Objekt zu Exportobjekten hinzufügen
		exportObjekte.push(exportObjekt);
	}
	// leere Objekte entfernen
	var exportObjekte_ohne_leere = _.reject(exportObjekte, function(object) {
		return _.isEmpty(object);
	});

	send(_a.erstelleExportString(exportObjekte_ohne_leere));
}