var gulp            = require('gulp');
var sass            = require('gulp-sass');
var rename          = require('gulp-rename');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var plumber         = require('gulp-plumber');
var gutil           = require('gulp-util');
var inline_base64   = require('gulp-inline-base64');
var iconfont        = require('gulp-iconfont');
var iconfontcss     = require('gulp-iconfont-css');
var cssnano         = require('gulp-cssnano');

var path            = "public/assets/";

var onError = function (err) {
    gutil.beep();
    console.log(err);
};

global.style = {};
global.style.icons = function() {
    return function(callback) {
        console.log("STYLE: icons:".magenta, "Start".red);

        function getRoot(path) {
            var backPath = '',
                depth = (path.match(/\//g) || []).length;
            for (var i = 0; i < depth; i++) {
                backPath += '../';
            }
            return backPath;
        }

        return gulp.src(["resources/assets/icons/" + "*.svg"], {base: '.'})
            .pipe(iconfontcss({
                fontName: "icon-font",
                path: "resources/assets/icon_templates/icon-font-template.scss",
                targetPath: getRoot('resources/assets/font_files/icons/') + "resources/assets/sass/_icon-font.scss",
                fontPath: ''
            }))
            .pipe(iconfont({
                fontName: "icon-font",
                normalize: true
            }))
            .pipe(gulp.dest("resources/assets/font_files/icons/"))
            .on('finish', function() {
                if (callback) {
                    console.log("STYLE: icons:".magenta, "Complete".green);
                    callback();
                }
            });
    };
};

global.style.inline_base64 = function() {
    return function(callback) {
        console.log("STYLE: Inline Base64:".magenta, "Start".red);
        return gulp.src([
                'resources/assets/sass/_icon-font.scss'
            ])
            .pipe(inline_base64({
                baseDir: 'resources/assets/font_files/icons/',
                maxSize: 14 * 1024,
                debug: true
            }))
            .pipe(gulp.dest('resources/assets/sass'))
            .on('finish', function() {
                if (callback) {
                    console.log("STYLE: Inline Base64:".magenta, "Complete".green);
                    callback();
                }
            });
    };
};

global.style.sass = function(basefile, async) {
    return function(callback) {
        console.log("STYLE: Sass:".magenta, "[" + basefile + "]",  "Start".red);

        if (async) {
            callback();
        }

        return gulp.src('resources/assets/sass/' + basefile)
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sourcemaps.init())
            .pipe(sass({style: 'compact', errLogToConsole: true}))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('public/assets/css/'))
            .pipe(cssnano())
            .pipe(rename({ extname: '.css' }))
            .pipe(gulp.dest('public/assets/css/'))
            .on('finish', function() {
                console.log("STYLE: Sass:".magenta, "[" + basefile + "]",  "Complete".green);
                if (!async && callback) {
                    callback();
                }
            });
    };
};
