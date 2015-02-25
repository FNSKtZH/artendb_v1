/**
 * Baut das Projekt für die Entwicklung
 */

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var gulp        = require('gulp'),
    requireDir  = require('require-dir'),
    runSequence = require('run-sequence');

requireDir('../gulp-tasks', {recurse: true});

// zuerst mal Module einbinden
return gulp.task('dev', function () {
    runSequence(
        'browserify',
        ['dev_build_style', 'dev_build_src', 'dev_build_html'],
        'build_couchapp'
    );
});