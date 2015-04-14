var gulp = require('./gulp')([
    'browserify',
    'watch',
    'css'
]);

gulp.task('build', ['browserify', 'css']);
gulp.task('default', ['build', 'watch']);
