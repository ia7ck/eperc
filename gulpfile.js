const gulp = require("gulp");
const sass = require("gulp-sass");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const fileinclude = require("gulp-file-include");
const htmlbeautify = require('gulp-html-beautify');

// yarn run gulp watch
gulp.task("watch", function () {
  gulp.watch("./src/*.scss", gulp.series("build"));
  gulp.watch("./docs/src/*.html", gulp.series("docs"));
});

gulp.task("build", function (done) {
  gulp.src("./src/*.scss")
    .pipe(sass({ outputStyle: "compact" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist"))
    .pipe(gulp.dest("./docs/dist"))
    .pipe(cleancss())
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest("./dist"))
    .pipe(gulp.dest("./docs/dist"));
  done();
});

// https://www.npmjs.com/package/gulp-file-include
// https://www.npmjs.com/package/gulp-html-beautify
gulp.task("docs", function (done) {
  gulp.src(["./docs/src/index.html"])
    .pipe(fileinclude())
    .pipe(htmlbeautify({
      "indent_size": 2,
    }))
    .pipe(gulp.dest('./docs'));
  done();
});

// yarn run gulp
gulp.task("default", gulp.parallel("build", "docs"));
