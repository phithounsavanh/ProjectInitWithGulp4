const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function style() {
  return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

function fonts() {
  return gulp
    .src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
}
function movefonts() {
  return gulp
    .src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
}

function js() {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
  gulp.watch(
    ['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],
    style
  );
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.fonts = fonts;
exports.movefonts = movefonts;
exports.js = js;
exports.watch = watch;

gulp.task('default', gulp.parallel(style, fonts, movefonts, js, watch));
