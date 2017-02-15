var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var less = require('gulp-less-sourcemap');
var csv2json = require('gulp-csv2json');
var rename = require('gulp-rename');
var merge = require('gulp-merge-json');
var sortJSONArray = require('./assets/js/sort-array');

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: "."
    });
});

// Watching scss/less/html files
gulp.task('watch', ['serve', 'sass', 'less'], function() {
    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("assets/less/*.less", ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("assets/scss/*.scss")
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'scss'
    }))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

// Compile LESS into CSS & auto-inject into browsers
gulp.task('less', function() {
  return gulp.src("assets/less/*.less")
    .pipe(less({
      sourceMap: {
        sourceMapRootpath: './assets/less' // Optional absolute or relative path to your LESS files
      }
    }))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

gulp.task('convertcsv', function() {

  var csvParseOptions = {
    delimiter: ';'
  };

  gulp.src('resources/dataset/restaurants_info.csv')
    .pipe(csv2json(csvParseOptions))
    .pipe(rename('restaurants_info.json'))
    .pipe(gulp.dest('resources/dataset/'));
});

gulp.task('sortJSON', function() {
  gulp.src('resources/dataset/restaurants_info.json')
    .sort((a, b) => a.objectID < b.objectID ? 1 : -1)
    .pipe(gulp.dest('dist'))
});

gulp.task('mergejson', function(){
  gulp.src('resources/dataset/*.json')
    .pipe(merge({
      startObj: [],
      edit: (parsedJson, file) => {
        return parsedJson.sort((a, b) => a.objectID < b.objectID ? 1 : -1)
      }
    }))

    .pipe(gulp.dest('dist'))
});


gulp.task('default', ['serve']);
gulp.task('server', ['serve']);
gulp.task('dev', ['watch']);
