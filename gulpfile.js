process.env.DISABLE_NOTIFIER = true;

var gulp            = require('gulp');
var async           = require('async');
var taskmodules     = require('./index.js');

gulp.task('default', function(done) {

    async.series([
        taskmodules.js.browserify('test/js/main.js', 'dist/js/main.min.js'),
        // taskmodules.style.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
        taskmodules.style.sass('src/scss/main.scss', 'dist/css/main.css')
    ], function() {
        console.log("SERIES COMPLETE");
        async.parallel([
            taskmodules.js.browserify('test/js/main.js', 'dist/js/main2.min.js'),
            // taskmodules.style.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
            taskmodules.style.sass('src/scss/main.scss', 'dist/css/main.css')
        ], function() {
            console.log("PARALLEL COMPLETE");
            done();
        });
    });

});
