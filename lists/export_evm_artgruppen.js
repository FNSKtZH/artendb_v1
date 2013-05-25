function(head, req) {

	start({
		"headers": {
			"Content-Type": "text/csv",
			"Content-disposition": "attachment;filename=Artgruppen.json",
			"Accept-Charset": "utf-8"
		}
	});

	var row,
		doc,
		export_json = {},
		artgruppe,
		id_vorlage = "00005A48-816B-4A30-842F-3B1A5DAAA000";

	export_json.docs = [];

	// specify that we're providing a JSON response
	provides('json', function() {

		while (row = getRow()) {
			doc = row.doc;
			artgruppe = {};
			artgruppe.Typ = "ArtGruppe";
			artgruppe.ArtGruppe = row.key;
			//id zusammensetzen aus der GUID der id_vorlage und dem Namen der artgruppe
			artgruppe._id = id_vorlage.substring(0, id_vorlage.length - artgruppe.ArtGruppe.length) + artgruppe.ArtGruppe;
			artgruppe.AnzArten = row.value;

			export_json.docs.push(artgruppe);
		}
		send(JSON.stringify(export_json));
	});
}