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

	// gruppen ist vorgegeben
	gruppen = ["Fauna", "Flora"];

	// arrays für sammlungen aus synonymen gründen
	beziehungssammlungen_aus_synonymen = [];
	datensammlungen_aus_synonymen = [];

	while (row = getRow()) {
		objekt = row.doc;

		if (gruppen.indexOf(objekt.Gruppe) === -1) {
			// diese Gruppe wollen wir nicht > weiter mit nächstem Objekt
			continue;
		}

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
			exportObjekt.Gruppe = objekt.Gruppe;
			exportObjekt.Ref = objekt.Taxonomie.Eigenschaften["Taxonomie ID"];

			var ds_zh_gis = _.find(objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "ZH GIS";
			}) || {};

			exportObjekt.GISLayer = "";
			if (ds_zh_gis && ds_zh_gis.Eigenschaften && ds_zh_gis.Eigenschaften["GIS-Layer"]) {
				exportObjekt.GISLayer = ds_zh_gis.Eigenschaften["GIS-Layer"];
			}

			exportObjekt.Distanz = "";
			if (ds_zh_gis && ds_zh_gis.Eigenschaften && ds_zh_gis.Eigenschaften["Betrachtungsdistanz (m)"]) {
				exportObjekt.Distanz = ds_zh_gis.Eigenschaften["Betrachtungsdistanz (m)"];
			}

			exportObjekt.NameLat = objekt.Taxonomie.Eigenschaften.Artname;
			exportObjekt.NameDeu = "";
			if (objekt.Taxonomie.Eigenschaften["Name Deutsch"]) {
				exportObjekt.NameDeu = objekt.Taxonomie.Eigenschaften["Name Deutsch"];
			}

			var ds_zh_artwert_1995 = _.find(objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "ZH Artwert (1995)";
			}) || {};

			exportObjekt.Artwert = "";
			if (ds_zh_artwert_1995 && ds_zh_artwert_1995.Eigenschaften && (ds_zh_artwert_1995.Eigenschaften.Artwert || ds_zh_artwert_1995.Eigenschaften.Artwert === 0)) {
				exportObjekt.Artwert = ds_zh_artwert_1995.Eigenschaften.Artwert;
			}

			exportObjekt.AwZusatz = "";
			if (ds_zh_artwert_1995 && ds_zh_artwert_1995.Eigenschaften && ds_zh_artwert_1995.Eigenschaften["Artwert Zusatz"]) {
				exportObjekt.AwZusatz = ds_zh_artwert_1995.Eigenschaften["Artwert Zusatz"];
			}

			var ds_blaue_liste = _.find(objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "Blaue Liste (1998)";
			}) || {};

			exportObjekt.Bestandesentwicklung = "";
			if (ds_blaue_liste && ds_blaue_liste.Eigenschaften && ds_blaue_liste.Eigenschaften.Bestandesentwicklung) {
				exportObjekt.Bestandesentwicklung = ds_blaue_liste.Eigenschaften.Bestandesentwicklung;
			}

			exportObjekt.Schutzmassnahmen = "";
			if (ds_blaue_liste && ds_blaue_liste.Eigenschaften && ds_blaue_liste.Eigenschaften.Schutzmassnahmen) {
				exportObjekt.Schutzmassnahmen = ds_blaue_liste.Eigenschaften.Schutzmassnahmen;
			}

			exportObjekt.Wirksamkeit = "";
			if (ds_blaue_liste && ds_blaue_liste.Eigenschaften && ds_blaue_liste.Eigenschaften.Wirksamkeit) {
				exportObjekt.Wirksamkeit = ds_blaue_liste.Eigenschaften.Wirksamkeit;
			}

			var ds_zh_ap_flora = _.find(objekt.Eigenschaftensammlungen, function(ds) {
				return ds.Name === "ZH AP Flora";
			}) || {};

			exportObjekt.Link_zum_AP_Bericht = "";
			if (ds_zh_ap_flora && ds_zh_ap_flora.Eigenschaften && ds_zh_ap_flora.Eigenschaften["Link zum AP-Bericht"]) {
				exportObjekt.Link_zum_AP_Bericht = ds_zh_ap_flora.Eigenschaften["Link zum AP-Bericht"];
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

	send(adb.erstelleExportString(exportObjekte_ohne_leere));
}