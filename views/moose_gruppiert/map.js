function(doc) {
    'use strict';
	if (doc.Gruppe && doc.Gruppe === "Moose") {
		emit([doc._id, doc._rev]);
	}
}