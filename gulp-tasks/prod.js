/**
 * Baut das Projekt für die Entwicklung
 */

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