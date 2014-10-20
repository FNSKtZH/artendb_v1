/**
 * Benutzt view alt_arten
 * produziert die API für ALT gemäss Vorgaben der EBP
 */

'use strict';


function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Arteigenschaften_mit_Synonymen_fuer_Artenlistentool.csv",
			"Accept-Charset": "utf-8"
		}
	});

	var row,
        objekt,
		exportObjekte = [],
		exportObjekt,
		gruppen,
		beziehungssammlungen_aus_synonymen, datensammlungen_aus_synonymen,
        ergänzeDsBsVonSynonym_return,
        _ = require("lists/lib/underscore"),
        adb = require("lists/lib/artendb_listfunctions");

	// arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	while (row = getRow()) {
		objekt = row.doc;

		if (row.key[1] === 0) {
            // das ist ein Synonym
            // wir erstellen je eine Liste aller in Synonymen enthaltenen Eigenschaften- und Beziehungssammlungen inkl. der darin enthaltenen Daten
            // nämlich: datensammlungen_aus_synonymen und beziehungssammlungen_aus_synonymen
            // später können diese, wenn nicht im Originalobjekt enthalten, angefügt werden
            ergänzeDsBsVonSynonym_return = adb.ergänzeDsBsVonSynonym(objekt, datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen);
            datensammlungen_aus_synonymen = ergänzeDsBsVonSynonym_return[0];
            beziehungssammlungen_aus_synonymen = ergänzeDsBsVonSynonym_return[1];

		} else if (row.key[1] === 1) {
			// wir sind jetzt im Originalobjekt
			// sicherstellen, dass DS und BS existieren
			if (!objekt.Eigenschaftensammlungen) {
				objekt.Eigenschaftensammlungen = [];
			}
			if (!objekt.Beziehungssammlungen) {
				objekt.Beziehungssammlungen = [];
			}
			// allfällige DS und BS aus Synonymen anhängen
            objekt = adb.ergänzeObjektUmInformationenVonSynonymen(objekt, datensammlungen_aus_synonymen, beziehungssammlungen_aus_synonymen);

			// exportobjekt gründen bzw. zurücksetzen
			exportObjekt = {};

			// Felder hinzufügen
			exportObjekt.ref = objekt.Taxonomie.Eigenschaften["Taxonomie ID"];

			var ds_zh_gis = _.find(objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "ZH GIS";
			}) || {};

			exportObjekt.gisLayer = "";
			if (ds_zh_gis && ds_zh_gis.Eigenschaften && ds_zh_gis.Eigenschaften["GIS-Layer"]) {
				exportObjekt.gisLayer = ds_zh_gis.Eigenschaften["GIS-Layer"];
			}

			exportObjekt.distance = "";
			if (ds_zh_gis && ds_zh_gis.Eigenschaften && ds_zh_gis.Eigenschaften["Betrachtungsdistanz (m)"]) {
				exportObjekt.distance = ds_zh_gis.Eigenschaften["Betrachtungsdistanz (m)"];
			}

			exportObjekt.nameLat = objekt.Taxonomie.Eigenschaften.Artname;
			exportObjekt.nameDeu = "";
			if (objekt.Taxonomie.Eigenschaften["Name Deutsch"]) {
				exportObjekt.nameDeu = objekt.Taxonomie.Eigenschaften["Name Deutsch"];
			}

			var ds_zh_artwert_1995 = _.find(objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "ZH Artwert (1995)";
			}) || {};

			exportObjekt.artwert = "";
			if (ds_zh_artwert_1995 && ds_zh_artwert_1995.Eigenschaften && (ds_zh_artwert_1995.Eigenschaften.Artwert || ds_zh_artwert_1995.Eigenschaften.Artwert === 0)) {
				exportObjekt.artwert = ds_zh_artwert_1995.Eigenschaften.Artwert;
			}

			exportObjekt["GUID_FNS"] = objekt._id;
			
			// Objekt zu Exportobjekten hinzufügen
			exportObjekte.push(exportObjekt);
			// arrays für sammlungen aus synonymen zurücksetzen
			beziehungssammlungen_aus_synonymen = [];
			datensammlungen_aus_synonymen = [];
		}
	}
	// leere Objekte entfernen
	var exportObjekte_ohne_leere = _.reject(exportObjekte, function(object) {
		return _.isEmpty(object);
	});

	send(JSON.stringify(exportObjekte_ohne_leere));
}