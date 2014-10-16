var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('../gulp-tasks', {recurse: true});

// src und style bauen
return gulp.task('dev_2', ['dev_build_style', 'dev_build_src', 'dev_build_html'], function() {
	// ...dann die couchapp bauen
    gulp.start('build_couchapp');
});