'use strict';

var _ = require('underscore');

// muss $ übernehmen wegen $.typeahead
var returnFunction = function ($, such_objekte) {

	such_objekte = _.map(such_objekte.rows, function(objekt) {
		return objekt.value;
	});

	$('#suchfeld' + window.adb.Gruppe).typeahead({
		name: window.adb.Gruppe,
		valueKey: 'Name',
		local: such_objekte,
		limit: 20
	})
	.on('typeahead:selected', function(e, datum) {
		var oeffneBaumZuId = require('./oeffneBaumZuId');
		oeffneBaumZuId ($, datum.id);
	});
	$("#suchfeld"+window.adb.Gruppe).focus();
};

module.exports = returnFunction;