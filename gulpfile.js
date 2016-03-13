var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

var assets = {
    'js': [ "popintro.js"],
    'css': [ "popintro.scss" ]
};

// Prepares the JS file
gulp.task('js', function() {
    gulp.src(assets.js)
        .pipe(concat('popintro.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

// Prepares the CSS file
gulp.task('css', function() {
    gulp.src(assets.css)
        .pipe(sass({ includePaths: require('node-bourbon').includePaths }))
        .pipe(concat('popintro.min.css'))
        .pipe(minify({keepBreaks:true}))
        .pipe(gulp.dest('.'));
});

// Prepares JS & CSS assets
gulp.task('default', ['css', 'js']);

// Prepares assets & watch for changes
gulp.task('development', ['css', 'js'], function(callback) {
    gulp.watch(assets.js, ['js']);
    gulp.watch(assets.css, ['css']);
});
