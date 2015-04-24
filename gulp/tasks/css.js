var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var plumber = require('gulp-plumber');

var config = require('../config');

gulp.task('css', function () {

	gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(plumber())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(config.dest));

	gulp.src('css/main.scss')
		.pipe(plumber())
		.pipe(sass({}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(config.dest));
});
