var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('prod_build_jstree', function () {
    return gulp.src([
	    	'vendor/couchapp/_attachments/jquery.jstree.js'
    	])
        .pipe(concat('jquery.jstree.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('vendor/couchapp/_attachments'))
        .pipe(notify({ message: 'prod_build_jstree task beendet' }));
});