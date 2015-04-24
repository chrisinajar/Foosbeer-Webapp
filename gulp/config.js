module.exports = {
	dest: 'dist/',

	watch: {
		'js/**/*.js': ['browserify'],
		'css/**/*.scss': ['css']
	}
}
