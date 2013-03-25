function(head, req) {
	// specify that we're providing a JSON response
    provides('json', function() {
		var row, objekt, objekt_array, level;
		level = parseInt(req.query["group_level"]);
		objekt_array = [];
		while(row = getRow()) {
			objekt = {};
			objekt.data = row.key[3];
			objekt.attr = {};
			objekt.attr.level = level;
			objekt.attr.gruppe = "lr";
			objekt.attr.id = row.key[5];
			objekt.state = "closed";
			objekt_array.push(objekt);
		}
		send(JSON.stringify(objekt_array));
	});
}