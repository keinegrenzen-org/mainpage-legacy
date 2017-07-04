const gulp = require('gulp');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const glob = require('glob');
const es = require('event-stream');

const src = {
    scss: './src/AppBundle/Resources/private/scss/**/*.scss',
    es6: './src/AppBundle/Resources/private/es6/**/*.js',
    components: './src/AppBundle/Resources/private/Components/**/*.js',
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

function buildJS(done) {
    glob(src.es6, (err, files) => {
        if (err) done(err);
        const tasks = files.map(function (entry) {
            console.info("Browserify file:", entry);
            return browserify([entry])
                .transform("babelify")
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(rename(function (path) {
                    path.dirname = "";
                    path.extname = ".min.js";
                }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(dist.js))
        });
        es.merge(tasks).on('end', done);
    });
}

gulp.task('css', buildCSS);
gulp.task('js', buildJS);

gulp.task('watch', function () {
    gulp.watch(src.scss, ['css'])
        .on('change', function () {
            const date = new Date();
            console.info('-> bundling CSS @ ' + date.toString());
        });
    gulp.watch([src.es6, src.components], ['js'])
        .on('change', function () {
            const date = new Date();
            console.info('-> bundling JS @ ' + date.toString());
        });
});

gulp.task('default', ['css', 'js']); // development