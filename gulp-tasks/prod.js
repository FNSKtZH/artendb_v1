/**
 * Baut das Projekt für die Entwicklung
 */

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var gulp        = require('gulp'),
    requireDir  = require('require-dir'),
    runSequence = require('run-sequence');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('prod', function () {
    runSequence(
        'browserify',
        ['prod_build_style', 'prod_build_src', 'prod_build_html']
    );
});