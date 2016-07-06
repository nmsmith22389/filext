var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

// Notify
// var notify = require("gulp-notify");

// Default Task
gulp.task('default', [/*'lint',*/ 'sass', 'scripts', 'imagemin', 'prefix']);

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
        // includePaths: 'node_modules/foundation-sites/scss'
    }))
    .pipe(concat('filext.css'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('filext.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
    // .pipe(notify('SCSS to CSS - Successful'))
    /*.pipe(browserSync.reload({
      stream: true
    }))*/
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('filext.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('filext.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserSync', 'sass', 'prefix'], function(){
    gulp.watch('src/scss/**/*.scss', ['sass']); 
    gulp.watch('dist/*.css', ['prefix']); 

    // Reloads the browser whenever HTML or JS files change
    gulp.watch('docs/**/*.html', browserSync.reload); 
    gulp.watch('src/js/*.js', browserSync.reload); 
})

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "filext.dev",
    });
})

gulp.task('imagemin', function() {
    gulp.src('src/icons/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/icons'))
        .pipe(gulp.dest('docs/icons'))
})

gulp.task('prefix', function () {
    return gulp.src('dist/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
        }))
        .pipe(gulp.dest('dist'));
});