var gulp = require('gulp');
var webserver = require('gulp-webserver');
var bower = require('gulp-bower');
var sloc = require('gulp-sloc');
var todo = require('gulp-todo');

gulp.task('todo', function () {
    gulp.src('static/js/**/*.js')
        .pipe(todo())
        .pipe(gulp.dest('./'));
});

gulp.task('sloc', function () {
    gulp.src(['static/js/**/*.js'])
        .pipe(sloc());
});

gulp.task('bower', function () {
    return bower();
});

gulp.task('release', ['bower'], function () {
    // TODO: create release pack
});

gulp.task('webserver', function () {
    gulp
        .src('./static')
        .pipe(webserver());
});

gulp.task('default', ['sloc', 'webserver']);
