var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var hbsfy = require('hbsfy');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var appDir = '.'
var dstDir = './build'

gulp.task('build:js', function() {
    return browserify(appDir + '/app.js')
        .transform(hbsfy)
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dstDir + '/js'));
});

gulp.task('build:html', function() {
    return gulp.src(appDir + '/index.html')
        .pipe(gulp.dest(dstDir));
});

gulp.task('build', ['build:js', 'build:html']);

gulp.task('watch', ['build'], function() {
    gulp.watch(appDir + '/app.js', ['build:js'])
    gulp.watch(appDir + '/index.html', ['build:html'])
});

gulp.task('default', ['watch']);
