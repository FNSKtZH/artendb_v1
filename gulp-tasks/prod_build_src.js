/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('prod_build_src', function () {
    return gulp.src([
        'vendor/couchapp/_attachments/index_lib/underscore.js',
        'vendor/couchapp/_attachments/index_lib/typeahead.js',
        'vendor/couchapp/_attachments/index_lib/jquery.cookie.js',
        'vendor/couchapp/_attachments/index_lib/jquery.hotkeys.js',
        'vendor/couchapp/_attachments/index_lib/jquery.couch.js',
        'vendor/couchapp/_attachments/index_lib/jquery.csv.js',
        'vendor/couchapp/_attachments/index_lib/bootstrap.js',
        'vendor/couchapp/_attachments/index_lib/jsuri.js',
        'vendor/couchapp/_attachments/index_lib/FileSaver.js',
        'vendor/couchapp/_attachments/index_lib/xlsx.js',
        'vendor/couchapp/_attachments/index_lib/css3-mediaqueries.js',
        'vendor/couchapp/_attachments/index_lib/history.js',
        'vendor/couchapp/_attachments/index_lib/sha1.js',
        'vendor/couchapp/_attachments/artendb_browserified.js'
    ])
        .pipe(concat('artendb_built.js'))
        .pipe(uglify())
        .pipe(gulp.dest('vendor/couchapp/_attachments'))
        .pipe(notify({ message: 'prod_build_src task beendet' }));
});