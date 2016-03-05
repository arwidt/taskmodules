process.env.DISABLE_NOTIFIER = true;

var gulp            = require('gulp');
var async           = require('async');

var js_browserify   = require('./taskmodules/_js_browserify.js');
var style_sass      = require('./taskmodules/_style_sass.js');
var svg_iconfont    = require('./taskmodules/_util_svg_iconfont.js');

gulp.task('default', function(done) {

    async.series([
        svg_iconfont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
        js_browserify.create('src/js/main.js', 'main.js', 'dist/js/', false, false),
        style_sass.create('src/scss/main.scss', 'main.scss', 'dist/css/', false, false)
    ], function() {
        console.log("SERIES COMPLETE");

        async.parallel([
            svg_iconfont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
            js_browserify.create('src/js/main.js', 'main.js', 'dist/js/', false, false),
            style_sass.create('src/scss/main.scss', 'main.scss', 'dist/css/', false, false)
        ], function() {
            console.log("PARALLEL COMPLETE");
        });

    });

});
