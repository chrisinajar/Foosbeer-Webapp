var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var config = require('../config');
var uglify = require('gulp-uglify');
var license = require('gulp-license');
var fs = require('fs');

var plumber = require('gulp-plumber');

gulp.task('browserify', function() {
	gulp.src('js/main.js', { read: false })
		.pipe(plumber())
		.pipe(browserify({
		}))
		.pipe(license('MIT', {
			organization: 'Swirl'
		}))
		// .pipe(uglify({
		// }))
		.pipe(gulp.dest(config.dest));
});
