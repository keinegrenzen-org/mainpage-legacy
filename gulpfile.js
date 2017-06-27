const gulp = require('gulp');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const src = {
    scss: ['./src/AppBundle/Resources/private/scss/**/*.scss'],
    es6: ['./src/AppBundle/Resources/private/es6/**/*.js']
};

const publishdir = './src/AppBundle/Resources/public/dist';
const dist = {
    css: publishdir + '/css/',
    js: publishdir + '/js/'
};

function buildCSS() {
    const sassOptions = {
        errLogToConsole: true,
        outputStyle: 'compressed',
        includePaths: [
            'web/assets/vendor'
        ]
    };

    return gulp.src(src.scss)
        .pipe(sass(sassOptions))
        .pipe(
            rename(function (path) {
                path.extname = ".min.css"
            })
        )
        .pipe(gulp.dest(dist.css))
}

function buildJS() {

    return gulp.src(src.es6)
        .pipe(
            babel({
                presets: ['es2015']
            })
        )
        .pipe(uglify())
        .pipe(
            rename(function (path) {
                path.extname = ".min.js"
            })
        )
        .pipe(gulp.dest(dist.js))
}

gulp.task('css', buildCSS);
gulp.task('js', buildJS);

gulp.task('watch', function () {
    gulp.watch(src.scss, ['css'])
        .on('change', function () {
            const date = new Date();
            console.info('-> bundling CSS @ ' + date.toString());
        });
    gulp.watch(src.es6, ['js'])
        .on('change', function () {
            const date = new Date();
            console.info('-> bundling JS @ ' + date.toString());
        });
});

gulp.task('default', ['css', 'js']); // development