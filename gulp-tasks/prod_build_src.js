var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('prod_build_src', function() {
    return gulp.src(['vendor/couchapp/_attachments/underscore.js', 'vendor/couchapp/_attachments/bootstrap.js', 'vendor/couchapp/_attachments/typeahead.js', 'vendor/couchapp/_attachments/jquery.cookie.js', 'vendor/couchapp/_attachments/jquery.hotkeys.js', 'vendor/couchapp/_attachments/jquery.couch.js', 'vendor/couchapp/_attachments/jquery.csv.js', 'vendor/couchapp/_attachments/jsuri.js', 'vendor/couchapp/_attachments/FileSaver.js', 'vendor/couchapp/_attachments/css3-mediaqueries.js', 'vendor/couchapp/_attachments/history.js', 'vendor/couchapp/_attachments/sha1.js', 'vendor/couchapp/_attachments/artendb.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('vendor/couchapp/_attachments'))
        .pipe(notify({ message: 'prod_build_src task beendet' }));
});