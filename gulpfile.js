const gulp                    = require('gulp');
const stylus                  = require('gulp-stylus');
const insert                  = require('gulp-insert');

const constBuilder            = require('./gulp-tasks/build-general-constants');
const buildSvgSpriteComponent = require('./gulp-tasks/build-svg-sprite-component');


function buildStylus(compress) {
    return function () {
        compress = !!compress;
        return gulp.src('./css/themes/*.styl')
            .pipe(stylus({
                compress,
                'include css': true
            }))
            .pipe(gulp.dest('./public/theme'));
    };
}

gulp.task('dev-build', buildStylus(false));
gulp.task('release-build', buildStylus(true));
gulp.task('build-general-constants', () => {
    return gulp.src('./general-constants.json')
        .pipe(constBuilder(process.env.USERMODE))
        .pipe(gulp.dest('./src/config/'));
});

gulp.task('css-insert', function() {
    return gulp.src('./public/main.css')
        .pipe(insert.prepend('@import "main.dll.css";\n'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('build-svg-sprite-component', buildSvgSpriteComponent);

gulp.task('release', ['release-build', 'build-general-constants', 'build-svg-sprite-component']);
gulp.task('default', ['dev-build', 'build-general-constants', 'build-svg-sprite-component']);
gulp.task('watch', ['dev-build'], () => {
    gulp.watch('./css/**/*', ['dev-build']);
});
