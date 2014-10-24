function (doc) {
    'use strict';
	if (doc.Gruppe && doc.Gruppe === "Macromycetes") {
		emit([doc._id, doc._rev]);
	}
}