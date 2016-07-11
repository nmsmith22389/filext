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
var del = require('del');

// Notify
// var notify = require("gulp-notify");

// Default Task
gulp.task('default', [/*'lint',*/'clean:icons', 'sass', 'scripts', 'imagemin', 'prefix']);

gulp.task('clean:icons', function () {
  return del([
    'dist/icons/*',
    'docs/icons/*'
    // 'dist/report.csv',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    // 'dist/mobile/**/*',
    // we don't want to clean this file though so we negate the pattern
    // '!dist/mobile/deploy.json'
  ]);
});

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
    .pipe(gulp.dest('dist'))
    // .pipe(notify('SCSS to CSS - Successful'))
    .pipe(browserSync.stream());
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

gulp.task('watch', ['sass', 'scripts', 'imagemin', 'prefix', 'browserSync'], function(){
    gulp.watch('src/scss/**/*.scss', ['sass']); 
    gulp.watch('dist/*.css', ['prefix', browserSync.reload]); 
    gulp.watch('src/js/*.js', ['scripts', browserSync.reload]); 
    gulp.watch('src/icons/*.svg', ['clean:icons', 'imagemin', browserSync.reload]); 
    
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('docs/*.html', browserSync.reload); 
});

gulp.task('browserSync', function() {
    /*browserSync.init({
        proxy: "filext.dev",
    });*/
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('imagemin', function() {
    gulp.src('src/icons/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/icons'))
        .pipe(gulp.dest('docs/icons'));
});

gulp.task('prefix', function () {
    return gulp.src('dist/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
        }))
        .pipe(gulp.dest('dist'));
});