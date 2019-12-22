var gulp = require("gulp");
var sass = require("gulp-sass");
var cleancss = require("gulp-clean-css");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("watch", function () {
  gulp.watch("./**/*.scss", gulp.series("build"));
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
