function(head, req) {
	// specify that we're providing a JSON response
    provides('json', function() {
		var row, objekt, objekt_array, level;
		level = parseInt(req.query["level"]);
		objekt_array = [];
		while(row = getRow()) {
			art = row.doc;
			objekt = {};
			objekt.data = art.key[level-1];
			objekt.attr = {};
			objekt.attr.level = level;
			objekt.attr.gruppe = "fauna";
			if (level === 4) {
				objekt.attr.id = art.key[4];
			}
			objekt.state = "closed";
			objekt_array.push(objekt);
		}
		send(JSON.stringify(objekt_array));
	});
}