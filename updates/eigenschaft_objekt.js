function(doc, req) {
	var field = req.query.field;
	var value = req.query.value;
	var message;
	doc[field] = {};
	for (i in value) {
		doc[field][i] = value[i];
	}
	message = 'set ' + field +' to ' + JSON.stringify(doc[field]);
	return [doc, message];
}