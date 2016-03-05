
var js_browserify   = require('./taskmodules/_js_browserify.js');
var style_sass      = require('./taskmodules/_style_sass.js');
var util_svg_iconfont    = require('./taskmodules/_util_svg_iconfont.js');

var _index = (function() {

    var _inst = {
        js: {
            browserify: js_browserify
        },
        style: {
            sass: style_sass
        },
        utils: {
            svgIconFont: util_svg_iconfont
        }
    };

    return _inst;

})();

module.exports = _index;