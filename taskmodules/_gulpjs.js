"use strict";

var gulp_js = (function() {

    var browserify = require('browserify');
    var gulp = require('gulp');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var gutil = require('gulp-util');
    var gif = require('gulp-if');
    var colors = require('colors');

    var _fact = {
        getBrowserifyMinifySourcemap: function(sourceFile, outputFile, outputPath, isAsync, production) {
            return function(callback) {
                console.log("JS:".yellow, "Start".red);

                isAsync = isAsync || false;
                production = production || false;

                if (isAsync) {
                    callback();
                }

                var b = browserify({
                    entries: sourceFile,
                    debug: true
                });

                return b.bundle()
                    .pipe(source(outputFile))
                    .pipe(buffer())
                    .pipe(gif(!production, sourcemaps.init({loadMaps: true})))
                    .pipe(uglify())
                    .on('error', gutil.log)
                    .pipe(gif(!production, sourcemaps.write('./')))
                    .pipe(gulp.dest(outputPath))
                    .on('finish', function() {
                        console.log("JS:".yellow, "Done".green);
                        if (!isAsync && callback) {
                            //console.timeEnd(' '.green);
                            callback();
                        }
                    });
            };
        },

        getMinifySourcemap: function(sourceFile, outputFile, outputPath, isAsync, production) {
            return function(callback) {
                console.log("JS:".yellow, "Start".red);

                isAsync = isAsync || false;
                production = production || false;

            };
        }

    };

    return _fact;

})();

module.exports = gulp_js;
