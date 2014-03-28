var gulp = require('gulp');

var gutil = require('gulp-util');
var inlineCss = require('gulp-inline-css');
var sass = require('gulp-ruby-sass');
var wrap = require("gulp-wrap");
var rename = require('gulp-rename');

var paths = {
  watch: ['./*.liquid', './*.css'],
  stylesheets: './*.scss'
};

gulp.task('stylesheets', function() {
  return gulp.src(paths.stylesheets)
    .pipe( sass({ style: 'nested', bundleExec: true, precision: 7 }) )
    .pipe( gulp.dest('./') )
});

gulp.task('wrap', function() {
  gulp.src("./*.liquid")
    .pipe( wrap({ src: '_layout.html'}) )
    .pipe( inlineCss() )
    .pipe( wrap({ src: '_doctype.html'}) )
    .pipe( rename(function (path) {
            path.extname = ".html"
     }) )
    .pipe( gulp.dest("./output") );
});

gulp.task('watch', function() {
  gulp.watch(paths.stylesheets, ['stylesheets']);
  gulp.watch(paths.watch, ['wrap']);
});

gulp.task('default', ['wrap', 'watch']);
