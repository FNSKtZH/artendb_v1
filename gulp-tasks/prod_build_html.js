/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var gulp       = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    rename     = require("gulp-rename"),
    notify     = require('gulp-notify');

gulp.task('prod_build_html', function () {
    return gulp.src('_attachments/index_dev.html')
        .pipe(minifyHTML())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('_attachments'))
        .pipe(notify({ message: 'prod_build_html task beendet' }));
});