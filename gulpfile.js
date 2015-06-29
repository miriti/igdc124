var gulp = require('gulp');
var webserver = require('gulp-webserver');
var bower = require('gulp-bower');

gulp.task('bower', function () {
    return bower();
});

gulp.task('release', ['bower'], function() {
    // TODO: create release pack
});

gulp.task('webserver', function () {
    gulp
        .src('./static')
        .pipe(webserver());
});

gulp.task('default', ['webserver']);
