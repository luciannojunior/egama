// Include gulp
var gulp = require('gulp');
// Include Our Plugins
// var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
// Lint Task
// gulp.task('lint', function() {
//     return gulp.src('bsgama/js/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['bsgama/js/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('bsgama/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bsgama/dist/js'));
});

gulp.task('dependencies', function () {
    return gulp.src(['bsgama/bower_components/angular/angular.min.js',
                     'bsgama/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                     'bsgama/bower_components/ng-lodash/build/ng-lodash.min.js',
                     'bsgama/bower_components/ngDialog-master/js/ngDialog.min.js',
                     'bsgama/bower_components/ngstorage/ngStorage.min.js',
                     'bsgama/bower_components/angular-jwt/dist/angular-jwt.min.js',
                     'bsgama/tema/jquery.js',
                     'bsgama/tema/bootstrap.min.js'
                     ])
                     .pipe(concat('dep.js'))
                     .pipe(gulp.dest('bsgama/dist/'));
});

gulp.task('css', function () {
    return gulp.src(['bsgama/bower_components/ngDialog-master/css/ngDialog.css',
                     'bsgama/css/bootstrap.min.css',
                     'bsgama/css/sb-admin.css',
                     'bsgama/css/plugins/morris.css',
                     'bsgama/css/cgama.css',
                     'bsgama/bower_components/ngDialog-master/css/default.css'])
                     .pipe(concat('all.css'))
                     .pipe(cleanCSS({compatibility: 'ie8'}))
                     .pipe(gulp.dest('bsgama/dist'));
});
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('bsgama/js/**/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['dependencies', 'scripts', 'css']);