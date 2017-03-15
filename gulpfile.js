var gulp = require('gulp');
var data = require('gulp-data');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var gulpBrowser = require("gulp-browser");

var browserSync = require('browser-sync').create();
//var source = require('vinyl-source-stream');
var nunjucks = require('gulp-nunjucks');


gulp.task('default', function() {


	gulp.run (['compile-styl']);
	gulp.run (['compile-js']);
	gulp.run (['compile-html']);

	browserSync.init({
		server: "./"
	});

	watch('./dist/css/**/*.styl', function(){
		gulp.run (['compile-styl']);
	});

	watch('./dist/js/**/*.js', function(){
		gulp.run (['js-watch']);
	});

	watch("./dist/templates/**/*.html", function() {
		gulp.run (['template-watch']);
	});

});


gulp.task('compile-styl', function(){
	return gulp.src('./dist/css/style.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./app/css/'))
		.pipe(browserSync.stream());
});

gulp.task('compile-js', function(){
	return gulp.src('./dist/js/*.js')
		.pipe(gulpBrowser.browserify())
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('compile-html', function(){
	return gulp.src('./dist/templates/index.html')
		.pipe(nunjucks.compile())
		.pipe(gulp.dest('./'));
});

gulp.task('template-watch', ['compile-html'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('js-watch', ['compile-js'], function (done) {
	browserSync.reload();
	done();
});