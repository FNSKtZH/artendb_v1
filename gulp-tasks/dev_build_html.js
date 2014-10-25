var gulp   = require('gulp'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

gulp.task('dev_build_html', function () {
    return gulp.src('_attachments/index_dev.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('_attachments'))
        .pipe(notify({ message: 'dev_build_html task beendet' }));
});