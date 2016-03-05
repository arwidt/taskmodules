"use strict";

var _util_svg_iconfont = (function() {

    var gulp            = require('gulp');
    var iconfont        = require('gulp-iconfont');
    var iconfontcss     = require('gulp-iconfont-css');
    var fs              = require('fs');

    var iconfont_template = "";
    iconfont_template += '@font-face {\n';
    iconfont_template += '  font-family: "<%= fontName %>";\n';
    iconfont_template += '  src: url(\'<%= fontPath %><%= fontName %>.woff\') format(\'woff\'),\n';
    iconfont_template += '  url(\'<%= fontPath %><%= fontName %>.ttf\') format(\'truetype\');\n';
    iconfont_template += '}\n';

    iconfont_template += '%icon {\n';
    iconfont_template += '  font-family: "<%= fontName %>";\n';
    iconfont_template += '  -webkit-font-smoothing: antialiased;\n';
    iconfont_template += '  -moz-osx-font-smoothing: grayscale;\n';
    iconfont_template += '  font-style: normal;\n';
    iconfont_template += '  font-variant: normal;\n';
    iconfont_template += '  font-weight: normal;\n';
    iconfont_template += '  text-decoration: none;\n';
    iconfont_template += '  text-transform: none;\n';
    iconfont_template += '  vertical-align: top;\n';
    iconfont_template += '}\n';

    iconfont_template += '@function icon-char($filename) {\n';
    iconfont_template += '  $char: "";\n';
    iconfont_template += '<% _.each(glyphs, function(glyph) { %>\n';
    iconfont_template += '@if $filename == <%= glyph.fileName %> {\n';
    iconfont_template += '$char: "\<%= glyph.codePoint %>";\n';
    iconfont_template += '}<% }); %>\n';
    iconfont_template += '@return $char;\n';
    iconfont_template += '}\n';

    iconfont_template += '@mixin icon($filename, $insert: before) {\n';
    iconfont_template += '  &:#{$insert} {\n';
    iconfont_template += '	@extend %icon;\n';
    iconfont_template += '	content: icon-char($filename);\n';
    iconfont_template += '  }\n';
    iconfont_template += '}\n';

    iconfont_template += '<% _.each(glyphs, function(glyph) { %>.icon-<%= glyph.fileName %> {\n';
    iconfont_template += '  @include icon(<%= glyph.fileName %>);\n';
    iconfont_template += '}\n';
    iconfont_template += '<% }); %>\n';

    var _fact = {
        create: function(sourcePath, fontName, outputPath, outputFile, base64encode, isAsync) {
            return function(callback) {
                console.log("SVG ICONS:".magenta,  "Start".red);

                fontName = fontName || "_icon-font";
                isAsync = isAsync || false;

                var templateDefaultFileName = "icon-font-template.scss";

                fs.writeFileSync(sourcePath + templateDefaultFileName, iconfont_template);

                if (isAsync) {
                    callback();
                }

                function getRoot(path) {
                    var backPath = '',
                        depth = (path.match(/\//g) || []).length;
                    for (var i = 0; i < depth; i++) {
                        backPath += '../';
                    }
                    return backPath;
                }

                gulp.src([sourcePath + "*.svg"], {base: '.'})
                    .pipe(iconfontcss({
                        fontName: fontName,
                        path: sourcePath + templateDefaultFileName,
                        targetPath: getRoot(outputPath) + outputPath + outputFile,
                        fontPath: ''
                    }))
                    .pipe(iconfont({
                        fontName: fontName,
                        normalize: true
                    }))
                    .pipe(gulp.dest(outputPath))
                    .on('finish', function() {
                        fs.unlinkSync(sourcePath + templateDefaultFileName);
                        if (callback) {
                            console.log("SVG ICONS:".magenta, "Complete".green);
                            callback();
                        }
                    });

            };

        }
    };

    return _fact;

})();

module.exports = _util_svg_iconfont;
