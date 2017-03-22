var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    <% if(includeBootstrap) { %>bsConfig = require('gulp-bootstrap-configurator'),<% } %>
    livereload = require('gulp-livereload')

gulp.task('styles', function(){
  gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(''))
		.pipe(autoprefixer())
		.pipe(minifycss())
		.pipe(gulp.dest(''))
		.pipe(livereload());
});

<% if(includeBootstrap) { %>// For CSS
gulp.task('make-bootstrap-css', function(){
  return gulp.src("./bsconfig.json")
    .pipe(bsConfig.css())
    .pipe(minifycss())
    .pipe(gulp.dest("./assets"));
    // It will create `bootstrap.css` in directory `assets`.
});

// For JS
gulp.task('make-bootstrap-js', function(){
  return gulp.src("./bsconfig.json")
    .pipe(bsConfig.js())
    .pipe(minify())
    .pipe(gulp.dest("./assets"));
    // It will create `bootstrap.js` in directory `assets`.
});

gulp.task('bootstrap',['make-bootstrap-css', 'make-bootstrap-js'])<% } %>
gulp.task('default',['styles']);
<% if(includeBootstrap) { %>
gulp.task('build', ['make-bootstrap-css', 'make-bootstrap-js', 'styles']) //Build task if bootstrap is included
<% }else{ %>
gulp.task('build', ['styles']) //Build task if bootstrap is not included
<% } %>
gulp.task('watch', function() {

	livereload.listen();

	// Watch .scss files
	gulp.watch('scss/*.scss', ['styles']);
	gulp.watch('scss/**/*.scss', ['styles']);
  gulp.watch('config.json', ['bootstrap']);
});
