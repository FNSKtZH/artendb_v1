'use strict';

var returnFunction = function ($) {

	// zuerst mal die benötigten Daten holen
	if (window.adb.Gruppe && window.adb.Gruppe === "Lebensräume") {
		if (window.adb.filtere_lr) {
			window.adb.initiiereSuchfeld_2(window.adb.filtere_lr);
		} else {
			$.ajax('http://localhost:5984/artendb/_design/artendb/_view/filtere_lr', {
		        type: 'GET',
		        dataType: "json",
		        data: {
		        	startkey: '["' + window.adb.Gruppe + '"]',
		        	endkey: '["' + window.adb.Gruppe + '",{},{},{}]'
		        }
			}).done(function (data) {
				window.adb.filtere_lr = data;
				window.adb.initiiereSuchfeld_2(data);
			}).fail(function () {
				console.log('keine Daten erhalten');
			});
		}
	} else if (window.adb.Gruppe) {
		if (window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()]) {
			window.adb.initiiereSuchfeld_2(window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()]);
		} else {
			$.ajax('http://localhost:5984/artendb/_design/artendb/_view/filtere_art', {
		        type: 'GET',
		        dataType: "json",
		        data: {
		        	startkey: '["' + window.adb.Gruppe + '"]',
		        	endkey: '["' + window.adb.Gruppe + '",{}]'
		        }
			}).done(function (data) {
				window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()] = data;
				window.adb.initiiereSuchfeld_2(data);
			}).fail(function () {
				console.log('keine Daten erhalten');
			});
		}
	}
};

module.exports = returnFunction;