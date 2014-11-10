/**
 * Baut das Projekt für die Entwicklung:
 * zuerst mit browserify Module einbinden
 * dann style und src_1 und src_2 (hinter Body)
 * dann watch
 */

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('../gulp-tasks', {recurse: true});

// zuerst mal Module einbinden
return gulp.task('dev', ['browserify'], function () {
    gulp.start('dev_2');
});