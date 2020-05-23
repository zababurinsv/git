import gulp from 'gulp';
import sass from "gulp-sass";
import node from 'node-sass';
import autoprefixer from "gulp-autoprefixer";

sass.compiler = node

gulp.task('sass', function () {
    return gulp.src('./docs/static/html/components/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./docs/static/html/components/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./docs/static/html/components/**/*.scss', gulp.series('sass'));
});

gulp.task('gulp-watch-slyle', gulp.series('sass','sass:watch'))
gulp.task('default',gulp.parallel('gulp-watch-slyle'))