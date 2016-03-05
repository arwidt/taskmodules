var _js_browserify = (function() {
    "use strict";

    var browserify = require('browserify');
    var gulp = require('gulp');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var gutil = require('gulp-util');
    var gif = require('gulp-if');

    var _fact = {
        create: function(sourceFile, outputFile, outputPath, isAsync, production) {
            return function(callback) {
                isAsync = isAsync || false;
                production = production || false;

                if (isAsync) {
                    callback();
                }

                var onError = function (err) {
                    gutil.beep();
                    gutil.log(err);
                    this.emit('end');
                };

                var b = browserify({
                    entries: sourceFile,
                    debug: true
                });

                return b.bundle()
                    .on('error', onError)
                    .pipe(source(outputFile))
                    .pipe(buffer())
                    .pipe(gif(!production, sourcemaps.init({loadMaps: true})))
                    .pipe(gif(!production, uglify()))
                    .on('error', onError)
                    .pipe(gif(!production, sourcemaps.write('./')))
                    .pipe(gulp.dest(outputPath))
                    .on('finish', function() {
                        if (!isAsync && callback) {
                            callback();
                        }
                    });
            };
        }
    };

    return _fact;

})();

module.exports = _js_browserify;
