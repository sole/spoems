var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var yargs = require('yargs');
var glob = require('glob');
var fs = require('fs');

gulp.task('lint', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('build', ['build-js', 'build-data']);

gulp.task('build-js', function() {
	return gulp.src('js/main.js')
		.pipe(browserify({
			insertGlobals: false,
			debug: !yargs.argv.production
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});


gulp.task('build-data', function(finish) {

	glob('data/emails/*.txt', function(err, files) {

		var emails = files
		.map(function(filename) {
			return fs.readFileSync(filename, 'utf-8');
		})
		.map(function parseEmail(data) {
			var lines = data.split('\n');
			var title = lines.shift();

			lines.shift(); // discard separator empty line
			
			var contents = lines.join('\n');
			return {
				title: title,
				contents: contents
			};
		});

		fs.writeFileSync('build/data.json', JSON.stringify(emails, null, '\t'));

		finish();

	});
});

gulp.task('watch', function() {
	gulp.watch('src/**/*', ['lint', 'build']);
});

gulp.task('default', ['lint', 'build', 'watch']);

