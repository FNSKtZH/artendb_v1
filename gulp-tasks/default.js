/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var gulp       = require('gulp'),
    requireDir = require('require-dir');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('default', function () {
    gulp.start('watch');
});