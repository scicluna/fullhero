'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

const postcss = require("gulp-postcss");
const atimport = require("postcss-import");
const purgecss = require("@fullhuman/postcss-purgecss");
const tailwind = require("tailwindcss");
const tailwindcss = build.subTask(
  "tailwindcss",
  function (gulp, buildOptions, done) {
    gulp
      .src("src/webparts/fullHero/assets/global.css")
      .pipe(
        postcss([
          atimport(),
          tailwind("./tailwind.config.js"),
          ...(buildOptions.args.ship
            ? [
              purgecss({
                content: ["src/**/**/*.tsx", "src/**/**/**/*.tsx"],
                defaultExtractor: (content) =>
                  content.match(/[\w-/:]+(?<!:)/g) || [],
              }),
            ]
            : []),
        ])
      )
      .pipe(gulp.dest("dist/assets"));
    done();
  }
);
build.rig.addPreBuildTask(tailwindcss);

build.initialize(require('gulp'));
