"use strict";

var gulp_sass = (function() {

    var gulp            = require('gulp');
    var sass            = require('gulp-sass');
    var sourcemaps      = require('gulp-sourcemaps');
    var autoprefixer    = require('gulp-autoprefixer');
    var rename          = require('gulp-rename');
    var plumber         = require('gulp-plumber');
    var cssnano         = require('gulp-cssnano');

    var _fact = {
        getMinifySourcemap: function(sourceFile, outputFile, outputPath, isAsync, production) {
            return function(callback) {
                console.log("STYLE: Sass:".magenta, "[" + sourceFile + "]",  "Start".red);

                isAsync = isAsync || false;
                production = production || false;

                if (isAsync) {
                    callback();
                }

                var onError = function (err) {
                    gutil.beep();
                    console.log(err.red);
                };

                return gulp.src(sourceFile)
                    .pipe(plumber({
                        errorHandler: onError
                    }))
                    .pipe(sourcemaps.init())
                    .pipe(sass({style: 'compact', errLogToConsole: true}))
                    .pipe(autoprefixer())
                    .pipe(sourcemaps.write())
                    .pipe(gulp.dest(outputPath))
                    .pipe(cssnano())
                    .pipe(rename(outputFile))
                    .pipe(gulp.dest(outputPath))
                    .on('finish', function() {
                        console.log("STYLE: Sass:".magenta, "[" + outputPath + "" + outputFile + "]",  "Complete".green);
                        if (!isAsync && callback) {
                            callback();
                        }
                    });
            };

        }
    };

    return _fact;

})();

module.exports = gulp_sass;
