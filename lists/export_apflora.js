function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=eigenschaften_fuer_apflora.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row, Objekt,
		exportObjekte = [],
		exportObjekt,
		dsTaxonomie, dsArtwert, dsKef, dsJahresarten;
	var _ = require("lists/lib/underscore");
	var _a = require("lists/lib/artendb_listfunctions");

	// list wird mit view flora abgerufen
	while (row = getRow()) {
		Objekt = row.doc;

		// exportobjekt gründen bzw. zurücksetzen
		exportObjekt = {};

		// GUID wird gebraucht, um beim Export nach EVAB dem Projekt zuzuweisen
		exportObjekt.GUID = Objekt._id;

		// zunächst leere Felder anfügen, damit jeder Datensatz jedes Feld hat
		exportObjekt.TaxonomieId = null;
		exportObjekt.Artname = null;
		exportObjekt.NameDeutsch = null;
		exportObjekt.Status = null;
		exportObjekt.Artwert = null;
		exportObjekt.KefArt = null;
		exportObjekt.KefKontrolljahr = null;
		exportObjekt.FnsJahresartJahr = null;

		// Felder aktualisieren, wo Daten vorhanden
		if (Objekt.Taxonomie && Objekt.Taxonomie.Eigenschaften) {
			dsTaxonomie = Objekt.Taxonomie.Eigenschaften;
			exportObjekt.TaxonomieId = dsTaxonomie["Taxonomie ID"];
			if (dsTaxonomie["Artname vollständig"]) {
				exportObjekt.Artname = dsTaxonomie["Artname vollständig"];
			}
			// wird beim Export nach EvAB benutzt
			if (dsTaxonomie["Name Deutsch"]) {
				exportObjekt.NameDeutsch = dsTaxonomie["Name Deutsch"];
			}
			if (dsTaxonomie.Status) {
				exportObjekt.Status = dsTaxonomie.Status;
			}
		}

		if (Objekt.Eigenschaftensammlungen.length > 0) {

			dsArtwert = _.find(Objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "ZH Artwert (1995)";
			});
			if (dsArtwert && dsArtwert.Eigenschaften && dsArtwert.Eigenschaften.Artwert) {
				exportObjekt.Artwert = dsArtwert.Eigenschaften.Artwert;
			}

			dsKef = _.find(Objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "ZH KEF";
			});
			if (dsKef && dsKef.Eigenschaften && dsKef.Eigenschaften["Art ist KEF-Kontrollindikator"]) {
				// MySQL erwartet für true eine -1
				exportObjekt.KefArt = -1;
			}
			if (dsKef && dsKef.Eigenschaften && dsKef.Eigenschaften["Erstes Kontrolljahr"]) {
				// MySQL erwartet für true eine 1
				exportObjekt.KefKontrolljahr = dsKef.Eigenschaften["Erstes Kontrolljahr"];
			}

			dsJahresarten = _.find(Objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "ZH Jahresarten";
			});
			if (dsJahresarten && dsJahresarten.Eigenschaften && dsJahresarten.Eigenschaften.Jahr) {
				exportObjekt.FnsJahresartJahr = dsJahresarten.Eigenschaften.Jahr;
			}
		}
		
		// Objekt zu Exportobjekten hinzufügen
		exportObjekte.push(exportObjekt);
	}
	// leere Objekte entfernen
	var exportObjekte_ohne_leere = _.reject(exportObjekte, function(object) {
		return _.isEmpty(object);
	});

	send(_a.erstelleExportString(exportObjekte_ohne_leere));
}