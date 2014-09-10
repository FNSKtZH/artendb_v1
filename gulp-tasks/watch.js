var gulp = require('gulp');

return gulp.task('watch', function() {
    gulp.watch(['_attachments/*', 'vendor/couchapp/_attachments/*', '-vendor/couchapp/_attachments/main.js', '-vendor/couchapp/_attachments/main2.js', '-_attachments/style'], ['dev_build_src']);
    gulp.watch(['_attachments/style/*', '-_attachments/style/main.css'], ['dev_build_style']);
});