var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var config = require('../config');

gulp.task('css', function () {
	gulp.src('css/main.scss')
		.pipe(sass({}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename('bundle.css'))
		.pipe(gulp.dest(config.dest));
});
