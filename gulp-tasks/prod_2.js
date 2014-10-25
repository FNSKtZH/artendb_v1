var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('prod_2', function () {
    gulp.start('prod_build_style', 'prod_build_src', 'prod_build_html');
});