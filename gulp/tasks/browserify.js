var gulp = require('gulp');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config');
var uglify = require('gulp-uglify');
var license = require('gulp-license');
var fs = require('fs');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var plumber = require('gulp-plumber');


gulp.task('browserify', function() {
	var b = browserify({
		entries: './js/main.js',
		debug: true
	});
	b
	.bundle()
		.pipe(plumber())
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			// Add transformation tasks to the pipeline here.
			// .pipe(uglify())
			.on('error', console.log)
		.pipe(gulp.dest(config.dest));
});
