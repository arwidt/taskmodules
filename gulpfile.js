process.env.DISABLE_NOTIFIER = true;

var gulp = require('gulp');
var gulpjs  = require('./taskmodules/_gulpjs.js');

gulp.task('default', function(done) {

    gulpjs.getBrowserifyMinifySourcemap('src/js/main.js', 'all.min.js', 'dist/js/', false, true)(function() {
        console.log("JS COMPLETE");
    });

    // async.series([
    //     remove.reset(),
    //     copy.sasslibs(),
    //     style.icons(),
    //     style.inline_base64()
    // ], function() {
    //
    //     var tasks = [];
    //     tasks.push(style.sass('main_latin.scss'));
    //     if (argv.production) {
    //         tasks.push(style.sass('main_greek.scss'));
    //         tasks.push(style.sass('main_cyrillic.scss'));
    //         tasks.push(style.sass('main_latinextended.scss'));
    //     }
    //     tasks.push(script.js(argv.production));
    //
    //     async.parallel(tasks, function() {
    //
    //         async.parallel([
    //             copy.fonts(argv.production),
    //             copy.locale(argv.production),
    //             copy.adsDebug(),
    //             copy.images()
    //         ], done);
    //
    //     });
    //
    // });

});
