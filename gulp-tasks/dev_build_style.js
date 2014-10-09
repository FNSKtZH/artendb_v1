var gulp = require('gulp'),
    concat = require('gulp-concat-sourcemap'),
    notify = require('gulp-notify');

gulp.task('dev_build_style', function() {
    return gulp.src([
	    	'_attachments/style/bootstrap.css',
	    	'_attachments/style/artendb.css'
    	])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('_attachments/style'))
        .pipe(notify({message: 'dev_build_style task beendet'}));
});