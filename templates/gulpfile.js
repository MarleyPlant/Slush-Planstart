var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload');

gulp.task('styles', function(){
	return sass('scss/')
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest(''))
		.pipe(autoprefixer())
		.pipe(minifycss())
		.pipe(gulp.dest(''))
		.pipe(livereload());
});

gulp.task('default',['styles']);

gulp.task('watch', function() {

	livereload.listen();

	// Watch .scss files
	gulp.watch('scss/*.scss', ['styles']);
	gulp.watch('scss/**/*.scss', ['styles']);

	// watch original images directory
	//gulp.watch('assets/images/originals/**', ['images']);

});
