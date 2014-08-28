/**
 * Created by alex on 09.06.2014.
 */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('prod', function() {
    gulp.start('prod_build_style', 'prod_build_src');
});

gulp.task('default', function() {
    gulp.start('dev_build_style', 'dev_build_src');
});

gulp.task('dev', function() {
    gulp.start('dev_build_style', 'dev_build_src');
});

gulp.task('prod_build_style', function() {
    return gulp.src(['_attachments/style/bootstrap.css', '_attachments/style/artendb.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifycss())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('_attachments/style'))
        .pipe(notify({message: 'prod_build_style task beendet'}));
});

gulp.task('dev_build_style', function() {
    return gulp.src(['_attachments/style/bootstrap.css', '_attachments/style/artendb.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('_attachments/style'))
        .pipe(notify({message: 'dev_build_style task beendet'}));
});

gulp.task('prod_build_src', function() {
    return gulp.src(['vendor/couchapp/_attachments/underscore.js', 'vendor/couchapp/_attachments/bootstrap.js', 'vendor/couchapp/_attachments/typeahead.js', 'vendor/couchapp/_attachments/jquery.cookie.js', 'vendor/couchapp/_attachments/jquery.hotkeys.js', 'vendor/couchapp/_attachments/jquery.couch.js', 'vendor/couchapp/_attachments/jquery.csv.js', 'vendor/couchapp/_attachments/jsuri.js', 'vendor/couchapp/_attachments/FileSaver.js', 'vendor/couchapp/_attachments/css3-mediaqueries.js', 'vendor/couchapp/_attachments/history.js', 'vendor/couchapp/_attachments/sha1.js', 'vendor/couchapp/_attachments/artendb.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('vendor/couchapp/_attachments'))
        .pipe(notify({ message: 'prod_build_src task beendet' }));
});

gulp.task('dev_build_src', function() {
    return gulp.src(['vendor/couchapp/_attachments/underscore.js', 'vendor/couchapp/_attachments/bootstrap.js', 'vendor/couchapp/_attachments/typeahead.js', 'vendor/couchapp/_attachments/jquery.cookie.js', 'vendor/couchapp/_attachments/jquery.hotkeys.js', 'vendor/couchapp/_attachments/jquery.couch.js', 'vendor/couchapp/_attachments/jquery.csv.js', 'vendor/couchapp/_attachments/jsuri.js', 'vendor/couchapp/_attachments/FileSaver.js', 'vendor/couchapp/_attachments/css3-mediaqueries.js', 'vendor/couchapp/_attachments/history.js', 'vendor/couchapp/_attachments/sha1.js', 'vendor/couchapp/_attachments/artendb.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('vendor/couchapp/_attachments'))
        .pipe(notify({ message: 'dev_build_src task beendet' }));
});