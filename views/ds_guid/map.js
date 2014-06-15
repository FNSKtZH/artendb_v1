function(doc) {
    'use strict';
    var _ = require("views/lib/underscore");
	if (doc.Eigenschaftensammlungen) {
        _.each(doc.Eigenschaftensammlungen, function(es) {
            emit([es.Name, doc._id], 1);
        });
	}
}