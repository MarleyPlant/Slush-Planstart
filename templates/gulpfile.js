var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cleanCSS    = require('gulp-clean-css'),
    sourcemaps  = require('gulp-sourcemaps'),
    pug         = require('gulp-pug'),
    filter      = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files');


gulp.task('sass', function() { // Compile sass into CSS & auto-inject into browsers
  return gulp.src("src/scss/**/*.scss")
      .pipe(sass())
      .pipe(sourcemaps.init())
      .pipe(cleanCSS({debug: true}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/css"))
});

gulp.task('php', function() { //Compilepug pug into HTML & export into dist directory
  return gulp.src('src/*.php')
      .pipe(gulp.dest("dist/"))
})

gulp.task('img', function() { //Compress images and move the compressed images to the dist directory
  return gulp.src('src/img/**/*.jpeg')
      .pipe(gulp.dest("dist/img"));
});

gulp.task('js', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
})

//Handle Bower_Components

gulp.task('bower-sass', function() { //Build and compile bower-sass components to the dist directory.
  return gulp.src(mainBowerFiles())
      .pipe(filter('**/*.scss'))
      .pipe(sass())
      .pipe(sourcemaps.init())
      .pipe(cleanCSS({debug: true}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/css"))
});

gulp.task('bower-css', function() { //Build and compile bower-css components to the dist directory.
  return gulp.src(mainBowerFiles())
      .pipe(filter('**/*.css'))
      .pipe(sourcemaps.init())
      .pipe(cleanCSS({debug: true}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/css"))
});

gulp.task('bower-js', function() { //Build and compile bower-js components to the dist directory.
  return gulp.src(mainBowerFiles())
      .pipe(filter('**/*.js'))
      .pipe(gulp.dest("dist/js"));
})

// Static Server + watching scss/html files
gulp.task('watch', function() { //Ran as default when command 'gulp' is typed.
    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/**/*.php", ['php']);
});

gulp.task('build', ['sass', 'php', 'js', 'img', 'bower']); //Build and compile everything into the dist directory.
gulp.task('bower', ['bower-js', 'bower-sass', 'bower-css']); //Build and compile the Bower_Components.
gulp.task('default', ['build', 'watch']); //Build and Compile everything then run a browserSync server.
