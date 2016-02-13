var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var plugins = require('gulp-load-plugins')();
var packageInfo = require('./package.json');

var input = './stylesheets/**/*.scss';
var output = './dist/css';

var config = {
	input: {
		test: [
			'src/sass-typography.scss'
		],
		build: [
			'src/_settings.scss',
			'src/_ms.scss',
			'src/_font-face.scss',
			'src/_misc.scss',
			'src/_typography.scss'
		]
	},
	output: {
		sass: "./dist/sass",
		css: "./dist/css"
	}
};

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassdocOptions = {
	dest: './docs'
};

gulp.task('test', function () {
	return gulp
		.src(config.input.test)
		//.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		//.pipe(sourcemaps.write())
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(config.output.css))
		//.pipe(sassdoc(sassdocOptions))
		.resume();
});

gulp.task('build', function () {
	return gulp
		.src(config.input.build)
		.pipe(plugins.concat('sass-typography.scss'))
		.pipe(plugins.header(fs.readFileSync('./banner.txt', 'utf8')))
		.pipe(plugins.header('@charset \'UTF-8\';\n\n'))
		.pipe(plugins.replace(/@version@/, packageInfo.version))
		.pipe(gulp.dest(config.output.sass));
});
