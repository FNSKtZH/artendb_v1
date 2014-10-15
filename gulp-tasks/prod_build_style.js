var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat-sourcemap'),
    notify = require('gulp-notify');

gulp.task('prod_build_style', function() {
    return gulp.src([
            '_attachments/style/bootstrap.css',
            '_attachments/style/artendb.css'
        ])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('_attachments/style'))
        .pipe(notify({message: 'prod_build_style task beendet'}));
});