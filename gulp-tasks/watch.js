/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var gulp = require('gulp');

return gulp.task('watch', function () {
    gulp.watch([
        '_attachments/*',
        'vendor/couchapp/_attachments/*',
        '-vendor/couchapp/_attachments/artendb_browserified.js',
        '-vendor/couchapp/_attachments/artendb_built.js',
        'vendor/couchapp/_attachments/modules/**/*',
        'vendor/couchapp/_attachments/adb_lib/*',
        '-_attachments/style',
        '_attachments/style/*',
        '-_attachments/style/main.css'
    ], [
        'dev'
    ]);
});