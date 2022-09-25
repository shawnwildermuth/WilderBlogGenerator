const { src, parallel, dest } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const uglifycss = require("gulp-uglifycss");
const del = require("del");
const rename = require("gulp-rename");
const run = require("gulp-run-command").default;

function fonts() {
  return src("input/css/fonts.css")
    .pipe(uglifycss())
    .pipe(rename("fonts.min.css"))
    .pipe(dest("_site/css/"));
} 

const libFiles = [
  "node_modules/cookieconsent/build/cookieconsent.min.*",
  "node_modules/respond.js/dest/*.js",
];


function libs(cb) {

  for (var x = 0; x < libFiles.length; x++) {
    const file = libFiles[x];
    const path = file.substring(file.indexOf("/"), file.lastIndexOf("/"));
    src(file)
      .pipe(dest(`_site/lib/${path}`));
  }

  cb();
}

function clean() {
  return del([
    "_site/css/fonts.min.css",
    "_site/lib/",
  ]);
}
 
exports.libs = libs;
exports.fonts = fonts;
exports.clean = clean;
exports.debug = parallel(fonts, libs);
exports.default = parallel(fonts, libs);
