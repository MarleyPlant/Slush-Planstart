var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    livereload = require('gulp-livereload'),
    bsConfig = require("gulp-bootstrap-configurator");


gulp.task('styles', function(){
  gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(''))
		.pipe(autoprefixer())
		.pipe(minifycss())
		.pipe(gulp.dest(''))
		.pipe(livereload());
});

// For CSS
gulp.task('make-bootstrap-css', function(){
  return gulp.src("./config.json")
    .pipe(bsConfig.css())
    .pipe(minifycss())
    .pipe(gulp.dest("./assets"));
    // It will create `bootstrap.css` in directory `assets`.
});

// For JS
gulp.task('make-bootstrap-js', function(){
  return gulp.src("./config.json")
    .pipe(bsConfig.js())
    .pipe(minify())
    .pipe(gulp.dest("./assets"));
    // It will create `bootstrap.js` in directory `assets`.
});

gulp.task('default',['styles']);
gulp.task('bootstrap',['make-bootstrap-css', 'make-bootstrap-js'])
gulp.task('build', ['make-bootstrap-css', 'make-bootstrap-js', 'styles'])
gulp.task('watch', function() {

	livereload.listen();

	// Watch .scss files
	gulp.watch('scss/*.scss', ['styles']);
	gulp.watch('scss/**/*.scss', ['styles']);
  gulp.watch('config.json', ['bootstrap']);
});
