function (head, req) {
    'use strict';
	// specify that we're providing a JSON response
    provides('json', function() {
		var row,
            objekt,
            objekt_array = [];
		while(row = getRow()) {
			objekt = {};
			objekt.data = row.key[4];
			objekt.attr = {};
			objekt.attr.level = row.key[0];
			objekt.attr.gruppe = "lr";
			objekt.attr.id = row.key[5];
			objekt.state = "closed";
			objekt_array.push(objekt);
		}
		send(JSON.stringify(objekt_array));
	});
}