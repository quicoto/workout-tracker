const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');


gulp.task('CSS', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minifyHTML', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('icons', function() {
  return gulp.src('./src/icons/*.*')
    .pipe(gulp.dest('./dist/icons'));
});
