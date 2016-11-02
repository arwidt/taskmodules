process.env.DISABLE_NOTIFIER = true;

var gulp            = require('gulp');
var async           = require('async');
var taskmodules     = require('./index.js');

gulp.task('default', function(done) {

    async.series([
        taskmodules.js.browserify.create('src/js/main.js', 'main.js', 'dist/js/', false, false),
        taskmodules.style.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
        taskmodules.style.sass.create('src/scss/main.scss', 'main.css', 'dist/css/', false, false)
    ], function() {
        console.log("SERIES COMPLETE");
        async.parallel([
            taskmodules.js.browserify.create('src/js/main.js', 'main.js', 'dist/js/', false, false),
            taskmodules.style.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
            taskmodules.style.sass.create('src/scss/main.scss', 'main.css', 'dist/css/', false, false)
        ], function() {
            console.log("PARALLEL COMPLETE");
            done();
        });
    });

});
