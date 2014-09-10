var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('dev', ['dev_build_style', 'dev_build_src'], function() {
    gulp.start('watch');
});