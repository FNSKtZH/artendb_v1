var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('../gulp-tasks', {recurse: true});

gulp.task('prod', function() {
    gulp.start('prod_build_style', 'prod_build_src');
});